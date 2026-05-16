import { Step } from '../types';

export default function BottomUpTableView({ step, tab, setTab }: { step: Step; tab: 'table' | 'reach'; setTab: (v: 'table' | 'reach') => void }) {
  const dp = step.dpTable ?? [];
  return <div><div className="mb-2"><button onClick={() => setTab('table')} className={`px-3 py-1 rounded-lg mr-2 ${tab === 'table' ? 'bg-cyan-100' : 'bg-slate-100'}`}>二维 DP</button><button onClick={() => setTab('reach')} className={`px-3 py-1 rounded-lg ${tab === 'reach' ? 'bg-cyan-100' : 'bg-slate-100'}`}>一维 reach</button></div>{tab === 'table' ? <div className="overflow-auto max-h-[430px]"><table className="text-xs border-collapse"> <tbody>{dp.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={`border border-slate-200 px-2 py-1 ${step.currentState.eggs === i && step.currentState.floors === j ? 'bg-cyan-100' : 'bg-white'}`}>{c}</td>)}</tr>)}</tbody></table></div> : <div className="text-sm text-textSub">切到算法“一维优化 reach”可查看动态数组更新。</div>}</div>;
}
