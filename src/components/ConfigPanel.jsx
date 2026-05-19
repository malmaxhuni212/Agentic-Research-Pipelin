import { useState } from 'react';
import { Search, Sliders, Cpu, ChevronDown, Rocket, Info } from 'lucide-react';

const DEPTHS = ['Fast Scan', 'Standard', 'Deep Matrix'];
const LLMS = ['Claude 3.5 Sonnet', 'GPT-4o', 'Custom Fine-Tuned Llama'];

const SelectField = ({ id, label, icon: Icon, options, value, onChange }) => (
  <div>
    <label className="block text-[10px] uppercase tracking-[0.15em] text-white/35 mb-2 font-medium">{label}</label>
    <div className="relative">
      <Icon size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none z-10" />
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-10 pr-8 py-3 rounded-lg bg-white/4 border border-white/8 text-xs text-white/80 focus:outline-none focus:border-indigo-500/50 focus:bg-white/6 transition-all cursor-pointer"
      >
        {options.map(o => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
      </select>
    </div>
  </div>
);

export default function ConfigPanel({ onRun }) {
  const [prompt, setPrompt] = useState('');
  const [depth, setDepth] = useState('Standard');
  const [llm, setLlm] = useState('Claude 3.5 Sonnet');
  const [maxSources, setMaxSources] = useState(25);
  const [error, setError] = useState('');

  const handleRun = () => {
    if (!prompt.trim()) { setError('Please enter a research target prompt.'); return; }
    setError('');
    onRun({ prompt, depth, llm, maxSources });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/15 border border-indigo-500/25 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[10px] text-indigo-300 tracking-widest uppercase font-semibold">New Research Target</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>
            Configure <span className="text-shimmer">Matrix Pipeline</span>
          </h2>
          <p className="text-sm text-white/35">Define your research objective. The Matrix engine will autonomously scout, extract, and synthesize insights.</p>
        </div>

        {/* Main Card */}
        <div className="glass rounded-2xl p-6 border border-white/6 shadow-2xl animate-fade-in-up delay-100" style={{ opacity: 0 }}>
          {/* Primary Prompt */}
          <div className="mb-5">
            <label className="block text-[10px] uppercase tracking-[0.15em] text-white/35 mb-2 font-medium">
              Primary Research Target Prompt
            </label>
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-[15px] text-indigo-400 pointer-events-none z-10" />
              <textarea
                id="input-research-prompt"
                value={prompt}
                onChange={e => { setPrompt(e.target.value); setError(''); }}
                placeholder="e.g. Analyze the competitive landscape and emerging AI automation opportunities within the commercial HVAC sector for 2026–2028..."
                rows={4}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/4 border border-white/8 focus:border-indigo-500/50 focus:bg-white/6 focus:outline-none text-sm text-white/80 placeholder:text-white/20 resize-none transition-all leading-relaxed"
              />
              {error && (
                <p className="absolute -bottom-5 left-0 text-[10px] text-red-400 flex items-center gap-1">
                  <Info size={9} /> {error}
                </p>
              )}
            </div>
          </div>

          {/* Advanced Controls */}
          <div className="mt-7 pt-5 border-t border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Sliders size={12} className="text-white/30" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-semibold">Advanced Pipeline Controls</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <SelectField id="select-depth" label="Depth of Search" icon={Search} options={DEPTHS} value={depth} onChange={setDepth} />
              <SelectField id="select-llm" label="Primary LLM Brain" icon={Cpu} options={LLMS} value={llm} onChange={setLlm} />
            </div>

            {/* Sources Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-medium">Max Sources to Scrape</label>
                <span className="text-xs font-bold text-indigo-300">{maxSources} URLs</span>
              </div>
              <input
                id="slider-max-sources"
                type="range" min={5} max={50} value={maxSources}
                onChange={e => setMaxSources(Number(e.target.value))}
              />
              <div className="flex justify-between text-[9px] text-white/20 mt-1">
                <span>5 — Fast</span><span>27 — Balanced</span><span>50 — Exhaustive</span>
              </div>
            </div>
          </div>

          {/* Config Summary Chips */}
          <div className="flex items-center gap-2.5 mt-6 pt-5 border-t border-white/5 flex-wrap">
            {[
              { label: depth }, { label: llm }, { label: `${maxSources} sources` },
            ].map(c => (
              <span key={c.label} className="text-[10px] px-2 py-1 rounded-full bg-indigo-600/12 border border-indigo-500/20 text-indigo-300">
                {c.label}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <button
            id="btn-initialize-pipeline"
            onClick={handleRun}
            className="mt-5 w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm transition-all duration-200 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 group"
          >
            <Rocket size={16} className="group-hover:rotate-12 transition-transform duration-200" />
            Initialize Matrix Pipeline
          </button>
        </div>

        <p className="text-center text-[10px] text-white/20 mt-4 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
          Agents: Scout v3.1 · Analyst v2.8 · Editor v2.2 · All systems nominal
        </p>
      </div>
    </div>
  );
}
