export default function HeatmapView({ heat }: { heat?: number[][] }) {
  if (!heat || heat.length === 0) return null;
  const flat = heat.flat().map(Number);
  const max = Math.max(1, ...flat);

  return (
    <div className="warm-card p-4 overflow-auto bg-[#FFFDF9]">
      <div className="text-sm text-[#7C6A5D] mb-2">状态访问热力图</div>
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${Number(heat[0]?.length ?? 0)}, minmax(16px, 20px))` }}>
        {flat.map((v, idx) => {
          const alpha = Number(v) / Number(max);
          return <div key={idx} className="w-5 h-5 rounded" style={{ background: `rgba(217,119,6,${0.12 + alpha * 0.8})` }} title={String(v)} />;
        })}
      </div>
    </div>
  );
}
