import { Step } from '../types';
import MetricCard from './MetricCard';

export default function StateMonitor({ step }: { step?: Step }) {
  if (!step) return <div className="warm-card p-4 text-[#7C6A5D]">等待开始</div>;

  return (
    <div className="warm-card p-4 grid grid-cols-2 gap-2">
      <MetricCard title="当前状态 K,N" value={`${step.currentState.eggs}, ${step.currentState.floors}`} />
      <MetricCard title="当前 x" value={step.x ?? '-'} />
      <MetricCard title="执行行" value={step.pseudoLine} />
      <MetricCard title="worst" value={step.worst ?? '-'} color="text-[#B35A40]" />
      <MetricCard title="best / minTrials" value={step.best ?? '-'} color="text-[#D97706]" />
      <MetricCard title="bestFloor" value={step.bestFloor ?? '-'} color="text-[#D97706]" />
      <MetricCard title="调用次数" value={step.metrics?.calls ?? 0} color="text-[#9A6B4A]" />
      <MetricCard title="memo 命中" value={step.metrics?.hits ?? 0} color="text-[#678C6D]" />
      <MetricCard title="状态数" value={step.metrics?.states ?? 0} />
      <MetricCard title="已填表格" value={step.metrics?.filled ?? 0} />
    </div>
  );
}
