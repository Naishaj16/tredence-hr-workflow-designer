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
    <div className="h-full flex-1 bg-[#F8FAFC]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onNodeClick={(_, node) => onNodeClick(node.id)}
        defaultEdgeOptions={{
          style: { stroke: '#94a3b8', strokeWidth: 2 },
          animated: true,
        }}
      >
        <Background color="#cbd5e1" gap={24} size={1} />
        <Controls className="!bg-white !border-slate-200 !shadow-xl !rounded-xl overflow-hidden" />
        <MiniMap 
          pannable 
          zoomable 
          className="!bg-white !border-slate-200 !shadow-xl !rounded-xl"
          nodeColor={(node) => {
            const type = node.data?.type;
            switch (type) {
              case 'start': return '#10b981';
              case 'task': return '#6366f1';
              case 'approval': return '#f59e0b';
              case 'automated': return '#a855f7';
              case 'end': return '#f43f5e';
              default: return '#94a3b8';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};
