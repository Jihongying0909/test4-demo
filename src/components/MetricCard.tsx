import { motion } from 'framer-motion';
export default function MetricCard({ title, value, color = 'text-slate-700' }: { title: string; value: string | number; color?: string }) {
  return <motion.div layout className="bg-white rounded-xl border border-slate-200 p-3"><div className="text-xs text-textSub">{title}</div><div className={`text-lg font-semibold ${color}`}>{value}</div></motion.div>;
}
