import type { SimulationResult } from '../../types/workflow';

type Props = {
  result: SimulationResult | null;
  isLoading: boolean;
  onSimulate: () => void;
};

export const SimulationPanel = ({ result, isLoading, onSimulate }: Props) => {
  return (
    <div className="border-t border-slate-200 bg-white px-5 py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Workflow Test Sandbox</h3>
          <p className="mt-1 text-xs text-slate-500">Serialize the current graph and run a mock simulation.</p>
        </div>
        <button
          onClick={onSimulate}
          disabled={isLoading}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {isLoading ? 'Simulating...' : 'Run Simulation'}
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        {!result && <p className="text-sm text-slate-500">No simulation run yet.</p>}

        {result && !result.valid && (
          <div>
            <p className="text-sm font-semibold text-rose-600">Validation failed</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {result.errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {result && result.valid && (
          <div>
            <p className="text-sm font-semibold text-emerald-600">Simulation successful</p>
            <ol className="mt-3 space-y-2 text-sm text-slate-700">
              {result.steps.map((step, index) => (
                <li key={index} className="rounded-xl bg-white px-3 py-2 shadow-sm">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};
