import { Step } from '../types';

function lineExplain(step?: Step) {
  if (!step) return '暂无步骤';
  const { pseudoLine, x, broken, safe, worst, best, bestFloor, currentState } = step;
  const k = currentState.eggs;
  const n = currentState.floors;

  const map: Record<number, string> = {
    1: `检查边界：当 N=0 时直接返回 0。当前状态为 T(${k},${n})。`,
    2: `检查边界：当 N=1 时返回 1。`,
    3: `检查边界：当 K=1 时只能线性试探，返回 N。`,
    4: '初始化最优次数变量（如 minTrials 或 best）为无穷大。',
    5: '初始化最优楼层（如 bestFloor 或 bestX）为 1。',
    6: `进入枚举循环，当前尝试楼层 x=${x ?? '-'}。`,
    7: `准备计算 broken 分支：T(K-1,x-1)。当前 x=${x ?? '-'}。`,
    8: `准备计算 safe 分支：T(K,N-x)。当前 x=${x ?? '-'}。`,
    9: `计算 worst：1 + max(broken, safe) = 1 + max(${broken ?? '-'}, ${safe ?? '-'}) = ${worst ?? '-'}`,
    10: `比较是否更新最优：当前 worst=${worst ?? '-'}，best=${best ?? '-'}`,
    11: `更新最优次数为 ${best ?? '-'}。`,
    12: `更新最优楼层为 ${bestFloor ?? '-'}。`,
    13: `返回结果：次数=${best ?? step.returnValue ?? '-'}，首投楼层=${bestFloor ?? '-'}。`,
    14: '将当前状态写入 dp/memo 表。',
    15: '写入 choice 表或返回 memo 结果。',
    16: '返回最终 DP 结果。',
  };

  return map[pseudoLine] ?? step.description;
}

export default function StepExplanation({ step }: { step?: Step }) {
  const logs = step?.logs ?? [];
  const latest = logs.slice(-3);

  return (
    <div className="warm-card bg-[#FFF8F0] p-4">
      <div className="text-sm font-semibold soft-title">当前步骤解释</div>
      <div className="mt-2 text-sm text-[#4B3A2F] leading-7">{lineExplain(step)}</div>
      <div className="mt-3 warm-subcard p-2">
        <div className="text-xs soft-sub mb-1">最近日志</div>
        {latest.length === 0 ? <div className="text-xs text-[#7a6f98]">暂无</div> : latest.map((l, i) => <div key={`${l}-${i}`} className="text-xs text-[#5d5378] leading-6">{l}</div>)}
      </div>
    </div>
  );
}
