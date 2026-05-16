import { motion } from 'framer-motion';
import { PseudoLine } from '../types';

export default function PseudocodePanel({ lines, current, visited }: { lines: PseudoLine[]; current: number; visited: Set<number> }) {
  return (
    <div className="warm-card bg-[#FFF8F0] h-[520px] overflow-auto p-4 rounded-2xl">
      <div className="text-sm font-semibold text-[#7C6A5D] mb-2">伪代码</div>
      {lines.map((l) => (
        <motion.div
          key={l.line}
          title={l.tip}
          layout
          transition={{ duration: 0.2 }}
          className={`font-mono text-sm rounded-lg px-3 py-1.5 mb-1 border-l-4 ${
            current === l.line
              ? 'bg-[#FCE7C8] border-l-[#D97706] text-[#4B3A2F]'
              : visited.has(l.line)
                ? 'bg-[#F3EDE4] border-l-transparent text-[#6B5A4D]'
                : 'bg-transparent border-l-transparent text-[#5E4A3D]'
          }`}
        >
          <span className="text-[#A08B7A] mr-3">{l.line}</span>
          {l.text}
        </motion.div>
      ))}
    </div>
  );
}
