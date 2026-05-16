import { Step } from '../types';
import BruteForceTree from './BruteForceTree';
import TopDownMemoView from './TopDownMemoView';
import BottomUpTableView from './BottomUpTableView';
import ReachArrayView from './ReachArrayView';

function FormulaCard({ step }: { step: Step }) {
  let formula = 'worst = 1 + max(broken, safe)';
  if (step.algorithm === 'bottomup') formula = 'dp[e][f] = min_x (1 + max(dp[e-1][x-1], dp[e][f-x]))';
  if (step.algorithm === 'reach') formula = 'reach[k] = reach[k] + reach[k-1] + 1';
  if (step.algorithm === 'topdown') formula = 'memo[(K,N)] = min_x (1 + max(broken, safe))';

  return (
    <div className="warm-subcard p-3 text-xs text-[#5A4638] mb-2">
      <div className="font-semibold text-[#7C6A5D] mb-1">当前公式</div>
      <div className="font-mono">{formula}</div>
      <div className="mt-1">broken={step.broken ?? '-'} | safe={step.safe ?? '-'} | worst={step.worst ?? '-'}</div>
    </div>
  );
}

export default function VisualizationPanel({ step, tab, setTab }: { step?: Step; tab: 'table' | 'reach'; setTab: (v: 'table' | 'reach') => void }) {
  if (!step) return <div className="warm-card rounded-2xl p-4 h-[520px]">请先点击 Start</div>;

  return (
    <div className="warm-card rounded-2xl p-4 h-[520px] overflow-auto relative">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(#E7D9C8 0.8px, transparent 0.8px)', backgroundSize: '14px 14px' }} />
      <div className="relative z-10">
        <FormulaCard step={step} />
        {step.algorithm === 'bruteforce' && <BruteForceTree step={step} />}
        {step.algorithm === 'topdown' && <TopDownMemoView step={step} />}
        {step.algorithm === 'bottomup' && <BottomUpTableView step={step} tab={tab} setTab={setTab} />}
        {step.algorithm === 'reach' && <ReachArrayView step={step} />}
      </div>
    </div>
  );
}
