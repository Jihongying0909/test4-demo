import { Step } from '../types';

export default function ComparePanel({ brute, top, bottom }: { brute?: Step[]; top?: Step[]; bottom?: Step[] }) {
  const row = (name: string, s?: Step[]) => ({ name, trials: s?.at(-1)?.returnValue ?? '-', floor: s?.at(-1)?.bestFloor ?? '-', calls: s?.at(-1)?.metrics?.calls ?? '-', hits: s?.at(-1)?.metrics?.hits ?? '-', states: s?.at(-1)?.metrics?.states ?? '-' });
  const rows = [row('Brute', brute), row('TopDown', top), row('BottomUp', bottom)];
  return <div className="bg-white rounded-2xl border border-slate-200 p-4 overflow-auto"><div className="text-sm text-textSub mb-2">算法对比</div><table className="w-full text-xs"><thead><tr><th>算法</th><th>最少次数</th><th>首投</th><th>调用</th><th>命中</th><th>状态</th></tr></thead><tbody>{rows.map((r) => <tr key={r.name}><td>{r.name}</td><td>{r.trials}</td><td>{r.floor}</td><td>{r.calls}</td><td>{r.hits}</td><td>{r.states}</td></tr>)}</tbody></table></div>;
}
