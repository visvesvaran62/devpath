import React from 'react';
import { useAppContext } from '../context/AppContext';

const icons = {
  CheckCircle2: () => (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  FileText: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  PlayCircle: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
    </svg>
  ),
  RotateCcw: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  Trash2: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
  )
};

const RoadmapView = ({ onReset }) => {
  const { currentPath, roadmapSteps, completeRoadmapStep, addRoadmapStep, deleteRoadmapStep, addTaskFromRoadmap, isDarkMode, searchQuery } = useAppContext();
  const [isAdding, setIsAdding] = React.useState(false);
  const [newStep, setNewStep] = React.useState({ title: '', description: '', notes: '' });
  const [selectedResource, setSelectedResource] = React.useState(null);
  
  const completedSteps = roadmapSteps.filter(s => s.completed).length;
  const totalSteps = roadmapSteps.length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const ResourceModal = ({ resource, onClose }) => {
    if (!resource) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={onClose}></div>
        <div className={`relative w-full max-w-lg rounded-[2.5rem] border shadow-2xl p-10 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-white'
        }`}>
          <div className="flex justify-between items-start mb-8">
            <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center">
              <icons.FileText />
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <h3 className={`text-2xl font-black mb-4 tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
            {resource.label}
          </h3>
          <p className="text-sm font-bold text-brand uppercase tracking-widest mb-6">Internal Resource Preview</p>
          
          <div className={`p-6 rounded-2xl border mb-8 ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
            <p className={`text-sm leading-relaxed font-medium mb-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              This module covers the core concepts of <span className="text-brand font-bold">{resource.label}</span>. 
              In our AI-curated simulation, this involves hands-on practice with semantic tags, 
              modern layout engines, and standard-compliant syntax patterns. 
            </p>
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand mb-2">Key Takeaways</p>
              {['Core Architecture Principles', 'Industry Best Practices', 'Performance Optimization'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                   <p className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <a 
              href={resource.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-brand text-white py-4 rounded-xl font-bold text-center hover:bg-brand/90 transition-all shadow-lg shadow-brand/20"
            >
              Open External Source
            </a>
            <button 
              onClick={onClose}
              className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Back to Roadmap
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Roadmap Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-brand uppercase tracking-[0.2em]">
              Your Intelligent Path
            </p>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {currentPath.title}
            </h1>
          </div>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
            Your journey is curated by AI based on your career goals. You can <span className="text-brand font-bold">customize</span> your path by adding or removing nodes.
          </p>
        </div>
        
        {onReset && (
          <button 
            onClick={onReset}
            className="px-6 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 group"
          >
            <icons.RotateCcw />
            Rebuild Path
          </button>
        )}
      </div>

      <div className="bg-[#f0f4ff]/50 rounded-3xl p-8 border border-white/40 shadow-sm relative overflow-hidden backdrop-blur-sm">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-brand uppercase tracking-wider">
              Course Progress
            </p>
            <h2 className="text-4xl font-black text-slate-900">{progressPercent}%</h2>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
            {completedSteps} OF {totalSteps} STEPS COMPLETED
          </p>
        </div>
        
        <div className="h-3 w-full bg-slate-200/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-brand rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(79,70,229,0.4)]"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="relative pl-8 md:pl-0">
        <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-slate-200/60 rounded-full md:left-4"></div>
        
        <div className="space-y-12 ml-4">
          {roadmapSteps
            .filter(step => 
              step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              step.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((step) => (
            <div key={step.id} className="relative">
              <div className="absolute -left-12 top-0 mt-6 z-10 flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full border-4 border-[#f8faff] flex items-center justify-center shadow-sm transition-colors duration-300 ${
                  step.completed ? 'bg-brand text-white' : 'bg-white text-slate-300'
                }`}>
                  {step.completed ? (
                    <icons.Check />
                  ) : <div className="w-2.5 h-2.5 bg-slate-200 rounded-full" />}
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100/50 hover:shadow-premium transition-all duration-300 md:ml-4 group">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
                        {step.title}
                      </h3>
                      <span className={`flex items-center gap-1 ${step.completed ? 'bg-emerald-50 text-emerald-600' : 'bg-brand/5 text-brand'} px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border border-current/10`}>
                        {step.status}
                      </span>
                    </div>
                    
                    <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                      {step.description}
                    </p>

                    {step.notes && (
                      <div className={`p-4 rounded-xl text-xs font-medium border ${isDarkMode ? 'bg-brand/10 border-brand/20 text-slate-300' : 'bg-brand/5 border-brand/10 text-slate-600'}`}>
                        <p className="text-[9px] font-black uppercase tracking-widest text-brand mb-1">Your Notes</p>
                        {step.notes}
                      </div>
                    )}

                    <div className="space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100/50">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-1">
                          Core Resources
                        </p>
                        {!step.completed && (
                          <div className="flex gap-3 items-center">
                            <button 
                              onClick={() => completeRoadmapStep(step.id)}
                              className="text-[10px] font-black text-brand uppercase tracking-widest hover:text-brand/80 transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-brand/5 rounded-lg border border-brand/10 group/btn"
                            >
                              Mark as Complete
                              <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => deleteRoadmapStep(step.id)}
                              className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 rounded-lg hover:bg-rose-50"
                              title="Remove Node"
                            >
                              <icons.Trash2 />
                            </button>
                            <button 
                              onClick={() => addTaskFromRoadmap(step)}
                              className="text-indigo-600 hover:text-indigo-700 transition-colors p-1.5 rounded-lg hover:bg-indigo-50 border border-indigo-100 flex items-center gap-1 text-[9px] font-black uppercase tracking-widest"
                              title="Add to Daily Tasks"
                            >
                              <icons.Plus className="w-3 h-3" />
                              Task
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3">
                        {step.resources.map((resource, i) => (
                          <button 
                            key={i} 
                            onClick={() => setSelectedResource(resource)}
                            className="flex items-center gap-3 text-[13px] font-semibold text-slate-600 hover:text-brand transition-colors group/link text-left"
                          >
                            <div className="text-brand">
                              <icons.FileText />
                            </div>
                            {resource.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-[280px] aspect-video bg-slate-800 rounded-2xl flex items-center justify-center p-8 relative overflow-hidden group-hover:bg-slate-700 transition-colors duration-500 shadow-2xl shadow-slate-900/20">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
                    </div>
                    
                    <div className="relative flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-slate-700/50 backdrop-blur-sm flex items-center justify-center border-4 border-slate-600/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <span className="text-white text-2xl font-black tracking-tighter uppercase">
                           {step.icon}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Step Logic */}
          <div className="pt-8">
            {!isAdding ? (
              <button 
                onClick={() => setIsAdding(true)}
                className={`w-full py-8 border-2 border-dashed rounded-[2.5rem] transition-all flex flex-col items-center justify-center gap-3 group ${
                  isDarkMode ? 'border-slate-800 hover:border-brand/50 bg-slate-900/30' : 'border-slate-200 hover:border-brand/30 bg-slate-50/50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
                  <icons.Plus />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-brand transition-colors">Add Custom Landmark</p>
              </button>
            ) : (
              <div className={`p-8 rounded-[2.5rem] border-2 border-brand shadow-premium animate-in fade-in slide-in-from-bottom-2 duration-300 relative ${
                isDarkMode ? 'bg-slate-900' : 'bg-white'
              }`}>
                <h3 className="text-xl font-black text-slate-800 mb-6 tracking-tight">New Roadmap Milestone</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                    <input 
                      type="text"
                      autoFocus
                      placeholder="e.g., Advanced Micro-Frontends"
                      value={newStep.title}
                      onChange={(e) => setNewStep({...newStep, title: e.target.value})}
                      className={`w-full border-none rounded-2xl px-6 py-4 text-sm font-bold transition-all focus:ring-2 ${
                        isDarkMode ? 'bg-slate-800 text-slate-100 focus:ring-brand/30' : 'bg-slate-50 text-slate-800 focus:ring-brand/20'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                    <textarea 
                      placeholder="What will you learn in this module?"
                      value={newStep.description}
                      onChange={(e) => setNewStep({...newStep, description: e.target.value})}
                      rows={2}
                      className={`w-full border-none rounded-2xl px-6 py-4 text-sm font-bold transition-all focus:ring-2 resize-none ${
                        isDarkMode ? 'bg-slate-800 text-slate-100 focus:ring-brand/30' : 'bg-slate-50 text-slate-800 focus:ring-brand/20'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Learning Notes (Optional)</label>
                    <textarea 
                      placeholder="Any extra thoughts or specific things to focus on?"
                      value={newStep.notes}
                      onChange={(e) => setNewStep({...newStep, notes: e.target.value})}
                      rows={2}
                      className={`w-full border-none rounded-2xl px-6 py-4 text-sm font-bold transition-all focus:ring-2 resize-none ${
                        isDarkMode ? 'bg-slate-800 text-slate-100 focus:ring-brand/30' : 'bg-slate-50 text-slate-800 focus:ring-brand/20'
                      }`}
                    />
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => {
                        if (newStep.title && newStep.description) {
                          addRoadmapStep(newStep);
                          setNewStep({ title: '', description: '', notes: '' });
                          setIsAdding(false);
                        }
                      }}
                      className="bg-brand text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-brand/20 hover:scale-105 transition-all"
                    >
                      Confirm Node
                    </button>
                    <button 
                      onClick={() => setIsAdding(false)}
                      className="bg-transparent text-slate-400 hover:text-slate-600 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ResourceModal 
        resource={selectedResource} 
        onClose={() => setSelectedResource(null)} 
      />
    </div>
  );
};

export default RoadmapView;
