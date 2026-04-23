import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Target, ShieldCheck, Sparkles } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const WelcomeModal = ({ isOpen, onClose }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
                <Zap size={32} fill="currentColor" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome to Workflow Designer</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                This project was built for the Tredence Intern Case Study. It demonstrates proficiency in React Flow, 
                state management, and enterprise-grade UI architecture.
              </p>

              <div className="mt-8 grid w-full grid-cols-1 gap-4 text-left">
                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Target size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Visual Orchestration</p>
                    <p className="mt-0.5 text-xs text-slate-500 italic">Drag-and-drop HR process modeling with custom nodes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Simulation Engine</p>
                    <p className="mt-0.5 text-xs text-slate-500 italic">Validate flow integrity and mock automated service calls.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Recruiter-Ready UI</p>
                    <p className="mt-0.5 text-xs text-slate-500 italic">Premium aesthetics with glassmorphism and fluid animations.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-8 w-full rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white transition hover:bg-slate-800 active:scale-[0.98] shadow-lg shadow-slate-900/10"
              >
                Let's Get Started
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
