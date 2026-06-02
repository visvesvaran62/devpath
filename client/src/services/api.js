const API_URL = import.meta.env.VITE_API_URL || 'https://devpath-fbhh.onrender.com';

const getAuthHeader = () => {
  const token = localStorage.getItem('devpath_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// Auth
export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(response);
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const getMe = async () => {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: getAuthHeader(),
  });
  return handleResponse(response);
};

// Tasks
export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    headers: getAuthHeader(),
  });
  return handleResponse(response);
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
};

export const updateTask = async (id, updates) => {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return handleResponse(response);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  return handleResponse(response);
};

// User
export const updateProfile = async (profileData) => {
  const response = await fetch(`${API_URL}/api/user/profile`, {
    method: 'PATCH',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  return handleResponse(response);
};

export const updateRoadmap = async (currentPath, roadmapSteps) => {
  const response = await fetch(`${API_URL}/api/user/roadmap`, {
    method: 'PATCH',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPath, roadmapSteps }),
  });
  return handleResponse(response);
};

export const updateStreak = async () => {
  const response = await fetch(`${API_URL}/api/user/streak`, {
    method: 'PATCH',
    headers: getAuthHeader(),
  });
  return handleResponse(response);
};

export const updateNotes = async (globalNotes) => {
  const response = await fetch(`${API_URL}/api/user/notes`, {
    method: 'PATCH',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ globalNotes }),
  });
  return handleResponse(response);
};

// Community placeholders until the matching server routes are implemented.
export const fetchPosts = async () => [];
export const createPost = async (postData) => ({
  _id: Date.now().toString(),
  ...postData,
  likes: 0,
  likedBy: [],
  comments: 0,
  commentList: []
});
export const likePost = async () => ({ likes: 0, likedBy: [] });
export const commentOnPost = async () => [];

// AI
export const sendAIMessage = async (
  message,
  userRole,
  pendingTaskCount,
  conversationHistory
) => {
  const response = await fetch(`${API_URL}/api/ai/chat`, {
    method: 'POST',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      userRole,
      pendingTaskCount,
      conversationHistory
    }),
  });

  return handleResponse(response);
};

export const reviewCode = async (code, userRole, userName) => {
  const response = await fetch(`${API_URL}/api/ai/review`, {
    method: 'POST',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, userRole, userName }),
  });
  return handleResponse(response);
};

export const generateAITasks = async (pathTitle, proficiency, completedSteps = []) => {
  const response = await fetch(`${API_URL}/api/ai/generate-tasks`, {
    method: 'POST',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ pathTitle, proficiency, completedSteps }),
  });
  return handleResponse(response);
};
