import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import RoadmapView from '../components/RoadmapView';


const icons = {
  Monitor: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Cpu: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  Database: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  ),
  Layers: () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  ChevronRight: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  ),
  Server: () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16v4H4V6zm0 8h16v4H4v-4zm3-6h.01M7 16h.01"
    />
  </svg>
),
  Zap: () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Check: ({ className }) => (
    <svg className={className || "w-4 h-4"} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  )
};

const Goals = () => {
  const { generateRoadmap, PATHS_DATA, user, setUser, roadmapSteps } = useAppContext();
  
  // Step Management: 0 = Profile, 1 = Feature Selection, 2 = Generation, 3 = Roadmap
  const [currentStep, setCurrentStep] = useState(roadmapSteps.length > 0 ? 3 : 0);
  const [formData, setFormData] = useState({
    name: user.name || '',
    intent: 'frontend',
    proficiency: 'Intermediate'
  });
  
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const generationSteps = [
    "Analyzing market demand...",
    "Crawling skill requirements...",
    "Curating optimized roadmap...",
    "Applying learning psychology...",
    "Finalizing your path..."
  ];

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, name: formData.name }));
    // Reset selected features when intent or proficiency changes
    // Only pre-select features that match the chosen proficiency
    const relevantFeatures = PATHS_DATA[formData.intent].steps
      .filter(s => s.level === formData.proficiency)
      .map(s => s.id);
    setSelectedFeatures(relevantFeatures);
    setCurrentStep(1);
  };

  const toggleFeature = (featureId) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId) 
        : [...prev, featureId]
    );
  };

  const startGeneration = () => {
    if (selectedFeatures.length === 0) return;
    
    setIsGenerating(true);
    setGenerationProgress(0);
    setCurrentStep(2);
    
    // Animate through steps
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= generationSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            generateRoadmap(formData.intent, formData.proficiency, selectedFeatures);
            setIsGenerating(false);
            setCurrentStep(3); // Move to Roadmap view
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 700);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white/60 backdrop-blur-2xl p-12 border border-slate-100 rounded-[3rem] shadow-premium relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
               
               <header className="mb-10 relative">
                 <p className="text-[10px] text-brand font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                   <icons.User /> Step 01: Defining Intent
                 </p>
                 <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-4 leading-tight">
                   Tell us about your <span className="italic text-brand font-serif font-medium">vision.</span>
                 </h2>
               </header>

               <form onSubmit={handleProfileSubmit} className="space-y-8 relative">
                 <div className="space-y-2">
                   <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1">Your Full Name</label>
                   <input 
                     type="text" 
                     required
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-brand/20 transition-all outline-none"
                     placeholder="Developer"
                   />
                 </div>

                 <div className="space-y-4">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1">Path of Mastery</label>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.keys(PATHS_DATA).map((id) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setFormData({...formData, intent: id})}
                          className={`p-6 rounded-2xl border-2 transition-all flex flex-col gap-3 group ${
                            formData.intent === id 
                              ? 'bg-brand/5 border-brand ring-4 ring-brand/5' 
                              : 'bg-white border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                            formData.intent === id ? 'bg-brand text-white' : 'bg-slate-50 text-slate-400 group-hover:scale-110'
                          }`}>
                            {id === 'frontend' && <icons.Monitor />}
                            {id === 'ai-ml' && <icons.Cpu />}
                            {id === 'backend' && <icons.Server />}
                            {id === 'fullstack' && <icons.Layers />}
                            {id==='database' && <icons.Database/> }
                          </div>
                          <span className={`text-xs font-black uppercase tracking-widest ${formData.intent === id ? 'text-brand' : 'text-slate-500'}`}>
                            {PATHS_DATA[id].title}
                          </span>
                        </button>
                      ))}
                    </div>
                 </div>

                 <div className="space-y-4 pt-4">
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1">Experience Level</label>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
                      {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setFormData({...formData, proficiency: level})}
                          className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            formData.proficiency === level
                              ? 'bg-white text-brand shadow-sm'
                              : 'text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-5 bg-brand text-white rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand/20 hover:bg-brand/90 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3 group mt-10"
                 >
                   Continue Builder <icons.ChevronRight />
                 </button>
               </form>
            </div>
          </div>
        );

      case 1:
        const currentPathInfo = PATHS_DATA[formData.intent];
        const filteredSteps = currentPathInfo.steps.filter(step => step.level === formData.proficiency);

        return (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="mb-12 flex justify-between items-end">
               <div className="space-y-2">
                 <button 
                    onClick={() => setCurrentStep(0)}
                    className="text-[10px] text-slate-400 font-black uppercase tracking-widest hover:text-brand transition-colors flex items-center gap-2 mb-4"
                 >
                   <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                   Back to Intent
                 </button>
                 <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-5xl font-black text-slate-800 tracking-tight">
                        {formData.proficiency} <span className="text-brand">Modules</span>
                    </h2>
                    <span className="px-3 py-1 bg-brand/10 text-brand text-[10px] font-black rounded-full uppercase tracking-widest border border-brand/10">
                        Filtered Path
                    </span>
                 </div>
                 <p className="text-slate-500 font-medium max-w-lg">
                    We've curated these <span className="text-brand font-bold">{formData.proficiency}</span> level modules specifically for your {currentPathInfo.title} path.
                 </p>
               </div>
               <div className="bg-brand/5 border border-brand/10 px-6 py-4 rounded-2xl text-right shrink-0">
                  <p className="text-[10px] text-brand font-black uppercase tracking-widest mb-1">Targeting Focus</p>
                  <p className="text-2xl font-black text-brand">{selectedFeatures.length} / {filteredSteps.length}</p>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
               {filteredSteps.map((step) => (
                 <div 
                   key={step.id}
                   onClick={() => toggleFeature(step.id)}
                   className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer group relative overflow-hidden ${
                     selectedFeatures.includes(step.id)
                       ? 'bg-white border-brand shadow-premium -translate-y-1'
                       : 'bg-white/40 border-slate-100 hover:border-brand/40 grayscale opacity-70'
                   }`}
        /*  */         >
                   <div className="flex items-start justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        selectedFeatures.includes(step.id) ? 'bg-brand text-white shadow-lg' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <span className="text-xs font-black">{step.icon}</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedFeatures.includes(step.id) ? 'bg-brand border-brand text-white shadow-md' : 'border-slate-200'
                      }`}>
                        {selectedFeatures.includes(step.id) && <icons.Check className="w-3 h-3" />}
                      </div>
                   </div>
                   <h3 className="text-lg font-black text-slate-800 mb-2 leading-tight">{step.title}</h3>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.description}</p>
                   
                   {selectedFeatures.includes(step.id) && (
                     <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-brand/5 rounded-full"></div>
                   )}
                 </div>
               ))}
               
               {filteredSteps.length === 0 && (
                 <div className="col-span-2 py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No modules found for this level</p>
                    <button onClick={() => setCurrentStep(0)} className="text-brand font-black text-[10px] uppercase tracking-widest mt-4 underline">Change level</button>
                 </div>
               )}
             </div>

             <div className="flex justify-center">
               <button 
                 onClick={startGeneration}
                 disabled={selectedFeatures.length === 0}
                 className={`px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center gap-4 ${
                   selectedFeatures.length === 0 
                     ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                     : 'bg-brand text-white shadow-2xl shadow-brand/30 hover:bg-brand/90 hover:scale-105 active:scale-95'
                 }`}
               >
                 Initialize AI Roadmap <icons.Zap />
               </button>
             </div>
          </div>
        );

      case 2:
        return (
          <div className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-xl flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="relative w-32 h-32 mb-12">
              <div className="absolute inset-0 border-8 border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-8 border-brand rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <icons.Zap className="w-10 h-10 text-brand animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">Architecting Your Path</h3>
              <p className="text-sm font-bold text-brand uppercase tracking-widest animate-pulse h-6 flex items-center justify-center">
                {generationSteps[generationProgress]}
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <RoadmapView onReset={() => setCurrentStep(0)} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-24">
      {renderStep()}
      
      {/* Floating Sparkle Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[#f8faff] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]"></div>
      </div>
    </div>
  );
};

export default Goals;
