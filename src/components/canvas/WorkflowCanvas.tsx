import ReactFlow, { Background, Controls, MiniMap, type Connection, type Edge, type EdgeChange, type NodeChange } from 'reactflow';
import 'reactflow/dist/style.css';
import type { WorkflowNode } from '../../types/workflow';
import { ApprovalNode, AutomatedNode, EndNode, StartNode, TaskNode } from '../nodes';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

type Props = {
  nodes: WorkflowNode[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  onNodeClick: (nodeId: string) => void;
};

export const WorkflowCanvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onNodeClick }: Props) => {
  return (
    <div className="h-full flex-1 bg-slate-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onNodeClick={(_, node) => onNodeClick(node.id)}
      >
        <Background gap={20} size={1} />
        <Controls />
        <MiniMap pannable zoomable />
      </ReactFlow>
    </div>
  );
};
