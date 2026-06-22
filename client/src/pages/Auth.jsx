import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Auth = () => {
  const { login, registerUser, initialAuthView } = useAppContext();
  const [isLogin, setIsLogin] = useState(initialAuthView === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!isLogin && !name.trim()) errors.name = 'Name is required';

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google Success", credentialResponse);

      const credential = credentialResponse?.credential;

      if (!credential) {
        console.log("No credential received");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        { credential }
      );

      console.log("Backend Response", res.data);
      if (res.data.success || res.data.token) {
        await login(null, null, res.data);
      }
    } catch (err) {
      console.log("Google Auth Error", err);
      console.log(err.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (!result.success) {
          setError(result.message);
        }
      } else {
        const result = await registerUser({ name, email, password });
        if (!result.success) {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faff] flex items-center justify-center p-6 lg:p-12 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side: Branding */}
        <div className="hidden lg:flex flex-col space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center shadow-lg shadow-brand/30">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">DevPath AI</h1>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Production Ready Platform</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black text-slate-800 tracking-tight leading-[1.1]">
              Master Engineering <br />
              <span className="text-brand">with Real-time AI.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
              Your personalized AI mentor is ready. Connect your account to sync your progress across devices and access full features.
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-premium border border-slate-100/50 animate-in fade-in slide-in-from-right-8 duration-1000">
          <div className="mb-10">
            <h3 className="text-3xl font-black text-slate-800 tracking-tight">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
            <p className="text-slate-400 font-medium text-sm mt-2">
              {isLogin ? 'Enter your credentials to continue.' : 'Start your journey with a new account.'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  className={`w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-2 transition-all ${fieldErrors.name ? 'ring-2 ring-rose-500/20' : 'focus:ring-brand/20'}`}
                />
                {fieldErrors.name && <p className="text-[10px] text-rose-500 font-bold ml-1">{fieldErrors.name}</p>}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className={`w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-2 transition-all ${fieldErrors.email ? 'ring-2 ring-rose-500/20' : 'focus:ring-brand/20'}`}
              />
              {fieldErrors.email && <p className="text-[10px] text-rose-500 font-bold ml-1">{fieldErrors.email}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className={`w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-2 transition-all ${fieldErrors.password ? 'ring-2 ring-rose-500/20' : 'focus:ring-brand/20'}`}
              />
              {fieldErrors.password && <p className="text-[10px] text-rose-500 font-bold ml-1">{fieldErrors.password}</p>}
            </div>

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter The Password"
                  className={`w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-2 transition-all ${fieldErrors.confirmPassword ? 'ring-2 ring-rose-500/20' : 'focus:ring-brand/20'}`}
                />
                {fieldErrors.confirmPassword && <p className="text-[10px] text-rose-500 font-bold ml-1">{fieldErrors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-brand/30 hover:scale-[1.02] active:scale-95 transition-all mt-4 disabled:opacity-50 disabled:scale-100"
            >
              {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
            <div className="mt-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Login Failed")}
              />
            </div>
          </form>

          <p className="text-center text-sm font-medium text-slate-400 mt-8">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => {
                setError('');
                setFieldErrors({});
                setIsLogin(!isLogin);
              }}
              className="ml-2 text-brand font-black hover:underline"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
