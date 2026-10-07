import { ShoppingBag, ArrowRight } from 'lucide-react';

interface StickyMobileBarProps {
  onOrderClick: () => void;
  price: number;
}

export function StickyMobileBar({ onOrderClick, price }: StickyMobileBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DECBB4] p-3 sm:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="pl-1">
          <span className="block text-[11px] font-bold text-[#8B5A2B]">
            국내산 50곡 채소 생식
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#261E18]">
              {price.toLocaleString()}원
            </span>
            <span className="text-[10px] font-bold text-[#2D5A3A] bg-[#E8F1E9] px-1.5 py-0.5 rounded">
              무료배송
            </span>
          </div>
        </div>

        <button
          onClick={onOrderClick}
          className="flex-1 max-w-[200px] flex items-center justify-center gap-2 bg-[#2D5A3A] hover:bg-[#22482E] text-white text-base font-extrabold py-3.5 px-4 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer border border-[#1E4329]"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>주문하기</span>
        </button>
      </div>
    </div>
  );
}
