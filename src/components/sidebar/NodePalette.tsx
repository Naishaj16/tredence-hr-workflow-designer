import type { NodeType } from '../../types/workflow';
import { Play, ClipboardList, ShieldCheck, Zap, Flag, MousePointer2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const nodeItems: { type: NodeType; label: string; description: string; icon: any; color: string }[] = [
  { type: 'start', label: 'Start Node', description: 'Entry point', icon: Play, color: 'emerald' },
  { type: 'task', label: 'Task Node', description: 'Human task', icon: ClipboardList, color: 'indigo' },
  { type: 'approval', label: 'Approval Node', description: 'Review step', icon: ShieldCheck, color: 'amber' },
  { type: 'automated', label: 'Automated Step', description: 'System action', icon: Zap, color: 'purple' },
  { type: 'end', label: 'End Node', description: 'Completion', icon: Flag, color: 'rose' },
];

type Props = {
  onAddNode: (type: NodeType) => void;
};

export const NodePalette = ({ onAddNode }: Props) => {
  return (
    <aside className="flex h-full w-[300px] flex-col border-r border-slate-200 bg-white/80 backdrop-blur-md p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-xl bg-indigo-600 flex items-center justify-center">
            <Zap className="text-white" size={18} fill="currentColor" />
          </div>
          <p className="text-sm font-bold tracking-tight text-slate-900">Tredence AI</p>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Workflow Designer</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Build enterprise-grade HR automation workflows with a drag-and-drop experience.
        </p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">Node Components</p>
        {nodeItems.map((item) => (
          <button
            key={item.type}
            onClick={() => onAddNode(item.type)}
            className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 p-4 text-left transition-all duration-300 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300", `bg-${item.color}-50 group-hover:bg-${item.color}-100`, `text-${item.color}-600`)}>
                <item.icon size={20} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">{item.label}</div>
                <div className="mt-0.5 text-xs font-medium text-slate-400">{item.description}</div>
              </div>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
              <MousePointer2 size={14} className="text-indigo-400" />
            </div>
          </button>
        ))}
      </div>


    </aside>
  );
};

