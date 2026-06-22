import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your DevPath AI Mentor. How can I help you today?",
      time: 'Just Now'
    }
  ]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('app_dark_mode') === 'true');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [initialAuthView, setInitialAuthView] = useState('register');
  const [leaderboard, setLeaderboard] = useState([
  ]);
  const [globalNotes, setGlobalNotes] = useState([]);
  const [aiInsights, setAiInsights] = useState([
    "Consistency is the heartbeat of mastery. Keep it up!",
    "Your progress in the current path is accelerating. Focus on the next module.",
    "Did you know? Breaking large tasks into 15-minute sprints can boost focus.",
    "Mastery is a marathon, not a sprint. Take a short break then tackle the next goal."
  ]);
  
  // These stay local as requested
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('app_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [badges, setBadges] = useState(() => {
    try {
      const saved = localStorage.getItem('app_badges');
      return saved ? JSON.parse(saved) : [{ id: 'first-step', name: 'First Step', icon: '🎯', description: 'Generated your first AI Roadmap' }];
    } catch (e) { return []; }
  });
  
  const [currentPath, setCurrentPath] = useState({ id: 'frontend', title: 'Frontend Engineering Masterclass' });
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  
  // Static data
  const PATHS_DATA = {
   'frontend': {
  title: 'Frontend Developer',
  steps: [
    {
      id: 101,
      title: 'HTML5 Fundamentals',
      level: 'Beginner',
      description: 'Semantic tags, forms, tables, accessibility, and SEO basics.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'MDN HTML Docs', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }],
      icon: 'HTML'
    },
    {
      id: 102,
      title: 'CSS Fundamentals',
      level: 'Beginner',
      description: 'Selectors, Box Model, Positioning, Flexbox, Grid, Responsive Design.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'MDN CSS Docs', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }],
      icon: 'CSS'
    },
    {
      id: 103,
      title: 'JavaScript Fundamentals',
      level: 'Beginner',
      description: 'Variables, Functions, Arrays, Objects, Loops, DOM Manipulation.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'MDN JavaScript', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' }],
      icon: 'JS'
    },
    {
      id: 104,
      title: 'Advanced JavaScript',
      level: 'Intermediate',
      description: 'Closures, Scope, Hoisting, Promises, Async/Await, Event Loop.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'JavaScript Info', link: 'https://javascript.info' }],
      icon: 'ES6'
    },
    {
      id: 105,
      title: 'Git & GitHub',
      level: 'Intermediate',
      description: 'Version control, branching, pull requests, and collaboration.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Git Docs', link: 'https://git-scm.com/doc' }],
      icon: 'GIT'
    },
    {
      id: 106,
      title: 'React Fundamentals',
      level: 'Intermediate',
      description: 'Components, Props, State, Hooks, Forms, and Lifecycle.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'React Docs', link: 'https://react.dev' }],
      icon: 'RE'
    },
    {
      id: 107,
      title: 'React Router & API Integration',
      level: 'Intermediate',
      description: 'Routing, Dynamic Routes, Axios, Fetch API, and REST APIs.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'React Router', link: 'https://reactrouter.com' }],
      icon: 'API'
    },
    {
      id: 108,
      title: 'State Management',
      level: 'Intermediate',
      description: 'Context API, Redux Toolkit, and global state patterns.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Redux Toolkit', link: 'https://redux-toolkit.js.org' }],
      icon: 'RED'
    },
    {
      id: 109,
      title: 'Tailwind CSS & UI Libraries',
      level: 'Intermediate',
      description: 'Tailwind CSS, Material UI, Shadcn UI, and component systems.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Tailwind CSS', link: 'https://tailwindcss.com/docs' }],
      icon: 'TW'
    },
    {
      id: 110,
      title: 'Frontend Performance',
      level: 'Advanced',
      description: 'Lazy Loading, Code Splitting, Memoization, and Optimization.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'React Performance', link: 'https://react.dev' }],
      icon: 'OPT'
    },
    {
      id: 111,
      title: 'TypeScript',
      level: 'Advanced',
      description: 'Types, Interfaces, Generics, and type-safe React development.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'TypeScript Docs', link: 'https://www.typescriptlang.org/docs/' }],
      icon: 'TS'
    },
    {
      id: 112,
      title: 'Next.js',
      level: 'Advanced',
      description: 'SSR, SSG, App Router, Server Components, and Deployment.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Next.js Docs', link: 'https://nextjs.org/docs' }],
      icon: 'NX'
    }
  ]
},
    'ai-ml': {
  title: 'AI & ML Specialist',
  steps: [
    {
      id: 201,
      title: 'Python Fundamentals',
      level: 'Beginner',
      description: 'Variables, Functions, OOP, File Handling, and Modules.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Python Docs', link: 'https://docs.python.org/3/tutorial/' }],
      icon: 'PY'
    },
    {
      id: 202,
      title: 'Data Analysis with NumPy & Pandas',
      level: 'Beginner',
      description: 'Data manipulation, arrays, dataframes, and preprocessing.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Pandas Docs', link: 'https://pandas.pydata.org/docs/' }],
      icon: 'PD'
    },
    {
      id: 203,
      title: 'Data Visualization',
      level: 'Beginner',
      description: 'Matplotlib, Seaborn, charts, and exploratory data analysis.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Matplotlib Docs', link: 'https://matplotlib.org/stable/' }],
      icon: 'DV'
    },
    {
      id: 204,
      title: 'Mathematics for ML',
      level: 'Intermediate',
      description: 'Linear Algebra, Probability, Statistics, and Calculus basics.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Khan Academy', link: 'https://www.khanacademy.org/math/linear-algebra' }],
      icon: 'MA'
    },
    {
      id: 205,
      title: 'Machine Learning Fundamentals',
      level: 'Intermediate',
      description: 'Regression, Classification, Clustering, and Model Evaluation.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Scikit-Learn Docs', link: 'https://scikit-learn.org/stable/' }],
      icon: 'ML'
    },
    {
      id: 206,
      title: 'Feature Engineering',
      level: 'Intermediate',
      description: 'Data cleaning, encoding, scaling, and feature selection.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Scikit-Learn', link: 'https://scikit-learn.org/' }],
      icon: 'FE'
    },
    {
      id: 207,
      title: 'Deep Learning Fundamentals',
      level: 'Intermediate',
      description: 'Neural Networks, Activation Functions, Backpropagation.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Deep Learning Book', link: 'https://www.deeplearningbook.org/' }],
      icon: 'DL'
    },
    {
      id: 208,
      title: 'PyTorch & TensorFlow',
      level: 'Advanced',
      description: 'Build and train deep learning models using modern frameworks.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'PyTorch Docs', link: 'https://pytorch.org/tutorials/' }],
      icon: 'PT'
    },
    {
      id: 209,
      title: 'Natural Language Processing',
      level: 'Advanced',
      description: 'Text preprocessing, embeddings, transformers, and NLP pipelines.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Hugging Face', link: 'https://huggingface.co/docs' }],
      icon: 'NLP'
    },
    {
      id: 210,
      title: 'Generative AI & LLMs',
      level: 'Advanced',
      description: 'Prompt Engineering, RAG, Fine-Tuning, AI Agents, and LLM APIs.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'OpenAI Cookbook', link: 'https://cookbook.openai.com/' }],
      icon: 'LLM'
    }
  ]
},
    'backend': {
  title: 'Backend Engineer',
  steps: [
    {
      id: 301,
      title: 'Node.js Fundamentals',
      level: 'Beginner',
      description: 'Modules, File System, Event Loop, Streams, and NPM.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Node.js Docs', link: 'https://nodejs.org/docs/latest/api/' }],
      icon: 'NODE'
    },
    {
      id: 302,
      title: 'Express.js Fundamentals',
      level: 'Beginner',
      description: 'Routing, Middleware, Request/Response Cycle, and Error Handling.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Express Docs', link: 'https://expressjs.com/' }],
      icon: 'EXP'
    },
    {
      id: 303,
      title: 'REST API Development',
      level: 'Beginner',
      description: 'CRUD Operations, HTTP Methods, Status Codes, and API Design.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'REST API Guide', link: 'https://restfulapi.net/' }],
      icon: 'API'
    },
    {
      id: 304,
      title: 'MongoDB & Mongoose',
      level: 'Intermediate',
      description: 'Schemas, Models, CRUD Operations, Validation, and Relationships.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Mongoose Docs', link: 'https://mongoosejs.com/docs/' }],
      icon: 'MDB'
    },
    {
      id: 305,
      title: 'Authentication & Authorization',
      level: 'Intermediate',
      description: 'JWT, bcrypt, Cookies, Sessions, RBAC, and Google OAuth.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'JWT.io', link: 'https://jwt.io/' }],
      icon: 'AUTH'
    },
    {
      id: 306,
      title: 'File Upload & Email Services',
      level: 'Intermediate',
      description: 'Cloudinary, Multer, Nodemailer, and OTP Verification.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Cloudinary Docs', link: 'https://cloudinary.com/documentation' }],
      icon: 'FILE'
    },
    {
      id: 307,
      title: 'Advanced Database Concepts',
      level: 'Intermediate',
      description: 'Aggregation Pipeline, Indexing, Transactions, and Optimization.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'MongoDB Docs', link: 'https://www.mongodb.com/docs/' }],
      icon: 'DB'
    },
    {
      id: 308,
      title: 'Redis & Caching',
      level: 'Advanced',
      description: 'Caching strategies, sessions, rate limiting, and performance optimization.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Redis Docs', link: 'https://redis.io/docs/latest/' }],
      icon: 'RED'
    },
    {
      id: 309,
      title: 'System Design Fundamentals',
      level: 'Advanced',
      description: 'Scalability, Load Balancing, Microservices, CAP Theorem, and Message Queues.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'System Design Primer', link: 'https://github.com/donnemartin/system-design-primer' }],
      icon: 'SYS'
    },
    {
      id: 310,
      title: 'Deployment & DevOps',
      level: 'Advanced',
      description: 'Docker, CI/CD, GitHub Actions, Render, AWS, and Kubernetes basics.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Docker Docs', link: 'https://docs.docker.com/' }],
      icon: 'DEV'
    }
  ]
},
'fullstack': {
  title: 'Full Stack Developer',
  steps: [
    {
      id: 401,
      title: 'HTML, CSS & JavaScript',
      level: 'Beginner',
      description: 'Build responsive web pages and learn core JavaScript concepts.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'MDN Web Docs', link: 'https://developer.mozilla.org' }],
      icon: 'JS'
    },
    {
      id: 402,
      title: 'React Fundamentals',
      level: 'Beginner',
      description: 'Components, Props, State, Hooks, and Event Handling.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'React Docs', link: 'https://react.dev' }],
      icon: 'RC'
    },
    {
      id: 403,
      title: 'React Router & API Integration',
      level: 'Intermediate',
      description: 'Routing, Axios, Fetch API, and handling backend data.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'React Router Docs', link: 'https://reactrouter.com' }],
      icon: 'API'
    },
    {
      id: 404,
      title: 'Node.js & Express.js',
      level: 'Intermediate',
      description: 'Create REST APIs, middleware, routing, and server-side logic.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Express Docs', link: 'https://expressjs.com' }],
      icon: 'EXP'
    },
    {
      id: 405,
      title: 'MongoDB & Mongoose',
      level: 'Intermediate',
      description: 'Schemas, Models, CRUD operations, Validation, and Relationships.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Mongoose Docs', link: 'https://mongoosejs.com/docs/' }],
      icon: 'MDB'
    },
    {
      id: 406,
      title: 'Authentication & Authorization',
      level: 'Intermediate',
      description: 'JWT, bcrypt, Protected Routes, Role-Based Access, Google OAuth.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'JWT Docs', link: 'https://jwt.io/' }],
      icon: 'AUTH'
    },
    {
      id: 407,
      title: 'State Management',
      level: 'Intermediate',
      description: 'Context API, Redux Toolkit, and global state handling.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Redux Toolkit', link: 'https://redux-toolkit.js.org/' }],
      icon: 'RED'
    },
    {
      id: 408,
      title: 'Advanced Backend Features',
      level: 'Advanced',
      description: 'File Uploads, Email Services, Pagination, Search & Filtering.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Cloudinary Docs', link: 'https://cloudinary.com/documentation' }],
      icon: 'ADV'
    },
    {
      id: 409,
      title: 'Real-Time Applications',
      level: 'Advanced',
      description: 'Socket.IO, Chat Applications, Live Notifications.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Socket.IO Docs', link: 'https://socket.io/docs/v4/' }],
      icon: 'SOC'
    },
    {
      id: 410,
      title: 'Deployment & DevOps',
      level: 'Advanced',
      description: 'Deploy MERN applications using Vercel, Render, MongoDB Atlas, and GitHub Actions.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'GitHub Actions', link: 'https://docs.github.com/actions' }],
      icon: 'DEP'
    }
  ]
},
    'database': {
  title: 'Database',
  steps:[
    {
      id: 401,
      title: 'Database Fundamentals',
      level: 'Beginner',
      description: 'Learn databases, tables, rows, columns, primary keys, and foreign keys.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Database Basics', link: 'https://www.geeksforgeeks.org/dbms/' }],
      icon: 'DB'
    },
    {
      id: 402,
      title: 'SQL Fundamentals',
      level: 'Beginner',
      description: 'SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY, LIMIT.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'SQL Tutorial', link: 'https://www.w3schools.com/sql/' }],
      icon: 'SQL'
    },
    {
      id: 403,
      title: 'MySQL Relationships & Joins',
      level: 'Intermediate',
      description: 'Primary Key, Foreign Key, INNER JOIN, LEFT JOIN, RIGHT JOIN.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'MySQL Joins', link: 'https://dev.mysql.com/doc/' }],
      icon: 'MY'
    },
    {
      id: 404,
      title: 'Database Normalization',
      level: 'Intermediate',
      description: '1NF, 2NF, 3NF and reducing data redundancy.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Normalization', link: 'https://www.geeksforgeeks.org/normalization-in-dbms/' }],
      icon: 'NF'
    },
    {
      id: 405,
      title: 'MongoDB Fundamentals',
      level: 'Intermediate',
      description: 'Collections, Documents, CRUD Operations, Indexes.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'MongoDB Docs', link: 'https://www.mongodb.com/docs/' }],
      icon: 'MDB'
    },
    {
      id: 406,
      title: 'Mongoose ODM',
      level: 'Intermediate',
      description: 'Schemas, Models, Validation, Middleware, Populate.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Mongoose Docs', link: 'https://mongoosejs.com/docs/' }],
      icon: 'MGS'
    },
    {
      id: 407,
      title: 'Aggregation & Advanced Queries',
      level: 'Advanced',
      description: 'MongoDB Aggregation Pipeline, Lookup, Group, Match.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Aggregation Docs', link: 'https://www.mongodb.com/docs/manual/aggregation/' }],
      icon: 'AGG'
    },
    {
      id: 408,
      title: 'Database Indexing & Optimization',
      level: 'Advanced',
      description: 'Indexes, Query Performance, Explain Plans, Optimization.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'MongoDB Indexing', link: 'https://www.mongodb.com/docs/manual/indexes/' }],
      icon: 'IDX'
    },
    {
      id: 409,
      title: 'Transactions & Data Consistency',
      level: 'Advanced',
      description: 'ACID properties, Transactions, Rollbacks, Concurrency.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Transactions', link: 'https://dev.mysql.com/doc/' }],
      icon: 'TX'
    },
    {
      id: 410,
      title: 'Database Design for Real Projects',
      level: 'Advanced',
      description: 'Design schemas for E-commerce, LMS, Chat Apps, and SaaS products.',
      status: 'PENDING',
      completed: false,
      resources: [{ label: 'Database Design Guide', link: 'https://www.geeksforgeeks.org/database-design/' }],
      icon: 'DES'
    }
  ]
}
};

  // On Load: Restore Session
  useEffect(() => {
    const initApp = async () => {
      const token = localStorage.getItem('devpath_token');
      if (token) {
        try {
          const userData = await api.getMe();
          setUser(userData);
          setIsAuthenticated(true);
          
          // Load data
          const tasksData = await api.fetchTasks();
          setTasks(tasksData);
          
          if (userData.currentPath) setCurrentPath(userData.currentPath);
          if (userData.roadmapSteps) setRoadmapSteps(userData.roadmapSteps);
          if (userData.globalNotes) setGlobalNotes(userData.globalNotes);
          
        } catch (err) {
          console.error("Auth restoration failed:", err);
          localStorage.removeItem('devpath_token');
        }
      }
      setIsLoading(false);
    };
    initApp();
  }, []);

  // Persist local stuff
  useEffect(() => {
    localStorage.setItem('app_dark_mode', isDarkMode);
    localStorage.setItem('app_notifications', JSON.stringify(notifications));
    localStorage.setItem('app_badges', JSON.stringify(badges));
  }, [isDarkMode, notifications, badges]);

  // Auth functions
  const registerUser = async (userData) => {
    try {
      const data = await api.registerUser(userData.name, userData.email, userData.password);
      localStorage.setItem('devpath_token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const login = async (email, password, customData = null) => {
    try {
      const data = customData || await api.loginUser(email, password);
      localStorage.setItem('devpath_token', data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      
      // Load data after login
      const [tasksData, postsData] = await Promise.all([
        api.fetchTasks(),
        api.fetchPosts()
      ]);
      setTasks(tasksData);
      setPosts(postsData);
      
      if (data.user.currentPath) setCurrentPath(data.user.currentPath);
      if (data.user.roadmapSteps) setRoadmapSteps(data.user.roadmapSteps);
      
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('devpath_token');
    setIsAuthenticated(false);
    setUser(null);
    setTasks([]);
    setPosts([]);
    setInitialAuthView('login');
  };

  const updateProfile = async (newData) => {
    try {
      const updatedUser = await api.updateProfile(newData);
      setUser(updatedUser);
      addNotification('Profile Updated', 'Your profile has been saved successfully.', 'SUCCESS');
    } catch (err) {
      addNotification('Update Failed', err.message, 'ERROR');
    }
  };

  // Task functions
  const addTask = async (task) => {
    const difficultyMap = {
      'BEGINNER': 'bg-emerald-50 text-emerald-600 border-emerald-100',
      'INTERMEDIATE': 'bg-indigo-50 text-indigo-600 border-indigo-100',
      'ADVANCED': 'bg-rose-50 text-rose-600 border-rose-100'
    };

    const difficulty = task.difficulty?.toUpperCase() || 'BEGINNER';

    const taskData = {
      title: task.title || 'New Task',
      description: task.description || 'Newly added task.',
      difficulty: difficulty,
      difficultyColor: difficultyMap[difficulty] || difficultyMap['BEGINNER'],
      time: task.time || '1h'
    };

    try {
      const newTask = await api.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      addNotification('Task Added', `Successfully added: ${newTask.title}`, 'TASK');
    } catch (err) {
      addNotification('Error', 'Failed to add task', 'ERROR');
    }
  };

  const toggleTask = async (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    if (!task) return;

    try {
      const updatedTask = await api.updateTask(taskId, { completed: !task.completed });
      setTasks(prev => prev.map(t => t._id === taskId ? updatedTask : t));
      
      if (updatedTask.completed) {
        // Increment streak on server
        const streakData = await api.updateStreak();
        setUser(prev => ({ ...prev, streak: streakData.streak, badges: streakData.badges }));
        addNotification('Milestone Achieved', `Completed: ${updatedTask.title}`, 'SUCCESS');
      }
    } catch (err) {
      addNotification('Error', 'Failed to update task', 'ERROR');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.deleteTask(taskId);
      setTasks(prev => prev.filter(t => t._id !== taskId));
    } catch (err) {
      addNotification('Error', 'Failed to delete task', 'ERROR');
    }
  };

  // AI Chat
  const sendMessage = async (text) => {
    const userMsg = { id: Date.now(), sender: 'user', text, time: 'Just Now' };
    setMessages(prev => [...prev, userMsg]);

    try {
      const pendingTaskCount = tasks.filter(t => !t.completed).length;
      const data = await api.sendAIMessage(text, user?.role, pendingTaskCount, [...messages, userMsg]);
      
      const aiMsg = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: data.reply, 
        time: 'Just Now' 
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.", 
        time: 'Just Now' 
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  // AI Task Generation
  const generateAITasks = async () => {
    try {
      const completedSteps = roadmapSteps
        .filter(s => s.completed)
        .map(s => s.title);

      const proficiency = user?.proficiency || 'Intermediate';
      const data = await api.generateAITasks(currentPath.title, proficiency, completedSteps);

      if (!data.success || !Array.isArray(data.tasks)) {
        addNotification('AI Error', 'AI returned an unexpected response. Try again.', 'ERROR');
        return { success: false };
      }

      for (const t of data.tasks) {
        await addTask(t);
      }
      addNotification('AI Tasks Added', `${data.tasks.length} tasks generated for your ${currentPath.title} path!`, 'SUCCESS');
      return { success: true, count: data.tasks.length };
    } catch (err) {
      addNotification('AI Error', err.message || 'Failed to generate tasks.', 'ERROR');
      return { success: false };
    }
  };

  // Community
  const addPost = async (content, tags = []) => {
    try {
      const newPost = await api.createPost({ content, tags });
      setPosts(prev => [newPost, ...prev]);
    } catch (err) {
      addNotification('Error', 'Failed to create post', 'ERROR');
    }
  };

  const toggleLike = async (postId) => {
    try {
      const data = await api.likePost(postId);
      setPosts(prev => prev.map(post => 
        post._id === postId ? { ...post, likes: data.likes, likedBy: data.likedBy } : post
      ));
    } catch (err) {
      addNotification('Error', 'Failed to like post', 'ERROR');
    }
  };

  const addComment = async (postId, text) => {
    try {
      const comments = await api.commentOnPost(postId, text);
      setPosts(prev => prev.map(post => 
        post._id === postId ? { ...post, comments: comments.length, commentList: comments } : post
      ));
    } catch (err) {
      addNotification('Error', 'Failed to add comment', 'ERROR');
    }
  };

  // Roadmap
  const generateRoadmap = async (pathId, proficiency = 'Intermediate') => {
    const fullPath = PATHS_DATA[pathId] || PATHS_DATA['frontend'];
    
    const difficultyMap = {
      'Beginner': { time: '1h', tag: 'BEGINNER', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
      'Intermediate': { time: '2h', tag: 'INTERMEDIATE', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
      'Advanced': { time: '4h', tag: 'ADVANCED', color: 'bg-rose-50 text-rose-600 border-rose-100' }
    };
    const diff = difficultyMap[proficiency] || difficultyMap['Intermediate'];

    const newPath = { id: pathId, title: fullPath.title };
    const newSteps = fullPath.steps;

    try {
      await api.updateRoadmap(newPath, newSteps);
      setCurrentPath(newPath);
      setRoadmapSteps(newSteps);
      setUser(prev => ({ ...prev, role: fullPath.title }));
      
      // Clear old tasks and add initial tasks
      // In a real app, you might want to do this via API too
      // For now, we update local state and let the user add them or handle via a sync endpoint
      addNotification('Roadmap Generated', `Your path for ${fullPath.title} is ready.`, 'SUCCESS');
    } catch (err) {
      addNotification('Error', 'Failed to save roadmap', 'ERROR');
    }
  };

  const completeRoadmapStep = async (stepId) => {
    const updatedSteps = roadmapSteps.map(step => 
      step.id === stepId ? { ...step, completed: true, status: 'COMPLETED' } : step
    );
    try {
      await api.updateRoadmap(currentPath, updatedSteps);
      setRoadmapSteps(updatedSteps);
      addNotification('Goal Progress', 'Module marked as complete.', 'SUCCESS');
    } catch (err) {
      addNotification('Error', 'Failed to update goal progress', 'ERROR');
    }
  };

  const addRoadmapStep = async (stepData) => {
    const newStep = {
      id: Date.now(),
      ...stepData,
      status: 'PENDING',
      completed: false,
      resources: [],
      icon: '✨'
    };
    const updatedSteps = [...roadmapSteps, newStep];
    try {
      await api.updateRoadmap(currentPath, updatedSteps);
      setRoadmapSteps(updatedSteps);
      addNotification('Path Updated', 'New custom landmark added.', 'SUCCESS');
    } catch (err) {
      addNotification('Error', 'Failed to add custom landmark', 'ERROR');
    }
  };

  const deleteRoadmapStep = async (stepId) => {
    const updatedSteps = roadmapSteps.filter(s => s.id !== stepId);
    try {
      await api.updateRoadmap(currentPath, updatedSteps);
      setRoadmapSteps(updatedSteps);
      addNotification('Path Updated', 'Roadmap module removed.', 'INFO');
    } catch (err) {
      addNotification('Error', 'Failed to remove module', 'ERROR');
    }
  };

  const addTaskFromRoadmap = async (step) => {
    const taskData = {
      title: step.title,
      description: step.description,
      difficulty: 'Intermediate',
      recommended: true,
      time: '1h'
    };
    try {
      const newTask = await api.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      addNotification('Task Created', `Goal "${step.title}" added to your daily path.`, 'SUCCESS');
    } catch (err) {
      addNotification('Error', 'Failed to convert goal to task', 'ERROR');
    }
  };

  const addGlobalNote = async (content) => {
    const newNote = { id: Date.now().toString(), content, createdAt: new Date() };
    const updatedNotes = [newNote, ...globalNotes];
    try {
      await api.updateNotes(updatedNotes);
      setGlobalNotes(updatedNotes);
    } catch (err) {
      addNotification('Error', 'Failed to save note', 'ERROR');
    }
  };

  const deleteGlobalNote = async (id) => {
    const updatedNotes = globalNotes.filter(n => n.id !== id);
    try {
      await api.updateNotes(updatedNotes);
      setGlobalNotes(updatedNotes);
    } catch (err) {
      addNotification('Error', 'Failed to delete note', 'ERROR');
    }
  };

  // Notification Functions
  const addNotification = (title, message, type = 'INFO') => {
    const newNotif = {
      id: Date.now() + Math.random(),
      title,
      message,
      type,
      time: 'Just Now',
      unread: true
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <AppContext.Provider value={{
      isAuthenticated, user, tasks, messages, searchQuery, activeTab, currentPath, roadmapSteps, PATHS_DATA, initialAuthView,
      posts, notifications, isDarkMode, badges, isLoading, leaderboard, aiInsights, globalNotes,
      login, logout, registerUser, addTask, toggleTask, deleteTask, sendMessage, setSearchQuery, setUser, setActiveTab, generateRoadmap, setInitialAuthView,
      addPost, addNotification, clearNotifications, deleteNotification, toggleDarkMode, updateProfile, toggleLike, addComment,
      completeRoadmapStep, addRoadmapStep, deleteRoadmapStep, addTaskFromRoadmap, addGlobalNote, deleteGlobalNote, generateAITasks
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppContextProvider');
  return context;
};
 