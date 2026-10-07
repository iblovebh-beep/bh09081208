import { useState } from 'react';
import { OrderRecord } from '../types';
import { X, Search, PackageCheck, Phone, MapPin, Truck, Clock } from 'lucide-react';

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
}

export function OrderLookupModal({ isOpen, onClose, orders }: OrderLookupModalProps) {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const cleanQuery = query.replace(/[^0-9a-zA-Z가-힣]/g, '');

  const matchedOrders = searched
    ? orders.filter((o) => {
        const cleanPhone = o.phone.replace(/[^0-9]/g, '');
        const cleanOrderId = o.orderId.replace(/[^0-9a-zA-Z]/g, '');
        return (
          cleanPhone.includes(cleanQuery) ||
          cleanOrderId.toLowerCase().includes(cleanQuery.toLowerCase()) ||
          o.customerName.includes(query.trim())
        );
      })
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FBF8F3] w-full max-w-xl rounded-3xl shadow-2xl border border-[#DECBB4] overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#FAF6F0] p-4 sm:p-5 border-b border-[#EADFCF] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#8B5A2B] block">고객 서비스</span>
            <h3 className="text-xl sm:text-2xl font-black text-[#261E18]">
              내 주문 및 배송 조회
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAE0D1] text-[#634E3C] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search input */}
        <div className="p-4 sm:p-6 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="주문 시 입력한 휴대폰 번호 또는 성함"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearched(false);
              }}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#DECBB4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A] text-sm sm:text-base bg-white"
            />
            <button
              type="submit"
              className="bg-[#2D5A3A] hover:bg-[#23492F] text-white font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>조회</span>
            </button>
          </form>

          {/* Results */}
          {searched && (
            <div className="space-y-3 pt-2">
              {matchedOrders.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-[#EADBCC] text-center text-[#7D6551]">
                  <p className="font-bold text-sm sm:text-base">일치하는 주문 내역을 찾을 수 없습니다.</p>
                  <p className="text-xs mt-1 text-[#9C8673]">
                    입력하신 번호나 이름을 다시 확인해 주세요. 문의사항은 1588-0000으로 연락 바랍니다.
                  </p>
                </div>
              ) : (
                matchedOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-white p-4 sm:p-5 rounded-2xl border border-[#DECBB4] shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-[#F0E6D8] pb-2">
                      <span className="font-mono text-xs font-bold text-[#8B5A2B]">
                        {order.orderId}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          order.status === '접수완료'
                            ? 'bg-[#FEF3C7] text-[#92400E]'
                            : order.status === '배송준비'
                            ? 'bg-[#E0E7FF] text-[#3730A3]'
                            : order.status === '배송중'
                            ? 'bg-[#DBEAFE] text-[#1E40AF]'
                            : 'bg-[#DCFCE7] text-[#166534]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <h4 className="font-extrabold text-base text-[#2C241E]">
                        {order.item.name}
                      </h4>
                      <span className="font-black text-[#2D5A3A] text-base">
                        {order.totalPrice.toLocaleString()}원
                      </span>
                    </div>

                    <div className="text-xs text-[#6E5540] space-y-1 bg-[#FAF6F0] p-3 rounded-xl">
                      <p><strong>주문자:</strong> {order.customerName} 님 ({order.phone})</p>
                      <p><strong>배송지:</strong> {order.address}</p>
                      <p><strong>주문일시:</strong> {order.orderDate}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF6F0] p-4 border-t border-[#DECBB4] text-center text-xs text-[#8C7662]">
          주문 관련 변경 및 배송 문의는 고객센터 <strong>1588-0000</strong>으로 언제든 편하게 연락주세요.
        </div>

      </div>
    </div>
  );
}
