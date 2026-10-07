import { useState } from 'react';
import { INGREDIENT_GROUPS, ALL_50_INGREDIENTS } from '../data/productData';
import { ShieldCheck, ChevronDown, ChevronUp, Leaf, CheckCircle2 } from 'lucide-react';

export function IngredientsSection() {
  const [showAllList, setShowAllList] = useState(false);

  return (
    <section id="ingredients" className="py-14 sm:py-20 px-4 bg-[#FBF8F3]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2D5A3A] bg-[#E8F1E9] border border-[#C5DEC8] px-3.5 py-1.5 rounded-full mb-3">
            <Leaf className="w-4 h-4 text-[#2D5A3A]" />
            <span>원재료 투명 공개 · 100% 우리 농산물</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#261E18] tracking-tight leading-snug">
            국내산 50가지 곡물과 채소를<br className="sm:hidden" />
            <span className="text-[#2D5A3A]"> 그대로 담았습니다</span>
          </h2>
          <p className="mt-3 text-base sm:text-xl font-bold text-[#6D533E] max-w-2xl mx-auto leading-relaxed">
            수입산 곡물이나 합성 첨가물 없이, 우리 땅에서 정직하게 기른 50가지 자연 원료만을 균형 있게 배합했습니다.
          </p>
        </div>

        {/* 5 Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {INGREDIENT_GROUPS.map((group, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-5 sm:p-6 border border-[#E4D8C6] shadow-sm hover:shadow-md transition-shadow ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-1 border-t-4 border-t-[#8B5A2B]' : 'border-t-4 border-t-[#2D5A3A]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#8B5A2B] bg-[#F7F1E7] px-2.5 py-1 rounded-md">
                  {group.badge}
                </span>
                <span className="text-xs text-[#8C7662] font-semibold">{group.items.length}종 수납</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#2C241E] mt-1">{group.category}</h3>
              <p className="text-xs sm:text-sm text-[#7D6551] mt-1 mb-4">{group.description}</p>
              
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F0E6D8]">
                {group.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="text-xs sm:text-sm font-semibold text-[#4A3B2F] bg-[#FAF5ED] px-2.5 py-1 rounded-md border border-[#EADBCC]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Guarantee Highlight Card */}
          <div className="bg-gradient-to-br from-[#2D5A3A] to-[#1E3E27] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between sm:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 text-[#C6E2CA] text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-5 h-5 text-[#88D49E]" />
                원료 3대 철칙
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                식품 첨가물 0% · 동결건조 저온공법
              </h3>
              <p className="text-sm sm:text-base text-[#D4E8D7] mt-2 leading-relaxed">
                열로 태우지 않고 급속 동결 건조하여 곡물과 채소의 원물 맛과 풍미를 고스란히 지켜냈습니다.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-[#467A53]">
              <div className="text-center">
                <span className="block text-base sm:text-lg font-black text-[#A7F3D0]">NO 설탕</span>
                <span className="text-[11px] sm:text-xs text-[#C6E2CA]">자연 단맛</span>
              </div>
              <div className="text-center border-x border-[#467A53]">
                <span className="block text-base sm:text-lg font-black text-[#A7F3D0]">NO 합성착향료</span>
                <span className="text-[11px] sm:text-xs text-[#C6E2CA]">구수한 본연의 맛</span>
              </div>
              <div className="text-center">
                <span className="block text-base sm:text-lg font-black text-[#A7F3D0]">NO 보존료</span>
                <span className="text-[11px] sm:text-xs text-[#C6E2CA]">위생적 개별포장</span>
              </div>
            </div>
          </div>
        </div>

        {/* 50 Ingredients Full Drawer / Toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowAllList(!showAllList)}
            className="inline-flex items-center gap-2 bg-[#EFE6D7] hover:bg-[#E5D9C4] text-[#4F3B2C] text-sm sm:text-base font-bold py-3 px-6 rounded-xl border border-[#DECBB4] transition-colors cursor-pointer"
          >
            <span>50가지 전성분 원산지(국내산) 전체보기</span>
            {showAllList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAllList && (
            <div className="mt-4 bg-white p-6 rounded-2xl border border-[#DECBB4] text-left shadow-sm animate-fadeIn">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#2D5A3A]" />
                <h4 className="font-extrabold text-[#2A1F18] text-base sm:text-lg">
                  국내산 50가지 원재료 전성분 (원산지 100% 대한민국)
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {ALL_50_INGREDIENTS.map((name, i) => (
                  <span
                    key={i}
                    className="inline-block text-xs sm:text-sm font-medium bg-[#FAF6F0] text-[#4D3A2C] px-3 py-1.5 rounded-lg border border-[#EADBCC]"
                  >
                    <strong className="text-[#8B5A2B] mr-1">{i + 1}.</strong> {name} (국내산)
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#8C7662] bg-[#F7F2EB] p-2.5 rounded-lg">
                ※ 모든 원료는 정기적인 잔류농약 및 중금속 검사를 거쳐 안전성을 검증받은 국내산 농산물만을 사용합니다.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
