import { motion } from 'framer-motion';
import { PseudoLine } from '../types';

export default function PseudocodePanel({ lines, current, visited }: { lines: PseudoLine[]; current: number; visited: Set<number> }) {
  return <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 h-[540px] overflow-auto">{lines.map((l) => <motion.div key={l.line} title={l.tip} className={`font-mono text-sm rounded-lg px-2 py-1 mb-1 ${current === l.line ? 'bg-cyan-100 border-l-4 border-cyan-500' : visited.has(l.line) ? 'bg-emerald-50' : ''}`} layout><span className="text-slate-400 mr-2">{l.line}</span>{l.text}</motion.div>)}</div>;
}
