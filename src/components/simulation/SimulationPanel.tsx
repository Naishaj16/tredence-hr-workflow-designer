import type { SimulationResult } from '../../types/workflow';
import { Activity, Play, AlertCircle, CheckCircle, Terminal } from 'lucide-react';
import { cn } from '../../utils/cn';

type Props = {
  result: SimulationResult | null;
  isLoading: boolean;
  onSimulate: () => void;
};

export const SimulationPanel = ({ result, isLoading, onSimulate }: Props) => {
  return (
    <div className="border-t border-slate-200 bg-white/50 backdrop-blur-sm px-6 py-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Workflow Simulation Sandbox</h3>
            <p className="mt-0.5 text-xs font-medium text-slate-500 italic">Validating graph integrity and executing automated logic.</p>
          </div>
        </div>
        <button
          onClick={onSimulate}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-60 shadow-lg shadow-slate-900/10"
        >
          {isLoading ? (
            <span className="flex items-center gap-2 italic">
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Processing...
            </span>
          ) : (
            <>
              <Play size={16} fill="currentColor" />
              Run Simulation
            </>
          )}
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 font-mono shadow-inner min-h-[140px]">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
          <Terminal size={14} className="text-slate-500" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Execution Logs</span>
        </div>

        {!result && (
          <div className="flex flex-col items-center justify-center py-4 text-slate-600 italic">
            <p className="text-xs">Waiting for execution instructions...</p>
          </div>
        )}

        {result && !result.valid && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 text-rose-400 mb-4">
              <AlertCircle size={16} />
              <p className="text-xs font-bold uppercase tracking-tight">Critical Validation Failure</p>
            </div>
            <ul className="space-y-2">
              {result.errors.map((error, index) => (
                <li key={index} className="text-xs text-rose-300/80 leading-relaxed pl-6 relative">
                  <span className="absolute left-0 text-rose-500/50">[{index + 1}]</span>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {result && result.valid && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-2 text-emerald-400 mb-4">
              <CheckCircle size={16} />
              <p className="text-xs font-bold uppercase tracking-tight">Sequence Execution Successful</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.steps.map((step, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 transition-all hover:border-slate-700 group">
                  <span className="text-[10px] font-bold text-slate-600 group-hover:text-emerald-500 transition-colors">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[11px] text-slate-300 truncate">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

