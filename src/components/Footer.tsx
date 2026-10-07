import { Phone, ShieldCheck, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenLookup?: () => void;
  onOpenAdmin?: () => void;
}

export function Footer({ onOpenLookup, onOpenAdmin }: FooterProps) {
  return (
    <footer className="bg-[#241C15] text-[#C2B29F] py-12 sm:py-16 px-4 pb-24 sm:pb-16 border-t border-[#3B2E24] text-xs sm:text-sm">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#3B2E24]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-md bg-[#2D5A3A] text-white flex items-center justify-center font-bold text-xs">
                生
              </span>
              <span className="text-base sm:text-lg font-black text-white">
                온누리 하루한잔 자연생식
              </span>
            </div>
            <p className="text-xs text-[#9E8B78]">
              우리 땅에서 난 50가지 순수 곡물과 채소로 정직하게 만듭니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {onOpenLookup && (
              <button
                onClick={onOpenLookup}
                className="bg-[#33261C] hover:bg-[#423326] text-[#E8DFC8] px-3.5 py-2 rounded-xl border border-[#4F3C2C] transition-colors cursor-pointer text-xs font-semibold"
              >
                고객 주문조회
              </button>
            )}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="bg-[#2D5A3A] hover:bg-[#23492F] text-white px-3.5 py-2 rounded-xl border border-[#3E6D4B] transition-colors cursor-pointer text-xs font-bold"
              >
                사장님 주문관리
              </button>
            )}
            <a
              href="tel:1588-0000"
              className="flex items-center gap-2 bg-[#33261C] hover:bg-[#423326] text-white px-4 py-2 rounded-xl border border-[#4F3C2C] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#8B5A2B]" />
              <span className="font-bold">1588-0000</span>
            </a>
          </div>
        </div>

        {/* Company & Compliance Details */}
        <div className="space-y-2 leading-relaxed text-[#9C8B78] text-[11px] sm:text-xs">
          <p>
            상호명: 온누리자연식품 (주) · 대표자: 홍길동 · 사업자등록번호: 123-45-67890 · 통신판매업신고: 제2026-서울종로-0123호
          </p>
          <p>
            소재지: 서울특별시 종로구 율곡로 100 자연빌딩 3층 · 식품제조가공업 제2024-00123호
          </p>
          <p>
            고객상담실: 1588-0000 (평일 09:00 ~ 18:00, 점심시간 12:00 ~ 13:00 / 토·일·공휴일 휴무)
          </p>
          <p className="pt-2 text-[#7F6E5D]">
            ※ 본 상품은 질병의 예방 및 치료를 위한 의약품이 아닌 일반 가공식품(생식류)입니다. 본 페이지의 모든 이미지는 소비자의 이해를 돕기 위한 연출 컷입니다.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-[#3B2E24] text-[11px] text-[#6E5E4E] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 온누리 하루한잔 자연생식. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">이용약관</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">개인정보처리방침</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">식품위생고시</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
