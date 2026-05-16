export default function HeatmapView({ heat }: { heat?: number[][] }) {
  if (!heat || heat.length === 0) return null;

  const flat = heat.flat().map((v) => Number(v));
  const max = Math.max(1, ...flat);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 overflow-auto">
      <div className="text-sm text-textSub mb-2">状态访问热力图</div>
      <div
        className="inline-grid gap-1"
        style={{ gridTemplateColumns: `repeat(${Number(heat[0]?.length ?? 0)}, minmax(16px, 20px))` }}
      >
        {flat.map((v, idx) => {
          const alpha = Number(v) / Number(max);
          return (
            <div
              key={idx}
              className="w-5 h-5 rounded"
              style={{ background: `rgba(59,130,246,${alpha})` }}
              title={String(v)}
            />
          );
        })}
      </div>
    </div>
  );
}
