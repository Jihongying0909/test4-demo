import { motion } from 'framer-motion';
import { Step, TreeNode } from '../types';

type LayoutNode = TreeNode & { depth: number; yOrder: number };

const nodeStyle = (state: string) => {
  if (state === 'active') return { fill: '#FFF3D8', stroke: '#D97706' };
  if (state === 'done') return { fill: '#F8EFE5', stroke: '#C9A27E' };
  if (state === 'base') return { fill: '#F1E8FF', stroke: '#A78BFA' };
  if (state === 'repeat') return { fill: '#FFF0F0', stroke: '#E8B4B8' };
  if (state === 'best') return { fill: '#EFF7EC', stroke: '#8DAA91' };
  return { fill: '#FFFDF9', stroke: '#E7D9C8' };
};

export default function BruteForceTree({ step }: { step: Step }) {
  const nodes = step.treeNodes ?? [];
  const edges = step.treeEdges ?? [];

  if (!nodes.length) {
    return <div className="text-[#7C6A5D]">暂无递归树</div>;
  }

  const byId = new Map(nodes.map((n) => [n.id, n]));
  const incoming = new Map<string, number>();
  const children = new Map<string, { id: string; label: 'broken' | 'safe' }[]>();
  const parent = new Map<string, string>();

  edges.forEach((e) => {
    incoming.set(e.to, (incoming.get(e.to) ?? 0) + 1);
    const arr = children.get(e.from) ?? [];
    arr.push({ id: e.to, label: e.label });
    children.set(e.from, arr);
    parent.set(e.to, e.from);
  });

  const root = nodes.find((n) => !incoming.get(n.id))?.id ?? nodes[0].id;

  const ordered: LayoutNode[] = [];
  let cursor = 0;

  const dfs = (id: string, depth: number) => {
    const child = children.get(id) ?? [];
    const broken = child.filter((c) => c.label === 'broken');
    const safe = child.filter((c) => c.label === 'safe');
    const sorted = [...broken, ...safe];

    const yOrder = cursor;
    cursor += 1;

    const n = byId.get(id);
    if (n) ordered.push({ ...n, depth, yOrder });

    sorted.forEach((s) => dfs(s.id, depth + 1));
  };

  dfs(root, 0);

  const currentLabel = `T(${step.currentState.eggs},${step.currentState.floors})`;
  const matched = ordered.filter((n) => n.label === currentLabel);
  const focusCandidate = matched.length > 0 ? matched[matched.length - 1] : undefined;
  const focusId = focusCandidate?.id ?? (ordered.length > 0 ? ordered[ordered.length - 1].id : root);

  const focusPath = new Set<string>();
  let walk = focusId;
  while (walk) {
    focusPath.add(walk);
    walk = parent.get(walk) ?? '';
  }

  const xGap = 180;
  const yGap = 68;
  const topPad = 30;
  const leftPad = 70;

  const pos = new Map<string, { x: number; y: number }>();
  ordered.forEach((n) => {
    pos.set(n.id, {
      x: leftPad + n.depth * xGap,
      y: topPad + n.yOrder * yGap,
    });
  });

  const width = Math.max(900, ...ordered.map((n) => leftPad + n.depth * xGap + 220));
  const height = Math.max(420, ...ordered.map((n) => topPad + n.yOrder * yGap + 80));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-[#7C6A5D]">递归树（层级布局，broken 在上，safe 在下）</div>
        <div className="text-xs px-2 py-1 rounded-full bg-[#FFF8F0] border border-[#E7D9C8] text-[#8C6E58]">聚焦当前路径</div>
      </div>

      <div className="overflow-auto rounded-2xl border border-[#E7D9C8] bg-[#FFFDF9] p-2">
        <svg width={width} height={height}>
          {edges.map((e, i) => {
            const a = pos.get(e.from);
            const b = pos.get(e.to);
            if (!a || !b) return null;

            const active = focusPath.has(e.from) && focusPath.has(e.to);
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2 + (e.label === 'broken' ? -14 : 14);
            const path = `M ${a.x + 62} ${a.y} C ${a.x + 105} ${a.y}, ${b.x - 105} ${b.y}, ${b.x - 62} ${b.y}`;

            return (
              <g key={`${e.from}-${e.to}-${i}`} opacity={active ? 1 : 0.25}>
                <path d={path} fill="none" stroke={active ? '#B79273' : '#D7C5B2'} strokeWidth={2} />
                <rect
                  x={midX - 26}
                  y={midY - 10}
                  width={52}
                  height={18}
                  rx={9}
                  fill={e.label === 'broken' ? '#FDE6CD' : '#EAF4EA'}
                  stroke={e.label === 'broken' ? '#E5B176' : '#9FBCA3'}
                />
                <text x={midX} y={midY + 3} fontSize="10" textAnchor="middle" fill="#6D5546">
                  {e.label}
                </text>
              </g>
            );
          })}

          {ordered.map((n) => {
            const p = pos.get(n.id)!;
            const style = nodeStyle(n.state);
            const onPath = focusPath.has(n.id);
            const isFocus = n.id === focusId;
            const isRepeat = n.state === 'repeat';

            return (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: onPath ? 1 : 0.42, scale: isFocus ? 1.04 : 1 }}
                transition={{ duration: 0.22 }}
              >
                <rect
                  x={p.x - 60}
                  y={p.y - 22}
                  width={120}
                  height={44}
                  rx={12}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth={isFocus ? 2.8 : 1.6}
                  style={isFocus ? { filter: 'drop-shadow(0 0 8px rgba(217,119,6,0.35))' } : {}}
                />
                <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="12" fill="#4B3A2F" fontWeight={600}>
                  {n.label}
                </text>
                {isRepeat && (
                  <g>
                    <rect x={p.x + 26} y={p.y - 30} width={32} height={14} rx={7} fill="#E8B4B8" />
                    <text x={p.x + 42} y={p.y - 20} textAnchor="middle" fontSize="9" fill="#6F3F43">
                      重复
                    </text>
                  </g>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
