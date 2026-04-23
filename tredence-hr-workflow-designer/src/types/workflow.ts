import type { Node, Edge } from 'reactflow';

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export type KeyValue = {
  key: string;
  value: string;
};

export type AutomationAction = {
  id: string;
  label: string;
  params: string[];
};

export type StartNodeData = {
  type: 'start';
  title: string;
  metadata: KeyValue[];
};

export type TaskNodeData = {
  type: 'task';
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: KeyValue[];
};

export type ApprovalNodeData = {
  type: 'approval';
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
};

export type AutomatedNodeData = {
  type: 'automated';
  title: string;
  actionId: string;
  actionLabel: string;
  actionParams: Record<string, string>;
};

export type EndNodeData = {
  type: 'end';
  endMessage: string;
  summaryFlag: boolean;
};

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export type SimulationResult = {
  valid: boolean;
  errors: string[];
  steps: string[];
};
