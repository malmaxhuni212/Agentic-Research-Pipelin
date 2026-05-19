import { useState, useMemo, useCallback, useRef } from 'react';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ConfigPanel from './components/ConfigPanel';
import ExecutionMonitor from './components/ExecutionMonitor';
import ResultsPanel from './components/ResultsPanel';
import { getAnalysisData } from './data/mockData';
import { useAuth } from './lib/AuthContext';
import { fetchResearch } from './lib/api';
import { Search } from 'lucide-react';

// view: 'config' | 'running' | 'results'
export default function App() {
  const { user, loading, isAuthenticated, signOut, displayName } = useAuth();

  const [view, setView] = useState('config');
  const [config, setConfig] = useState(null);
  const [activeSidebarId, setActiveSidebarId] = useState(null);

  // ── User-created research items (not mock data) ──
  const [userResearch, setUserResearch] = useState([]);
  const [pendingResearchId, setPendingResearchId] = useState(null);

  // ── LLM results cache: { [researchId]: { ...llmData } } ──
  const llmResultsRef = useRef({});

  // ── Single source of truth: derive active data from the ID ──
  const activeData = useMemo(() => {
    if (activeSidebarId == null) return null;

    // Check user research first
    const userItem = userResearch.find((r) => r.id === activeSidebarId);
    if (userItem && userItem.status === 'completed') {
      // If we have real LLM data for this item, use it
      const llmData = llmResultsRef.current[userItem.id];
      if (llmData) {
        return {
          id: userItem.id,
          title: userItem.title,
          icon: userItem.icon,
          status: 'completed',
          ...llmData,
        };
      }

      // Fallback to HVAC template if no LLM data (shouldn't happen normally)
      const templateData = getAnalysisData(1);
      return templateData
        ? { ...templateData, id: userItem.id, title: userItem.title, icon: userItem.icon }
        : null;
    }

    // Otherwise check mock data
    return getAnalysisData(activeSidebarId);
  }, [activeSidebarId, userResearch]);

  const handleRun = useCallback((cfg) => {
    // Create a new user research entry
    const newId = Date.now();
    const newItem = {
      id: newId,
      title: cfg.prompt.length > 50 ? cfg.prompt.slice(0, 50) + '…' : cfg.prompt,
      fullPrompt: cfg.prompt,
      ts: 'Just now',
      status: 'processing',
      sources: cfg.maxSources,
      score: null,
      icon: Search,
      llm: cfg.llm,
      depth: cfg.depth,
    };

    setUserResearch((prev) => [newItem, ...prev]);
    setPendingResearchId(newId);
    setActiveSidebarId(newId);
    setConfig(cfg);
    setView('running');

    // ── Fire the LLM API call in parallel with the agent animation ──
    fetchResearch(cfg)
      .then((data) => {
        llmResultsRef.current[newId] = data;
      })
      .catch((err) => {
        console.error('[LLM API Error]', err.message);
        // Store a fallback so the UI still renders
        const fallback = getAnalysisData(1);
        if (fallback) {
          llmResultsRef.current[newId] = {
            ...fallback,
            llm: cfg.llm,
            _fallback: true,
            _error: err.message,
          };
        }
      });
  }, []);

  const handleComplete = useCallback(() => {
    // Mark the pending research as completed
    if (pendingResearchId) {
      const llmData = llmResultsRef.current[pendingResearchId];
      setUserResearch((prev) =>
        prev.map((r) =>
          r.id === pendingResearchId
            ? {
                ...r,
                status: 'completed',
                score: llmData?.score ?? 92,
                sources: llmData?.sources ?? r.sources,
                ts: 'Just now',
              }
            : r
        )
      );
      setActiveSidebarId(pendingResearchId);
    }
    setView('results');
    setPendingResearchId(null);
  }, [pendingResearchId]);

  const handleNew = useCallback(() => {
    setConfig(null);
    setView('config');
    setActiveSidebarId(null);
  }, []);

  const handleSelectSidebar = useCallback((id) => {
    setActiveSidebarId(id);

    // Check if it's a completed user research item
    const userItem = userResearch.find((r) => r.id === id);
    if (userItem?.status === 'completed') {
      setView('results');
      return;
    }

    // For completed mock items, jump straight to results
    const data = getAnalysisData(id);
    if (data) {
      setView('results');
    }
  }, [userResearch]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    // Reset all workspace state on sign out
    setView('config');
    setActiveSidebarId(null);
    setUserResearch([]);
    setConfig(null);
    setPendingResearchId(null);
    llmResultsRef.current = {};
  }, [signOut]);

  // ── Loading splash while checking persistent session ──
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#060810]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] text-white/20 tracking-wider uppercase">Restoring session…</p>
        </div>
      </div>
    );
  }

  // ── Route protection: unauthenticated → login screen ──
  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  // ── Authenticated workspace ──
  return (
    <div className="flex h-screen overflow-hidden bg-[#060810] mesh-bg noise">
      {/* ── Ambient glow spots ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/4 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-indigo-800/4 blur-[80px]" />
      </div>

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col border-r border-white/5 glass-strong">
        <Sidebar
          onNew={handleNew}
          activeId={activeSidebarId}
          onSelect={handleSelectSidebar}
          userResearch={userResearch}
          onSignOut={handleSignOut}
          userName={displayName}
        />
      </div>

      {/* ── Main Column ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Pass activeData to Navbar so it can show live confidence */}
        <Navbar activeData={activeData} />

        {/* Workspace */}
        <main className="flex-1 overflow-hidden">
          {view === 'config' && (
            <div key="config" className="h-full animate-fade-in">
              <ConfigPanel onRun={handleRun} />
            </div>
          )}

          {view === 'running' && (
            <div key="running" className="h-full animate-fade-in">
              <ExecutionMonitor config={config} onComplete={handleComplete} />
            </div>
          )}

          {view === 'results' && activeData && (
            // key={activeData.id} forces React to fully unmount/remount
            // when switching analyses, preventing stale state
            <div key={`results-${activeData.id}`} className="h-full animate-fade-in">
              <ResultsPanel data={activeData} onClear={handleNew} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
