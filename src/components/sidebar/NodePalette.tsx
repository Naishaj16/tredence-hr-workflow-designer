import type { NodeType } from '../../types/workflow';

const nodeItems: { type: NodeType; label: string; description: string }[] = [
  { type: 'start', label: 'Start Node', description: 'Workflow entry point' },
  { type: 'task', label: 'Task Node', description: 'Human task / action' },
  { type: 'approval', label: 'Approval Node', description: 'Manager or HR review' },
  { type: 'automated', label: 'Automated Step', description: 'System-triggered action' },
  { type: 'end', label: 'End Node', description: 'Workflow completion' },
];

type Props = {
  onAddNode: (type: NodeType) => void;
};

export const NodePalette = ({ onAddNode }: Props) => {
  return (
    <aside className="flex h-full w-[280px] flex-col border-r border-slate-200 bg-white p-4">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">Tredence</p>
        <h1 className="mt-2 text-xl font-semibold text-slate-900">HR Workflow Designer</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Add custom nodes, configure the selected step, and test the workflow in the sandbox.
        </p>
      </div>

      <div className="space-y-3">
        {nodeItems.map((item) => (
          <button
            key={item.type}
            onClick={() => onAddNode(item.type)}
            className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <div className="text-sm font-semibold text-slate-800">{item.label}</div>
            <div className="mt-1 text-xs leading-5 text-slate-500">{item.description}</div>
          </button>
        ))}
      </div>
    </aside>
  );
};
