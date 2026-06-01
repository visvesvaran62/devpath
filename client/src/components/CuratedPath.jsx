import React from 'react';
import { useAppContext } from '../context/AppContext';

const icons = {
  Zap: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Box: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  HelpCircle: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  ArrowRight: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
    </svg>
  )
};

const courses = [
  {
    id: 1,
    title: 'Mastering Redis Cache',
    description: 'AI detected you struggle with high-load latency. This 20-min session helps optimize DB calls.',
    tag: 'New Content',
    icon: icons.Zap,
    color: 'text-brand',
    bg: 'bg-brand/5'
  },
  {
    id: 2,
    title: 'Kubernetes for Experts',
    description: 'Based on your recent interest in containerization. A deep dive into pod orchestration.',
    tag: 'Project Based',
    icon: icons.Box,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 3,
    title: 'Weekly Skill Assessment',
    description: 'Ready to level up to Gold V? Take the skill check to unlock advanced modules.',
    tag: 'Assessment',
    icon: icons.HelpCircle,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100'
  }
];

const CuratedPath = () => {
  const { isDarkMode, addTask, setActiveTab } = useAppContext();

  const addSuggestion = (course) => {
    addTask({
      title: course.title,
      description: course.description,
      difficulty: course.tag === 'Assessment' ? 'ADVANCED' : 'INTERMEDIATE',
      time: course.tag === 'New Content' ? '20m' : '1h'
    });
    setActiveTab('Daily Tasks');
  };

  return (
    <div className="py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-10">
        <h3 className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Curated for your Path</h3>
        <button onClick={() => setActiveTab('Daily Tasks')} className="text-[10px] font-black text-brand hover:text-brand/80 transition-colors uppercase tracking-[0.2em]">
          View all suggestions
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div 
            key={course.id} 
            onClick={() => addSuggestion(course)}
            className={`rounded-[2.5rem] p-8 flex flex-col group cursor-pointer border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-800 hover:border-brand/60 shadow-2xl shadow-black/20' 
                : 'bg-white border-slate-100 hover:border-brand/40 hover:shadow-premium'
            }`}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-all shadow-sm ${
              isDarkMode ? 'bg-slate-800' : course.bg
            } ${course.color}`}>
              <course.icon />
            </div>
            
            <div className="flex-1">
              <h4 className={`text-xl font-black mb-3 truncate leading-none ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{course.title}</h4>
              <p className={`text-sm font-medium leading-relaxed mb-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {course.description}
              </p>
            </div>

            <div className={`flex items-center justify-between mt-auto pt-6 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-50'}`}>
              <span className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest leading-none ${
                isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-400'
              }`}>
                {course.tag}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-brand/5 text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all shadow-sm">
                <icons.ArrowRight />
              </div>
            </div>
          </div>
        ))}
      </div> 
    </div>
  );
};

export default CuratedPath;
