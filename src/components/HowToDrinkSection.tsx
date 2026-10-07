import { THREE_STEPS } from '../data/productData';
import { ArrowRight, Droplets, Package, RefreshCw, Milk, Sparkles } from 'lucide-react';

export function HowToDrinkSection() {
  const stepIcons = [
    <Droplets className="w-8 h-8 text-[#2D5A3A]" key="drop" />,
    <Package className="w-8 h-8 text-[#8B5A2B]" key="pack" />,
    <RefreshCw className="w-8 h-8 text-[#2D5A3A]" key="shake" />,
  ];

  return (
    <section id="how-to-drink" className="py-14 sm:py-20 px-4 bg-[#FBF8F3]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-bold text-[#2D5A3A] bg-[#E8F1E9] border border-[#C5DEC8] px-3.5 py-1.5 rounded-full mb-3">
            간편 섭취 가이드
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#261E18] tracking-tight">
            물이나 우유에 타서 드세요
          </h2>
          <p className="mt-3 text-base sm:text-xl font-bold text-[#6D533E]">
            누구나 1분이면 완성! 1번 → 2번 → 3번 순서대로 따라 해보세요.
          </p>
        </div>

        {/* 1 -> 2 -> 3 Sequential Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {THREE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#E7DAC7] shadow-sm relative flex flex-col justify-between"
            >
              {/* Step indicator circle */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-[#2D5A3A] text-white flex items-center justify-center font-black text-xl shadow-md">
                  {step.step}
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#8B5A2B] bg-[#F7F1E7] px-3 py-1 rounded-full border border-[#E8DAC7]">
                  순서 {step.step}단계
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-[#2D5A3A] mb-1">
                  {step.stepTitle}
                </h3>
                <p className="text-lg sm:text-xl font-extrabold text-[#2A1F18] leading-snug mb-3">
                  {step.headline}
                </p>
                <p className="text-xs sm:text-sm text-[#735A46] font-medium leading-relaxed mb-4">
                  {step.details}
                </p>
              </div>

              {/* Helpful Tip */}
              <div className="mt-2 bg-[#F7F2EB] p-3 rounded-xl border border-[#EADBCC] text-xs sm:text-sm text-[#5C4533] font-semibold leading-relaxed">
                {step.tip}
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Taste Guide */}
        <div className="mt-10 bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D7C5] shadow-sm">
          <h4 className="text-base sm:text-lg font-black text-[#2A1F18] mb-4 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <Milk className="w-5 h-5 text-[#8B5A2B]" />
            <span>취향에 맞게 더욱 맛있게 즐기는 3가지 방법</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E8DEC9]">
              <span className="text-xs font-bold text-[#2D5A3A] block mb-1">고소함을 원할 때</span>
              <p className="text-sm sm:text-base font-bold text-[#3B2C20]">우유 또는 두유 200ml</p>
              <p className="text-xs text-[#7A614D] mt-1">부드러운 라떼처럼 진하고 풍성한 고소함</p>
            </div>

            <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E8DEC9]">
              <span className="text-xs font-bold text-[#8B5A2B] block mb-1">깔끔하고 가볍게</span>
              <p className="text-sm sm:text-base font-bold text-[#3B2C20]">시원한 생수 200ml</p>
              <p className="text-xs text-[#7A614D] mt-1">곡물과 채소 본연의 순수한 맑은 맛</p>
            </div>

            <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E8DEC9]">
              <span className="text-xs font-bold text-[#5B412D] block mb-1">달콤한 풍미 추가</span>
              <p className="text-sm sm:text-base font-bold text-[#3B2C20]">꿀 반 스푼 추가</p>
              <p className="text-xs text-[#7A614D] mt-1">기호에 따라 천연 꿀이나 조청을 살짝</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
