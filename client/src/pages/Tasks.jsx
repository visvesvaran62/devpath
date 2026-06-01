import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const icons = {
  Plus: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Clock: () => (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  BrainCircuit: () => (
    <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 1 1 -4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
};

const Tasks = () => {
  const { tasks, toggleTask, deleteTask, addTask, aiInsights, currentPath, searchQuery, isDarkMode, user, generateAITasks } = useAppContext();
  const [filter, setFilter] = useState('All');
  const [isAdding, setIsAdding] = useState(false);
  const [isAISuggesting, setIsAISuggesting] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    difficulty: 'BEGINNER',
    time: '1h'
  });

  const handleAISuggest = async () => {
    setIsAISuggesting(true);
    await generateAITasks();
    setIsAISuggesting(false);
  };

  const handleAddTask = (e) => {
    if (e) e.preventDefault();
    if (!taskForm.title.trim()) return;
    
    addTask({ 
      title: taskForm.title, 
      description: taskForm.description || "Newly added task.", 
      difficulty: taskForm.difficulty,
      time: taskForm.time 
    });
    
    setTaskForm({
      title: '',
      description: '',
      difficulty: 'BEGINNER',
      time: '1h'
    });
    setIsAdding(false);
  };

  const filteredTasks = tasks.filter(task => {
    // Priority 1: Search Query
    if (searchQuery) {
      const match = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    task.description.toLowerCase().includes(searchQuery.toLowerCase());
      if (!match) return false;
    }

    // Priority 2: Status Tab
    if (filter === 'Pending') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const insight = aiInsights && aiInsights.length > 0 
    ? aiInsights[(completedCount + totalCount) % aiInsights.length]
    : "Stay focused and keep building!";

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-brand uppercase tracking-[0.2em]">
            Your Intelligent Curator
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Daily Tasks
          </h1>
          <p className="text-slate-500 font-medium max-w-lg">
            Focus on these curated milestones to stay on track with your <span className="text-brand font-bold">{currentPath.title}</span> path.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          {/* AI Suggest Tasks Button */}
          <button
            id="ai-suggest-tasks-btn"
            onClick={handleAISuggest}
            disabled={isAISuggesting}
            className={`px-6 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95 border w-full sm:w-auto justify-center
              ${isAISuggesting
                ? 'opacity-60 cursor-not-allowed bg-purple-50 border-purple-200 text-purple-400'
                : (isDarkMode
                    ? 'bg-slate-800 border-slate-700 text-purple-400 hover:bg-purple-900/30 hover:border-purple-600'
                    : 'bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-100 hover:border-purple-300 shadow-sm')}
            `}
          >
            {isAISuggesting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <icons.Sparkles />
                AI Suggest Tasks
              </>
            )}
          </button>

          {!isAdding ? (
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-brand text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-brand/90 transition-all shadow-xl shadow-brand/20 active:scale-95 group w-full sm:w-auto justify-center"
            >
              <icons.Plus />
              Add New Milestone
            </button>
          ) : (
            <div className={`p-6 rounded-[2rem] border shadow-xl w-full md:w-[400px] animate-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-slate-950/50' : 'bg-white border-indigo-100 shadow-indigo-100/50'}`}>
              <form onSubmit={handleAddTask} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Task Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Master Flexbox" 
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                    autoFocus
                    className={`w-full border-none rounded-xl px-4 py-3 text-sm font-bold transition-all focus:ring-2 ${isDarkMode ? 'bg-slate-800 text-slate-200 focus:ring-brand/30' : 'bg-slate-50 text-slate-700 focus:ring-brand/20'}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    placeholder="What needs to be done?" 
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                    className={`w-full border-none rounded-xl px-4 py-3 text-sm font-medium transition-all focus:ring-2 min-h-[80px] ${isDarkMode ? 'bg-slate-800 text-slate-400 focus:ring-brand/30' : 'bg-slate-50 text-slate-600 focus:ring-brand/20'}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Difficulty</label>
                    <select 
                      value={taskForm.difficulty}
                      onChange={(e) => setTaskForm({...taskForm, difficulty: e.target.value})}
                      className={`w-full border-none rounded-xl px-4 py-3 text-sm font-bold transition-all focus:ring-2 appearance-none ${isDarkMode ? 'bg-slate-800 text-slate-200 focus:ring-brand/30' : 'bg-slate-50 text-slate-700 focus:ring-brand/20'}`}
                    >
                      <option value="BEGINNER">Beginner</option>
                      <option value="INTERMEDIATE">Intermediate</option>
                      <option value="ADVANCED">Advanced</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Est. Time</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2h" 
                      value={taskForm.time}
                      onChange={(e) => setTaskForm({...taskForm, time: e.target.value})}
                      className={`w-full border-none rounded-xl px-4 py-3 text-sm font-bold transition-all focus:ring-2 ${isDarkMode ? 'bg-slate-800 text-slate-200 focus:ring-brand/30' : 'bg-slate-50 text-slate-700 focus:ring-brand/20'}`}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] bg-brand text-white px-4 py-3 rounded-xl font-bold text-sm hover:bg-brand/90 transition-all shadow-lg shadow-brand/10"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Completion Rate */}
        <div className={`rounded-[2rem] p-8 border shadow-sm relative overflow-hidden group transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-brand/40' : 'bg-white border-slate-100 hover:border-indigo-100'}`}>
          <div className="space-y-4">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Completion Rate
            </p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-4xl font-black">{completionRate}%</h2>
              <span className="text-emerald-500 font-bold text-sm flex items-center">
                {completionRate > 50 ? 'Up Normal' : 'Down Low'}
              </span>
            </div>
            <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
               <div className="h-full bg-brand rounded-full transition-all duration-700" style={{ width: `${completionRate}%` }}></div>
            </div>
          </div>
        </div>

        {/* Day Streak */}
        <div className={`rounded-[2rem] p-8 border shadow-sm flex items-center gap-6 group transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800 hover:border-brand/40' : 'bg-white border-slate-100 hover:border-blue-100'}`}>
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-brand/10 text-brand-light' : 'bg-blue-50 text-blue-600'}`}>
            <icons.Zap />
          </div>
          <div>
            <h3 className="text-4xl font-black">{user?.streak || 0}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Day Streak</p>
          </div>
        </div>

        {/* AI Suggestion Card */}
        <div className="bg-brand rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-brand/10">
          <div className="absolute -right-4 -bottom-4 text-white/10 group-hover:rotate-45 transition-transform duration-1000">
            <icons.BrainCircuit />
          </div>
          
          <div className="relative space-y-2">
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">AI Suggestion</p>
            <p className="text-lg font-bold leading-tight">
              {insight}
            </p>
          </div>
        </div>
      </div>

      
      <div className={`flex items-center gap-2 p-1.5 rounded-2xl w-fit border transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50/50 border-slate-100/50'}`}>
        {['All', 'Pending', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === tab 
                ? (isDarkMode ? 'bg-slate-800 text-brand-light border border-slate-700 shadow-lg shadow-black/20' : 'bg-white text-indigo-600 shadow-sm border border-indigo-50') 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div 
            key={task._id} 
            className={`
              relative p-7 rounded-[2rem] border transition-all duration-300 group
              ${task.recommended ? (isDarkMode ? 'border-brand/60 shadow-2xl shadow-brand/10' : 'border-brand/40 shadow-premium') : (isDarkMode ? 'border-slate-800 shadow-sm hover:border-brand/30' : 'border-slate-100 shadow-sm hover:border-indigo-100 hover:shadow-md')}
              ${task.completed ? 'opacity-70 grayscale-[0.2]' : ''}
              ${isDarkMode ? (task.completed ? 'bg-slate-900/40' : 'bg-slate-900') : (task.completed ? 'bg-slate-50/30' : 'bg-white')}
            `}
          >
            {/* Special border for recommended tasks */}
            {task.recommended && (
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-brand to-brand/30 rounded-l-[2rem]"></div>
            )}

            <div className="flex items-start gap-6">
              {/* Checkbox */}
              <div 
                onClick={() => toggleTask(task._id)}
                className={`
                mt-1.5 w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer
                ${task.completed 
                  ? 'bg-brand border-brand text-white shadow-md shadow-brand/20' 
                  : (isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 group-hover:border-brand/40')}
              `}>
                {task.completed && <icons.Check />}
              </div>

              {/* Task Details */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <h4 className={`text-xl font-bold tracking-tight transition-all ${task.completed ? 'text-slate-500 line-through' : (isDarkMode ? 'text-slate-100' : 'text-slate-800')}`}>
                    {task.title}
                  </h4>
                  {task.recommended && (
                    <div className="text-brand">
                      <icons.Sparkles />
                    </div>
                  )}
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${task.difficultyColor}`}>
                    {task.difficulty}
                  </span>
                </div>
                <p className={`font-medium max-w-2xl leading-relaxed ${task.completed ? 'text-slate-600' : (isDarkMode ? 'text-slate-400' : 'text-slate-500')}`}>
                  {task.description}
                </p>
              </div>

              {/* Time Indicator */}
              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest pt-1.5">
                  {task.completed ? <div className="text-emerald-500"><icons.Check /></div> : <icons.Clock />}
                  <span className={task.completed ? 'text-emerald-500' : ''}>{task.time}</span>
                </div>
                <button 
                  onClick={() => deleteTask(task._id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-rose-500 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${isDarkMode ? 'bg-slate-900 text-slate-700' : 'bg-slate-50 text-slate-300'}`}>
               <icons.Check />
            </div>
            <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">No tasks found matching your filters</p>
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <p className="text-center text-slate-500 font-bold text-[10px] uppercase tracking-widest pt-10 opacity-40">
        (c) 2026 DevPath AI - Keep building, one task at a time.
      </p>
    </div>
  );
};

export default Tasks;

