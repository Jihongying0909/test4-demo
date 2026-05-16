import { Step } from '../types';
export default function StepExplanation({ step }: { step?: Step }) { return <div className="bg-white rounded-2xl border border-slate-200 p-4"><div className="text-sm text-textSub">当前步骤解释</div><div className="mt-2 text-sm">{step?.description ?? '暂无'}</div></div>; }
