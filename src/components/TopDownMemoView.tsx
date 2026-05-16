import { motion } from 'framer-motion';
import { Step } from '../types';

function parseStateKey(key: string) {
  const [e, f] = key.split(',').map((x) => Number(x));
  return { e, f };
}

export default function TopDownMemoView({ step }: { step: Step }) {
  const rows = Object.entries(step.memo ?? {});
  const stack = step.callStack ?? [];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
      <div className="warm-subcard p-3">
        <div className="text-lg font-semibold soft-title mb-2">递归路径（带记忆化）</div>
        <div className="overflow-auto max-h-[320px] pr-1">
          {stack.length === 0 ? (
            <div className="text-xs soft-sub">当前没有递归调用。</div>
          ) : (
            <div className="space-y-2">
              {stack.map((node, i) => (
                <div key={`${node}-${i}`} className="flex items-center gap-2" style={{ marginLeft: `${i * 14}px` }}>
                  <span className={`px-2 py-1 rounded-lg border text-xs ${i === stack.length - 1 ? 'soft-pink' : 'soft-blue'}`}>
                    {node}
                  </span>
                  {i < stack.length - 1 && <span className="text-xs soft-sub">→</span>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-3 text-xs soft-sub">
          自顶向下 DP 仍是递归树，只是遇到重复状态会直接走 memo，不再展开子树。
        </div>
      </div>

      <div className="warm-subcard p-3">
        <div className="text-lg font-semibold soft-title mb-2">Memo 缓存表</div>
        <div className="grid grid-cols-4 gap-2 text-[11px] soft-sub mb-2 px-1">
          <span>(K,N)</span><span>最少次数</span><span>首投楼层</span><span>状态</span>
        </div>
        <div className="overflow-auto max-h-[320px] pr-1">
          {rows.map(([k, v]) => {
            const { e, f } = parseStateKey(k);
            return (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`grid grid-cols-4 gap-2 text-xs p-2 mb-1 rounded-lg border ${v.status === 'hit' ? 'bg-[#fce7f3] border-[#f5cfe4]' : 'bg-[#FFFDF9] border-[#E7D9C8]'}`}
              >
                <span>({e},{f})</span>
                <span>{v.trials}</span>
                <span>{v.floor}</span>
                <span className={v.status === 'hit' ? 'text-[#8a4f73]' : 'text-[#5f4c95]'}>{v.status === 'hit' ? '缓存命中' : '新计算'}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
