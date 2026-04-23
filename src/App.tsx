import { useEffect, useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';
import { NodeFormPanel } from './components/forms/NodeFormPanel';
import { NodePalette } from './components/sidebar/NodePalette';
import { SimulationPanel } from './components/simulation/SimulationPanel';
import { useWorkflow } from './hooks/useWorkflow';
import { getAutomations, simulateWorkflow } from './services/mockApi';
import type { AutomationAction, SimulationResult } from './types/workflow';
import { Layout, Save, Share2 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeModal } from './components/modals/WelcomeModal';

const AppShell = () => {
  const workflow = useWorkflow();
  const [actions, setActions] = useState<AutomationAction[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);


  useEffect(() => {
    getAutomations().then(setActions);
    toast.success('Welcome to HR Workflow Designer', {
      description: 'You can now start building your automation flows.',
    });
  }, []);

  const runSimulation = async () => {
    setIsSimulating(true);
    const result = await simulateWorkflow({ nodes: workflow.nodes, edges: workflow.edges });
    setSimulationResult(result);
    setIsSimulating(false);
    
    if (result.valid) {
      toast.success('Simulation Complete', {
        description: 'Workflow logic is valid and ready for deployment.',
      });
    } else {
      toast.error('Validation Failed', {
        description: `Found ${result.errors.length} issues in the workflow.`,
      });
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-['Outfit']">
      <Toaster position="top-right" richColors />
      <WelcomeModal isOpen={showWelcome} onClose={() => setShowWelcome(false)} />
      
      <motion.div 

        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      >
        <NodePalette onAddNode={workflow.addNode} />
      </motion.div>

      <main className="flex min-w-0 flex-1 flex-col relative">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 z-10">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Environment: Sandbox</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50">
              <Layout size={14} />
              Auto Layout
            </button>
            <button 
              onClick={() => toast.info('Publishing feature is in demo mode.')}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-700 shadow-md shadow-indigo-200"
            >
              <Save size={14} />
              Publish Workflow
            </button>
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <button className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition">
              <Share2 size={16} />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <WorkflowCanvas
            nodes={workflow.nodes}
            edges={workflow.edges}
            onNodesChange={workflow.onNodesChange}
            onEdgesChange={workflow.onEdgesChange}
            onConnect={workflow.onConnect}
            onNodeClick={workflow.setSelectedNodeId}
          />
          
          <AnimatePresence mode="wait">
            {workflow.selectedNode && (
              <motion.div
                key={workflow.selectedNode.id}
                initial={{ x: 360, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 360, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              >
                <NodeFormPanel
                  node={workflow.selectedNode}
                  automationActions={actions}
                  onChangeNode={workflow.updateNodeData}
                  onDeleteNode={workflow.deleteSelectedNode}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!workflow.selectedNode && (
            <div className="h-full w-[360px] border-l border-slate-100 bg-white/50 p-8 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                <Layout size={24} />
              </div>
              <p className="text-sm font-bold text-slate-900">No Step Selected</p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Click on a node in the canvas to configure its properties and logic.
              </p>
            </div>
          )}
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

