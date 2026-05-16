import { Play, Pause, RotateCcw, SkipBack, SkipForward, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  k: number;
  n: number;
  setK: (v: number) => void;
  setN: (v: number) => void;
  algorithm: string;
  setAlgorithm: (v: any) => void;
  speed: number;
  setSpeed: (v: number) => void;
  step: number;
  total: number;
  status: string;
  onStart: () => void;
  onPrev: () => void;
  onNext: () => void;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

const btn = 'px-3 py-2 rounded-xl text-sm font-medium border border-slate-200 shadow-sm';

export default function ControlPanel(p: Props) {
  return (
    <div className="bg-white/90 rounded-2xl border border-borderSoft shadow-soft p-5">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold">鸡蛋掉落问题算法可视化平台</h1>
          <p className="text-sm text-textSub">通过伪代码高亮、递归树、缓存表和 DP 表格直观理解算法执行过程</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input type="number" value={p.k} min={1} onChange={(e) => p.setK(Number(e.target.value))} className="w-20 px-2 py-2 rounded-lg border border-slate-200" />
          <input type="number" value={p.n} min={0} onChange={(e) => p.setN(Number(e.target.value))} className="w-20 px-2 py-2 rounded-lg border border-slate-200" />
          <select value={p.algorithm} onChange={(e) => p.setAlgorithm(e.target.value)} className="px-2 py-2 rounded-lg border border-slate-200">
            <option value="bruteforce">蛮力递归</option>
            <option value="topdown">自顶向下 DP</option>
            <option value="bottomup">自底向上 DP</option>
            <option value="reach">一维优化 reach</option>
          </select>
          <motion.button whileHover={{ scale: 1.05 }} className={`${btn} bg-gradient-to-r from-cyan-500 to-blue-500 text-white`} onClick={p.onStart}><Rocket size={14} className="inline mr-1" />Start</motion.button>
          <button className={`${btn} bg-sky-50`} onClick={p.onPrev}><SkipBack size={14} className="inline mr-1" />Prev</button>
          <button className={`${btn} bg-sky-50`} onClick={p.onNext}><SkipForward size={14} className="inline mr-1" />Next</button>
          <motion.button whileHover={{ scale: 1.05 }} className={`${btn} bg-gradient-to-r from-cyan-500 to-blue-500 text-white`} onClick={p.onPlay}><Play size={14} className="inline mr-1" />Play</motion.button>
          <button className={`${btn} bg-orange-100 text-orange-700`} onClick={p.onPause}><Pause size={14} className="inline mr-1" />Pause</button>
          <button className={`${btn} bg-rose-100 text-rose-700`} onClick={p.onReset}><RotateCcw size={14} className="inline mr-1" />Reset</button>
          <select value={p.speed} onChange={(e) => p.setSpeed(Number(e.target.value))} className="px-2 py-2 rounded-lg border border-slate-200">
            <option value={2000}>0.5x</option><option value={1000}>1x</option><option value={500}>2x</option>
          </select>
          <div className="text-sm text-textSub">Step {p.step} / {p.total}</div>
          <div className="text-sm font-medium text-cyan-700">{p.status}</div>
        </div>
      </div>
    </div>
  );
}
