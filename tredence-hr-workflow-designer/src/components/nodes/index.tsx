import type { NodeProps } from 'reactflow';
import { BaseNode } from './BaseNode';
import type { WorkflowNodeData } from '../../types/workflow';

export const StartNode = ({ data }: NodeProps<WorkflowNodeData>) => (
  <BaseNode title={data.type === 'start' ? data.title : 'Start'} subtitle="Workflow entry point" badge="Start" />
);

export const TaskNode = ({ data }: NodeProps<WorkflowNodeData>) => (
  <BaseNode
    title={data.type === 'task' ? data.title : 'Task'}
    subtitle={data.type === 'task' ? data.assignee || 'Unassigned human task' : 'Task'}
    badge="Task"
  />
);

export const ApprovalNode = ({ data }: NodeProps<WorkflowNodeData>) => (
  <BaseNode
    title={data.type === 'approval' ? data.title : 'Approval'}
    subtitle={data.type === 'approval' ? `${data.approverRole} approval` : 'Approval step'}
    badge="Approval"
  />
);

export const AutomatedNode = ({ data }: NodeProps<WorkflowNodeData>) => (
  <BaseNode
    title={data.type === 'automated' ? data.title : 'Automation'}
    subtitle={data.type === 'automated' ? data.actionLabel || 'Select action' : 'Automation'}
    badge="Auto"
  />
);

export const EndNode = ({ data }: NodeProps<WorkflowNodeData>) => (
  <BaseNode
    title={data.type === 'end' ? data.endMessage : 'End'}
    subtitle="Workflow completion"
    badge="End"
  />
);
