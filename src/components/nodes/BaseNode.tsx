import { Handle, Position } from 'reactflow';

type Props = {
  title: string;
  subtitle: string;
  badge: string;
};

export const BaseNode = ({ title, subtitle, badge }: Props) => {
  return (
    <div className="min-w-[180px] rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <Handle type="target" position={Position.Left} className="!h-3 !w-3 !bg-slate-500" />
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-900">{title}</span>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-600">
          {badge}
        </span>
      </div>
      <p className="text-xs leading-5 text-slate-500">{subtitle}</p>
      <Handle type="source" position={Position.Right} className="!h-3 !w-3 !bg-indigo-500" />
    </div>
  );
};
