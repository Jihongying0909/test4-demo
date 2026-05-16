import { motion } from 'framer-motion';
import { Step } from '../types';

export default function ReachArrayView({ step }: { step: Step }) {
  const arr = step.reach ?? [];
  return <div><div className="text-sm mb-2">reach[k] ← reach[k] + reach[k-1] + 1</div><div className="flex gap-2">{arr.map((v, i) => <motion.div key={i} animate={{ scale: step.currentState.eggs === i ? [1, 1.08, 1] : 1 }} className={`px-3 py-2 rounded-lg border ${step.currentState.eggs === i ? 'border-cyan-400 bg-cyan-50' : 'border-slate-200 bg-white'}`}>k{i}:{v}</motion.div>)}</div></div>;
}
