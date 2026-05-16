import { Step, AlgoType } from '../types';
import { BookOpen, Sigma, FlaskConical, BarChart3 } from 'lucide-react';

function metric(step?: Step) {
  const calls = step?.metrics?.calls ?? 0;
  const states = step?.metrics?.states ?? 0;
  const hits = step?.metrics?.hits ?? 0;
  const repeat = Math.max(0, calls - states);
  const rate = calls > 0 ? ((repeat / calls) * 100).toFixed(1) : '0.0';
  return { calls, states, hits, repeat, rate };
}

function formulaByAlgo(algorithm: AlgoType) {
  if (algorithm === 'bottomup') return 'dp_{e,f}=\\min_{1\\le x \\le f}\\left(1+\\max(dp_{e-1,x-1},dp_{e,f-x})\\right)';
  if (algorithm === 'topdown') return 'T_{K,N}=\\min_{1\\le x \\le N}\\left(1+\\max(T_{K-1,x-1},T_{K,N-x})\\right),\\ \text{with memo}';
  if (algorithm === 'reach') return 'reach_k^{(m)}=reach_k^{(m-1)}+reach_{k-1}^{(m-1)}+1';
  return 'T_{K,N}=\\min_{1\\le x \\le N}\\left(1+\\max(T_{K-1,x-1},T_{K,N-x})\\right)';
}

export default function TeachingContent({ step, algorithm }: { step?: Step; algorithm: AlgoType }) {
  const m = metric(step);
  const formula = formulaByAlgo(algorithm);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 mt-3">
      <div className="warm-card p-4">
        <div className="flex items-center gap-2 soft-title text-lg font-semibold mb-2"><BookOpen size={18} />闂鑳屾櫙璇存槑</div>
        <p className="text-sm text-[#5a5075] leading-7">鐩爣锛氬湪鏈€鍧忔儏鍐典笅鐢ㄦ渶灏戞鏁扮‘瀹氶棬妲涙ゼ灞?F銆傝嫢浠庢ゼ灞?x 鎶曟幏楦¤泲锛寈 {'>'} F 浼氱锛寈 {'<='} F 涓嶇銆?/p>
        <div className="mt-3 warm-subcard p-2 text-sm flex flex-wrap gap-2">
          <span className="px-2 py-1 rounded soft-blue border">瀹夊叏鍖洪棿 1..F</span>
          <span className="px-2 py-1 rounded soft-purple border">闂ㄦ灞?F</span>
          <span className="px-2 py-1 rounded soft-pink border">鍗遍櫓鍖洪棿 F+1..N</span>
        </div>
      </div>

      <div className="warm-card p-4">
        <div className="flex items-center gap-2 soft-title text-lg font-semibold mb-2"><Sigma size={18} />鏍稿績閫掓帹鍏紡</div>
        <div className="warm-subcard p-3 font-['Cambria_Math','Times_New_Roman',serif] text-[30px] leading-[1.25] text-[#3f355b] overflow-auto">
          <span className="whitespace-nowrap">{formula}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          <span className="px-2 py-1 rounded soft-pink border">T(K-1,x-1)锛氶浮铔嬬浜?/span>
          <span className="px-2 py-1 rounded soft-blue border">T(K,N-x)锛氶浮铔嬫湭纰?/span>
          <span className="px-2 py-1 rounded soft-purple border">max锛氳€冭檻鏈€鍧忔儏鍐?/span>
          <span className="px-2 py-1 rounded soft-purple border">min锛氶€夋嫨鏈€浼樻ゼ灞?/span>
        </div>
      </div>

      <div className="warm-card p-4">
        <div className="flex items-center gap-2 soft-title text-lg font-semibold mb-2"><BarChart3 size={18} />涓夌绠楁硶瀵规瘮璇存槑</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="warm-subcard p-2"><div className="font-semibold">铔姏閫掑綊</div><div>鐩存帴鏋氫妇锛屼笉淇濆瓨缁撴灉锛岄噸澶嶈绠楀銆?/div><span className="inline-block mt-1 px-2 py-0.5 rounded soft-pink border">鎸囨暟绾?/span></div>
          <div className="warm-subcard p-2"><div className="font-semibold">鑷《鍚戜笅 DP</div><div>閫掑綊 + memo 缂撳瓨锛岄伩鍏嶉噸澶嶈绠椼€?/div><span className="inline-block mt-1 px-2 py-0.5 rounded soft-blue border">O(KN虏)</span></div>
          <div className="warm-subcard p-2"><div className="font-semibold">鑷簳鍚戜笂 DP</div><div>浜岀淮琛ㄥ～琛紝浠庡皬闂鎺ㄥぇ闂銆?/div><span className="inline-block mt-1 px-2 py-0.5 rounded soft-purple border">O(KN虏)</span></div>
        </div>
      </div>

      <div className="warm-card p-4">
        <div className="soft-title text-lg font-semibold mb-2">閲嶅瀛愰棶棰樿瀵熷尯</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="warm-subcard p-2">鎬昏皟鐢ㄦ鏁?div className="text-lg font-semibold">{m.calls}</div></div>
          <div className="warm-subcard p-2">涓嶅悓鐘舵€佹暟<div className="text-lg font-semibold">{m.states}</div></div>
          <div className="warm-subcard p-2">閲嶅璁＄畻娆℃暟<div className="text-lg font-semibold text-[#8a4f73]">{m.repeat}</div></div>
          <div className="warm-subcard p-2">閲嶅鐜?div className="text-lg font-semibold">{m.rate}%</div></div>
          <div className="warm-subcard p-2 col-span-2">缂撳瓨鍛戒腑娆℃暟<div className="text-lg font-semibold text-[#44638f]">{m.hits}</div></div>
        </div>
      </div>

      <div className="warm-card p-4">
        <div className="flex items-center gap-2 soft-title text-lg font-semibold mb-2"><FlaskConical size={18} />瀹為獙缁撴灉涓庢渶澶ц妯?/div>
        <div className="text-sm leading-7 text-[#5a5075]">
          <div>铔姏娉曪細E鈮?2, F鈮?6</div>
          <div>鑷《鍚戜笅 DP锛欵鈮?2, F鈮?94</div>
          <div>鑷簳鍚戜笂 DP锛欵鈮?2, F鈮?039</div>
          <div className="mt-1 soft-sub">鏉′欢锛氬崟缁勬椂闂撮槇鍊?10 绉掞紝F 鎼滅储涓婇檺 5000銆?/div>
        </div>
      </div>

      <div className="warm-card p-4">
        <div className="soft-title text-lg font-semibold mb-2">瀛︿範灏忕粨</div>
        <ul className="text-sm leading-7 text-[#5a5075] list-disc pl-4">
          <li>铔姏娉曢噸澶嶅瓙闂涓ラ噸銆?/li>
          <li>鑷《鍚戜笅 DP 鍒╃敤缂撳瓨鏄捐憲鍑忓皯閲嶅璁＄畻銆?/li>
          <li>鑷簳鍚戜笂 DP 閫氳繃濉〃浣挎瘡涓姸鎬佸彧璁＄畻涓€娆°€?/li>
          <li>涓夌绠楁硶缁撴灉涓€鑷达紝浣嗘晥鐜囧樊寮傛槑鏄俱€?/li>
        </ul>
      </div>
    </div>
  );
}

