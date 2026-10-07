import { useState, FormEvent } from 'react';
import { PackageOption, OrderForm, OrderRecord } from '../types';
import {
  X,
  CreditCard,
  ShieldAlert,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Building2,
  AlertTriangle
} from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderForm: OrderForm | null;
  packageOption: PackageOption;
  onPaymentComplete: (orderRecord: OrderRecord) => Promise<void>;
}

export function PaymentModal({
  isOpen,
  onClose,
  orderForm,
  packageOption,
  onPaymentComplete,
}: PaymentModalProps) {
  const [paymentType, setPaymentType] = useState<'card' | 'naverPay' | 'kakaoPay' | 'tossPay' | 'bank'>('card');
  
  // REQUIRED: 카드번호 칸에 1111-2222-3333-4444가 미리 적혀있게
  const [cardNumber, setCardNumber] = useState('1111-2222-3333-4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');
  const [cardOwner, setCardOwner] = useState(orderForm?.customerName || '안봉환');
  
  // Easy Pay options (Naver / Kakao / Toss)
  const [easyPayAccount, setEasyPayAccount] = useState('010-****-3144');
  
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !orderForm) return null;

  const handlePay = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulated short 1-second delay for realistic sandbox approval
    await new Promise((resolve) => setTimeout(resolve, 800));

    // REQUIRED: 주문번호 형식 (예시: ORD-20251007-3843)
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const random4 = Math.floor(1000 + Math.random() * 9000);
    const generatedOrderId = `ORD-${yyyy}${mm}${dd}-${random4}`;

    let methodLabel = '신용/체크카드 (연습결제)';
    if (paymentType === 'naverPay') methodLabel = '네이버페이 (연습결제)';
    if (paymentType === 'kakaoPay') methodLabel = '카카오페이 (연습결제)';
    if (paymentType === 'tossPay') methodLabel = '토스페이 (연습결제)';
    if (paymentType === 'bank') methodLabel = '무통장입금/가상계좌 (연습결제)';

    const newOrder: OrderRecord = {
      orderId: generatedOrderId,
      orderDate: now.toLocaleDateString('ko-KR'),
      item: packageOption,
      customerName: orderForm.customerName,
      phone: orderForm.phone,
      address: `${orderForm.address} ${orderForm.addressDetail}`.trim() || '입력 주소',
      deliveryRequest: orderForm.deliveryRequest,
      paymentMethod: methodLabel,
      totalPrice: packageOption.discountPrice,
      status: '접수완료',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    try {
      await onPaymentComplete(newOrder);
      setIsProcessing(false);
      onClose();
    } catch (err) {
      console.error('Payment completion error:', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="relative bg-[#FAF7F2] w-full max-w-xl rounded-3xl shadow-2xl border-2 border-[#D8C7B2] overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="bg-[#2D5A3A] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#A7F3D0]" />
            <div>
              <span className="text-xs text-[#C8E5CD] font-bold block">안전 결제 테스트 시스템</span>
              <h3 className="text-lg sm:text-xl font-black">
                하루한잔 자연생식 연습 결제창
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* REQUIRED: 실제 "결제되지 않는 연습용입니다" 라고 크게 표시 */}
        <div className="bg-[#FEF3C7] border-b-2 border-[#F59E0B] p-4 text-center">
          <div className="inline-flex items-center gap-2 text-[#92400E] font-black text-base sm:text-lg">
            <AlertTriangle className="w-6 h-6 text-[#D97706] shrink-0" />
            <span>실제 결제되지 않는 연습용입니다</span>
          </div>
          <p className="text-xs sm:text-sm text-[#B45309] font-bold mt-1">
            ⚠️ 안심하세요! 실제 돈이 청구되거나 카드가 결제되지 않는 <strong>시뮬레이션 모의 결제</strong>입니다.
          </p>
        </div>

        <form onSubmit={handlePay} className="p-4 sm:p-6 space-y-5">
          
          {/* Order Summary Brief */}
          <div className="bg-white p-4 rounded-2xl border border-[#DECBB4] space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between text-[#6E5745]">
              <span>주문자</span>
              <strong className="text-[#2C241E]">{orderForm.customerName} 님 ({orderForm.phone})</strong>
            </div>
            <div className="flex justify-between text-[#6E5745]">
              <span>배송지</span>
              <span className="text-[#2C241E] text-right font-medium max-w-[260px] truncate">
                {orderForm.address} {orderForm.addressDetail}
              </span>
            </div>
            <div className="flex justify-between text-[#6E5745]">
              <span>주문 상품</span>
              <strong className="text-[#2D5A3A]">{packageOption.name}</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#EADBCC] text-base sm:text-lg font-black text-[#261E18]">
              <span>최종 결제 금액</span>
              <span className="text-[#2D5A3A] text-xl sm:text-2xl font-black">
                {packageOption.discountPrice.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* REQUIRED: 결제 수단 탭 (네이버, 토스, 카카오페이, 카드 등 모두 포함) */}
          <div>
            <label className="block text-xs sm:text-sm font-black text-[#3D2C1E] mb-2.5">
              결제 수단 선택 (원하시는 방식을 골라주세요)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
              {/* Card */}
              <button
                type="button"
                onClick={() => setPaymentType('card')}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  paymentType === 'card'
                    ? 'border-[#2D5A3A] bg-[#2D5A3A] text-white shadow-md'
                    : 'border-[#DECBB4] bg-white text-[#4A392B] hover:bg-[#FAF8F5]'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>신용/체크카드</span>
              </button>

              {/* Naver Pay */}
              <button
                type="button"
                onClick={() => setPaymentType('naverPay')}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  paymentType === 'naverPay'
                    ? 'border-[#03C75A] bg-[#03C75A] text-white shadow-md'
                    : 'border-[#DECBB4] bg-white text-[#4A392B] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="w-5 h-5 bg-white text-[#03C75A] rounded font-black text-xs flex items-center justify-center">
                  N
                </div>
                <span>네이버페이</span>
              </button>

              {/* Kakao Pay */}
              <button
                type="button"
                onClick={() => setPaymentType('kakaoPay')}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  paymentType === 'kakaoPay'
                    ? 'border-[#FEE500] bg-[#FEE500] text-[#191919] shadow-md'
                    : 'border-[#DECBB4] bg-white text-[#4A392B] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="w-5 h-5 bg-[#3A1D1D] text-[#FEE500] rounded-full font-black text-[10px] flex items-center justify-center">
                  talk
                </div>
                <span>카카오페이</span>
              </button>

              {/* Toss Pay */}
              <button
                type="button"
                onClick={() => setPaymentType('tossPay')}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  paymentType === 'tossPay'
                    ? 'border-[#0064FF] bg-[#0064FF] text-white shadow-md'
                    : 'border-[#DECBB4] bg-white text-[#4A392B] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className="w-5 h-5 bg-white text-[#0064FF] rounded-full font-black text-[11px] flex items-center justify-center">
                  toss
                </div>
                <span>토스페이</span>
              </button>
            </div>
          </div>

          {/* Method Specific Fields */}
          {paymentType === 'card' && (
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DECBB4] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0E6D8]">
                <span className="text-xs font-bold text-[#8B5A2B]">카드 결제 정보 (연습용 자동 입력)</span>
                <span className="text-[11px] bg-[#E8F1E9] text-[#2D5A3A] font-bold px-2 py-0.5 rounded">
                  테스트 카드 자동 채움
                </span>
              </div>

              {/* REQUIRED: 카드번호 칸에 1111-2222-3333-4444가 미리 적혀있게 */}
              <div>
                <label className="block text-xs font-bold text-[#5C4533] mb-1">
                  카드번호 (16자리)
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8B5A2B]" />
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1111-2222-3333-4444"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#DECBB4] text-[#2C241E] font-mono text-base font-bold bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A]"
                  />
                </div>
                <p className="text-[11px] text-[#2D5A3A] font-semibold mt-1">
                  ✓ 연습용 가상 카드번호가 자동 입력되어 있습니다.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#5C4533] mb-1">
                    유효기간 (MM/YY)
                  </label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="12/28"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] text-[#2C241E] font-mono text-sm font-bold bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5C4533] mb-1">
                    CVC 보안코드 (3자리)
                  </label>
                  <input
                    type="password"
                    maxLength={3}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="123"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] text-[#2C241E] font-mono text-sm font-bold bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5C4533] mb-1">
                  카드 소유자명
                </label>
                <input
                  type="text"
                  value={cardOwner}
                  onChange={(e) => setCardOwner(e.target.value)}
                  placeholder="안봉환"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] text-[#2C241E] text-sm font-bold bg-[#FAF8F5]"
                />
              </div>
            </div>
          )}

          {paymentType === 'naverPay' && (
            <div className="bg-white p-5 rounded-2xl border-2 border-[#03C75A]/40 space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#03C75A] text-white font-black text-xl flex items-center justify-center mx-auto shadow-sm">
                N
              </div>
              <h4 className="text-base font-black text-[#1E293B]">네이버페이 간편 결제 (모의 결제)</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                네이버페이 포인트/머니 또는 등록된 카드로 안전하게 가상 승인됩니다.<br />
                <span className="text-[#03C75A] font-bold">실제 네이버페이 잔액은 차감되지 않습니다.</span>
              </p>
              <div className="bg-[#F0FDF4] p-3 rounded-xl border border-[#BBF7D0] text-xs font-bold text-[#166534]">
                ✓ 결제 요청 계정: {orderForm.customerName} 님 (네이버페이 모의 승인 대기)
              </div>
            </div>
          )}

          {paymentType === 'kakaoPay' && (
            <div className="bg-white p-5 rounded-2xl border-2 border-[#FEE500] space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FEE500] text-[#191919] font-black text-sm flex items-center justify-center mx-auto shadow-sm">
                talk
              </div>
              <h4 className="text-base font-black text-[#1E293B]">카카오페이 원클릭 결제 (모의 결제)</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                카카오페이 머니/등록 카드로 스마트 모의 승인됩니다.<br />
                <span className="text-[#854D0E] font-bold">실제 카카오페이 잔액은 차감되지 않습니다.</span>
              </p>
              <div className="bg-[#FEFCE8] p-3 rounded-xl border border-[#FEF08A] text-xs font-bold text-[#854D0E]">
                ✓ 카카오 결제 알림: {orderForm.phone} 번호로 가상 인증 완료
              </div>
            </div>
          )}

          {paymentType === 'tossPay' && (
            <div className="bg-white p-5 rounded-2xl border-2 border-[#0064FF]/40 space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#0064FF] text-white font-black text-sm flex items-center justify-center mx-auto shadow-sm">
                toss
              </div>
              <h4 className="text-base font-black text-[#1E293B]">토스페이 간편 결제 (모의 결제)</h4>
              <p className="text-xs text-[#64748B] leading-relaxed">
                토스 앱 간편 모의 승인으로 1초 만에 주문이 접수됩니다.<br />
                <span className="text-[#0064FF] font-bold">실제 토스 잔액은 차감되지 않습니다.</span>
              </p>
              <div className="bg-[#EFF6FF] p-3 rounded-xl border border-[#BFDBFE] text-xs font-bold text-[#1D4ED8]">
                ✓ 토스 원터치 모의 승인 준비 완료
              </div>
            </div>
          )}

          {/* REQUIRED: "결제하기" 버튼을 클릭하면 주문번호를 만들어주고 "주문 완료" 화면을 보여줌 */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full flex items-center justify-center gap-3 text-white text-lg sm:text-xl font-black py-4 sm:py-5 px-6 rounded-2xl shadow-xl transition-all cursor-pointer ${
                isProcessing
                  ? 'bg-[#55785D] cursor-not-allowed opacity-90'
                  : 'bg-[#2D5A3A] hover:bg-[#22482E] active:scale-[0.99]'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  <span>연습 결제 승인 처리 중...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>{packageOption.discountPrice.toLocaleString()}원 결제하기 (연습용)</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-[#8C7662] mt-3 font-semibold">
              ※ 클릭 시 연습 결제 승인 후 주문번호(예: ORD-20261007-3843)가 발급되며 주문 완료 화면으로 이동합니다.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
