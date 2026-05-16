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
  const [speed, setSpeed] = useState(1000);
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
    }, speed);
    return () => clearInterval(t);
  }, [status, speed, steps.length]);

  const start = () => {
    const limit = limits[algorithm];
    if (k > limit.k || n > limit.n) {
      alert('褰撳墠瑙勬ā杩囧ぇ锛屽缓璁娇鐢ㄨ緝灏忓弬鏁拌繘琛屽彲瑙嗗寲婕旂ず銆?);
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
    <div className="min-h-screen p-3 lg:p-4 bg-[#f7f5ff] text-[#43385a]">
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

      <TeachingContent step={current} algorithm={algorithm} />

      <div className="grid grid-cols-1 xl:grid-cols-20 gap-3 mt-3">
        <div className="xl:col-span-6">
          <PseudocodePanel lines={pseudoMap[algorithm === 'reach' ? 'bottomup' : algorithm]} current={current?.pseudoLine ?? 0} visited={visited} />
        </div>
        <div className="xl:col-span-9">
          <VisualizationPanel step={current} tab={tab} setTab={setTab} totalFloors={n} />
        </div>
        <div className="xl:col-span-5 space-y-3">
          <StateMonitor step={current} />
          <CallStackPanel stack={current?.callStack} />
          <Legend />
        </div>
      </div>

      <div className="warm-card mt-3 p-4">
        <div className="flex items-center gap-2 mb-3">
          <button onClick={() => setBottomTab('explain')} className={`px-3 py-1.5 text-sm rounded-xl border ${bottomTab === 'explain' ? 'soft-purple' : 'bg-[#fcfbff] border-[#e9e4f8]'}`}>褰撳墠姝ラ瑙ｉ噴</button>
          <button onClick={() => setBottomTab('log')} className={`px-3 py-1.5 text-sm rounded-xl border ${bottomTab === 'log' ? 'soft-blue' : 'bg-[#fcfbff] border-[#e9e4f8]'}`}>杩愯鏃ュ織</button>
          <button onClick={() => setBottomTab('complexity')} className={`px-3 py-1.5 text-sm rounded-xl border ${bottomTab === 'complexity' ? 'soft-pink' : 'bg-[#fcfbff] border-[#e9e4f8]'}`}>澶嶆潅搴﹁鏄?/button>
        </div>

        {bottomTab === 'explain' && <StepExplanation step={current} />}
        {bottomTab === 'log' && <ExecutionLog logs={current?.logs} />}
        {bottomTab === 'complexity' && (
          <div className="warm-subcard p-4 text-sm leading-7 text-[#5c5077]">
            <div>铔姏娉曪細鏃堕棿澶嶆潅搴︾害 O(N^(K-2) * 2^N)銆?/div>
            <div>鑷《鍚戜笅 DP锛氭椂闂?O(KN虏)锛岀┖闂?O(KN)銆?/div>
            <div>鑷簳鍚戜笂 DP锛氭椂闂?O(KN虏)锛岀┖闂?O(KN)銆?/div>
            <div>涓€缁翠紭鍖栵細reach[k] = reach[k] + reach[k-1] + 1銆?/div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 mt-3">
        <div className="xl:col-span-4"><HeatmapView heat={current?.heatmap} /></div>
        <div className="xl:col-span-8"><ComparePanel brute={allCompare.brute} top={allCompare.top} bottom={allCompare.bottom} /></div>
      </div>

      <div className="mt-3">
        <RuntimeCharts steps={steps} currentIndex={idx} />
      </div>
    </div>
  );
}

