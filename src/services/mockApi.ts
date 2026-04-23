import type { AutomationAction, SimulationResult, WorkflowEdge, WorkflowNode } from '../types/workflow';
import { validateWorkflow } from '../utils/validators';

const actions: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'create_ticket', label: 'Create Service Ticket', params: ['queue', 'priority'] },
];

export const getAutomations = async (): Promise<AutomationAction[]> => {
  await sleep(300);
  return actions;
};

export const simulateWorkflow = async (payload: {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}): Promise<SimulationResult> => {
  await sleep(500);
  const validation = validateWorkflow(payload.nodes, payload.edges);

  if (!validation.isValid) {
    return {
      valid: false,
      errors: validation.errors,
      steps: [],
    };
  }

  const steps = payload.nodes
    .slice()
    .sort((a, b) => a.position.x - b.position.x)
    .map((node, index) => `${index + 1}. ${stepDescription(node)}`);

  return {
    valid: true,
    errors: [],
    steps,
  };
};

const stepDescription = (node: WorkflowNode) => {
  switch (node.data.type) {
    case 'start':
      return `Start workflow: ${node.data.title}`;
    case 'task':
      return `Task assigned to ${node.data.assignee || 'TBD'} – ${node.data.title}`;
    case 'approval':
      return `Approval required from ${node.data.approverRole} – ${node.data.title}`;
    case 'automated':
      return `Automated action: ${node.data.actionLabel || 'No action selected'}`;
    case 'end':
      return `End workflow: ${node.data.endMessage}`;
  }
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
