import { useEffect, useMemo, useState } from 'react';
import ControlPanel from './components/ControlPanel';
import PseudocodePanel from './components/PseudocodePanel';
import VisualizationPanel from './components/VisualizationPanel';
import StateMonitor from './components/StateMonitor';
import StepExplanation from './components/StepExplanation';
import ExecutionLog from './components/ExecutionLog';
import CallStackPanel from './components/CallStackPanel';
import HeatmapView from './components/HeatmapView';
import ComparePanel from './components/ComparePanel';
import Legend from './components/Legend';
import { pseudoMap } from './data/pseudocode';
import { Step } from './types';
import { generateBottomUpSteps, generateBruteForceSteps, generateReachDpSteps, generateTopDownSteps } from './utils/stepGenerators';

const limits = {
  bruteforce: { k: 4, n: 8 },
  topdown: { k: 6, n: 15 },
  bottomup: { k: 8, n: 20 },
  reach: { k: 8, n: 200 },
};

export default function App() {
  const [k, setK] = useState(2);
  const [n, setN] = useState(6);
  const [algorithm, setAlgorithm] = useState<'bruteforce' | 'topdown' | 'bottomup' | 'reach'>('bruteforce');
  const [steps, setSteps] = useState<Step[]>([]);
  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState<'Ready' | 'Running' | 'Paused' | 'Finished'>('Ready');
  const [speed, setSpeed] = useState(1000);
  const [tab, setTab] = useState<'table' | 'reach'>('table');

  const allCompare = useMemo(() => ({
    brute: generateBruteForceSteps(Math.min(k, 4), Math.min(n, 8)),
    top: generateTopDownSteps(Math.min(k, 6), Math.min(n, 15)),
    bottom: generateBottomUpSteps(Math.min(k, 8), Math.min(n, 20)),
  }), [k, n]);

  const current = steps[idx];
  const visited = new Set(steps.slice(0, idx + 1).map((s) => s.pseudoLine));

  useEffect(() => {
    if (status !== 'Running') return;
    const t = setInterval(() => {
      setIdx((p) => {
        if (p >= steps.length - 1) {
          setStatus('Finished');
          return p;
        }
        return p + 1;
      });
    }, speed);
    return () => clearInterval(t);
  }, [status, speed, steps.length]);

  const start = () => {
    const limit = limits[algorithm];
    if (k > limit.k || n > limit.n) {
      alert('当前规模过大，建议使用较小参数进行可视化演示。');
      return;
    }
    const generated = algorithm === 'bruteforce'
      ? generateBruteForceSteps(k, n)
      : algorithm === 'topdown'
        ? generateTopDownSteps(k, n)
        : algorithm === 'bottomup'
          ? generateBottomUpSteps(k, n)
          : generateReachDpSteps(k, n);

    setSteps(generated);
    setIdx(0);
    setStatus('Ready');
  };

  return (
    <div className="min-h-screen p-4 lg:p-7 bg-[#F8F4EE] text-[#4B3A2F]">
      <ControlPanel
        k={k}
        n={n}
        setK={setK}
        setN={setN}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        speed={speed}
        setSpeed={setSpeed}
        step={steps.length ? idx + 1 : 0}
        total={steps.length}
        status={status}
        onStart={start}
        onPrev={() => { setStatus('Paused'); setIdx((v) => Math.max(0, v - 1)); }}
        onNext={() => { setStatus('Paused'); setIdx((v) => Math.min(steps.length - 1, v + 1)); }}
        onPlay={() => setStatus('Running')}
        onPause={() => setStatus('Paused')}
        onReset={() => { setStatus('Ready'); setIdx(0); }}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mt-5">
        <div className="xl:col-span-3">
          <PseudocodePanel lines={pseudoMap[algorithm === 'reach' ? 'bottomup' : algorithm]} current={current?.pseudoLine ?? 0} visited={visited} />
        </div>
        <div className="xl:col-span-6">
          <VisualizationPanel step={current} tab={tab} setTab={setTab} />
        </div>
        <div className="xl:col-span-3 space-y-4">
          <StateMonitor step={current} />
          <CallStackPanel stack={current?.callStack} />
          <Legend />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mt-5">
        <div className="xl:col-span-5"><StepExplanation step={current} /></div>
        <div className="xl:col-span-4"><ExecutionLog logs={current?.logs} /></div>
        <div className="xl:col-span-3"><HeatmapView heat={current?.heatmap} /></div>
      </div>

      <div className="mt-5"><ComparePanel brute={allCompare.brute} top={allCompare.top} bottom={allCompare.bottom} /></div>
    </div>
  );
}
