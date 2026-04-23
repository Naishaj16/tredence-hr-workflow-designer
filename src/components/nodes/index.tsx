import type { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import type { WorkflowNodeData } from '../../types/workflow';
import { Play, ClipboardList, ShieldCheck, Zap, Flag } from 'lucide-react';

export const StartNode = ({ data, selected }: NodeProps<WorkflowNodeData>) => (
  <BaseNode 
    title={data.type === 'start' ? data.title : 'Start'} 
    subtitle="Workflow entry point" 
    badge="Start" 
    icon={Play}
    selected={selected}
    color="emerald"
  />
);

export const TaskNode = ({ data, selected }: NodeProps<WorkflowNodeData>) => (
  <BaseNode
    title={data.type === 'task' ? data.title : 'Task'}
    subtitle={data.type === 'task' ? data.assignee || 'Unassigned human task' : 'Task'}
    badge="Task"
    icon={ClipboardList}
    selected={selected}
    color="indigo"
  />
);

export const ApprovalNode = ({ data, selected }: NodeProps<WorkflowNodeData>) => (
  <BaseNode
    title={data.type === 'approval' ? data.title : 'Approval'}
    subtitle={data.type === 'approval' ? `${data.approverRole} approval` : 'Approval step'}
    badge="Approval"
    icon={ShieldCheck}
    selected={selected}
    color="amber"
  />
);

export const AutomatedNode = ({ data, selected }: NodeProps<WorkflowNodeData>) => (
  <BaseNode
    title={data.type === 'automated' ? data.title : 'Automation'}
    subtitle={data.type === 'automated' ? data.actionLabel || 'Select action' : 'Automation'}
    badge="Auto"
    icon={Zap}
    selected={selected}
    color="purple"
  />
);

export const EndNode = ({ data, selected }: NodeProps<WorkflowNodeData>) => (
  <BaseNode
    title={data.type === 'end' ? data.endMessage : 'End'}
    subtitle="Workflow completion"
    badge="End"
    icon={Flag}
    selected={selected}
    color="rose"
  />
);

