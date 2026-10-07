import { useState } from 'react';
import { PackageOption } from '../types';
import { PACKAGE_OPTIONS } from '../data/productData';
import { ShoppingBag, Truck, Gift, ShieldCheck, Check, Sparkles, ArrowRight } from 'lucide-react';

interface ProductOrderSectionProps {
  onOrderClickWithOption: (option: PackageOption) => void;
}

export function ProductOrderSection({ onOrderClickWithOption }: ProductOrderSectionProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string>('single');

  const currentOption = PACKAGE_OPTIONS.find((opt) => opt.id === selectedOptionId) || PACKAGE_OPTIONS[0];

  return (
    <section id="order-section" className="py-14 sm:py-24 px-4 bg-gradient-to-b from-[#FAF6F0] to-[#F3ECE2] border-t border-[#E5DAC8]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-bold text-[#8B5A2B] bg-[#EFE4D2] border border-[#DFCDB5] px-3.5 py-1.5 rounded-full mb-3">
            산지직송 정품 안내
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#261E18] tracking-tight">
            하루한잔 자연생식 <span className="text-[#2D5A3A]">특별 주문</span>
          </h2>
          <p className="mt-3 text-base sm:text-xl font-bold text-[#6D533E]">
            국내산 50가지 자연 곡물과 채소를 지금 특별 혜택으로 만나보세요.
          </p>
        </div>

        {/* Single Main Product Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#DECBB4] shadow-xl relative overflow-hidden">
          
          {/* Top highlight ribbon */}
          <div className="bg-[#2D5A3A] text-white text-center py-2 px-4 -mx-6 -mt-6 sm:-mx-10 sm:-mt-10 mb-6 sm:mb-8 font-bold text-xs sm:text-sm flex items-center justify-center gap-2">
            <Gift className="w-4 h-4 text-[#A7F3D0]" />
            <span>주문 시 전용 트라이탄 쉐이커 보틀 무료 증정 + 전 지역 무료 배송</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Product Image & Specs Column */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full bg-gradient-to-b from-[#F9F5EF] to-[#EFE6D8] rounded-2xl p-6 border border-[#DECAB4] text-center relative">
                
                {/* 100% Korean Mark */}
                <div className="absolute top-4 left-4 bg-[#8B5A2B] text-white text-xs font-black px-2.5 py-1 rounded-md">
                  국내산 100%
                </div>

                {/* Packaging Visual Mockup */}
                <div className="my-6 relative flex items-center justify-center">
                  <div className="w-48 sm:w-56 h-60 bg-[#FAF7F2] rounded-2xl border-4 border-[#8B5A2B] shadow-lg p-4 flex flex-col justify-between text-left relative overflow-hidden">
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#E2D2BC]/40 rounded-full" />
                    <div>
                      <div className="text-[11px] font-black tracking-widest text-[#8B5A2B] uppercase">
                        DAILY MEAL RAW FOOD
                      </div>
                      <h4 className="text-lg font-black text-[#2A1F18] mt-1 leading-tight">
                        하루한잔<br />
                        <span className="text-[#2D5A3A]">자연생식 50곡</span>
                      </h4>
                      <p className="text-[11px] text-[#7A614D] mt-1">
                        국내산 50가지 곡물·채소
                      </p>
                    </div>

                    <div className="bg-[#2D5A3A] text-white text-center py-1.5 px-2 rounded-lg text-xs font-bold">
                      40g × 30포 (1,200g)
                    </div>
                  </div>

                  {/* Single pouch overlapping */}
                  <div className="absolute -right-2 sm:-right-4 bottom-2 w-20 h-32 bg-white rounded-xl border-2 border-[#2D5A3A] shadow-md p-2 flex flex-col justify-between transform rotate-6">
                    <span className="text-[9px] font-bold text-[#8B5A2B]">1포 40g</span>
                    <div className="w-full h-8 bg-[#8FA683]/20 rounded flex items-center justify-center text-[10px] text-[#2D5A3A] font-black">
                      이지컷
                    </div>
                  </div>
                </div>

                <div className="text-center mt-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#2A1F18]">
                    온누리 하루한잔 자연생식
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7D6450] mt-1 font-medium">
                    1포당 40g 넉넉한 식사 대용량 / 개별 이지컷 포장
                  </p>
                </div>
              </div>

              {/* Service Badges */}
              <div className="grid grid-cols-2 gap-2 w-full mt-4 text-xs font-bold text-[#5C4533]">
                <div className="bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E7DBC9] flex items-center gap-2 justify-center">
                  <Truck className="w-4 h-4 text-[#2D5A3A]" />
                  <span>오늘 주문 시 내일 발송</span>
                </div>
                <div className="bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E7DBC9] flex items-center gap-2 justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#8B5A2B]" />
                  <span>안심 HACCP 인증</span>
                </div>
              </div>
            </div>

            {/* Price & Options Selection Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              <div>
                <span className="text-xs font-bold text-[#2D5A3A] tracking-wider uppercase">
                  공식 산지직송 판매
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#261E18] mt-1">
                  [기본구성] 1박스 30포 (1개월분)
                </h3>
                <p className="text-sm text-[#735A46] mt-1">
                  1회 식사 분량(40g) 개별 파우치 30포 + 트라이탄 전용 쉐이커 증정
                </p>

                {/* Prominent Price Display */}
                <div className="my-5 p-4 sm:p-5 bg-[#FAF6F0] rounded-2xl border border-[#E8DFC8]">
                  <div className="flex items-center gap-2 text-sm text-[#8C7662]">
                    <span>권장소비자가</span>
                    <span className="line-through">{currentOption.originalPrice.toLocaleString()}원</span>
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-[#D32F2F]">
                      {currentOption.discountRate}% 할인
                    </span>
                    <span className="text-3xl sm:text-5xl font-black text-[#261E18]">
                      {currentOption.discountPrice.toLocaleString()}
                      <span className="text-xl sm:text-2xl font-bold ml-1">원</span>
                    </span>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm font-bold text-[#2D5A3A] flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>무료배송 혜택 적용 · 1포당 약 1,500원으로 든든한 한 끼</span>
                  </div>
                </div>

                {/* Package Options Choice */}
                <div className="space-y-2.5 mb-6">
                  <label className="block text-sm font-black text-[#3D2C1E]">
                    수량 / 패키지 선택:
                  </label>
                  {PACKAGE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                        selectedOptionId === opt.id
                          ? 'border-[#2D5A3A] bg-[#F1F7F2] shadow-sm'
                          : 'border-[#E4D7C5] bg-white hover:border-[#C4B29E]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedOptionId === opt.id
                              ? 'border-[#2D5A3A] bg-[#2D5A3A]'
                              : 'border-[#B8A490]'
                          }`}
                        >
                          {selectedOptionId === opt.id && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm sm:text-base text-[#2C241E]">
                              {opt.name}
                            </span>
                            {opt.popular && (
                              <span className="text-[11px] font-bold text-white bg-[#8B5A2B] px-2 py-0.5 rounded-full">
                                추천
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#7A614D]">
                            {opt.periodText}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="block text-base sm:text-lg font-black text-[#2C241E]">
                          {opt.discountPrice.toLocaleString()}원
                        </span>
                        <span className="text-xs text-[#D32F2F] font-bold">
                          {opt.discountRate}% 할인
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Gifts included summary */}
                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E9DFCE] mb-6 text-xs text-[#634E3C] space-y-1">
                  <span className="font-bold text-[#8B5A2B] block mb-1">🎁 포함된 특별 사은품 혜택:</span>
                  {currentOption.freeGifts.map((gift, gIdx) => (
                    <div key={gIdx} className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-[#2D5A3A]" />
                      <span>{gift}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* REQUIRED: 큰 "주문하기" 버튼 */}
              <div className="mt-4">
                <button
                  onClick={() => onOrderClickWithOption(currentOption)}
                  className="w-full flex items-center justify-center gap-3 bg-[#2D5A3A] hover:bg-[#22482E] text-white text-xl sm:text-2xl font-black py-4 sm:py-5 px-6 rounded-2xl shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all cursor-pointer border-2 border-[#1E4329]"
                >
                  <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
                  <span>{currentOption.discountPrice.toLocaleString()}원 주문하기</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <p className="text-center text-xs text-[#8C7662] mt-3 font-semibold">
                  안심 결제 지원 (카드결제 / 무통장입금 / 간편결제 / 전화주문 신청)
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
