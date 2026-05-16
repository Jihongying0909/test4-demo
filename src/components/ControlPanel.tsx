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

const inputCls = 'h-9 rounded-lg border border-[#E7D9C8] bg-[#FFFDF9] px-2.5 text-sm text-[#4B3A2F] outline-none focus:ring-2 focus:ring-[#F6C8A8]';
const baseBtn = 'h-9 px-2.5 rounded-lg text-xs font-medium border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(154,107,74,.12)]';

const badgeMap: Record<string, string> = {
  Ready: 'bg-[#FCE7C8] text-[#9A6B4A] border-[#F3D6A3]',
  Running: 'bg-[#F6C8A8] text-[#7F4A2A] border-[#EAB88F]',
  Paused: 'bg-[#E8B4B8] text-[#7A494D] border-[#D89CA1]',
  Finished: 'bg-[#E2EFE4] text-[#557460] border-[#C7DDCB]',
};

export default function ControlPanel(p: Props) {
  return (
    <div className="warm-card rounded-2xl p-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#4B3A2F]">鸡蛋掉落问题算法可视化平台</h1>
          <p className="text-xs text-[#7C6A5D]">算法讲义式演示：伪代码、递归树、DP 与状态联动</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input type="number" value={p.k} min={1} onChange={(e) => p.setK(Number(e.target.value))} className={`${inputCls} w-16`} />
          <input type="number" value={p.n} min={0} onChange={(e) => p.setN(Number(e.target.value))} className={`${inputCls} w-16`} />
          <select value={p.algorithm} onChange={(e) => p.setAlgorithm(e.target.value as AlgoType)} className={`${inputCls} w-36`}>
            <option value="bruteforce">蛮力递归</option>
            <option value="topdown">自顶向下 DP</option>
            <option value="bottomup">自底向上 DP</option>
            <option value="reach">一维优化 Reach</option>
          </select>

          <motion.button whileHover={{ scale: 1.03 }} className={`${baseBtn} border-transparent text-white bg-gradient-to-r from-[#F59E0B] to-[#D97706]`} onClick={p.onStart}><Rocket size={12} className="inline mr-1" />Start</motion.button>
          <button className={`${baseBtn} border-[#E6CFB3] bg-[#FCE7C8] text-[#9A6B4A]`} onClick={p.onPrev}><SkipBack size={12} className="inline mr-1" />Prev</button>
          <button className={`${baseBtn} border-[#E6CFB3] bg-[#FCE7C8] text-[#9A6B4A]`} onClick={p.onNext}><SkipForward size={12} className="inline mr-1" />Next</button>
          <motion.button whileHover={{ scale: 1.03 }} className={`${baseBtn} border-transparent text-white bg-gradient-to-r from-[#F59E0B] to-[#D97706]`} onClick={p.onPlay}><Play size={12} className="inline mr-1" />Play</motion.button>
          <button className={`${baseBtn} border-[#DAB58E] bg-[#F6C8A8] text-[#7F4A2A]`} onClick={p.onPause}><Pause size={12} className="inline mr-1" />Pause</button>
          <button className={`${baseBtn} border-[#D6A9AD] bg-[#E8B4B8] text-[#7A494D]`} onClick={p.onReset}><RotateCcw size={12} className="inline mr-1" />Reset</button>

          <select value={p.speed} onChange={(e) => p.setSpeed(Number(e.target.value))} className={`${inputCls} w-16`}>
            <option value={2000}>0.5x</option><option value={1000}>1x</option><option value={500}>2x</option>
          </select>
          <div className="text-xs text-[#7C6A5D]">Step {p.step}/{p.total}</div>
          <span className={`text-xs px-2.5 py-1 rounded-full border ${badgeMap[p.status] ?? badgeMap.Ready}`}>{p.status}</span>
        </div>
      </div>
    </div>
  );
}
