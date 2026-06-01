import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

const MentorChat = () => {
  const { messages, sendMessage, user, isDarkMode } = useAppContext();
  const [inputText, setInputText] = useState('');
  const [displayedMessages, setDisplayedMessages] = useState(messages);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    // Synchronize messages
    if (messages.length > displayedMessages.length) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.sender === 'ai' && messages.length > 1) {
        simulateTyping(lastMsg);
      } else {
        setDisplayedMessages(messages);
      }
    } else {
      setDisplayedMessages(messages);
    }
  }, [messages]);

  const simulateTyping = (fullMsg) => {
    setIsTyping(false); // Stop the "typing..." indicator
    let currentText = '';
    const text = fullMsg.text;
    let i = 0;
    
    // Create a temporary message entry for typing effect
    const typingMsg = { ...fullMsg, text: '', id: 'typing-' + (fullMsg.id || Date.now()) };
    setDisplayedMessages(prev => [...prev, typingMsg]);

    const interval = setInterval(() => {
      if (i < text.length) {
        currentText += text[i];
        setDisplayedMessages(prev => {
          const last = prev[prev.length - 1];
          if (last && last.id === typingMsg.id) {
            return [...prev.slice(0, -1), { ...last, text: currentText }];
          }
          return prev;
        });
        i++;
      } else {
        clearInterval(interval);
        setDisplayedMessages(messages);
      }
    }, 15);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedMessages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;
    
    const textToSend = inputText;
    setInputText('');
    setIsTyping(true); // Show typing indicator while waiting for API
    await sendMessage(textToSend);
    setIsTyping(false);
  };

  if (!user) return null;

  return (
    <div className={`flex h-[calc(100vh-10rem)] border rounded-[2.5rem] overflow-hidden shadow-premium animate-in fade-in slide-in-from-bottom-4 duration-700 transition-colors ${
      isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white/40 border-slate-100'
    }`}>
      {/* Sidebar - Info */}
      <aside className={`w-80 border-r hidden lg:flex flex-col transition-colors ${
        isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/30 border-slate-100'
      }`}>
        <div className="p-8">
          <h3 className={`text-xs font-black uppercase tracking-widest mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Mentor Guide</h3>
          <div className="space-y-4">
            {[
              { q: 'Code Review', d: 'Paste code for instant feedback.' },
              { q: 'Career Growth', d: 'Ask about roles and skills.' },
              { q: 'Debug Help', d: 'Stuck on an error? I can help.' }
            ].map((item, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-100'}`}>
                <p className={`text-xs font-bold mb-1 ${isDarkMode ? 'text-brand-light' : 'text-brand'}`}>{item.q}</p>
                <p className="text-[10px] font-medium text-slate-500 leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className={`flex-1 flex flex-col relative transition-colors ${isDarkMode ? 'bg-slate-950/40' : 'bg-white/40'}`}>
        <header className={`px-8 py-6 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-10 transition-colors ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/60 border-slate-100'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20 relative">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className={`text-sm font-black uppercase tracking-widest leading-none ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>AI Mentor</h2>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Powered by Gemini</p>
              </div>
            </div>
          </div>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
          {displayedMessages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 animate-in duration-500 ${msg.sender === 'user' ? 'flex-row-reverse slide-in-from-right-4' : 'slide-in-from-left-4'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-premium overflow-hidden ${msg.sender === 'ai' ? 'bg-brand' : ''}`}>
                {msg.sender === 'ai' ? (
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1" />
                  </svg>
                ) : (
                  <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                )}
              </div>
              <div className={`max-w-2xl ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`rounded-2xl p-6 shadow-sm border ${
                  msg.sender === 'ai' 
                    ? (isDarkMode ? 'bg-slate-800 rounded-tl-none border-slate-700 text-slate-200' : 'bg-white rounded-tl-none border-slate-100/50 text-slate-700') 
                    : 'bg-brand text-white rounded-tr-none border-transparent shadow-lg shadow-brand/20'
                }`}>
                  <p className="font-medium leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 px-1">{msg.time}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 slide-in-from-left-4 animate-in">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center shrink-0 shadow-premium">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.663 17h4.673M12 3v1" />
                </svg>
              </div>
              <div className={`rounded-2xl p-6 bg-slate-100 border-slate-200 rounded-tl-none ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`p-8 backdrop-blur-xl border-t sticky bottom-0 transition-colors ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-100'
        }`}>
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div className={`flex-1 border rounded-2xl flex items-center px-6 py-4 focus-within:ring-2 transition-all ${
              isDarkMode ? 'bg-slate-800 border-slate-700 focus-within:ring-brand/30' : 'bg-slate-50 border-slate-100 focus-within:ring-brand/20'
            }`}>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your mentor anything..." 
                disabled={isTyping}
                className={`flex-1 bg-transparent border-none text-sm font-medium focus:ring-0 ${isDarkMode ? 'text-slate-200 placeholder:text-slate-500' : 'text-slate-700 placeholder:text-slate-400'}`}
              />
            </div>
            <button 
              onClick={handleSend}
              disabled={isTyping || !inputText.trim()}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isTyping || !inputText.trim() ? 'bg-slate-300 cursor-not-allowed' : 'bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/30 hover:scale-105'
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorChat;
