import React from 'react';
import PathProgress from '../components/PathProgress';
import TodaysTasks from '../components/TodaysTasks';
import LearningMomentum from '../components/LearningMomentum';
import CuratedPath from '../components/CuratedPath';
import Leaderboard from '../components/Leaderboard';
import { useAppContext } from '../context/AppContext';

const icons = {
  PlayCircle: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  MessageSquarePlus: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  )
};

const Dashboard = () => {
  const { user, tasks, isDarkMode, badges, setActiveTab, addGlobalNote, deleteGlobalNote, globalNotes } = useAppContext();
  if (!user) return null;
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className={`animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20`}>
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="max-w-2xl">
          <h2 className={`text-4xl font-black tracking-tight mb-2 flex items-center gap-3 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
            Welcome back, {(user?.name || 'User').split(' ')[0]} <span className="animate-bounce">Hi</span>
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Your daily curriculum is ready. You're {progressPercent}% closer to your Goal: 
            <span className="text-brand font-bold ml-1 cursor-pointer hover:underline underline-offset-4 decoration-2">
              {user.role}
            </span>.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setActiveTab('AI Mentor')} className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-md active:scale-95 transition-all ${
            isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}>
            <icons.MessageSquarePlus />
            Ask Global Mentor
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-stretch">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="flex-1">
            <PathProgress />
          </div>
          <div className="flex-1">
            <LearningMomentum />
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="flex-initial">
            <TodaysTasks />
          </div>
          
          {/* Badges Preview */}
          <div className={`rounded-[2.5rem] p-8 border shadow-premium transition-colors flex flex-col flex-1 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Achievements</h3>
              <span className="text-[10px] font-black text-brand uppercase tracking-widest bg-brand/10 px-3 py-1 rounded-full">{badges?.length || 1} Unlocked</span>
            </div>
            <div className="flex flex-wrap gap-4 overflow-y-auto pr-2">
              {(badges || [{id: 1, icon: 'T1'}]).map((badge, i) => (
                <div key={i} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-xl shadow-inner border border-slate-100 group relative">
                  {badge.icon}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {badge.name || "Mastery Badge"}
                  </div>
                </div>
              ))}
              <div className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" /></svg>
              </div>
            </div>
          </div>

          <div className={`rounded-[2.5rem] p-8 border shadow-premium transition-colors flex flex-col flex-1 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="flex justify-between items-center mb-6 shrink-0">
              <h3 className={`text-lg font-black tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>Quick Notes</h3>
            </div>
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="relative">
                <textarea 
                  placeholder="Jot down a quick thought..."
                  className={`w-full rounded-2xl p-4 text-sm font-medium border-none focus:ring-2 transition-all resize-none ${
                    isDarkMode ? 'bg-slate-800 text-slate-200 focus:ring-brand/30' : 'bg-slate-50 text-slate-800 focus:ring-brand/20'
                  }`}
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (e.target.value.trim()) {
                        addGlobalNote(e.target.value.trim());
                        e.target.value = '';
                      }
                    }
                  }}
                />
              </div>
              <div className="space-y-3 overflow-y-auto max-h-48 pr-2 custom-scrollbar">
                {globalNotes.map((note) => (
                  <div key={note.id} className={`p-4 rounded-xl group relative border transition-all ${
                    isDarkMode ? 'bg-slate-800/40 border-slate-700 hover:border-brand/40' : 'bg-slate-50 border-slate-100 hover:border-indigo-200'
                  }`}>
                    <p className={`text-xs font-medium leading-relaxed pr-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {note.content}
                    </p>
                    <button 
                      onClick={() => deleteGlobalNote(note.id)}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Leaderboard compact={true} hFull={true} />
          </div>
        </div>
      </div>

      {/* Curated Feed */}
      <CuratedPath />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Dashboard;

