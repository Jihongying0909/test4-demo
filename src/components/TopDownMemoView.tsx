import { motion } from 'framer-motion';
import { Step } from '../types';

export default function TopDownMemoView({ step }: { step: Step }) {
  const rows = Object.entries(step.memo ?? {});

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
      <div className="warm-subcard p-3">
        <div className="text-sm text-[#7C6A5D]">递归路径</div>
        <div className="text-sm mt-2 text-[#5B4638] break-all">{step.callStack?.join(' → ') || '-'}</div>
      </div>
      <div className="warm-subcard p-3">
        <div className="text-sm text-[#7C6A5D] mb-2">Memo 表</div>
        {rows.map(([k, v]) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className={`grid grid-cols-4 gap-2 text-xs p-2 mb-1 rounded-lg border ${v.status === 'hit' ? 'bg-[#EFF7EC] border-[#8DAA91]' : 'bg-[#FFFDF9] border-[#E7D9C8]'}`}
          >
            <span>({k})</span><span>{v.trials}</span><span>{v.floor}</span><span className="text-[#7A5A93]">{v.status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
