import { useState } from 'react';
import { Activity, Zap, Database, ChevronDown, User, Bell, Settings, LogOut, Shield, ShieldCheck } from 'lucide-react';

const StatusPill = ({ color, label, value }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-white/6">
    <div className={`w-1.5 h-1.5 rounded-full ${color} animate-pulse`} />
    <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium">{label}</span>
    <span className={`text-[11px] font-semibold ${color.replace('bg-', 'text-')}`}>{value}</span>
  </div>
);

export default function Navbar({ activeData }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b border-white/5 glass-strong z-10">
      {/* Left — page title */}
      <div>
        <h1 className="text-sm font-semibold text-white/90 tracking-wide">Research Workspace</h1>
        <p className="text-[10px] text-white/30 tracking-wider">Autonomous Matrix Research Engine</p>
      </div>

      {/* Center — system status pills */}
      <div className="flex items-center gap-2">
        <StatusPill color="bg-emerald-400" label="API Gateways" value="Online" />
        <StatusPill color="bg-indigo-400" label="Active Agents" value="3 / 3" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-white/6">
          <Database size={11} className="text-violet-400" />
          <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium">Memory</span>
          <span className="text-[11px] font-semibold text-violet-400">2.1 GB</span>
          <div className="w-16 h-1 rounded-full bg-white/8 overflow-hidden">
            <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-white/6">
          <Zap size={11} className="text-amber-400" />
          <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium">Load</span>
          <span className="text-[11px] font-semibold text-amber-400">34%</span>
        </div>

        {/* Active analysis confidence — only shown when an analysis is selected */}
        {activeData && activeData.score != null && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-400/5 border border-emerald-400/15 transition-all">
            <ShieldCheck size={11} className="text-emerald-400" />
            <span className="text-[10px] text-white/40 uppercase tracking-[0.15em] font-medium">Confidence</span>
            <span className="text-[11px] font-semibold text-emerald-400">{activeData.score}%</span>
          </div>
        )}
      </div>

      {/* Right — notifications + profile */}
      <div className="flex items-center gap-2">
        <button id="btn-notifications" className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-white/4 border border-white/6 text-white/40 hover:text-white/80 hover:bg-white/8 transition-all">
          <Bell size={14} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </button>

        <div className="relative">
          <button
            id="btn-profile-dropdown"
            onClick={() => setProfileOpen(o => !o)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/4 border border-white/6 hover:bg-white/8 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <User size={11} className="text-white" />
            </div>
            <span className="text-[11px] font-medium text-white/70">Analyst</span>
            <ChevronDown size={11} className={`text-white/30 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-10 w-44 glass-strong rounded-xl border border-white/8 shadow-2xl py-1 z-50 animate-fade-in">
              {[
                { icon: User, label: 'My Profile' },
                { icon: Settings, label: 'Settings' },
                { icon: Shield, label: 'API Keys' },
                { icon: Activity, label: 'Audit Log' },
              ].map(({ icon: Icon, label }) => (
                <button key={label} className="flex items-center gap-2.5 w-full px-3 py-2 text-[11px] text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                  <Icon size={12} />
                  {label}
                </button>
              ))}
              <div className="border-t border-white/6 mt-1 pt-1">
                <button className="flex items-center gap-2.5 w-full px-3 py-2 text-[11px] text-red-400 hover:bg-red-400/5 transition-colors">
                  <LogOut size={12} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
