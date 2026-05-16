import { Step } from '../types';

export default function BottomUpTableView({ step, tab, setTab }: { step: Step; tab: 'table' | 'reach'; setTab: (v: 'table' | 'reach') => void }) {
  const dp = step.dpTable ?? [];

  return (
    <div>
      <div className="text-sm font-semibold soft-title mb-2">动态规划可视化面板</div>
      <div className="warm-subcard p-3 mb-3 text-xs text-[#5a5075] leading-6">
        <div className="font-mono">dp[e][f] = min( 1 + max(dp[e-1][x-1], dp[e][f-x]) )</div>
        <div className="font-mono mt-1">reach[k] = reach[k] + reach[k-1] + 1</div>
        <div className="mt-1">当前状态：e={step.currentState.eggs}, f={step.currentState.floors}, x={step.x ?? '-'}</div>
      </div>

      <div className="mb-3">
        <button onClick={() => setTab('table')} className={`px-3 py-1 rounded-xl mr-2 border ${tab === 'table' ? 'soft-purple' : 'bg-[#FFF8F0] border-[#E7D9C8] text-[#7C6A5D]'}`}>二维 DP 表</button>
        <button onClick={() => setTab('reach')} className={`px-3 py-1 rounded-xl border ${tab === 'reach' ? 'soft-blue' : 'bg-[#FFF8F0] border-[#E7D9C8] text-[#7C6A5D]'}`}>一维 Reach</button>
      </div>

      {tab === 'table' ? (
        <div className="overflow-auto max-h-[440px] warm-subcard p-2">
          <table className="text-xs border-collapse">
            <tbody>
              {dp.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => {
                    const isCurrent = step.currentState.eggs === i && step.currentState.floors === j;
                    const isDepA = step.x !== undefined && i === step.currentState.eggs - 1 && j === step.x - 1;
                    const isDepB = step.x !== undefined && i === step.currentState.eggs && j === step.currentState.floors - step.x;
                    return (
                      <td
                        key={j}
                        className={`border px-2 py-1 transition-colors duration-300 min-w-8 text-center ${
                          isCurrent
                            ? 'bg-[#fce7f3] border-[#f5cfe4] font-semibold'
                            : isDepA
                              ? 'bg-[#efe9ff] border-[#ddd0ff]'
                              : isDepB
                                ? 'bg-[#e8f2ff] border-[#cfe0ff]'
                                : 'bg-[#FFFDF9] border-[#E7D9C8]'
                        }`}
                      >
                        {c}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-sm text-[#7C6A5D] warm-subcard p-4">切换到算法“一维优化 Reach”可查看数组逐轮实时更新。</div>
      )}
    </div>
  );
}
