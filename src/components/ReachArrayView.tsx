import { motion } from 'framer-motion';
import { Step } from '../types';

export default function ReachArrayView({ step }: { step: Step }) {
  const arr = step.reach ?? [];
  return (
    <div className="warm-subcard p-3">
      <div className="text-sm mb-2 text-[#7C6A5D]">reach[k] ← reach[k] + reach[k-1] + 1</div>
      <div className="flex flex-wrap gap-2">
        {arr.map((v, i) => (
          <motion.div
            key={i}
            animate={{ scale: step.currentState.eggs === i ? [1, 1.08, 1] : 1 }}
            className={`px-3 py-2 rounded-xl border text-sm ${step.currentState.eggs === i ? 'border-[#D97706] bg-[#FCE7C8] text-[#7B4C2C]' : 'border-[#E7D9C8] bg-[#FFFDF9] text-[#5E4A3D]'}`}
          >
            k{i}: {v}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
