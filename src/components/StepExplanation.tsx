import { Step } from '../types';

export default function StepExplanation({ step }: { step?: Step }) {
  return (
    <div className="warm-card bg-[#FFF8F0] p-4">
      <div className="text-sm text-[#7C6A5D]">当前步骤解释</div>
      <div className="mt-2 text-sm text-[#4B3A2F] leading-6">{step?.description ?? '暂无'}</div>
    </div>
  );
}
