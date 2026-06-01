import React from 'react';
import { useAppContext } from '../context/AppContext';

const Leaderboard = ({ compact = false, hFull = false }) => {
  const { leaderboard, user, isDarkMode } = useAppContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  if (!user) return null;

  // Mix in the current user into the leaderboard for demonstration
  const displayList = [...leaderboard];
  const userInLeaderboard = displayList.find(u => u.name === user.name);
  
  if (!userInLeaderboard) {
    displayList.push({
      id: 'current-user',
      name: user.name,
      tasks: user.tasksDone || 0,
      points: (user.tasksDone || 0) * 50 + ((user.streak || 0) * 10),
      avatar: user.name.split(' ').map(n => n[0]).join(''),
      isCurrentUser: true
    });
  }

  // Sort by points
  const sortedList = displayList.sort((a, b) => b.points - a.points);

  // Filter by search term
  const filteredList = sortedList.filter(entry => 
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`rounded-[2.5rem] border shadow-premium overflow-hidden transition-colors flex flex-col ${
      hFull ? 'h-full' : ''
    } ${
      isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
    }`}>
      <div className="p-8 border-b border-slate-100/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
              Mastery Leaderboard
            </h3>
            {!compact && <p className="text-xs font-medium text-slate-500 mt-1">Top performers in the AI Path.</p>}
          </div>
          <div className="w-8 h-8 bg-brand/10 text-brand rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>

        {!compact && (
          <div className="relative group">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-brand transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Search mentees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-slate-50 border-none rounded-2xl py-3 pl-11 pr-11 text-xs font-bold focus:ring-2 transition-all ${
                isDarkMode ? 'bg-slate-800 text-slate-200 focus:ring-brand/30' : 'bg-slate-50 text-slate-700 focus:ring-brand/20'
              }`}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        {filteredList.length > 0 ? (
          filteredList.slice(0, compact ? 4 : 8).map((entry, index) => (
            <div 
              key={entry.id} 
              className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                entry.isCurrentUser 
                  ? (isDarkMode ? 'bg-brand/20 ring-1 ring-brand/30' : 'bg-brand/5 ring-1 ring-brand/10') 
                  : 'hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-6 text-xs font-black text-slate-400">#{index + 1}</div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ring-2 ring-white shadow-sm ${
                  index === 0 ? 'bg-amber-400 text-white' : 
                  index === 1 ? 'bg-slate-300 text-white' :
                  index === 2 ? 'bg-orange-400 text-white' :
                  (isDarkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500')
                }`}>
                  {entry.avatar}
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {entry.name} {entry.isCurrentUser && <span className="text-[10px] text-brand ml-1">(You)</span>}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{entry.tasks} Tasks Done</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${isDarkMode ? 'text-brand-light' : 'text-brand'}`}>{entry.points.toLocaleString()}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Points</p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center">
            <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4 ${isDarkMode ? 'bg-slate-800 text-slate-500' : 'bg-slate-50 text-slate-300'}`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No mentees found</p>
          </div>
        )}
      </div>

      {!compact && (
        <button className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-colors border-t border-slate-100/10 ${
          isDarkMode ? 'text-slate-500 hover:text-brand-light' : 'text-slate-400 hover:text-brand'
        }`}>
          View Full Rankings
        </button>
      )}
    </div>
  );
};

export default Leaderboard;
