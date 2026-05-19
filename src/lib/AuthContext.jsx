import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';

/* ─────────────────────────────────────────────────────────────
   AuthContext — Global auth state for the entire app.
   Handles:
     • Persistent sessions (survives refresh via Supabase localStorage)
     • Real-time auth state changes (tab sync, token refresh)
     • Secure sign-out with full state reset
     • Demo mode fallback when Supabase isn't configured
   ──────────────────────────────────────────────────────────── */

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Restore session on mount + listen for auth changes ──
  useEffect(() => {
    // Demo mode — no Supabase configured
    if (!supabase) {
      setLoading(false);
      return;
    }

    // 1. Check for existing session (persisted in localStorage by Supabase)
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    // 2. Subscribe to all auth state changes (sign in, sign out, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // If the user was signed out externally (e.g. another tab), clear state
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── Sign in with email + password ──
  const signIn = useCallback(async (email, password) => {
    if (!supabase) {
      // Demo mode — accept anything
      const demoUser = { email, name: email.split('@')[0], user_metadata: { full_name: email.split('@')[0] } };
      setUser(demoUser);
      return { user: demoUser, error: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { user: null, error };
    return { user: data.user, error: null };
  }, []);

  // ── Sign up with email + password ──
  const signUp = useCallback(async (email, password, fullName) => {
    if (!supabase) {
      const demoUser = { email, name: fullName || email.split('@')[0], user_metadata: { full_name: fullName } };
      setUser(demoUser);
      return { user: demoUser, error: null, needsConfirmation: false };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) return { user: null, error, needsConfirmation: false };

    // If email confirmation is required, user exists but no session yet
    const needsConfirmation = data.user && !data.session;
    return { user: data.user, error: null, needsConfirmation };
  }, []);

  // ── Sign out — full cleanup ──
  const signOut = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
  }, []);

  // ── Derive display name from various sources ──
  const displayName = user?.user_metadata?.full_name || user?.email || user?.name || 'Analyst';

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    displayName,
    isAuthenticated: !!user,
    isDemoMode: !supabase,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
