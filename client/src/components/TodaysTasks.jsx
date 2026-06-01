import React from 'react';
import { useAppContext } from '../context/AppContext';

const TodaysTasks = () => {
  const { tasks, toggleTask, isDarkMode, searchQuery, setActiveTab } = useAppContext();
  
  const pendingTasks = tasks.filter(t => {
    if (t.completed) return false;
    if (searchQuery) {
      return t.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  }).slice(0, 3); // Show top 3 pending

  return (
    <div className={`rounded-[2.5rem] p-8 border shadow-premium h-full transition-colors flex flex-col ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
    }`}>
      <div className="flex items-center justify-between mb-8">
        <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Today's Focus</h3>
        <span className="text-[10px] font-black text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">
          {pendingTasks.length} Pending
        </span>
      </div>

      <div className="space-y-4">
        {pendingTasks.map((task) => (
          <div 
            key={task._id} 
            onClick={() => toggleTask(task._id)}
            className={`flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer group ${
              isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
            }`}
          >
            <div className={`mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
              isDarkMode ? 'border-slate-700' : 'border-slate-200'
            } group-hover:border-brand/40`}>
              <div className="w-2.5 h-2.5 bg-brand rounded-sm scale-0 group-hover:scale-100 transition-transform"></div>
            </div>
            <div>
              <p className={`text-sm font-bold leading-snug ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{task.title}</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight mt-1">{task.time}</p>
            </div>
          </div>
        ))}

        {pendingTasks.length === 0 && (
          <div className={`py-8 text-center rounded-3xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
            <p className="text-xs font-bold text-slate-500">All caught up!</p>
          </div>
        )}
      </div>

      <button onClick={() => setActiveTab('Daily Tasks')} className={`w-full mt-auto py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all ${
        isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
      }`}>
        View All Tasks
      </button>
    </div>
  );
};

export default TodaysTasks;

