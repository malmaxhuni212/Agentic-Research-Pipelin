import { useState } from 'react';
import {
  BarChart3, TrendingUp, Link2, ChevronDown, ChevronUp,
  ExternalLink, ShieldCheck, Target, Layers, Download, Webhook, Trash2
} from 'lucide-react';

/* ── Tab Definitions ─────────────────────────────────────── */
const TABS = [
  { id: 'insights', label: 'Executive Insights', icon: BarChart3 },
  { id: 'trends', label: 'Strategic Trends Grid', icon: TrendingUp },
  { id: 'citations', label: 'Citation Matrix', icon: Link2 },
];

/* ── Metric Card ──────────────────────────────────────────── */
const MetricCard = ({ icon: Icon, label, value, sub, color, delay }) => (
  <div
    className={`rounded-xl p-6 border border-white/6 bg-white/3 animate-fade-in-up`}
    style={{ animationDelay: `${delay}ms`, opacity: 0 }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${color}/10`}>
        <Icon size={15} className={`text-${color}`} />
      </div>
      <span className={`text-[10px] px-2 py-0.5 rounded-full bg-${color}/10 text-${color} border border-${color}/20 font-medium`}>Live</span>
    </div>
    <p className={`text-2xl font-bold text-${color} mb-1`} style={{ fontFamily: 'var(--font-display)' }}>{value}</p>
    <p className="text-[11px] text-white/60 font-medium tracking-[0.08em] uppercase">{label}</p>
    <p className="text-[10px] text-white/25 mt-1 leading-relaxed">{sub}</p>
  </div>
);

/* ── Executive Insights Tab ───────────────────────────────── */
const InsightsTab = ({ data }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-3 gap-5">
      <MetricCard
        icon={ShieldCheck} label="Data Confidence Score"
        value={`${data.score}%`}
        sub={`Across ${data.sources} synthesized sources`}
        color="emerald-400" delay={0}
      />
      <MetricCard
        icon={Layers} label="Total Raw Sources Synthesized"
        value={String(data.sources)}
        sub={`${data.highAuthority} high-authority, ${data.supporting} supporting`}
        color="indigo-400" delay={80}
      />
      <MetricCard
        icon={Target} label="High-Yield Opportunities Identified"
        value={String(data.opportunities)}
        sub={`${data.immediateOpps} immediate, ${data.midHorizonOpps} mid-horizon`}
        color="violet-400" delay={160}
      />
    </div>

    {/* Executive Summary */}
    <div className="rounded-xl border border-white/6 bg-white/3 p-7 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500" />
        <h3 className="text-sm font-semibold text-white/85">Executive Summary</h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-600/15 text-indigo-300 border border-indigo-500/20 ml-auto">
          AI Generated · {data.llm}
        </span>
      </div>
      <div className="space-y-4 text-[13px] text-white/60" style={{ lineHeight: '1.8' }}>
        {/* First summary paragraph */}
        <p dangerouslySetInnerHTML={{ __html: data.summary[0] }} />

        {/* Callout quote */}
        {data.quote && (
          <blockquote className="border-l-2 border-indigo-500 pl-4 py-2 my-4 bg-indigo-600/6 rounded-r-lg italic text-white/50">
            "{data.quote.text}"
            <footer className="text-[10px] text-indigo-400 not-italic mt-1 font-medium">
              {data.quote.attribution}
            </footer>
          </blockquote>
        )}

        {/* Remaining summary paragraphs */}
        {data.summary.slice(1).map((p, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
        ))}
      </div>
    </div>
  </div>
);

/* ── Trend Card with Accordion ────────────────────────────── */
const TrendCard = ({ trend, idx }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl border border-white/6 bg-white/3 p-4 hover:border-white/10 hover:bg-white/4 transition-all duration-200 animate-fade-in-up"
      style={{ animationDelay: `${idx * 70}ms`, opacity: 0 }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-[13px] font-semibold text-white/85 leading-snug">{trend.title}</h4>
        <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-semibold ${trend.impactBg} ${trend.impactColor} border border-current/20`}>
          {trend.impact}
        </span>
      </div>

      {/* Impact meter */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[9px] text-white/25 uppercase tracking-[0.15em]">Impact</span>
        <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
          <div
            className={`h-full rounded-full ${trend.impact === 'High' ? 'w-full bg-gradient-to-r from-emerald-500 to-emerald-400' : trend.impact === 'Medium' ? 'w-[65%] bg-gradient-to-r from-amber-500 to-amber-400' : 'w-[35%] bg-gradient-to-r from-blue-500 to-blue-400'}`}
          />
        </div>
      </div>

      <p className="text-[12px] text-white/45 leading-relaxed mb-3">{trend.summary}</p>

      {/* Accordion toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
      >
        {open ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        {open ? 'Hide' : 'View'} Actionable Recommendations
      </button>

      {open && (
        <div className="mt-3 space-y-1.5 animate-fade-in">
          {trend.recommendations.map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px] text-white/55">
              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-indigo-600/20 border border-indigo-500/25 flex items-center justify-center text-[8px] text-indigo-400 font-bold mt-0.5">{i + 1}</span>
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Strategic Trends Tab ─────────────────────────────────── */
const TrendsTab = ({ trends }) => (
  <div className="grid grid-cols-2 gap-4">
    {trends.map((t, i) => <TrendCard key={t.id} trend={t} idx={i} />)}
  </div>
);

/* ── Citation Matrix Tab ──────────────────────────────────── */
const CitationsTab = ({ citations }) => (
  <div className="rounded-xl border border-white/6 overflow-hidden animate-fade-in-up" style={{ opacity: 0 }}>
    <div className="px-4 py-3 bg-white/3 border-b border-white/5 flex items-center justify-between">
      <p className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.15em]">Source Matrix — {citations.length} Records</p>
      <span className="text-[10px] text-white/25">Sorted by Relevance Score ↓</span>
    </div>
    <table className="w-full text-[11px]">
      <thead>
        <tr className="border-b border-white/5 bg-white/2">
          {['#', 'Source Name', 'Relevance', 'Domain Authority', 'URL'].map(h => (
            <th key={h} className="px-4 py-2.5 text-left text-[9px] uppercase tracking-[0.2em] text-white/25 font-semibold">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {citations.map((s, i) => (
          <tr key={s.id} className="border-b border-white/4 hover:bg-white/3 transition-colors group">
            <td className="px-4 py-3 text-white/25 font-mono">{String(i + 1).padStart(2, '0')}</td>
            <td className="px-4 py-3 text-white/70 font-medium max-w-xs">{s.name}</td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                    style={{ width: `${s.relevance}%` }}
                  />
                </div>
                <span className="text-indigo-300 font-semibold">{s.relevance}%</span>
              </div>
            </td>
            <td className="px-4 py-3">
              <span className={`font-semibold ${s.da >= 90 ? 'text-emerald-400' : s.da >= 80 ? 'text-amber-400' : 'text-white/50'}`}>{s.da}</span>
              <span className="text-white/25"> / 100</span>
            </td>
            <td className="px-4 py-3">
              <a href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors group-hover:underline underline-offset-2">
                <ExternalLink size={10} />
                <span className="truncate max-w-[160px]">{s.url.replace('https://', '')}</span>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ── Results Panel (root export) ──────────────────────────── */
export default function ResultsPanel({ data, onClear }) {
  const [activeTab, setActiveTab] = useState('insights');
  const [exportMsg, setExportMsg] = useState('');

  const triggerExport = (label) => {
    setExportMsg(`${label} initiated...`);
    setTimeout(() => setExportMsg(''), 2500);
  };

  return (
    <div className="h-full overflow-y-auto px-8 py-8 pb-28 relative">
      {/* Header — reads from data prop */}
      <div className="flex items-center justify-between mb-7 animate-fade-in-up" style={{ opacity: 0 }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold text-white/85">Analysis Complete — {data.title}</span>
          </div>
          <p className="text-[10px] text-white/30 pl-4">
            Compiled by Matrix Research Engine · {data.sources} sources · {data.tokensOutput.toLocaleString()} tokens output
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
            {data.score}% Confidence
          </span>
          <span className="px-2.5 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20 text-indigo-300">
            {data.llm}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/3 border border-white/5 mb-8 animate-fade-in-up delay-50" style={{ opacity: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                : 'text-white/40 hover:text-white/70 hover:bg-white/4'
            }`}
          >
            <tab.icon size={12} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content — all driven from data prop */}
      <div>
        {activeTab === 'insights' && <InsightsTab data={data} />}
        {activeTab === 'trends' && <TrendsTab trends={data.trends} />}
        {activeTab === 'citations' && <CitationsTab citations={data.citations} />}
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-6 right-6 flex items-center gap-2 z-50 animate-fade-in-up" style={{ opacity: 0, animationDelay: '0.4s' }}>
        {exportMsg && (
          <div className="px-3 py-2 rounded-lg glass-strong border border-emerald-500/25 text-[11px] text-emerald-400 animate-fade-in">
            ✓ {exportMsg}
          </div>
        )}
        <button
          id="btn-export-pdf"
          onClick={() => triggerExport('PDF Export')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-white/10 text-[11px] text-white/70 hover:text-white hover:bg-slate-700 hover:border-white/20 transition-all shadow-xl"
        >
          <Download size={13} /> Export PDF
        </button>
        <button
          id="btn-push-webhook"
          onClick={() => triggerExport('Webhook Push')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-white/10 text-[11px] text-white/70 hover:text-white hover:bg-slate-700 hover:border-white/20 transition-all shadow-xl"
        >
          <Webhook size={13} /> Push to Webhook
        </button>
        <button
          id="btn-clear-workspace"
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-[11px] text-red-400 hover:bg-red-500/20 hover:border-red-400/40 transition-all shadow-xl"
        >
          <Trash2 size={13} /> Clear Workspace
        </button>
      </div>
    </div>
  );
}
