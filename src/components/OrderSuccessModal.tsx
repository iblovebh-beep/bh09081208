import { OrderRecord } from '../types';
import { CheckCircle, Truck, Phone, PackageCheck, X } from 'lucide-react';

interface OrderSuccessModalProps {
  orderRecord: OrderRecord | null;
  onClose: () => void;
}

export function OrderSuccessModal({ orderRecord, onClose }: OrderSuccessModalProps) {
  if (!orderRecord) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#DECBB4] overflow-hidden my-6">
        
        {/* Top Celebration Header */}
        <div className="bg-[#2D5A3A] text-white p-6 sm:p-8 text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-10 h-10 text-[#A7F3D0]" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black">
            주문이 정상 접수되었습니다!
          </h3>
          <div className="mt-2 inline-block bg-[#A7F3D0] text-[#1E4329] text-xs font-black px-3 py-1 rounded-full shadow-xs">
            연습 결제 승인 완료 (실제 청구 금액 0원)
          </div>
          <p className="text-xs sm:text-sm text-[#C8E5CD] mt-2">
            주문번호: <span className="font-mono font-bold tracking-wider text-white text-sm sm:text-base">{orderRecord.orderId}</span>
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-4">
          <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#EADBCC] space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-[#685240]">
              <span>주문자</span>
              <strong className="text-[#2C241E]">{orderRecord.customerName} 님</strong>
            </div>
            <div className="flex justify-between text-[#685240]">
              <span>연락처</span>
              <strong className="text-[#2C241E]">{orderRecord.phone}</strong>
            </div>
            <div className="flex justify-between text-[#685240]">
              <span>주문 상품</span>
              <strong className="text-[#2D5A3A]">{orderRecord.item.name}</strong>
            </div>
            <div className="flex justify-between text-[#685240]">
              <span>결제 수단</span>
              <span className="font-bold text-[#8B5A2B]">{orderRecord.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-[#685240]">
              <span>배송지</span>
              <span className="text-[#2C241E] text-right font-medium max-w-[240px] truncate">
                {orderRecord.address}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#DECBB4] text-base font-black text-[#261E18]">
              <span>결제 금액</span>
              <div className="text-right">
                <span className="text-[#2D5A3A] text-lg font-black">{orderRecord.totalPrice.toLocaleString()}원</span>
                <span className="block text-[11px] text-[#8C7662] font-normal">(가상 결제 승인)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#EBF5EE] p-4 rounded-2xl border border-[#C6E4CC] flex items-start gap-3 text-xs sm:text-sm text-[#1E4D2B]">
            <Truck className="w-5 h-5 text-[#2D5A3A] shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">배송 안내</strong>
              <p className="mt-0.5 leading-relaxed text-[#2A5E39]">
                신선한 원료 보호를 위해 전용 보냉 완충 박스에 포장되어 내일 오전 발송됩니다. 송장번호는 등록된 휴대폰으로 문자 안내드립니다.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onClose}
              className="w-full bg-[#8B5A2B] hover:bg-[#724822] text-white font-bold py-3.5 px-6 rounded-xl transition-all cursor-pointer shadow-md text-base"
            >
              확인 완료
            </button>
            <p className="text-xs text-[#8C7662] mt-3">
              문의사항이 있으시면 고객행복센터 <strong>1588-0000</strong>으로 언제든 연락주세요.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
