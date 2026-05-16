import { Step } from '../types';
import BruteForceTree from './BruteForceTree';
import TopDownMemoView from './TopDownMemoView';
import BottomUpTableView from './BottomUpTableView';
import ReachArrayView from './ReachArrayView';

function FormulaCard({ step }: { step: Step }) {
  const hasValues = step.broken !== undefined && step.safe !== undefined;
  const expr = hasValues
    ? `worst = 1 + max(${step.broken}, ${step.safe}) = ${step.worst ?? '-'}`
    : 'worst = 1 + max(T(K-1,x-1), T(K,N-x))';

  return (
    <div className="warm-subcard p-3 text-xs text-[#5A4638] mb-2">
      <div className="font-semibold text-[#7C6A5D] mb-1">当前计算公式</div>
      <div className="font-mono">{expr}</div>
    </div>
  );
}

function BranchCompare({ step }: { step: Step }) {
  const k = step.currentState.eggs;
  const n = step.currentState.floors;
  const hasX = step.x !== undefined;
  const x = step.x ?? 1;

  return (
    <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
      <div className={`p-2 rounded-lg border transition-all ${hasX ? 'bg-[#fce7f3] border-[#f5cfe4]' : 'bg-[#f5f2fa] border-[#ddd6f4] text-[#9a93b1]'}`}>
        <div className="font-semibold">鸡蛋破碎</div>
        <div>转到 ({hasX ? k - 1 : '-'}, {hasX ? x - 1 : '-'})</div>
      </div>
      <div className={`p-2 rounded-lg border transition-all ${hasX ? 'bg-[#e8f2ff] border-[#cfe0ff]' : 'bg-[#f5f2fa] border-[#ddd6f4] text-[#9a93b1]'}`}>
        <div className="font-semibold">鸡蛋未碎</div>
        <div>转到 ({hasX ? k : '-'}, {hasX ? Math.max(0, n - x) : '-'})</div>
      </div>
    </div>
  );
}

function FloorRangeBar({ step, totalFloors }: { step: Step; totalFloors: number }) {
  const x = step.x;
  const hasX = x !== undefined;

  return (
    <div className="warm-subcard p-3 mb-2">
      <div className="text-xs text-[#7C6A5D] mb-2">楼层搜索区间示意</div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.max(1, totalFloors)}, minmax(14px, 1fr))` }}>
        {Array.from({ length: Math.max(1, totalFloors) }, (_, i) => i + 1).map((f) => {
          const cls = !hasX
            ? 'bg-[#f5f2fa] border-[#ddd6f4] text-[#9a93b1]'
            : f === x
              ? 'bg-[#c4b5fd] text-[#3f2d78] border-[#a78bfa]'
              : f < x!
                ? 'bg-[#fce7f3] border-[#f5cfe4] text-[#8a4f73]'
                : 'bg-[#e8f2ff] border-[#cfe0ff] text-[#44638f]';
          return (
            <div key={f} className={`h-6 text-[10px] rounded border flex items-center justify-center transition-all ${cls}`}>
              {f}
            </div>
          );
        })}
      </div>
      <div className="mt-1 text-[10px] text-[#7C6A5D]">
        {hasX ? `x=${x}，左侧为碎后区间，右侧为未碎后区间。` : '当前步骤未枚举 x，区间示意保持静态。'}
      </div>
    </div>
  );
}

export default function VisualizationPanel({ step, tab, setTab, totalFloors }: { step?: Step; tab: 'table' | 'reach'; setTab: (v: 'table' | 'reach') => void; totalFloors: number }) {
  if (!step) return <div className="warm-card rounded-2xl p-4 h-[620px]">点击 Start 开始生成可视化。</div>;

  return (
    <div className="warm-card rounded-2xl p-4 h-[620px] overflow-auto relative">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(#e8e3f6 0.8px, transparent 0.8px)', backgroundSize: '14px 14px' }} />
      <div className="relative z-10">
        <FormulaCard step={step} />
        <BranchCompare step={step} />
        <FloorRangeBar step={step} totalFloors={totalFloors} />
        {step.algorithm === 'bruteforce' && <BruteForceTree step={step} />}
        {step.algorithm === 'topdown' && <TopDownMemoView step={step} />}
        {step.algorithm === 'bottomup' && <BottomUpTableView step={step} tab={tab} setTab={setTab} />}
        {step.algorithm === 'reach' && <ReachArrayView step={step} />}
      </div>
    </div>
  );
}
