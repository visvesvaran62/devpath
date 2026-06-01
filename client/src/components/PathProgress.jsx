import React from 'react';
import { useAppContext } from '../context/AppContext';

const PathProgress = () => {
  const { user, tasks, isDarkMode } = useAppContext();
  
  const completedTasksCount = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const percentage = totalTasks > 0 ? Math.round((completedTasksCount / totalTasks) * 100) : 0;
  
  const strokeDasharray = 440; // 2 * PI * r (r=70)
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className={`rounded-[2.5rem] p-8 border shadow-premium h-full animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors flex flex-col ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
    }`}>
      <h3 className={`text-xl font-black mb-8 tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Path Progress</h3>
      
      <div className="flex flex-col lg:flex-row items-center gap-12 flex-1 justify-center">
        <div className="relative w-48 h-48 flex items-center justify-center group">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className={isDarkMode ? 'text-slate-800' : 'text-slate-100'}
            />
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="text-brand transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-500">
            <span className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{percentage}%</span>
            <span className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">Mastery</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10 flex-1">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Completed Tasks</p>
            <p className={`text-3xl font-black ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{(user.tasksDone || 0) + completedTasksCount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Current Streak</p>
            <p className={`text-3xl font-black flex items-center gap-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              {user.streak || 0} <span className="text-orange-500">FIRE</span>
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Study Hours</p>
            <p className={`text-3xl font-black ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{user.studyHours || 0}h</p>
          </div>
      
        </div>
      </div>
    </div>
  );
};

export default PathProgress;

