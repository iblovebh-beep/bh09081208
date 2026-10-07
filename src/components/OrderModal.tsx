import { useState, useEffect, FormEvent } from 'react';
import { PackageOption, OrderForm } from '../types';
import { PACKAGE_OPTIONS } from '../data/productData';
import { X, ShoppingBag, ShieldCheck, Truck, Check, CreditCard, Building2, Smartphone, Phone } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultOption?: PackageOption;
  initialCustomerName?: string;
  onSubmitOrder: (formData: OrderForm, selectedOption: PackageOption) => Promise<void>;
}

export function OrderModal({
  isOpen,
  onClose,
  defaultOption,
  initialCustomerName = '',
  onSubmitOrder,
}: OrderModalProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    defaultOption ? defaultOption.id : 'single'
  );

  const [customerName, setCustomerName] = useState(initialCustomerName);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [deliveryRequest, setDeliveryRequest] = useState('문 앞에 놓아주세요');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'naverPay' | 'kakaoPay' | 'tossPay' | 'bank' | 'phoneCall'>('card');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && initialCustomerName) {
      setCustomerName(initialCustomerName);
    }
  }, [isOpen, initialCustomerName]);

  if (!isOpen) return null;

  const currentOption = PACKAGE_OPTIONS.find((opt) => opt.id === selectedOptionId) || PACKAGE_OPTIONS[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('주문자 성함을 입력해 주세요.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('연락처(휴대폰 번호)를 입력해 주세요.');
      return;
    }
    if (paymentMethod !== 'phoneCall' && !address.trim()) {
      setErrorMessage('배송받으실 주소를 입력해 주세요.');
      return;
    }

    const orderData: OrderForm = {
      optionId: selectedOptionId,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      addressDetail: addressDetail.trim(),
      deliveryRequest,
      paymentMethod,
    };

    try {
      setIsSubmitting(true);
      await onSubmitOrder(orderData, currentOption);
    } catch (err: any) {
      console.error('Order submit error:', err);
      setErrorMessage('주문 접수 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-[#DECBB4] overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#FAF6F0] p-4 sm:p-5 border-b border-[#EADFCF] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#8B5A2B] block">간편 주문서</span>
            <h3 className="text-xl sm:text-2xl font-black text-[#261E18]">
              하루한잔 자연생식 주문하기
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAE0D1] text-[#634E3C] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Step 1: Option Selection */}
          <div>
            <label className="block text-sm font-bold text-[#3B2B1F] mb-2">
              1. 주문 패키지 선택
            </label>
            <div className="space-y-2">
              {PACKAGE_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedOptionId === opt.id
                      ? 'border-[#2D5A3A] bg-[#F2F7F3]'
                      : 'border-[#EADBCC] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="orderOption"
                      checked={selectedOptionId === opt.id}
                      onChange={() => setSelectedOptionId(opt.id)}
                      className="accent-[#2D5A3A] w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-sm sm:text-base text-[#2C241E] block">
                        {opt.name}
                      </span>
                      <span className="text-xs text-[#7A614D]">
                        {opt.freeGifts[0]}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-sm sm:text-base text-[#2D5A3A] block">
                      {opt.discountPrice.toLocaleString()}원
                    </span>
                    <span className="text-[11px] text-[#D32F2F] font-semibold">
                      {opt.discountRate}% 할인
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Step 2: Customer Information */}
          <div className="space-y-3 pt-2 border-t border-[#EADBCC]">
            <label className="block text-sm font-bold text-[#3B2B1F]">
              2. 배송 및 연락처 정보
            </label>

            <div>
              <span className="block text-xs font-semibold text-[#6E5540] mb-1">
                주문자 성함 <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                required
                placeholder="예: 홍길동"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A] text-sm sm:text-base"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#6E5540] mb-1">
                휴대폰 번호 <span className="text-red-500">*</span>
              </span>
              <input
                type="tel"
                required
                placeholder="예: 010-1234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A] text-sm sm:text-base"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#6E5540] mb-1">
                배송지 주소 <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                placeholder="예: 서울특별시 종로구 청와대로 1"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A] text-sm sm:text-base mb-2"
              />
              <input
                type="text"
                placeholder="상세주소 (동·호수 등)"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A] text-sm sm:text-base"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#6E5540] mb-1">
                배송 요청사항
              </span>
              <select
                value={deliveryRequest}
                onChange={(e) => setDeliveryRequest(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#DECBB4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A] text-sm bg-white"
              >
                <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                <option value="배송 전 연락 바랍니다">배송 전 미리 연락 바랍니다</option>
                <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
              </select>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="pt-2 border-t border-[#EADBCC]">
            <label className="block text-sm font-bold text-[#3B2B1F] mb-2">
              3. 결제 수단 선택 (연습 결제)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs sm:text-sm font-bold">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#2D5A3A] bg-[#2D5A3A] text-white shadow-sm'
                    : 'border-[#DECBB4] text-[#4A392B] hover:bg-[#FAF8F5]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>신용/체크카드</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('naverPay')}
                className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'naverPay'
                    ? 'border-[#03C75A] bg-[#03C75A] text-white shadow-sm'
                    : 'border-[#DECBB4] text-[#4A392B] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="font-black text-xs">N</span>
                <span>네이버페이</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('kakaoPay')}
                className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'kakaoPay'
                    ? 'border-[#FEE500] bg-[#FEE500] text-[#191919] shadow-sm'
                    : 'border-[#DECBB4] text-[#4A392B] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="font-black text-xs">talk</span>
                <span>카카오페이</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('tossPay')}
                className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'tossPay'
                    ? 'border-[#0064FF] bg-[#0064FF] text-white shadow-sm'
                    : 'border-[#DECBB4] text-[#4A392B] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="font-black text-xs">toss</span>
                <span>토스페이</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'bank'
                    ? 'border-[#2D5A3A] bg-[#2D5A3A] text-white shadow-sm'
                    : 'border-[#DECBB4] text-[#4A392B] hover:bg-[#FAF8F5]'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>무통장 입금</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('phoneCall')}
                className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  paymentMethod === 'phoneCall'
                    ? 'border-[#8B5A2B] bg-[#8B5A2B] text-white shadow-sm'
                    : 'border-[#DECBB4] text-[#4A392B] hover:bg-[#FAF8F5]'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>전화상담 주문</span>
              </button>
            </div>
            {paymentMethod === 'phoneCall' && (
              <p className="text-xs text-[#8B5A2B] mt-2 bg-[#F7F1E7] p-2.5 rounded-lg">
                ※ 전화상담 신청 시 전문 상담원이 남겨주신 연락처로 30분 내 연락드려 주소 및 주문을 신속하게 도와드립니다.
              </p>
            )}
          </div>

          {/* Final Amount Summary */}
          <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#EADBCC] space-y-1.5 text-xs sm:text-sm">
            <div className="flex justify-between text-[#685240]">
              <span>선택 상품</span>
              <span className="font-bold text-[#2C241E]">{currentOption.name}</span>
            </div>
            <div className="flex justify-between text-[#685240]">
              <span>배송비</span>
              <span className="font-bold text-[#2D5A3A]">전국 무료배송 (0원)</span>
            </div>
            <div className="flex justify-between text-[#685240]">
              <span>증정 사은품</span>
              <span className="font-bold text-[#8B5A2B]">트라이탄 보틀 증정</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#DECBB4] text-base sm:text-lg font-black text-[#261E18]">
              <span>최종 결제 금액</span>
              <span className="text-[#2D5A3A] text-xl sm:text-2xl">
                {currentOption.discountPrice.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl text-xs sm:text-sm text-[#991B1B] font-bold text-center">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Large Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 text-white text-lg sm:text-xl font-black py-4 px-6 rounded-2xl shadow-xl transition-all cursor-pointer ${
                isSubmitting
                  ? 'bg-[#55785D] cursor-not-allowed opacity-90'
                  : 'bg-[#2D5A3A] hover:bg-[#23492F] active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>결제 화면으로 이동 중...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>{currentOption.discountPrice.toLocaleString()}원 연습 결제창으로 이동하기</span>
                </>
              )}
            </button>
            <p className="text-center text-xs text-[#8B5A2B] mt-2 font-bold">
              🔒 다음 화면에서 카드(1111-2222-3333-4444) 및 네이버/카카오/토스 모의 결제가 진행됩니다 (실제 결제 없음)
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
