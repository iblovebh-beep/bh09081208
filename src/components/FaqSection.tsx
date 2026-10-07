import { useState } from 'react';
import { FAQS } from '../data/productData';
import { ChevronDown, ChevronUp, HelpCircle, PhoneCall } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-14 sm:py-20 px-4 bg-[#FBF8F3]">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-10">
          <span className="inline-block text-xs sm:text-sm font-bold text-[#8B5A2B] bg-[#EFE4D2] border border-[#DFCDB5] px-3.5 py-1.5 rounded-full mb-3">
            궁금한 점을 확인하세요
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#261E18] tracking-tight">
            자주 묻는 질문
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6D533E]">
            고객님들께서 자주 문의하시는 내용을 모았습니다.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E5DAC8] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                >
                  <span className="text-base sm:text-lg font-bold text-[#2A1F18] flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#EFE7D8] text-[#8B5A2B] flex items-center justify-center text-xs font-black shrink-0">
                      Q
                    </span>
                    {faq.question}
                  </span>
                  <span className="text-[#8B5A2B] shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-sm sm:text-base text-[#685240] leading-relaxed border-t border-[#F2E9DE] bg-[#FAF8F5]">
                    <div className="flex gap-2.5 pt-3">
                      <span className="w-6 h-6 rounded-full bg-[#2D5A3A] text-white flex items-center justify-center text-xs font-black shrink-0">
                        A
                      </span>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Phone Inquiry Banner */}
        <div className="mt-10 bg-gradient-to-r from-[#2D5A3A] to-[#1E3E27] text-white rounded-2xl p-6 text-center sm:flex sm:items-center sm:justify-between">
          <div className="text-left mb-4 sm:mb-0">
            <h4 className="text-lg sm:text-xl font-black">전화 주문 및 상담이 필요하신가요?</h4>
            <p className="text-xs sm:text-sm text-[#C8E5CD] mt-1">
              어르신도 편하게 전화 한 통으로 주소 말씀하시고 주문 가능합니다.
            </p>
          </div>
          <a
            href="tel:1588-0000"
            className="inline-flex items-center gap-2 bg-white text-[#2D5A3A] font-black text-base sm:text-lg px-5 py-3 rounded-xl shadow-md hover:bg-[#F2F8F3] transition-all cursor-pointer"
          >
            <PhoneCall className="w-5 h-5" />
            <span>1588-0000 전화걸기</span>
          </a>
        </div>

      </div>
    </section>
  );
}
