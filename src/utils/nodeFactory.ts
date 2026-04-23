import type { Position } from 'reactflow';
import type { NodeType, WorkflowNode, WorkflowNodeData } from '../types/workflow';

const baseNode = (id: string, position: { x: number; y: number }, data: WorkflowNodeData): WorkflowNode => ({
  id,
  type: data.type,
  position,
  sourcePosition: 'right' as Position,
  targetPosition: 'left' as Position,
  data,
});

export const createNode = (type: NodeType, position: { x: number; y: number }, id: string): WorkflowNode => {
  switch (type) {
    case 'start':
      return baseNode(id, position, { type: 'start', title: 'Workflow Start', metadata: [] });
    case 'task':
      return baseNode(id, position, {
        type: 'task',
        title: 'Collect Documents',
        description: '',
        assignee: '',
        dueDate: '',
        customFields: [],
      });
    case 'approval':
      return baseNode(id, position, {
        type: 'approval',
        title: 'Manager Approval',
        approverRole: 'Manager',
        autoApproveThreshold: 0,
      });
    case 'automated':
      return baseNode(id, position, {
        type: 'automated',
        title: 'Automated Action',
        actionId: '',
        actionLabel: '',
        actionParams: {},
      });
    case 'end':
      return baseNode(id, position, { type: 'end', endMessage: 'Workflow Completed', summaryFlag: true });
    default:
      return baseNode(id, position, { type: 'task', title: 'Task', description: '', assignee: '', dueDate: '', customFields: [] });
  }
};
