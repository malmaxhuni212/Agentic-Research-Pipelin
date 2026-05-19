import { useState, useEffect, useRef } from 'react';
import { Globe, Brain, FileText, CheckCircle2, Loader2, Clock, Zap } from 'lucide-react';
import { SCOUT_LOGS, ANALYST_LOGS, EDITOR_LOGS } from '../data/mockData';

const useTimer = (running) => {
  const [ms, setMs] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setMs(p => p + 37), 37);
    return () => clearInterval(id);
  }, [running]);
  const mins = String(Math.floor(ms / 60000)).padStart(2, '0');
  const secs = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const cents = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${mins}:${secs}.${cents}`;
};

const AgentCard = ({ id, icon: Icon, agentKey, label, role, color, colorDim, status, logs, extra }) => {
  const logRef = useRef(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  const isDone = status === 'done';
  const isActive = status === 'active';

  return (
    <div className={`rounded-xl border transition-all duration-500 ${
      isActive ? `border-${color}/40 shadow-lg shadow-${color}/10` :
      isDone ? 'border-emerald-500/20' : 'border-white/5'
    } bg-white/3 p-4`}>
      {/* Agent Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isDone ? 'bg-emerald-500/15' : isActive ? `bg-${color}/15` : 'bg-white/4'
          }`}>
            {isDone
              ? <CheckCircle2 size={16} className="text-emerald-400" />
              : isActive
                ? <Icon size={16} className={`text-${color}`} />
                : <Icon size={16} className="text-white/20" />
            }
          </div>
          <div>
            <p className="text-xs font-semibold text-white/80">{label}</p>
            <p className="text-[10px] text-white/30">{role}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-medium ${
          isDone ? 'bg-emerald-500/10 text-emerald-400' :
          isActive ? `bg-${color}/10 text-${color}` :
          'bg-white/5 text-white/25'
        }`}>
          {isActive && <Loader2 size={9} className="animate-spin" />}
          {isDone && <CheckCircle2 size={9} />}
          {status === 'idle' && <Clock size={9} />}
          {isDone ? 'Complete' : isActive ? 'Active' : 'Queued'}
        </div>
      </div>

      {/* Extra metric row */}
      {extra && (isActive || isDone) && (
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          {extra.map((e, i) => (
            <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/4 border border-white/5">
              <e.icon size={10} className={`text-${color}`} />
              <span className="text-[10px] text-white/50">{e.label}:</span>
              <span className={`text-[10px] font-semibold text-${color}`}>{e.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Progress bar for editor */}
      {agentKey === 'editor' && (isActive || isDone) && (
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-white/35 mb-1">
            <span>Schema Validation Progress</span>
            <span>{isDone ? '100' : '78'}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-1000 ${isDone ? 'w-full' : 'w-[78%]'}`}
            />
          </div>
        </div>
      )}

      {/* Terminal log */}
      <div ref={logRef} className="terminal-log">
        {logs.length === 0 && (
          <span className="text-white/15 italic">Agent queued — awaiting pipeline signal...</span>
        )}
        {logs.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-white/20 select-none flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
            <span style={{ color: isDone ? '#86efac' : '#7dd3a8' }}>{line}</span>
          </div>
        ))}
        {isActive && (
          <div className="flex gap-2 mt-0.5">
            <span className="text-white/20 select-none">{String(logs.length + 1).padStart(2, '0')}</span>
            <span className="text-indigo-400">█<span className="animate-blink">_</span></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ExecutionMonitor({ config, onComplete }) {
  const [agents, setAgents] = useState({ scout: 'idle', analyst: 'idle', editor: 'idle' });
  const [logs, setLogs] = useState({ scout: [], analyst: [], editor: [] });
  const [urlCount, setUrlCount] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);
  const [running, setRunning] = useState(true);
  const timer = useTimer(running);

  const pushLog = (agent, line, delay) =>
    new Promise(r => setTimeout(() => {
      setLogs(prev => ({ ...prev, [agent]: [...prev[agent], line] }));
      r();
    }, delay));

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      // ── SCOUT ──────────────────────────────────────────────
      setAgents(a => ({ ...a, scout: 'active' }));
      for (let i = 0; i < SCOUT_LOGS.length; i++) {
        if (cancelled) return;
        await pushLog('scout', SCOUT_LOGS[i], 600);
        if (i % 2 === 0) setUrlCount(c => c + Math.floor(Math.random() * 3) + 1);
      }
      setAgents(a => ({ ...a, scout: 'done' }));

      // ── ANALYST ────────────────────────────────────────────
      setAgents(a => ({ ...a, analyst: 'active' }));
      for (let i = 0; i < ANALYST_LOGS.length; i++) {
        if (cancelled) return;
        await pushLog('analyst', ANALYST_LOGS[i], 550);
        setTokenCount(c => c + Math.floor(Math.random() * 4200) + 800);
      }
      setAgents(a => ({ ...a, analyst: 'done' }));

      // ── EDITOR ─────────────────────────────────────────────
      setAgents(a => ({ ...a, editor: 'active' }));
      for (let i = 0; i < EDITOR_LOGS.length; i++) {
        if (cancelled) return;
        await pushLog('editor', EDITOR_LOGS[i], 500);
      }
      setAgents(a => ({ ...a, editor: 'done' }));
      setRunning(false);

      if (!cancelled) setTimeout(() => onComplete(), 1200);
    };
    run();
    return () => { cancelled = true; };
  }, []);

  const allDone = agents.scout === 'done' && agents.analyst === 'done' && agents.editor === 'done';

  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 animate-fade-in-up" style={{ opacity: 0 }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${allDone ? 'bg-emerald-400' : 'bg-indigo-400 animate-pulse'}`} />
            <span className="text-xs font-semibold text-white/80">
              {allDone ? 'Pipeline Complete — Compiling Report...' : 'Matrix Pipeline Running'}
            </span>
          </div>
          <p className="text-[10px] text-white/30 pl-4 truncate max-w-lg">Target: {config?.prompt}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/4 border border-white/6">
            <Clock size={12} className="text-indigo-400" />
            <span className="font-mono text-sm font-bold text-indigo-300 tabular-nums">{timer}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/4 border border-white/6">
            <Zap size={12} className="text-amber-400" />
            <span className="text-[11px] font-semibold text-amber-300">{config?.llm?.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Pipeline stage bar */}
      <div className="flex items-center gap-2 mb-6 animate-fade-in-up delay-100" style={{ opacity: 0 }}>
        {[
          { key: 'scout', label: 'Scout' },
          { key: 'analyst', label: 'Analyst' },
          { key: 'editor', label: 'Editor' },
        ].map((s, i) => (
          <div key={s.key} className="flex items-center gap-2 flex-1">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-semibold w-full justify-center transition-all duration-500 ${
              agents[s.key] === 'done' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' :
              agents[s.key] === 'active' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' :
              'bg-white/3 text-white/25 border border-white/5'
            }`}>
              {agents[s.key] === 'active' && <Loader2 size={9} className="animate-spin" />}
              {agents[s.key] === 'done' && <CheckCircle2 size={9} />}
              {s.label}
            </div>
            {i < 2 && <div className="w-4 h-px bg-white/10 flex-shrink-0" />}
          </div>
        ))}
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 gap-4 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
        <AgentCard
          id="agent-scout" agentKey="scout" icon={Globe} label="Agent A — The Scout" role="Web Scraping & URL Harvesting"
          color="indigo-400" status={agents.scout} logs={logs.scout}
          extra={[
            { icon: Globe, label: 'URLs Harvested', value: `${urlCount}` },
            { icon: Zap, label: 'Proxy Pool', value: 'Active' },
          ]}
        />
        <AgentCard
          id="agent-analyst" agentKey="analyst" icon={Brain} label="Agent B — The Analyst" role="Extraction & Semantic Triage"
          color="violet-400" status={agents.analyst} logs={logs.analyst}
          extra={[
            { icon: Brain, label: 'Tokens Processed', value: tokenCount.toLocaleString() },
            { icon: Zap, label: 'Clusters Found', value: '7' },
          ]}
        />
        <AgentCard
          id="agent-editor" agentKey="editor" icon={FileText} label="Agent C — The Editor" role="Report Structuring & Validation"
          color="pink-400" status={agents.editor} logs={logs.editor}
          extra={[
            { icon: FileText, label: 'Schema', value: 'v2.4' },
            { icon: CheckCircle2, label: 'Citations', value: '34' },
          ]}
        />
      </div>
    </div>
  );
}
