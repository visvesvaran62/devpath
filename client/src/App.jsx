import React, { useState } from 'react';
import MentorChat from './components/MentorChat';
import DashboardPage from './pages/Dashboard';
import GoalsPage from './pages/Goals';
import TasksPage from './pages/Tasks';
import SettingsPage from './pages/Settings';
import Auth from './pages/Auth';
import { useAppContext } from './context/AppContext';

const ProfilePage = () => {
  const { user, badges, isDarkMode } = useAppContext();
  if (!user) return null;
  const githubUrl = user.github || 'https://github.com/';
  const linkedinUrl = user.linkedin || 'https://www.linkedin.com/';
  return (
    <div className="p-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Profile Header section */}
      <section className="mb-12">
        <h2 className={`text-6xl font-black tracking-tight leading-tight mb-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
          Your Path,<br />
          <span className="text-brand">Perfected.</span>
        </h2>
        <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
          Continuous learning is the core of mastery. You're currently tracking in the top 5% of experts this month.
        </p>
      </section>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 bg-white/60 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] p-10 flex gap-8 items-center shadow-premium relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
          
          <div className="relative">
            <div className="w-40 h-40 rounded-[2rem] overflow-hidden ring-4 ring-white shadow-2xl relative">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-brand text-white rounded-full flex items-center justify-center border-2 border-white">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 1.414z" /></svg>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="mb-6">
              <h3 className={`text-3xl font-black mb-1 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{user.name}</h3>
              <p className="text-brand font-bold">{user.role}</p>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed mb-8 max-w-md">
              {user.bio || 'Passionate learner exploring the frontiers of technology with DevPath AI.'}
            </p>
            <div className="flex items-center gap-6">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest">
                <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                </div>
                Github
              </a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors uppercase tracking-widest">
                <div className="w-5 h-5 bg-slate-100 rounded flex items-center justify-center">
                   <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </div>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <div className="bg-brand rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-xl shadow-brand/20">
            <p className="text-3xl font-black mb-1 leading-none">{user.streak}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Day Streak</p>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-premium flex-1 flex flex-col">
             <div className="flex justify-between items-center mb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Unlocked Badges</p>
                <span className="text-brand text-[10px] font-black uppercase tracking-widest">{badges?.length || 1} Total</span>
             </div>
             <div className="flex flex-wrap gap-4 flex-1 items-start">
               {badges.map((badge) => (
                 <div key={badge.id} className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl shadow-inner border border-slate-100 group relative hover:scale-110 transition-transform">
                   {badge.icon}
                   <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-slate-900/90 backdrop-blur-md text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none z-20">
                     <p className="text-[9px] font-black uppercase tracking-widest text-brand-light mb-0.5">{badge.name}</p>
                     <p className="text-[10px] font-medium opacity-80">{badge.description}</p>
                   </div>
                 </div>
               ))}
               <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { isAuthenticated, logout, searchQuery, setSearchQuery, user, activeTab, setActiveTab, notifications, clearNotifications, deleteNotification, isDarkMode } = useAppContext();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  if (!isAuthenticated) {
    return <Auth />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <DashboardPage />;
      case 'Goals': return <GoalsPage />;
      case 'Daily Tasks': return <TasksPage />;
      case 'AI Mentor': return <MentorChat />;
      case 'Profile': return <ProfilePage />;
      case 'Settings': return <SettingsPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#f8faff] text-[#1e293b]'} font-sans selection:bg-brand/10`}>
      {/* Sidebar */}
      <aside className={`w-64 border-r flex flex-col fixed inset-y-0 left-0 z-50 transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        <div className="p-8">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">DevPath AI</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Personalized Learning</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { name: 'Dashboard', icon: 'M4 6h16M4 12h16M4 18h16' },
              { name: 'Goals', icon: 'M9 19V5l12 7-12 7z' },
              { name: 'Daily Tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
              { name: 'AI Mentor', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 1 1 -4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { name: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
              { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                  activeTab === item.name 
                    ? (isDarkMode ? 'bg-brand/20 text-brand-light' : 'bg-brand/10 text-brand') 
                    : (isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800')
                }`}
              >
                <svg className={`w-5 h-5 ${activeTab === item.name ? (isDarkMode ? 'text-brand-light' : 'text-brand') : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-brand/5'} rounded-2xl p-6 relative overflow-hidden group`}>
            <div className={`absolute -top-4 -right-4 w-20 h-20 ${isDarkMode ? 'bg-brand/5' : 'bg-brand/10'} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
            <p className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-brand-light' : 'text-brand'} mb-2`}>Pro Member</p>
            <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-brand/80'} leading-relaxed mb-4`}>Accelerate your path with advanced AI insights.</p>
            <div className={`h-1 ${isDarkMode ? 'bg-slate-700' : 'bg-brand/10'} rounded-full overflow-hidden`}>
              <div className="h-full bg-brand w-3/4 rounded-full"></div>
            </div>
          </div>

          <button 
            onClick={logout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border border-transparent ${
              isDarkMode ? 'text-slate-400 hover:bg-rose-500/10 hover:text-rose-400' : 'text-slate-500 hover:bg-rose-50 hover:text-rose-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className={`h-20 backdrop-blur-md sticky top-0 z-40 border-b px-8 flex items-center justify-between shrink-0 transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-100'}`}>
          <div className="relative w-96 group">
            <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-brand-light' : 'text-slate-400 group-focus-within:text-brand'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search in DevPath..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border-none rounded-xl py-2.5 pl-12 pr-4 text-sm font-medium transition-all focus:ring-2 ${
                isDarkMode 
                  ? 'bg-slate-800 text-slate-200 placeholder:text-slate-500 focus:ring-brand/30' 
                  : 'bg-slate-100 text-slate-800 placeholder:text-slate-400 focus:ring-brand/20'
              }`}
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`relative transition-colors ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                )}
              </button>

              {notificationsOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setNotificationsOpen(false)}></div>
                  <div className={`absolute right-0 mt-4 w-80 rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300 border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
                  }`}>
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                      <h4 className="font-bold text-sm">Notifications</h4>
                      <button onClick={clearNotifications} className="text-[10px] font-bold text-brand uppercase tracking-widest hover:text-brand/80">Mark all read</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(n => (
                          <div key={n.id} className={`p-4 border-b last:border-0 hover:bg-slate-50 transition-colors group/notif ${n.unread ? (isDarkMode ? 'bg-brand/20' : 'bg-brand/5') : ''}`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className={`text-[9px] font-black uppercase tracking-widest ${isDarkMode ? 'text-brand-light' : 'text-brand'}`}>{n.type}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-slate-400">{n.time}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                                  className="opacity-0 group-hover/notif:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-all"
                                >
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <h5 className={`text-xs font-bold mb-0.5 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{n.title}</h5>
                            <p className={`text-[11px] leading-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{n.message}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-12 text-center space-y-3">
                          <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center ${isDarkMode ? 'bg-slate-700 text-slate-500' : 'bg-slate-50 text-slate-300'}`}>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inbox Zero</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm cursor-pointer hover:ring-brand/50 transition-all group relative" onClick={() => setActiveTab('Profile')}>
              <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
              <button 
                onClick={(e) => { e.stopPropagation(); logout(); }}
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-2 border-white"
              >
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          </div>
        </header>

        {/* View Switcher */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      <style>{`
        .animate-in {
          animation-duration: 0.5s;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          animation-fill-mode: both;
        }
        .fade-in {
          animation-name: fade-in;
        }
        .slide-in-from-bottom-4 {
          animation-name: slide-in-from-bottom;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom {
          from { transform: translateY(1rem); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
