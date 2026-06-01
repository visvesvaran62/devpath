import React from 'react';
import { Search, Bell, MessageSquare, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 bg-[#f8faff]/80 backdrop-blur-md fixed top-0 right-0 left-64 z-10 px-8 flex items-center justify-between transition-all">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search your learning path..." 
            className="w-full bg-slate-100/50 border border-transparent focus:border-indigo-100 focus:bg-white px-10 py-3 rounded-2xl outline-none transition-all placeholder:text-slate-400 text-sm font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-500 hover:text-brand transition-colors relative">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
        </button>
        <button className="text-slate-500 hover:text-brand transition-colors">
          <MessageSquare size={22} />
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
            <UserCircle size={32} className="text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
