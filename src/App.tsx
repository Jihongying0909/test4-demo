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
import TeachingContent from './components/TeachingContent';
import RuntimeCharts from './components/RuntimeCharts';
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
  const [tab, setTab] = useState<'table' | 'reach'>('table');
  const [bottomTab, setBottomTab] = useState<'explain' | 'log' | 'complexity'>('explain');

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
    }, 180);
    return () => clearInterval(t);
  }, [status, steps.length]);

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

  const linesKey = algorithm === 'reach' ? 'bottomup' : algorithm;

  return (
    <div className="min-h-screen p-3 lg:p-4 bg-[#f7f5ff] text-[#43385a]">
      <ControlPanel
        k={k}
        n={n}
        setK={setK}
        setN={setN}
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        step={steps.length ? idx + 1 : 0}
        total={steps.length}
        status={status}
        onStart={start}
        onPrev={() => { setStatus('Paused'); setIdx((v) => Math.max(0, v - 1)); }}
        onNext={() => { setStatus('Paused'); setIdx((v) => Math.min(Math.max(0, steps.length - 1), v + 1)); }}
        onPlay={() => setStatus('Running')}
        onPause={() => setStatus('Paused')}
        onReset={() => { setStatus('Ready'); setIdx(0); }}
      />

      <TeachingContent step={current} algorithm={algorithm} />

      <div className="grid grid-cols-1 xl:grid-cols-20 gap-3 mt-3 items-stretch">
        <div className="xl:col-span-6 h-full">
          <PseudocodePanel lines={pseudoMap[linesKey]} current={current?.pseudoLine ?? 0} visited={visited} />
        </div>
        <div className="xl:col-span-9 h-full">
          <VisualizationPanel step={current} tab={tab} setTab={setTab} totalFloors={n} />
        </div>
        <div className="xl:col-span-5 space-y-3 h-full">
          <StateMonitor step={current} />
          <CallStackPanel stack={current?.callStack} />
        </div>
      </div>

      <div className="warm-card mt-3 p-4">
        <div className="text-lg font-semibold soft-title mb-3">步骤信息</div>
        <div className="flex items-center gap-2 mb-3">
          <button onClick={() => setBottomTab('explain')} className={`px-3 py-1.5 text-sm rounded-xl border ${bottomTab === 'explain' ? 'soft-purple' : 'bg-[#fcfbff] border-[#e9e4f8]'}`}>当前解释</button>
          <button onClick={() => setBottomTab('log')} className={`px-3 py-1.5 text-sm rounded-xl border ${bottomTab === 'log' ? 'soft-blue' : 'bg-[#fcfbff] border-[#e9e4f8]'}`}>运行日志</button>
          <button onClick={() => setBottomTab('complexity')} className={`px-3 py-1.5 text-sm rounded-xl border ${bottomTab === 'complexity' ? 'soft-pink' : 'bg-[#fcfbff] border-[#e9e4f8]'}`}>复杂度说明</button>
        </div>

        {bottomTab === 'explain' && <StepExplanation step={current} />}
        {bottomTab === 'log' && <ExecutionLog logs={current?.logs} />}
        {bottomTab === 'complexity' && (
          <div className="warm-subcard p-4 text-sm leading-7 text-[#5c5077]">
            <div>蛮力法时间复杂度约为 O(N^(K-2) * 2^N)。</div>
            <div>自顶向下 DP：时间 O(KN²)，空间 O(KN)。</div>
            <div>自底向上 DP：时间 O(KN²)，空间 O(KN)。</div>
            <div>一维优化思想：reach[k] = reach[k] + reach[k-1] + 1。</div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 mt-3 items-stretch">
        <div className="xl:col-span-4 h-full"><HeatmapView heat={current?.heatmap} /></div>
        <div className="xl:col-span-8 h-full"><ComparePanel brute={allCompare.brute} top={allCompare.top} bottom={allCompare.bottom} /></div>
      </div>

      <div className="mt-3">
        <RuntimeCharts steps={steps} currentIndex={idx} />
      </div>
    </div>
  );
}
