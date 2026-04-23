import { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';
import { NodeFormPanel } from './components/forms/NodeFormPanel';
import { NodePalette } from './components/sidebar/NodePalette';
import { SimulationPanel } from './components/simulation/SimulationPanel';
import { useWorkflow } from './hooks/useWorkflow';
import { getAutomations, simulateWorkflow } from './services/mockApi';
import type { AutomationAction, SimulationResult } from './types/workflow';

const AppShell = () => {
  const workflow = useWorkflow();
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    getAutomations().then(setActions);
  }, []);

  const runSimulation = async () => {
    setIsSimulating(true);
    const result = await simulateWorkflow({ nodes: workflow.nodes, edges: workflow.edges });
    setSimulationResult(result);
    setIsSimulating(false);
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900">
      <NodePalette onAddNode={workflow.addNode} />

      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1">
          <WorkflowCanvas
            nodes={workflow.nodes}
            edges={workflow.edges}
            onNodesChange={workflow.onNodesChange}
            onEdgesChange={workflow.onEdgesChange}
            onConnect={workflow.onConnect}
            onNodeClick={workflow.setSelectedNodeId}
          />
          <NodeFormPanel
            node={workflow.selectedNode}
            automationActions={actions}
            onChangeNode={workflow.updateNodeData}
            onDeleteNode={workflow.deleteSelectedNode}
          />
        </div>
        <SimulationPanel result={simulationResult} isLoading={isSimulating} onSimulate={runSimulation} />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <ReactFlowProvider>
      <AppShell />
    </ReactFlowProvider>
  );
}
