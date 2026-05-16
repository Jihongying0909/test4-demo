import { motion } from 'framer-motion';
import { PseudoLine } from '../types';

export default function PseudocodePanel({ lines, current, visited }: { lines: PseudoLine[]; current: number; visited: Set<number> }) {
  return (
    <div className="warm-card bg-[#FFF8F0] h-[560px] overflow-auto p-4 rounded-3xl">
      {lines.map((l) => (
        <motion.div
          key={l.line}
          title={l.tip}
          layout
          transition={{ duration: 0.2 }}
          className={`font-mono text-sm rounded-xl px-3 py-2 mb-2 border-l-4 ${
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
