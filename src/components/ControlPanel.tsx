import { Play, Pause, RotateCcw, SkipBack, SkipForward, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { AlgoType } from '../types';

interface Props {
  k: number;
  n: number;
  setK: (v: number) => void;
  setN: (v: number) => void;
  algorithm: AlgoType;
  setAlgorithm: (v: AlgoType) => void;
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

const inputCls = 'h-10 rounded-xl border border-[#E7D9C8] bg-[#FFFDF9] px-3 text-sm text-[#4B3A2F] outline-none focus:ring-2 focus:ring-[#F6C8A8]';
const baseBtn = 'h-10 px-3 rounded-xl text-sm font-medium border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(154,107,74,.14)]';

const badgeMap: Record<string, string> = {
  Ready: 'bg-[#FCE7C8] text-[#9A6B4A] border-[#F3D6A3]',
  Running: 'bg-[#F6C8A8] text-[#7F4A2A] border-[#EAB88F]',
  Paused: 'bg-[#E8B4B8] text-[#7A494D] border-[#D89CA1]',
  Finished: 'bg-[#E2EFE4] text-[#557460] border-[#C7DDCB]',
};

export default function ControlPanel(p: Props) {
  return (
    <div className="warm-card rounded-3xl p-6">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4B3A2F]">鸡蛋掉落问题算法可视化平台</h1>
          <p className="text-sm text-[#7C6A5D] mt-1">通过伪代码高亮、递归树、缓存表和 DP 表格直观理解算法执行过程</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input type="number" value={p.k} min={1} onChange={(e) => p.setK(Number(e.target.value))} className={`${inputCls} w-20`} />
          <input type="number" value={p.n} min={0} onChange={(e) => p.setN(Number(e.target.value))} className={`${inputCls} w-20`} />

          <select value={p.algorithm} onChange={(e) => p.setAlgorithm(e.target.value as AlgoType)} className={`${inputCls} w-40`}>
            <option value="bruteforce">蛮力递归</option>
            <option value="topdown">自顶向下 DP</option>
            <option value="bottomup">自底向上 DP</option>
            <option value="reach">一维优化 Reach</option>
          </select>

          <motion.button whileHover={{ scale: 1.03 }} className={`${baseBtn} border-transparent text-white bg-gradient-to-r from-[#F59E0B] to-[#D97706]`} onClick={p.onStart}><Rocket size={14} className="inline mr-1" />Start</motion.button>
          <button className={`${baseBtn} border-[#E6CFB3] bg-[#FCE7C8] text-[#9A6B4A]`} onClick={p.onPrev}><SkipBack size={14} className="inline mr-1" />Prev</button>
          <button className={`${baseBtn} border-[#E6CFB3] bg-[#FCE7C8] text-[#9A6B4A]`} onClick={p.onNext}><SkipForward size={14} className="inline mr-1" />Next</button>
          <motion.button whileHover={{ scale: 1.03 }} className={`${baseBtn} border-transparent text-white bg-gradient-to-r from-[#F59E0B] to-[#D97706]`} onClick={p.onPlay}><Play size={14} className="inline mr-1" />Play</motion.button>
          <button className={`${baseBtn} border-[#DAB58E] bg-[#F6C8A8] text-[#7F4A2A]`} onClick={p.onPause}><Pause size={14} className="inline mr-1" />Pause</button>
          <button className={`${baseBtn} border-[#D6A9AD] bg-[#E8B4B8] text-[#7A494D]`} onClick={p.onReset}><RotateCcw size={14} className="inline mr-1" />Reset</button>

          <select value={p.speed} onChange={(e) => p.setSpeed(Number(e.target.value))} className={`${inputCls} w-20`}>
            <option value={2000}>0.5x</option><option value={1000}>1x</option><option value={500}>2x</option>
          </select>

          <div className="text-sm text-[#7C6A5D]">Step {p.step} / {p.total}</div>
          <span className={`text-xs px-3 py-1 rounded-full border ${badgeMap[p.status] ?? badgeMap.Ready}`}>{p.status}</span>
        </div>
      </div>
    </div>
  );
}
