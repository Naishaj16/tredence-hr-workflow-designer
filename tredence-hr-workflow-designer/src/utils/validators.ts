import type { Edge } from 'reactflow';
import type { WorkflowNode } from '../types/workflow';

export const validateWorkflow = (nodes: WorkflowNode[], edges: Edge[]) => {
  const errors: string[] = [];
  const startNodes = nodes.filter((node) => node.type === 'start');
  const endNodes = nodes.filter((node) => node.type === 'end');

  if (startNodes.length === 0) errors.push('A workflow must contain one Start node.');
  if (startNodes.length > 1) errors.push('Only one Start node is allowed.');
  if (endNodes.length === 0) errors.push('A workflow should contain at least one End node.');

  const incoming = new Map<string, number>();
  const outgoing = new Map<string, number>();

  nodes.forEach((node) => {
    incoming.set(node.id, 0);
    outgoing.set(node.id, 0);
  });

  edges.forEach((edge) => {
    outgoing.set(edge.source, (outgoing.get(edge.source) ?? 0) + 1);
    incoming.set(edge.target, (incoming.get(edge.target) ?? 0) + 1);
  });

  nodes.forEach((node) => {
    if (node.type === 'start' && (incoming.get(node.id) ?? 0) > 0) {
      errors.push('Start node cannot have incoming connections.');
    }
    if (node.type === 'end' && (outgoing.get(node.id) ?? 0) > 0) {
      errors.push('End node cannot have outgoing connections.');
    }
    if (node.type !== 'start' && (incoming.get(node.id) ?? 0) === 0) {
      errors.push(`${labelForNode(node)} is not connected from a previous step.`);
    }
    if (node.type !== 'end' && (outgoing.get(node.id) ?? 0) === 0) {
      errors.push(`${labelForNode(node)} does not connect to a next step.`);
    }
  });

  if (hasCycle(nodes, edges)) {
    errors.push('Workflow contains a cycle.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const labelForNode = (node: WorkflowNode) => {
  switch (node.data.type) {
    case 'start':
      return node.data.title || 'Start node';
    case 'task':
      return node.data.title || 'Task node';
    case 'approval':
      return node.data.title || 'Approval node';
    case 'automated':
      return node.data.title || 'Automated node';
    case 'end':
      return node.data.endMessage || 'End node';
  }
};

const hasCycle = (nodes: WorkflowNode[], edges: Edge[]) => {
  const adjacency = new Map<string, string[]>();
  nodes.forEach((node) => adjacency.set(node.id, []));
  edges.forEach((edge) => adjacency.get(edge.source)?.push(edge.target));

  const visiting = new Set<string>();
  const visited = new Set<string>();

  const dfs = (nodeId: string): boolean => {
    if (visiting.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;

    visiting.add(nodeId);
    for (const neighbor of adjacency.get(nodeId) ?? []) {
      if (dfs(neighbor)) return true;
    }
    visiting.delete(nodeId);
    visited.add(nodeId);
    return false;
  };

  for (const node of nodes) {
    if (dfs(node.id)) return true;
  }

  return false;
};
