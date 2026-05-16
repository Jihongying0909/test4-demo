import { motion } from 'framer-motion';
import { Step } from '../types';

export default function ReachArrayView({ step }: { step: Step }) {
  const arr = step.reach ?? [];
  const currentK = step.currentState.eggs;
  const depK = currentK - 1;
  const m = step.best ?? 0;
  const targetN = step.currentState.floors;
  const cover = arr.length > 0 ? arr[arr.length - 1] : 0;

  return (
    <div className="warm-subcard p-3">
      <div className="text-lg font-semibold soft-title mb-2">一维 Reach 表（实时更新）</div>
      <div className="text-xs soft-sub mb-2">
        {`reach[k] = reach[k] + reach[k-1] + 1，当前 m=${m}，覆盖进度 ${cover}/${targetN}`}
      </div>

      <div className="overflow-auto">
        <table className="text-xs border-collapse min-w-[520px]">
          <thead>
            <tr>
              <th className="border border-[#E7D9C8] px-2 py-1 text-[#7a6f98]">k</th>
              {arr.map((_, i) => (
                <th key={i} className="border border-[#E7D9C8] px-2 py-1 text-[#7a6f98] min-w-14">
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-[#E7D9C8] px-2 py-1 text-[#7a6f98]">reach[k]</th>
              {arr.map((v, i) => {
                const isCurrent = i === currentK;
                const isDep = i === depK;
                return (
                  <motion.td
                    key={i}
                    animate={{ scale: isCurrent ? [1, 1.08, 1] : 1 }}
                    transition={{ duration: 0.25 }}
                    className={`border px-2 py-2 text-center ${
                      isCurrent
                        ? 'bg-[#e8f2ff] border-[#60a5fa] text-[#2d4f77] font-semibold'
                        : isDep
                          ? 'bg-[#fce7f3] border-[#f5cfe4] text-[#7a4a69]'
                          : 'bg-[#FFFDF9] border-[#E7D9C8] text-[#5E4A3D]'
                    }`}
                  >
                    {v}
                  </motion.td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex flex-wrap gap-3 text-xs soft-sub">
        <span className="inline-flex items-center gap-1"><i className="w-3 h-3 rounded bg-[#e8f2ff] border border-[#60a5fa]" />当前更新项 reach[k]</span>
        <span className="inline-flex items-center gap-1"><i className="w-3 h-3 rounded bg-[#fce7f3] border border-[#f5cfe4]" />依赖项 reach[k-1]</span>
      </div>
    </div>
  );
}
