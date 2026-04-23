import { Handle, Position } from 'reactflow';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

type Props = {
  title: string;
  subtitle: string;
  badge: string;
  icon: LucideIcon;
  selected?: boolean;
  color?: string;
};

export const BaseNode = ({ title, subtitle, badge, icon: Icon, selected, color = 'indigo' }: Props) => {
  return (
    <div 
      className={cn(
        "min-w-[220px] rounded-2xl border bg-white/90 px-4 py-4 shadow-xl transition-all duration-300 backdrop-blur-sm",
        selected ? "border-indigo-500 ring-2 ring-indigo-500/20 shadow-indigo-100" : "border-slate-200"
      )}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!h-3 !w-3 !-left-1.5 !border-2 !border-white !bg-slate-400 hover:!scale-125 transition-transform" 
      />
      
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50", `text-${color}-600`)}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {badge}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-semibold tracking-tight text-slate-900">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{subtitle}</p>
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className={cn(
          "!h-3 !w-3 !-right-1.5 !border-2 !border-white hover:!scale-125 transition-transform",
          `!bg-${color}-500`
        )} 
      />
    </div>
  );
};

