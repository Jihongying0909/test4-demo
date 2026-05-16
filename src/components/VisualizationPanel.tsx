import { Step } from '../types';
import BruteForceTree from './BruteForceTree';
import TopDownMemoView from './TopDownMemoView';
import BottomUpTableView from './BottomUpTableView';
import ReachArrayView from './ReachArrayView';

export default function VisualizationPanel({ step, tab, setTab }: { step?: Step; tab: 'table' | 'reach'; setTab: (v: 'table' | 'reach') => void }) {
  if (!step) return <div className="bg-white rounded-2xl border border-slate-200 p-4 h-[540px]">请先点击 Start</div>;
  return <div className="bg-white rounded-2xl border border-slate-200 p-4 h-[540px] overflow-auto">{step.algorithm === 'bruteforce' && <BruteForceTree step={step} />}{step.algorithm === 'topdown' && <TopDownMemoView step={step} />}{step.algorithm === 'bottomup' && <BottomUpTableView step={step} tab={tab} setTab={setTab} />}{step.algorithm === 'reach' && <ReachArrayView step={step} />}</div>;
}
