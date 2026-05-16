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

const inputCls = 'h-9 rounded-lg border border-[#e8e3f6] bg-[#fcfbff] px-2.5 text-sm text-[#43385a] outline-none focus:ring-2 focus:ring-[#ddd0ff]';
const baseBtn = 'h-9 px-2.5 rounded-lg text-xs font-medium border transition-all duration-200 hover:-translate-y-0.5';

const badgeMap: Record<string, string> = {
  Ready: 'soft-blue',
  Running: 'soft-purple',
  Paused: 'soft-pink',
  Finished: 'soft-blue',
};

export default function ControlPanel(p: Props) {
  return (
    <div className="warm-card rounded-2xl p-4">
      <div className="mb-3">
        <h1 className="text-3xl font-bold soft-title">鸡蛋掉落问题算法可视化平台</h1>
        <p className="text-sm soft-sub">浅色教学演示：伪代码、递归树、DP 表与状态联动</p>
      </div>

      <div className="warm-subcard p-3">
        <div className="flex flex-wrap items-end gap-2">
          <label className="text-xs soft-sub">Eggs
            <input type="number" value={p.k} min={1} onChange={(e) => p.setK(Number(e.target.value))} className={`${inputCls} w-20 mt-1 block`} />
          </label>

          <label className="text-xs soft-sub">Floors
            <input type="number" value={p.n} min={0} onChange={(e) => p.setN(Number(e.target.value))} className={`${inputCls} w-24 mt-1 block`} />
          </label>

          <label className="text-xs soft-sub">Algorithm
            <select value={p.algorithm} onChange={(e) => p.setAlgorithm(e.target.value as AlgoType)} className={`${inputCls} w-40 mt-1 block`}>
              <option value="bruteforce">蛮力递归</option>
              <option value="topdown">自顶向下 DP</option>
              <option value="bottomup">自底向上 DP</option>
              <option value="reach">一维优化 Reach</option>
            </select>
          </label>

          <motion.button whileHover={{ scale: 1.03 }} className={`${baseBtn} border-[#d8ccff] bg-gradient-to-r from-[#c4b5fd] to-[#93c5fd] text-[#2f2550]`} onClick={p.onStart}><Rocket size={12} className="inline mr-1" />Start</motion.button>
          <button className={`${baseBtn} border-[#d6d7ff] bg-[#eef2ff] text-[#4b4f8c]`} onClick={p.onPrev}><SkipBack size={12} className="inline mr-1" />Prev</button>
          <button className={`${baseBtn} border-[#d6d7ff] bg-[#eef2ff] text-[#4b4f8c]`} onClick={p.onNext}><SkipForward size={12} className="inline mr-1" />Next</button>
          <motion.button whileHover={{ scale: 1.03 }} className={`${baseBtn} border-[#d8ccff] bg-gradient-to-r from-[#c4b5fd] to-[#93c5fd] text-[#2f2550]`} onClick={p.onPlay}><Play size={12} className="inline mr-1" />Play</motion.button>
          <button className={`${baseBtn} border-[#f5cfe4] bg-[#fce7f3] text-[#8a4f73]`} onClick={p.onPause}><Pause size={12} className="inline mr-1" />Pause</button>
          <button className={`${baseBtn} border-[#ddd0ff] bg-[#efe9ff] text-[#5f4c95]`} onClick={p.onReset}><RotateCcw size={12} className="inline mr-1" />Reset</button>

          <label className="text-xs soft-sub">Speed
            <select value={p.speed} onChange={(e) => p.setSpeed(Number(e.target.value))} className={`${inputCls} w-20 mt-1 block`}>
              <option value={2000}>0.5x</option><option value={1000}>1x</option><option value={500}>2x</option>
            </select>
          </label>

          <div className="text-sm soft-sub ml-1">Step {p.step}/{p.total}</div>
          <span className={`text-xs px-2.5 py-1 rounded-full border ${badgeMap[p.status] ?? 'soft-blue'}`}>{p.status}</span>
        </div>
      </div>
    </div>
  );
}
