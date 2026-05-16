import { Step } from '../types';

export default function BottomUpTableView({ step, tab, setTab }: { step: Step; tab: 'table' | 'reach'; setTab: (v: 'table' | 'reach') => void }) {
  const dp = step.dpTable ?? [];

  return (
    <div>
      <div className="mb-3">
        <button onClick={() => setTab('table')} className={`px-3 py-1 rounded-xl mr-2 border ${tab === 'table' ? 'bg-[#FCE7C8] border-[#D97706] text-[#7B4C2C]' : 'bg-[#FFF8F0] border-[#E7D9C8] text-[#7C6A5D]'}`}>二维 DP 表</button>
        <button onClick={() => setTab('reach')} className={`px-3 py-1 rounded-xl border ${tab === 'reach' ? 'bg-[#FCE7C8] border-[#D97706] text-[#7B4C2C]' : 'bg-[#FFF8F0] border-[#E7D9C8] text-[#7C6A5D]'}`}>一维 Reach</button>
      </div>

      {tab === 'table' ? (
        <div className="overflow-auto max-h-[430px] warm-subcard p-2">
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
                        className={`border px-2 py-1 transition-colors duration-300 ${
                          isCurrent
                            ? 'bg-[#FCE7C8] border-[#D97706]'
                            : isDepA
                              ? 'bg-[#FDE6CD] border-[#EAB37A]'
                              : isDepB
                                ? 'bg-[#EFF7EC] border-[#8DAA91]'
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
        <div className="text-sm text-[#7C6A5D] warm-subcard p-4">切换到算法“一维优化 Reach”可查看动态数组更新。</div>
      )}
    </div>
  );
}
