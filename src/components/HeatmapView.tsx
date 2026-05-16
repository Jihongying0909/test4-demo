export default function HeatmapView({ heat }: { heat?: number[][] }) {
  if (!heat) return null;
  const max = Math.max(1, ...heat.flat());
  return <div className="bg-white rounded-2xl border border-slate-200 p-4 overflow-auto"><div className="text-sm text-textSub mb-2">状态访问热力图</div><div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${heat[0]?.length ?? 0}, minmax(16px, 20px))` }}>{heat.flatMap((v, idx) => { const alpha = v / max; return <div key={idx} className="w-5 h-5 rounded" style={{ background: `rgba(59,130,246,${alpha})` }} title={String(v)} />; })}</div></div>;
}
