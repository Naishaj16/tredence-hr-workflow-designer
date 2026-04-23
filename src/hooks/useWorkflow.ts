import { useCallback, useMemo, useRef, useState } from 'react';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type NodeChange,
} from 'reactflow';
import type { NodeType, WorkflowNode } from '../types/workflow';
import { createNode } from '../utils/nodeFactory';

const initialNodes: WorkflowNode[] = [
  createNode('start', { x: 80, y: 220 }, 'start-1'),
  createNode('task', { x: 360, y: 220 }, 'task-1'),
  createNode('end', { x: 660, y: 220 }, 'end-1'),
];

const initialEdges: Edge[] = [
  { id: 'e1', source: 'start-1', target: 'task-1', animated: true },
  { id: 'e2', source: 'task-1', target: 'end-1' },
];

export const useWorkflow = () => {
  const idRef = useRef(10);
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  );

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((current) => applyNodeChanges(changes, current) as WorkflowNode[]);
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((current) => applyEdgeChanges(changes, current));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((current) => addEdge({ ...connection, animated: false }, current));
  }, []);

  const addNode = useCallback((type: NodeType) => {
    const id = `${type}-${idRef.current++}`;
    const position = { x: 180 + Math.random() * 250, y: 80 + Math.random() * 320 };
    setNodes((current) => [...current, createNode(type, position, id)]);
  }, []);

  const updateNodeData = useCallback((nodeId: string, updater: (node: WorkflowNode) => WorkflowNode) => {
    setNodes((current) => current.map((node) => (node.id === nodeId ? updater(node) : node)));
  }, []);

  const deleteSelectedNode = useCallback(() => {
    if (!selectedNodeId) return;
    setNodes((current) => current.filter((node) => node.id !== selectedNodeId));
    setEdges((current) => current.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId));
    setSelectedNodeId(null);
  }, [selectedNodeId]);

  return {
    nodes,
    edges,
    selectedNode,
    selectedNodeId,
    setSelectedNodeId,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
    deleteSelectedNode,
  };
};
