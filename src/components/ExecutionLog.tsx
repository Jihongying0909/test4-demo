import { motion, AnimatePresence } from 'framer-motion';

export default function ExecutionLog({ logs = [] }: { logs?: string[] }) {
  const slice = logs.slice(-30);
  return (
    <div className="warm-card p-4 h-44 overflow-auto bg-[#FFFDF9]">
      <div className="text-sm text-[#7C6A5D] mb-2">运行日志</div>
      <AnimatePresence>
        {slice.map((l, i) => (
          <motion.div
            key={`${l}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs p-2 rounded-lg mb-1 ${i === slice.length - 1 ? 'bg-[#FCE7C8] text-[#734C2C]' : 'bg-[#FFF8F0] text-[#6B584A]'}`}
          >
            {l}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
