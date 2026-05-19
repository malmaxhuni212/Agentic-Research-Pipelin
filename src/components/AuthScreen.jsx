import { useState } from 'react';
import { Cpu, Mail, Lock, User, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function AuthScreen() {
  const { signIn, signUp, isDemoMode } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    if (mode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error: signUpErr, needsConfirmation } = await signUp(email, password, fullName);
        if (signUpErr) throw signUpErr;
        if (needsConfirmation) {
          setSuccess('Check your email to confirm your account, then sign in.');
          setMode('login');
        }
        // If no confirmation needed, onAuthStateChange in the context handles state
      } else {
        const { error: signInErr } = await signIn(email, password);
        if (signInErr) throw signInErr;
        // onAuthStateChange in the context handles state automatically
      }
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#060810] mesh-bg noise">
      {/* ── Ambient glow ───────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/4 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-indigo-800/4 blur-[80px]" />
      </div>

      {/* ── Centered auth card ─────────────────────── */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="text-center mb-10 animate-fade-in-up" style={{ opacity: 0 }}>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-xl bg-indigo-600 opacity-80 animate-pulse-glow" />
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 z-10">
                  <Cpu size={20} className="text-white" />
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold tracking-widest uppercase text-indigo-400 leading-none">Matrix</p>
                <p className="text-[10px] tracking-wider uppercase text-white/30 mt-0.5">Research OS v2.4</p>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="text-sm text-white/35">
              {mode === 'login'
                ? 'Sign in to access your autonomous research workspace.'
                : 'Get started with Matrix-powered competitive intelligence.'}
            </p>
          </div>

          {/* Card */}
          <div className="glass rounded-2xl p-8 border border-white/6 shadow-2xl animate-fade-in-up delay-100" style={{ opacity: 0 }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field (signup only) */}
              {mode === 'signup' && (
                <div className="animate-fade-in">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-white/35 mb-2 font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none z-10" />
                    <input
                      id="input-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/4 border border-white/8 focus:border-indigo-500/50 focus:bg-white/6 focus:outline-none text-sm text-white/80 placeholder:text-white/20 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-white/35 mb-2 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none z-10" />
                  <input
                    id="input-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="analyst@company.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/4 border border-white/8 focus:border-indigo-500/50 focus:bg-white/6 focus:outline-none text-sm text-white/80 placeholder:text-white/20 transition-all"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] text-white/35 mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none z-10" />
                  <input
                    id="input-password"
                    type={showPw ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3 rounded-xl bg-white/4 border border-white/8 focus:border-indigo-500/50 focus:bg-white/6 focus:outline-none text-sm text-white/80 placeholder:text-white/20 transition-all"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Error / Success */}
              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 animate-fade-in">
                  <AlertCircle size={13} className="text-red-400 flex-shrink-0" />
                  <p className="text-[11px] text-red-400">{error}</p>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 animate-fade-in">
                  <AlertCircle size={13} className="text-emerald-400 flex-shrink-0" />
                  <p className="text-[11px] text-emerald-400">{success}</p>
                </div>
              )}

              {/* Submit */}
              <button
                id="btn-auth-submit"
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Toggle mode */}
            <div className="mt-6 pt-5 border-t border-white/5 text-center">
              <p className="text-[11px] text-white/30">
                {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                  id="btn-auth-toggle"
                  onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess(''); }}
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  {mode === 'login' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-white/15 mt-6 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
            Matrix Research OS · Intelligence Engine · {isDemoMode ? 'Demo Mode' : 'Secured by Supabase'}
          </p>
        </div>
      </div>
    </div>
  );
}
