import { Phone, ShoppingCart, ClipboardList, Shield, User, LogOut, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  onOrderClick: () => void;
  onOpenLookup: () => void;
  onOpenAdmin: () => void;
  orderCount: number;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export function Header({
  onOrderClick,
  onOpenLookup,
  onOpenAdmin,
  orderCount,
  currentUser,
  onOpenAuth,
  onSignOut,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F3]/95 backdrop-blur-md border-b border-[#E8DFC8]/60 transition-all">
      {/* Top Welcome Bar: Visible when logged in or as a quick login invitation */}
      {currentUser ? (
        <div className="bg-[#2D5A3A] text-white py-2 px-4 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b border-[#1E4329]">
          <CheckCircle className="w-4 h-4 text-[#A7F3D0] shrink-0" />
          <span>
            <strong className="text-white underline decoration-[#A7F3D0] underline-offset-4 font-black">
              {currentUser.displayName}님 환영합니다
            </strong>
            <span className="hidden sm:inline text-[#D4E8D7]"> · 오늘 하루도 건강한 자연 생식과 함께하세요!</span>
          </span>
          <button
            onClick={onSignOut}
            className="ml-2 bg-white/20 hover:bg-white/30 text-white text-xs px-2.5 py-0.5 rounded-md transition-colors cursor-pointer"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="bg-[#F5EFE6] text-[#735A46] py-1.5 px-4 text-center text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-2 border-b border-[#EADBCC]">
          <span>주문하시려면 회원가입 또는 로그인이 필요합니다.</span>
          <button
            onClick={onOpenAuth}
            className="text-[#2D5A3A] font-black underline cursor-pointer hover:text-[#1E4329]"
          >
            로그인 / 회원가입하기
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#2D5A3A] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            生
          </div>
          <div>
            <span className="block text-xs font-semibold text-[#8B5A2B] tracking-wider">
              100% 국내산 50곡 채소
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-[#2C241E] tracking-tight group-hover:text-[#2D5A3A] transition-colors">
              하루한잔 자연생식
            </span>
          </div>
        </button>

        {/* Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* User Auth Button */}
          {currentUser ? (
            <div className="hidden xs:flex items-center gap-1.5 bg-[#FAF6F0] px-2.5 py-1.5 rounded-lg border border-[#DECBB4] text-xs font-bold text-[#2C241E]">
              <User className="w-3.5 h-3.5 text-[#2D5A3A]" />
              <span className="max-w-[80px] truncate">{currentUser.displayName}님</span>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 text-xs sm:text-sm font-bold text-[#2D5A3A] hover:bg-[#EAF3EB] bg-[#EDF5EE] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#C6DECA] transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#2D5A3A]" />
              <span>로그인</span>
            </button>
          )}

          {/* Customer Order Status Lookup */}
          <button
            onClick={onOpenLookup}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#5A4533] hover:text-[#2D5A3A] bg-[#EFE7D8]/70 hover:bg-[#EFE7D8] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#DECDB7] transition-colors cursor-pointer"
            title="고객 주문 배송조회"
          >
            <ClipboardList className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span className="hidden sm:inline">주문조회</span>
          </button>

          {/* Store Owner Admin Manager */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#1E4329] hover:bg-[#D7EBD9] bg-[#E8F1E9] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#A7D7AF] transition-colors cursor-pointer relative shadow-xs"
            title="판매자 주문관리 (표)"
          >
            <Shield className="w-3.5 h-3.5 text-[#2D5A3A]" />
            <span>주문관리(표)</span>
            {orderCount > 0 && (
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#D32F2F] text-white text-[10px] sm:text-[11px] font-black flex items-center justify-center -ml-0.5">
                {orderCount}
              </span>
            )}
          </button>

          <a
            href="tel:1588-0000"
            className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5A4533] hover:text-[#2D5A3A] bg-[#EFE7D8]/70 px-3 py-1.5 rounded-lg border border-[#DECDB7] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#2D5A3A]" />
            <span>1588-0000</span>
          </a>

          <button
            onClick={onOrderClick}
            className="flex items-center gap-1.5 bg-[#2D5A3A] hover:bg-[#23472E] text-white font-bold text-xs sm:text-base px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>주문하기</span>
          </button>
        </div>
      </div>
    </header>
  );
}
