import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Map, 
  CheckSquare, 
  Cpu, 
  Users, 
  UserCircle, 
  Settings 
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Target, label: 'Goals', path: '/goals' },
  { icon: CheckSquare, label: 'Daily Tasks', path: '/tasks' },
  { icon: Cpu, label: 'AI Mentor', path: '/mentor' },
];

const bottomItems = [
  { icon: UserCircle, label: 'Profile' },
  { icon: Settings, label: 'Settings' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 mb-4">
        <h1 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Map size={20} />
          </div>
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent transition-all duration-300">
            DevPath AI
          </span>
        </h1>
        <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">
          Personalized Learning
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-semibold'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-indigo-600' : 'group-hover:text-slate-900'} />
                <span className="text-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* PRO MEMBER Promo Card */}
      <div className="px-4 mb-4">
        <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100 flex flex-col gap-3 group hover:bg-indigo-50 transition-all duration-300">
          <div className="space-y-1">
            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none">Pro Member</h4>
            <p className="text-[11px] font-bold text-slate-500 leading-tight">Accelerate your path with advanced AI insights.</p>
          </div>
          <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-600 rounded-full w-[42%] shadow-[0_0_8px_rgba(79,70,229,0.4)]"></div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-1">
        {[
          { icon: UserCircle, label: 'Profile', path: '/profile' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ].map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => `
              w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-semibold'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} className={isActive ? 'text-indigo-600' : 'group-hover:text-slate-900'} />
                <span className="text-sm">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
