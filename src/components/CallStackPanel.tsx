export default function CallStackPanel({ stack = [] }: { stack?: string[] }) {
  return (
    <div className="warm-card p-4">
      <div className="text-sm text-[#7C6A5D] mb-2">调用栈</div>
      <div className="flex flex-wrap items-center gap-2">
        {stack.length === 0 && <span className="text-sm text-[#8C7A6E]">-</span>}
        {stack.map((item, i) => (
          <span key={`${item}-${i}`} className="contents">
            <span className={`px-2 py-1 rounded-full text-xs border ${i === stack.length - 1 ? 'bg-[#FCE7C8] border-[#D97706] text-[#8B5A2B]' : 'bg-[#FFF8F0] border-[#E7D9C8] text-[#6D584A]'}`}>{item}</span>
            {i < stack.length - 1 && <span className="text-[#9A6B4A]">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
