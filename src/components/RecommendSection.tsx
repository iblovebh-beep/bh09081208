import { THREE_RECOMMENDATIONS } from '../data/productData';
import { Sun, UtensilsCrossed, Sparkles, CheckCircle, HeartHandshake } from 'lucide-react';

export function RecommendSection() {
  const icons = [
    <Sun className="w-8 h-8 text-[#8B5A2B]" key="sun" />,
    <UtensilsCrossed className="w-8 h-8 text-[#2D5A3A]" key="utensils" />,
    <HeartHandshake className="w-8 h-8 text-[#8B5A2B]" key="heart" />,
  ];

  return (
    <section id="recommend" className="py-14 sm:py-20 px-4 bg-gradient-to-b from-[#F5EFE6] to-[#FBF8F3] border-y border-[#E8DFC8]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-bold text-[#8B5A2B] bg-[#EFE4D2] border border-[#DFCDB5] px-3.5 py-1.5 rounded-full mb-3">
            맞춤 안내
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#261E18] tracking-tight">
            이런 분께 <span className="text-[#8B5A2B]">꼭 권해드립니다</span>
          </h2>
          <p className="mt-3 text-base sm:text-xl font-bold text-[#6D533E]">
            바쁜 하루, 식사 준비가 고민될 때 간편한 한 잔이 큰 힘이 됩니다.
          </p>
        </div>

        {/* 3 Key Recommendation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6">
          {THREE_RECOMMENDATIONS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E3D7C5] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Header of each card */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#F6F0E6] flex items-center justify-center border border-[#DECBB4]">
                    {icons[idx]}
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-[#C4B29E]">
                    {item.number}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="inline-block text-xs font-bold text-[#2D5A3A] bg-[#EAF2EB] px-2.5 py-1 rounded-md">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#2A1F18] leading-snug mb-3">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-[#685240] leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              {/* Bottom affirmation */}
              <div className="mt-6 pt-4 border-t border-[#F2E8DC] flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2D5A3A]">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>부담 없이 든든한 하루 시작</span>
              </div>
            </div>
          ))}
        </div>

        {/* Short Summary Bar */}
        <div className="mt-10 bg-[#EFE8DC]/80 border border-[#DBCAB3] rounded-2xl p-5 text-center sm:flex sm:items-center sm:justify-between">
          <p className="text-base sm:text-lg font-extrabold text-[#3D2C1E]">
            "가족들의 아침 식사, 혼자 사는 직장인의 간편식으로 손색이 없습니다."
          </p>
          <span className="inline-block mt-2 sm:mt-0 text-xs sm:text-sm font-bold text-[#8B5A2B] bg-white px-3 py-1.5 rounded-lg border border-[#DECBB4]">
            1포 40g 넉넉한 분량
          </span>
        </div>

      </div>
    </section>
  );
}
