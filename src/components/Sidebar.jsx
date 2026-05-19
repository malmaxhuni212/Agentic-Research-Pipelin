import { useState } from 'react';
import {
  ChevronLeft, ChevronRight, Plus, CheckCircle2, XCircle,
  Loader2, Clock, BarChart3, Cpu, LogOut, Info
} from 'lucide-react';
import { RECENT_ANALYSES } from '../data/mockData';

const StatusBadge = ({ status }) => {
  if (status === 'completed') return (
    <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20">
      <CheckCircle2 size={9} /> Done
    </span>
  );
  if (status === 'failed') return (
    <span className="flex items-center gap-1 text-red-400 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-red-400/10 border border-red-400/20">
      <XCircle size={9} /> Failed
    </span>
  );
  if (status === 'processing') return (
    <span className="flex items-center gap-1 text-amber-400 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
      <Loader2 size={9} className="animate-spin" /> Running
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-amber-400 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
      <Loader2 size={9} className="animate-spin" /> Active
    </span>
  );
};

/* ── Reusable sidebar item ───────────────────────── */
const SidebarItem = ({ item, activeId, onSelect }) => (
  <button
    key={item.id}
    id={`sidebar-item-${item.id}`}
    onClick={() => onSelect(item.id)}
    className={`w-full text-left px-2.5 py-2.5 rounded-lg transition-all duration-150 group ${
      activeId === item.id
        ? 'bg-indigo-600/15 border border-indigo-500/25'
        : 'hover:bg-white/4 border border-transparent'
    }`}
  >
    <div className="flex items-start justify-between gap-1 mb-1.5">
      <div className="flex items-center gap-2">
        <item.icon size={12} className={activeId === item.id ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/70'} />
        <p className={`text-[11px] font-medium leading-snug line-clamp-2 ${
          activeId === item.id ? 'text-indigo-300' : 'text-white/75 group-hover:text-white/90'
        }`}>{item.title}</p>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <StatusBadge status={item.status} />
      <div className="flex items-center gap-1 text-white/25 text-[10px]">
        <Clock size={9} />
        {item.ts}
      </div>
    </div>
    {item.status === 'completed' && item.score != null && (
      <div className="flex items-center gap-2 mt-1.5">
        <div className="flex items-center gap-1 text-white/30 text-[10px]">
          <BarChart3 size={8} />
          {item.sources} sources
        </div>
        <div className="text-indigo-400/60 text-[10px] font-medium">{item.score}% conf.</div>
      </div>
    )}
  </button>
);

export default function Sidebar({ onNew, activeId, onSelect, userResearch = [], onSignOut, userName }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="relative flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out"
      style={{ width: collapsed ? 56 : 260 }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b border-white/5">
        <div className="relative flex-shrink-0 w-7 h-7">
          <div className="absolute inset-0 rounded-lg bg-indigo-600 opacity-80 animate-pulse-glow" />
          <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 z-10">
            <Cpu size={14} className="text-white" />
          </div>
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-[11px] font-bold tracking-widest uppercase text-indigo-400 leading-none">Matrix</p>
            <p className="text-[9px] tracking-wider uppercase text-white/30 mt-0.5">Research OS v2.4</p>
          </div>
        )}
      </div>

      {/* New Research Button */}
      <div className="px-3 py-3 border-b border-white/5">
        <button
          id="btn-new-research"
          onClick={onNew}
          className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 group"
        >
          <Plus size={14} className="group-hover:rotate-90 transition-transform duration-200" />
          {!collapsed && <span>New Research</span>}
        </button>
      </div>

      {/* Scrollable content */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-2.5 py-4">

          {/* ── YOUR ACTIVE RESEARCH (user-created items) ── */}
          {userResearch.length > 0 && (
            <div className="mb-5">
              <p className="text-[9px] tracking-[0.2em] uppercase text-indigo-400/60 font-semibold px-2 mb-3">
                Your Active Research
              </p>
              <div className="space-y-2.5">
                {userResearch.map((item) => (
                  <SidebarItem key={item.id} item={item} activeId={activeId} onSelect={onSelect} />
                ))}
              </div>
            </div>
          )}

          {/* ── SAMPLE REPORTS (static mock data) ── */}
          <div>
            <div className="px-2 mb-3">
              <div className="flex items-center gap-1.5 mb-1">
                <p className="text-[9px] tracking-[0.2em] uppercase text-white/25 font-semibold">
                  Sample Reports
                </p>
                <div className="group relative">
                  <Info size={9} className="text-white/20 hover:text-white/40 transition-colors cursor-help" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-[10px] text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                    These are examples of the final software output.
                  </div>
                </div>
              </div>
              <p className="text-[8px] text-white/15 leading-relaxed">
                Example outputs from the Matrix engine
              </p>
            </div>
            <div className="space-y-2.5">
              {RECENT_ANALYSES.map((item) => (
                <SidebarItem key={item.id} item={item} activeId={activeId} onSelect={onSelect} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer with user info + sign out */}
      {!collapsed && (
        <div className="px-3 py-3 border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <span className="text-[8px] font-bold text-white uppercase">
                  {(userName || 'A').charAt(0)}
                </span>
              </div>
              <span className="text-[10px] text-white/40 truncate">{userName}</span>
            </div>
            <button
              id="btn-sign-out"
              onClick={onSignOut}
              className="text-white/20 hover:text-red-400 transition-colors flex-shrink-0"
              title="Sign Out"
            >
              <LogOut size={12} />
            </button>
          </div>
          <div className="text-[9px] text-white/20 tracking-wider text-center">
            Matrix Research Engine · Build 2406
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        id="btn-sidebar-toggle"
        onClick={() => setCollapsed(c => !c)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-slate-700 transition-all z-20 shadow-md"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
