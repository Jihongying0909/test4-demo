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
  if (step.x === undefined) return null;
  const k = step.currentState.eggs;
  const n = step.currentState.floors;
  return (
    <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
      <div className="p-2 rounded-lg border bg-[#FDE6CD] border-[#E5B176]">
        <div className="font-semibold">鸡蛋破碎</div>
        <div>转到 ({k - 1}, {step.x - 1})</div>
      </div>
      <div className="p-2 rounded-lg border bg-[#EAF4EA] border-[#9FBCA3]">
        <div className="font-semibold">鸡蛋未碎</div>
        <div>转到 ({k}, {Math.max(0, n - step.x)})</div>
      </div>
    </div>
  );
}

function FloorRangeBar({ step, totalFloors }: { step: Step; totalFloors: number }) {
  const x = step.x;
  if (!x || totalFloors <= 0) return null;

  return (
    <div className="warm-subcard p-3 mb-2">
      <div className="text-xs text-[#7C6A5D] mb-2">楼层搜索区间示意</div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${totalFloors}, minmax(14px, 1fr))` }}>
        {Array.from({ length: totalFloors }, (_, i) => i + 1).map((f) => {
          const cls = f === x
            ? 'bg-[#F59E0B] text-white border-[#D97706]'
            : f < x
              ? 'bg-[#FDE6CD] border-[#E5B176] text-[#7B4C2C]'
              : f > x
                ? 'bg-[#EAF4EA] border-[#9FBCA3] text-[#4F6D56]'
                : 'bg-[#EEE6DD] border-[#D8C9B8]';
          return <div key={f} className={`h-6 text-[10px] rounded border flex items-center justify-center ${cls}`}>{f}</div>;
        })}
      </div>
      <div className="mt-1 text-[10px] text-[#7C6A5D]">x={x}，左侧为碎后区间，右侧为未碎后区间。</div>
    </div>
  );
}

export default function VisualizationPanel({ step, tab, setTab, totalFloors }: { step?: Step; tab: 'table' | 'reach'; setTab: (v: 'table' | 'reach') => void; totalFloors: number }) {
  if (!step) return <div className="warm-card rounded-2xl p-4 h-[520px]">请先点击 Start</div>;

  return (
    <div className="warm-card rounded-2xl p-4 h-[520px] overflow-auto relative">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(#E7D9C8 0.8px, transparent 0.8px)', backgroundSize: '14px 14px' }} />
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
