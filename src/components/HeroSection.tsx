import { ShoppingBag, Check, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface HeroSectionProps {
  onOrderClick: () => void;
}

export function HeroSection({ onOrderClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7F2EB] via-[#FBF8F3] to-[#F5EFE6] pt-6 pb-14 sm:pt-10 sm:pb-20 border-b border-[#E8DFC8]">
      {/* Decorative nature backdrop accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E5D7C2]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#D4E4D3]/40 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Top Kicker Label */}
        <div className="text-center mb-3">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm md:text-base font-bold text-[#8B5A2B] bg-[#EFE4D2] border border-[#DFCDB5] px-3.5 py-1.5 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2D5A3A]"></span>
            우리 땅에서 자란 100% 국내산 자연 원료
          </span>
        </div>

        {/* REQUIRED: 맨위에 "하루한잔,간편한 한끼"라는 큰 문구 */}
        <div className="text-center mt-2 mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#261E18] tracking-tight leading-[1.25] sm:leading-[1.2]">
            하루한잔, <span className="text-[#2D5A3A] underline decoration-[#91B898] decoration-4 underline-offset-8">간편한 한끼</span>
          </h1>
          <p className="mt-4 sm:mt-5 text-lg sm:text-2xl font-bold text-[#634935] leading-relaxed max-w-2xl mx-auto">
            국내산 50가지 곡물과 채소를 통째로 담아<br className="hidden sm:inline" />
            바쁜 일상 속 물이나 우유에 타서 간편하게 마시는 생식
          </p>
        </div>

        {/* REQUIRED: 큰 "주문하기" 버튼 (Top Placement) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 my-6 sm:my-8">
          <button
            onClick={onOrderClick}
            className="w-full sm:w-auto min-w-[280px] sm:min-w-[320px] flex items-center justify-center gap-3 bg-[#2D5A3A] hover:bg-[#22482E] text-white text-xl sm:text-2xl font-black py-4 sm:py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl active:scale-[0.98] transition-all cursor-pointer border-2 border-[#1E4329]"
          >
            <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7" />
            <span>지금 바로 주문하기</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Quick Trust Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-[#5A4533] text-center mb-8">
          <span className="flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-lg border border-[#E3D7C5]">
            <Check className="w-4 h-4 text-[#2D5A3A]" /> 100% 국내산 50종 원료
          </span>
          <span className="flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-lg border border-[#E3D7C5]">
            <Check className="w-4 h-4 text-[#2D5A3A]" /> 설탕·보존료·착향료 무첨가
          </span>
          <span className="flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-lg border border-[#E3D7C5]">
            <Check className="w-4 h-4 text-[#2D5A3A]" /> 쉐이커 보틀 무료 증정
          </span>
        </div>

        {/* Visual Showcase Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-md border border-[#E3D7C5] max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Visual Graphic Representation */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#F5EFE6] to-[#E9DCB] rounded-2xl p-6 text-center border border-[#DECBB4] relative flex flex-col items-center justify-center min-h-[240px]">
              {/* Product Badge */}
              <div className="absolute top-3 left-3 bg-[#8B5A2B] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                1포 40g 든든함
              </div>
              
              {/* Cup / Shake Graphic Illustration */}
              <div className="relative my-2">
                <div className="w-24 h-36 mx-auto bg-gradient-to-t from-[#BFA37E] via-[#D8C7A8] to-[#91AA87] rounded-b-3xl rounded-t-lg border-4 border-white shadow-lg relative overflow-hidden flex flex-col justify-end p-2">
                  <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-[#A6835B] via-[#BD9E77] to-[#8FA683] opacity-90 rounded-b-2xl">
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px] opacity-30" />
                  </div>
                  {/* Subtle Measurement Lines */}
                  <div className="absolute top-8 right-2 space-y-2 opacity-50">
                    <div className="w-3 h-0.5 bg-white"></div>
                    <div className="w-2 h-0.5 bg-white"></div>
                    <div className="w-3 h-0.5 bg-white"></div>
                  </div>
                  <div className="relative z-10 text-center text-[11px] font-black text-white bg-[#2D5A3A]/80 py-0.5 rounded">
                    50곡 채소
                  </div>
                </div>
                {/* Straw or Leaves detail */}
                <div className="absolute -top-3 right-6 w-3 h-10 bg-[#7B9E77] rounded-full rotate-12 -z-0"></div>
              </div>

              <div className="mt-3 text-center">
                <span className="text-sm font-bold text-[#3B2C20] block">
                  물 200ml에 1포 흔들면 끝!
                </span>
                <span className="text-xs text-[#7A614D] block mt-0.5">
                  목넘김이 고소하고 부드러운 분말
                </span>
              </div>
            </div>

            {/* Core Value Descriptions */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="border-l-4 border-[#2D5A3A] pl-3.5">
                <h3 className="text-xl sm:text-2xl font-bold text-[#2A1F18]">
                  자연 본연의 맛과 간편함에만 집중했습니다
                </h3>
                <p className="text-sm sm:text-base text-[#6E5745] mt-1">
                  화학 가공품이 아닌, 순수 국내산 농산물 50가지를 엄선하여 담았습니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#FAF6F0] p-3.5 rounded-xl border border-[#EADBCE]">
                  <span className="text-xs font-bold text-[#8B5A2B] block">원재료 100%</span>
                  <span className="text-base sm:text-lg font-extrabold text-[#2C241E] mt-0.5 block">
                    국내산 50가지
                  </span>
                  <span className="text-xs text-[#7A614D] mt-0.5 block">곡물 15 · 채소 25 · 버섯해조 10</span>
                </div>

                <div className="bg-[#FAF6F0] p-3.5 rounded-xl border border-[#EADBCE]">
                  <span className="text-xs font-bold text-[#2D5A3A] block">준비 시간</span>
                  <span className="text-base sm:text-lg font-extrabold text-[#2C241E] mt-0.5 block">
                    단 1분 완성
                  </span>
                  <span className="text-xs text-[#7A614D] mt-0.5 block">보틀에 넣고 가볍게 흔들기</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#7A614D] bg-[#F4EFE6] p-3 rounded-xl leading-relaxed">
                <strong className="text-[#3F2E20] font-bold">정직한 일반식품 원칙:</strong> 설탕, 착향료, 보존료 등의 첨가물 없이 원물 본연의 구수한 맛을 유지합니다.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
