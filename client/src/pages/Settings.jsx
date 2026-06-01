import React from 'react';
import { useAppContext } from '../context/AppContext';

const Settings = () => {
  const { user, isDarkMode, toggleDarkMode, emailNotificationsEnabled, toggleEmailNotifications, updateProfile, logout } = useAppContext();
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    role: user?.role || '',
    bio: user?.bio || '',
    avatarSeed: user?.avatarSeed || user?.name || '',
    github: user?.github || '',
    linkedin: user?.linkedin || ''
  });

  const handleSave = () => {
    updateProfile(formData);
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className="flex justify-between items-end">
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-brand uppercase tracking-[0.2em]">User Preferences</p>
          <h1 className="text-4xl font-extrabold transition-colors tracking-tight">Settings</h1>
          <p className="text-slate-500 font-medium">Customize your learning experience and profile details.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-brand text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-brand/20 hover:scale-105 active:scale-95"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Settings */}
        <div className={`rounded-[2.5rem] p-10 border shadow-premium transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-brand/20 text-brand-light' : 'bg-indigo-50 text-indigo-600'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            Profile Information
          </h3>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full border-none rounded-2xl p-4 text-sm font-bold transition-all focus:ring-2 ${
                  isDarkMode ? 'bg-slate-800 text-slate-200 focus:ring-brand/30' : 'bg-slate-50 text-slate-700 focus:ring-brand/20'
                }`}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Target Role</label>
              <input 
                type="text" 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className={`w-full border-none rounded-2xl p-4 text-sm font-bold transition-all focus:ring-2 ${
                  isDarkMode ? 'bg-slate-800 text-slate-200 focus:ring-brand/30' : 'bg-slate-50 text-slate-700 focus:ring-brand/20'
                }`}
              />
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Professional Bio</label>
            <textarea 
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              rows={3}
              className={`w-full border-none rounded-2xl p-4 text-sm font-bold transition-all focus:ring-2 resize-none ${
                isDarkMode ? 'bg-slate-800 text-slate-200 focus:ring-brand/30' : 'bg-slate-50 text-slate-700 focus:ring-brand/20'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Avatar Seed (DiceBear)</label>
              <input 
                type="text" 
                value={formData.avatarSeed}
                onChange={(e) => setFormData({...formData, avatarSeed: e.target.value})}
                className={`w-full border-none rounded-2xl p-4 text-sm font-bold transition-all focus:ring-2 ${
                  isDarkMode ? 'bg-slate-800 text-slate-200 focus:ring-brand/30' : 'bg-slate-50 text-slate-700 focus:ring-brand/20'
                }`}
              />
            </div>
            <div className="space-y-3 flex items-end">
               <div className="flex items-center gap-4 p-2">
                 <div className="w-12 h-12 rounded-xl overflow-hidden ring-2 ring-brand-light">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.avatarSeed}`} alt="Preview" />
                 </div>
                 <p className="text-[10px] font-black text-brand uppercase tracking-widest leading-tight">Avatar<br/>Preview</p>
               </div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className={`rounded-[2.5rem] p-10 border shadow-premium transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-brand/20 text-brand-light' : 'bg-brand/5 text-brand'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            Learning Preferences
          </h3>
          
          <div className="space-y-6">
            <div className={`flex items-center justify-between p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
              <div>
                <p className="text-sm font-bold">Email Notifications</p>
                <p className="text-xs font-medium text-slate-400">Get daily reminders and AI insights via email.</p>
              </div>
              <button onClick={toggleEmailNotifications} className={`w-12 h-6 rounded-full relative transition-colors ${emailNotificationsEnabled ? 'bg-brand' : 'bg-slate-500'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${emailNotificationsEnabled ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
            
            <div className={`flex items-center justify-between p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
              <div>
                <p className="text-sm font-bold">Dark Mode</p>
                <p className="text-xs font-medium text-slate-400">Switch between light and dark themes.</p>
              </div>
              <button 
                onClick={toggleDarkMode}
                className={`w-12 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-brand' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className={`rounded-[2.5rem] p-10 border shadow-sm transition-colors ${isDarkMode ? 'bg-rose-950/20 border-rose-900/30' : 'bg-rose-50/50 border-rose-100'}`}>
          <h3 className="text-xl font-bold text-rose-800 mb-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            Account Actions
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm font-medium text-rose-600 max-w-md text-center md:text-left">
              Signing out will end your current session. You will need to log back in to access your roadmaps.
            </p>
            <button 
              onClick={logout}
              className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-rose-200 hover:bg-rose-700 hover:-translate-y-0.5 active:scale-95 transition-all w-full md:w-auto"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
