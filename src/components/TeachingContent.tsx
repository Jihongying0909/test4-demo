import { Step } from '../types';
import { BookOpen, Sigma, FlaskConical, BarChart3 } from 'lucide-react';

function metric(step?: Step, totalFloors?: number) {
  const calls = step?.metrics?.calls ?? 0;
  const states = step?.metrics?.states ?? 0;
  const hits = step?.metrics?.hits ?? 0;
  const repeat = Math.max(0, calls - states);
  const rate = calls > 0 ? ((repeat / calls) * 100).toFixed(1) : '0.0';
  return { calls, states, hits, repeat, rate, totalFloors: totalFloors ?? 0 };
}

export default function TeachingContent({ step, n }: { step?: Step; n: number }) {
  const m = metric(step, n);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 mt-3">
      <div className="xl:col-span-6 warm-card p-4">
        <div className="flex items-center gap-2 text-[#7C6A5D] text-sm mb-2"><BookOpen size={15} />问题背景说明</div>
        <p className="text-sm text-[#5A4739] leading-6">目标：在最坏情况下用最少次数确定门槛楼层 F。若从楼层 x 投掷鸡蛋，x &gt; F 会碎，x ≤ F 不碎。</p>
        <div className="mt-3 warm-subcard p-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-[#EFF7EC] border border-[#8DAA91]">安全区间 1..F</span>
            <span className="px-2 py-1 rounded bg-[#FCE7C8] border border-[#D97706]">门槛层 F</span>
            <span className="px-2 py-1 rounded bg-[#FFF0F0] border border-[#E8B4B8]">危险区间 F+1..N</span>
          </div>
        </div>
      </div>

      <div className="xl:col-span-6 warm-card p-4">
        <div className="flex items-center gap-2 text-[#7C6A5D] text-sm mb-2"><Sigma size={15} />核心递推公式</div>
        <div className="font-mono text-sm bg-[#FFF8F0] border border-[#E7D9C8] rounded-lg p-2 text-[#4B3A2F]">T(K,N)=min(1≤x≤N) {'{'}1+max(T(K-1,x-1),T(K,N-x)){'}'}</div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded bg-[#FDE6CD] border border-[#E5B176]">T(K-1,x-1)：鸡蛋碎了</span>
          <span className="px-2 py-1 rounded bg-[#EAF4EA] border border-[#9FBCA3]">T(K,N-x)：鸡蛋未碎</span>
          <span className="px-2 py-1 rounded bg-[#FFF8F0] border border-[#E7D9C8]">max：考虑最坏情况</span>
          <span className="px-2 py-1 rounded bg-[#FCE7C8] border border-[#D97706]">min：选择最优楼层</span>
        </div>
      </div>

      <div className="xl:col-span-7 warm-card p-4">
        <div className="flex items-center gap-2 text-[#7C6A5D] text-sm mb-2"><BarChart3 size={15} />三种算法对比说明</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="warm-subcard p-2"><div className="font-semibold">蛮力递归</div><div>直接枚举，不保存结果，重复计算多。</div><span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#FFF0F0] border border-[#E8B4B8]">指数级</span></div>
          <div className="warm-subcard p-2"><div className="font-semibold">自顶向下 DP</div><div>递归 + memo 缓存，避免重复计算。</div><span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#EAF4EA] border border-[#9FBCA3]">O(KN²)</span></div>
          <div className="warm-subcard p-2"><div className="font-semibold">自底向上 DP</div><div>二维表填表，从小问题推大问题。</div><span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#FDE6CD] border border-[#E5B176]">O(KN²)</span></div>
        </div>
      </div>

      <div className="xl:col-span-5 warm-card p-4">
        <div className="text-[#7C6A5D] text-sm mb-2">重复子问题观察区</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="warm-subcard p-2">总调用次数<div className="text-base font-semibold">{m.calls}</div></div>
          <div className="warm-subcard p-2">不同状态数<div className="text-base font-semibold">{m.states}</div></div>
          <div className="warm-subcard p-2">重复计算次数<div className="text-base font-semibold text-[#D97706]">{m.repeat}</div></div>
          <div className="warm-subcard p-2">重复率<div className="text-base font-semibold">{m.rate}%</div></div>
          <div className="warm-subcard p-2 col-span-2">缓存命中次数<div className="text-base font-semibold text-[#8DAA91]">{m.hits}</div></div>
        </div>
      </div>

      <div className="xl:col-span-6 warm-card p-4">
        <div className="flex items-center gap-2 text-[#7C6A5D] text-sm mb-2"><FlaskConical size={15} />实验结果与最大规模</div>
        <div className="text-xs leading-6">
          <div>蛮力法：E≤12, F≤16</div>
          <div>自顶向下 DP：E≤12, F≤994</div>
          <div>自底向上 DP：E≤12, F≤3039</div>
          <div className="mt-1 text-[#7C6A5D]">条件：单组时间阈值 10 秒，F 搜索上限 5000。</div>
        </div>
      </div>

      <div className="xl:col-span-6 warm-card p-4">
        <div className="text-[#7C6A5D] text-sm mb-2">学习小结</div>
        <ul className="text-xs leading-6 text-[#5A4739] list-disc pl-4">
          <li>蛮力法重复子问题严重。</li>
          <li>自顶向下 DP 利用缓存显著减少重复计算。</li>
          <li>自底向上 DP 通过填表使每个状态只计算一次。</li>
          <li>三种算法结果一致，但效率差异明显。</li>
        </ul>
      </div>
    </div>
  );
}
