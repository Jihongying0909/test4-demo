import { Step } from '../types';
import BruteForceTree from './BruteForceTree';
import TopDownMemoView from './TopDownMemoView';
import BottomUpTableView from './BottomUpTableView';
import ReachArrayView from './ReachArrayView';

export default function VisualizationPanel({ step, tab, setTab }: { step?: Step; tab: 'table' | 'reach'; setTab: (v: 'table' | 'reach') => void }) {
  if (!step) return <div className="warm-card rounded-3xl p-4 h-[560px]">请先点击 Start</div>;

  return (
    <div className="warm-card rounded-3xl p-5 h-[560px] overflow-auto relative">
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: 'radial-gradient(#E7D9C8 0.8px, transparent 0.8px)', backgroundSize: '14px 14px' }} />
      <div className="relative z-10">
        {step.algorithm === 'bruteforce' && <BruteForceTree step={step} />}
        {step.algorithm === 'topdown' && <TopDownMemoView step={step} />}
        {step.algorithm === 'bottomup' && <BottomUpTableView step={step} tab={tab} setTab={setTab} />}
        {step.algorithm === 'reach' && <ReachArrayView step={step} />}
      </div>
    </div>
  );
}
