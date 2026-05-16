import { Step } from '../types';
import MetricCard from './MetricCard';

export default function StateMonitor({ step }: { step?: Step }) {
  if (!step) return <div className="bg-white rounded-2xl border border-slate-200 p-4">等待开始</div>;
  return <div className="bg-white rounded-2xl border border-slate-200 p-4 grid grid-cols-2 gap-2"><MetricCard title="K,N" value={`${step.currentState.eggs},${step.currentState.floors}`} /><MetricCard title="当前x" value={step.x ?? '-'} /><MetricCard title="执行行" value={step.pseudoLine} /><MetricCard title="worst" value={step.worst ?? '-'} color="text-orange-600" /><MetricCard title="best" value={step.best ?? '-'} color="text-green-600" /><MetricCard title="bestFloor" value={step.bestFloor ?? '-'} /><MetricCard title="调用次数" value={step.metrics?.calls ?? 0} /><MetricCard title="memo命中" value={step.metrics?.hits ?? 0} /><MetricCard title="已计算状态" value={step.metrics?.states ?? 0} /><MetricCard title="已填格子" value={step.metrics?.filled ?? 0} /></div>;
}
