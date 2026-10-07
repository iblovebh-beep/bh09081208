import { ShieldAlert, CheckCircle2, FileText, Info } from 'lucide-react';

export function FoodNoticeSection() {
  return (
    <section className="py-12 sm:py-16 px-4 bg-[#F5EFE6] border-t border-[#E5DAC8]">
      <div className="max-w-4xl mx-auto">
        
        {/* Compliance Notice Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DFCEB7] shadow-sm">
          <div className="flex items-center gap-2.5 mb-3 text-[#8B5A2B]">
            <Info className="w-5 h-5 text-[#2D5A3A]" />
            <h3 className="text-lg sm:text-xl font-black text-[#2C241E]">
              정직하고 투명한 일반식품 안내
            </h3>
          </div>

          <p className="text-sm sm:text-base text-[#5C4533] leading-relaxed mb-6 font-medium">
            본 제품은 질병의 예방이나 치료를 위한 의약품 또는 건강기능식품이 아니며,
            바쁜 현대인을 위해 국내산 50가지 자연 곡물과 채소를 엄선하여 만든 <strong>균형 잡힌 일반 가공식품(생식)</strong>입니다.
            인위적인 효능 과장 없이, 오직 <strong>신선한 원재료의 정직함과 일상의 간편함</strong>만을 정성껏 전해드립니다.
          </p>

          {/* Key Product Specification Table */}
          <div className="border border-[#EADBCC] rounded-2xl overflow-hidden text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-[#EADBCC] bg-[#FAF6F0]">
              <div className="p-3 font-bold text-[#4F3C2C] bg-[#F2E8DC] sm:bg-transparent">
                식품의 유형
              </div>
              <div className="p-3 sm:col-span-3 text-[#2C241E]">
                곡류가공품 / 생식류 (일반식품)
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-[#EADBCC]">
              <div className="p-3 font-bold text-[#4F3C2C] bg-[#F2E8DC] sm:bg-transparent">
                내용량 및 포장
              </div>
              <div className="p-3 sm:col-span-3 text-[#2C241E]">
                1포당 40g (1박스 총 30포 / 1,200g), 개별 알루미늄 파우치 포장
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-[#EADBCC] bg-[#FAF6F0]">
              <div className="p-3 font-bold text-[#4F3C2C] bg-[#F2E8DC] sm:bg-transparent">
                원재료 및 함량
              </div>
              <div className="p-3 sm:col-span-3 text-[#2C241E] leading-relaxed">
                국내산 통곡물 15종(현미, 보리, 흑미, 서리태 등), 국내산 채소 25종(케일, 신선초, 브로콜리 등), 국내산 뿌리·버섯·해조류 10종 등 100% 대한민국 산지직송 원료
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4">
              <div className="p-3 font-bold text-[#4F3C2C] bg-[#F2E8DC] sm:bg-transparent">
                보관 및 섭취방법
              </div>
              <div className="p-3 sm:col-span-3 text-[#2C241E]">
                직사광선을 피하여 서늘한 실온 또는 냉장 보관 / 1일 1~2회, 1회 1포를 물 또는 우유 200ml에 타서 흔들어 섭취
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-[#7A614D]">
            <CheckCircle2 className="w-4 h-4 text-[#2D5A3A] shrink-0" />
            <span>식품위생법에 따른 품질검사 및 HACCP 안전 제조기준을 철저히 준수합니다.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
