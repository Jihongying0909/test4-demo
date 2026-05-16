import { motion } from 'framer-motion';
import { Step } from '../types';

export default function BruteForceTree({ step }: { step: Step }) {
  return <div><div className="text-sm text-textSub mb-2">递归树（简化投影）</div><svg width="100%" height="360">{step.treeEdges?.map((e, i) => { const a = step.treeNodes?.find((n) => n.id === e.from); const b = step.treeNodes?.find((n) => n.id === e.to); if (!a || !b) return null; return <g key={i}><line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#cbd5e1" /><text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 4} fill={e.label === 'broken' ? '#f97316' : '#22c55e'} fontSize="10">{e.label}</text></g>; })}{step.treeNodes?.slice(-45).map((n) => <motion.g key={n.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}><rect x={n.x - 28} y={n.y - 14} width="56" height="28" rx="12" fill="#fff" stroke={n.state === 'active' ? '#f59e0b' : '#3b82f6'} /><text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="10" fill="#0f172a">{n.label}</text></motion.g>)}</svg></div>;
}
