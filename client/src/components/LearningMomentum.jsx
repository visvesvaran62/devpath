import React from 'react';
import { useAppContext } from '../context/AppContext';

const DEFAULT_DATA = [
  { name: 'Mon', hours: 0, lastWeek: 3, h: 'h-0', lh: 'h-12' },
  { name: 'Tue', hours: 0, lastWeek: 4, h: 'h-0', lh: 'h-16' },
  { name: 'Wed', hours: 0, lastWeek: 5, h: 'h-0', lh: 'h-20' },
  { name: 'Thu', hours: 0, lastWeek: 4, h: 'h-0', lh: 'h-16' },
  { name: 'Fri', hours: 0, lastWeek: 6, h: 'h-0', lh: 'h-24' },
  { name: 'Sat', hours: 0, lastWeek: 4, h: 'h-0', lh: 'h-16' },
  { name: 'Sun', hours: 0, lastWeek: 2, h: 'h-0', lh: 'h-8' },
];

const LearningMomentum = () => {
  const { isDarkMode, user } = useAppContext();

  // Calculate dynamic data based on user history
  const getDynamicData = () => {
    const history = user?.history || {};
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = [];
    
    // Get last 7 days including today
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = weekDays[d.getDay()];
      const tasks = history[dateStr] || 0;
      
      // Map tasks to bar height (max 8 tasks = h-32)
      const hClass = `h-${Math.min(tasks * 4, 32)}`;
      
      result.push({
        name: dayName,
        hours: tasks,
        lastWeek: Math.floor(Math.random() * 5) + 2, // Simulated previous week
        h: hClass,
        lh: `h-${(Math.floor(Math.random() * 6) + 1) * 4}`
      });
    }
    return result;
  };

  const dynamicData = getDynamicData();

  return (
    <div className={`rounded-[2.5rem] p-8 border shadow-premium h-full animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors flex flex-col ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h3 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Learning Momentum</h3>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Study consistency over 7 days</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-brand rounded-full"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Previous</span>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between h-full min-h-[200px] px-4 gap-4 mt-auto">
        {dynamicData.map((day, i) => (
          <div key={i} className="flex flex-col items-center flex-1 gap-4 group">
            <div className="flex items-end gap-1.5 w-full justify-center">
               {/* Previous Week Bar */}
               <div 
                 className={`w-2.5 ${day.lh} rounded-full transition-all duration-500 ${
                   isDarkMode ? 'bg-slate-800 group-hover:bg-slate-700' : 'bg-slate-100 group-hover:bg-slate-200'
                 }`}
               ></div>
               {/* Current Week Bar */}
               <div 
                 className={`w-4 ${day.h} rounded-full transition-all duration-700 relative ${
                   isDarkMode ? 'bg-brand/20 group-hover:bg-brand' : 'bg-brand/10 group-hover:bg-brand'
                 }`}
               >
                 <div className={`absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${
                   isDarkMode ? 'bg-slate-700 text-slate-100' : 'bg-slate-800 text-white'
                 }`}>
                   {day.hours} Tasks
                 </div>
               </div>
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{day.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningMomentum;
