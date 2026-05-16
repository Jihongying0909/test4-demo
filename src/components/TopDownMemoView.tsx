import { motion } from 'framer-motion';
import { Step } from '../types';

export default function TopDownMemoView({ step }: { step: Step }) {
  const rows = Object.entries(step.memo ?? {});
  return <div className="grid grid-cols-2 gap-3"><div className="border border-slate-200 rounded-xl p-2"><div className="text-sm text-textSub">递归树</div><div className="text-sm mt-2">当前栈：{step.callStack?.join(' -> ') || '-'}</div></div><div className="border border-slate-200 rounded-xl p-2"><div className="text-sm text-textSub mb-2">memo 表</div>{rows.map(([k, v]) => <motion.div key={k} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-4 gap-2 text-xs p-2 mb-1 rounded-lg bg-slate-50"><span>({k})</span><span>{v.trials}</span><span>{v.floor}</span><span className="text-violet-600">{v.status}</span></motion.div>)}</div></div>;
}
