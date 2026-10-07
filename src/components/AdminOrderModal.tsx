import { useState } from 'react';
import { OrderRecord } from '../types';
import { updateOrderStatus } from '../services/orderService';
import {
  X,
  Phone,
  MessageSquare,
  MapPin,
  Package,
  Calendar,
  CheckCircle,
  Truck,
  Clock,
  Download,
  Search,
  RefreshCw,
  ExternalLink,
  Radio,
  CheckCheck,
  ChevronDown
} from 'lucide-react';

interface AdminOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
  onRefresh: () => void;
}

export function AdminOrderModal({ isOpen, onClose, orders, onRefresh }: AdminOrderModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | '접수완료' | '배송중' | '배송완료'>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Filter orders by search query and status filter tab
  const filteredOrders = orders.filter((o) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      o.customerName.toLowerCase().includes(term) ||
      o.phone.includes(term) ||
      o.orderId.toLowerCase().includes(term) ||
      o.address.toLowerCase().includes(term);

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders
    .filter((o) => o.status !== '주문취소')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingCount = orders.filter((o) => o.status === '접수완료').length;
  const shippingCount = orders.filter((o) => o.status === '배송중').length;
  const completedCount = orders.filter((o) => o.status === '배송완료').length;

  // Direct status change handler
  const handleStatusChange = async (
    orderId: string,
    newStatus: '접수완료' | '배송준비' | '배송중' | '배송완료' | '주문취소'
  ) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, newStatus);
      onRefresh();
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = ['주문번호', '주문일시', '고객명', '연락처', '주소', '상품명', '수량(포)', '결제금액', '결제수단', '배송요청', '상태'];
    const rows = orders.map((o) => [
      o.orderId,
      o.orderDate,
      o.customerName,
      o.phone,
      `"${o.address.replace(/"/g, '""')}"`,
      o.item.name,
      o.item.pouchCount,
      o.totalPrice,
      o.paymentMethod,
      `"${(o.deliveryRequest || '').replace(/"/g, '""')}"`,
      o.status,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `생식주문목록_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyOrderId = (id: string) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative bg-[#FAF7F2] w-full max-w-6xl rounded-3xl shadow-2xl border-2 border-[#D8C7B2] overflow-hidden my-4 max-h-[92vh] flex flex-col">
        
        {/* Header with Live Real-time Indicator */}
        <div className="bg-[#2D5A3A] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              {/* REQUIRED: 새주문이 들어오면 새로고침 안해도 자동으로 목록에 뜨는 실시간 표시 */}
              <span className="inline-flex items-center gap-1.5 text-xs font-black bg-[#A7F3D0] text-[#1E4329] px-2.5 py-0.5 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#059669] animate-ping" />
                <span>실시간 자동 수신 중</span>
              </span>
              <span className="text-xs text-[#C8E5CD] hidden sm:inline">
                새 주문이 들어오면 새로고침 없이 즉시 표에 나타납니다.
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black mt-1">
              판매자 주문 관리 센터 (실시간 표)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="데이터 동기화 확인"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Real-time Order Count & Stats Dashboard */}
        <div className="bg-white p-3.5 sm:p-4 border-b border-[#EADFCF] grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 text-center shrink-0">
          <div className="bg-[#FAF6F0] p-2.5 sm:p-3 rounded-xl border border-[#EADBCC]">
            <span className="text-[11px] sm:text-xs text-[#6E5745] font-bold block">전체 주문</span>
            <span className="text-lg sm:text-2xl font-black text-[#261E18] mt-0.5 block">
              {orders.length}건
            </span>
          </div>

          <div className="bg-[#FEF9C3] p-2.5 sm:p-3 rounded-xl border border-[#FDE047]">
            <span className="text-[11px] sm:text-xs text-[#854D0E] font-bold block">신규 접수(대기)</span>
            <span className="text-lg sm:text-2xl font-black text-[#A16207] mt-0.5 block">
              {pendingCount}건
            </span>
          </div>

          <div className="bg-[#DBEAFE] p-2.5 sm:p-3 rounded-xl border border-[#93C5FD]">
            <span className="text-[11px] sm:text-xs text-[#1E40AF] font-bold block">🚚 배송중</span>
            <span className="text-lg sm:text-2xl font-black text-[#1D4ED8] mt-0.5 block">
              {shippingCount}건
            </span>
          </div>

          <div className="bg-[#DCFCE7] p-2.5 sm:p-3 rounded-xl border border-[#86EFAC]">
            <span className="text-[11px] sm:text-xs text-[#166534] font-bold block">✅ 배송완료</span>
            <span className="text-lg sm:text-2xl font-black text-[#15803D] mt-0.5 block">
              {completedCount}건
            </span>
          </div>

          <div className="bg-[#FAF6F0] p-2.5 sm:p-3 rounded-xl border border-[#EADBCC] col-span-2 sm:col-span-1">
            <span className="text-[11px] sm:text-xs text-[#2D5A3A] font-bold block">총 누적 결제금액</span>
            <span className="text-base sm:text-xl font-black text-[#2D5A3A] mt-0.5 block truncate">
              {totalRevenue.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* Status Filter Tabs & Search Bar */}
        <div className="p-3 sm:p-4 bg-[#F5EFE6] border-b border-[#DECBB4] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-[#DECBB4] w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === 'all'
                  ? 'bg-[#2D5A3A] text-white shadow-xs'
                  : 'text-[#6E5745] hover:bg-[#FAF8F5]'
              }`}
            >
              전체보기 ({orders.length})
            </button>
            <button
              onClick={() => setStatusFilter('접수완료')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === '접수완료'
                  ? 'bg-[#EAB308] text-white shadow-xs'
                  : 'text-[#854D0E] hover:bg-[#FAF8F5]'
              }`}
            >
              신규 접수 ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('배송중')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === '배송중'
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'text-[#1E40AF] hover:bg-[#FAF8F5]'
              }`}
            >
              배송중 ({shippingCount})
            </button>
            <button
              onClick={() => setStatusFilter('배송완료')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                statusFilter === '배송완료'
                  ? 'bg-[#16A34A] text-white shadow-xs'
                  : 'text-[#166534] hover:bg-[#FAF8F5]'
              }`}
            >
              배송완료 ({completedCount})
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8B5A2B]" />
              <input
                type="text"
                placeholder="주문자, 전화번호, 주소 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white rounded-xl border border-[#DECBB4] text-xs sm:text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A]"
              />
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 bg-[#8B5A2B] hover:bg-[#724822] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer shadow-xs shrink-0"
              title="택배 송장 출력 및 엑셀 저장"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">엑셀 다운로드</span>
            </button>
          </div>
        </div>

        {/* REQUIRED: 주문번호, 주문자, 상품, 금액, 상태를 표(Table)로 보여줘 */}
        <div className="flex-1 overflow-auto p-2 sm:p-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#DECBB4]">
              <Package className="w-12 h-12 mx-auto mb-2 text-[#C4B29E]" />
              <p className="font-bold text-base text-[#4A392B]">주문 내역이 없습니다.</p>
              <p className="text-xs text-[#8C7662] mt-1">
                고객이 주문을 접수하면 새로고침 없이 즉시 이 표에 실시간으로 표시됩니다.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#DECBB4] shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                {/* Table Header */}
                <thead>
                  <tr className="bg-[#FAF5ED] border-b-2 border-[#E7DAC7] text-[#5C4533] font-black uppercase text-[11px] sm:text-xs">
                    <th className="py-3 px-3 sm:px-4 w-[140px] sm:w-[170px]">주문번호 / 일시</th>
                    <th className="py-3 px-3 sm:px-4 min-w-[200px]">주문자 정보 (연락처 / 배송지)</th>
                    <th className="py-3 px-3 sm:px-4 min-w-[150px]">주문 상품</th>
                    <th className="py-3 px-3 sm:px-4 min-w-[120px]">결제 금액</th>
                    <th className="py-3 px-3 sm:px-4 text-center w-[90px]">현재 상태</th>
                    <th className="py-3 px-3 sm:px-4 text-center min-w-[180px] bg-[#F7F2EB]">
                      상태 변경 (원클릭)
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-[#F0E6D8]">
                  {filteredOrders.map((order) => {
                    const isUpdating = updatingId === order.orderId;
                    return (
                      <tr
                        key={order.orderId}
                        className="hover:bg-[#FAF8F5] transition-colors"
                      >
                        {/* 1. 주문번호 */}
                        <td className="py-3.5 px-3 sm:px-4 align-top">
                          <button
                            type="button"
                            onClick={() => handleCopyOrderId(order.orderId)}
                            className="font-mono font-black text-xs sm:text-sm text-[#2D5A3A] hover:underline flex items-center gap-1 cursor-pointer"
                            title="클릭하여 주문번호 복사"
                          >
                            <span>{order.orderId}</span>
                            {copiedId === order.orderId && (
                              <span className="text-[10px] text-[#059669] font-bold">복사됨!</span>
                            )}
                          </button>
                          <span className="text-[11px] text-[#8C7662] block mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#B8A490]" />
                            {order.orderDate}
                          </span>
                        </td>

                        {/* 2. 주문자 */}
                        <td className="py-3.5 px-3 sm:px-4 align-top">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm sm:text-base text-[#261E18]">
                              {order.customerName}
                            </span>
                            <span className="text-[11px] text-[#8B5A2B] font-bold">고객님</span>
                          </div>

                          <div className="flex items-center gap-2 text-xs font-semibold text-[#4A392B] mt-1">
                            <span>{order.phone}</span>
                            <a
                              href={`tel:${order.phone}`}
                              className="p-1 rounded bg-[#FAF5ED] hover:bg-[#EFE5D5] text-[#2D5A3A] border border-[#DECBB4]"
                              title="전화 걸기"
                            >
                              <Phone className="w-3 h-3" />
                            </a>
                            <a
                              href={`sms:${order.phone}`}
                              className="p-1 rounded bg-[#FAF5ED] hover:bg-[#EFE5D5] text-[#8B5A2B] border border-[#DECBB4]"
                              title="문자 보내기"
                            >
                              <MessageSquare className="w-3 h-3" />
                            </a>
                          </div>

                          <div className="flex items-start gap-1 text-[11px] sm:text-xs text-[#634E3C] mt-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0 mt-0.5" />
                            <span className="leading-snug">{order.address}</span>
                          </div>

                          {order.deliveryRequest && (
                            <p className="text-[10px] sm:text-[11px] text-[#7A614D] bg-[#FBF8F3] px-2 py-0.5 rounded border border-[#EADBCC] mt-1 inline-block">
                              요청: {order.deliveryRequest}
                            </p>
                          )}
                        </td>

                        {/* 3. 상품 */}
                        <td className="py-3.5 px-3 sm:px-4 align-top">
                          <strong className="text-xs sm:text-sm text-[#2C241E] block font-extrabold">
                            {order.item.name}
                          </strong>
                          <span className="text-[11px] text-[#7A614D] block mt-0.5">
                            총 {order.item.pouchCount}포 구성 / 보틀 증정
                          </span>
                        </td>

                        {/* 4. 금액 */}
                        <td className="py-3.5 px-3 sm:px-4 align-top">
                          <span className="font-black text-sm sm:text-base text-[#2D5A3A] block">
                            {order.totalPrice.toLocaleString()}원
                          </span>
                          <span className="text-[11px] text-[#8C7662] block mt-0.5">
                            {order.paymentMethod}
                          </span>
                        </td>

                        {/* 5. 상태 */}
                        <td className="py-3.5 px-3 sm:px-4 align-top text-center">
                          <span
                            className={`inline-block font-black text-xs px-2.5 py-1 rounded-full whitespace-nowrap shadow-2xs ${
                              order.status === '접수완료'
                                ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]'
                                : order.status === '배송중'
                                ? 'bg-[#DBEAFE] text-[#1E40AF] border border-[#93C5FD]'
                                : order.status === '배송완료'
                                ? 'bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]'
                                : 'bg-[#FEE2E2] text-[#991B1B] border border-[#FCA5A5]'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>

                        {/* REQUIRED: 각 주문을 "배송중" "배송완료"로 바꾸는 버튼 */}
                        <td className="py-3.5 px-3 sm:px-4 align-top bg-[#FBF8F4]/50">
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                            {/* "배송중"으로 변경 버튼 */}
                            <button
                              type="button"
                              disabled={isUpdating || order.status === '배송중'}
                              onClick={() => handleStatusChange(order.orderId, '배송중')}
                              className={`w-full sm:w-auto px-2.5 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                                order.status === '배송중'
                                  ? 'bg-[#DBEAFE] text-[#1E40AF] opacity-60 cursor-default border border-[#93C5FD]'
                                  : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xs active:scale-95'
                              }`}
                              title="배송중으로 상태 변경"
                            >
                              <Truck className="w-3.5 h-3.5" />
                              <span>배송중</span>
                            </button>

                            {/* "배송완료"로 변경 버튼 */}
                            <button
                              type="button"
                              disabled={isUpdating || order.status === '배송완료'}
                              onClick={() => handleStatusChange(order.orderId, '배송완료')}
                              className={`w-full sm:w-auto px-2.5 py-1.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                                order.status === '배송완료'
                                  ? 'bg-[#DCFCE7] text-[#166534] opacity-60 cursor-default border border-[#86EFAC]'
                                  : 'bg-[#16A34A] hover:bg-[#15803D] text-white shadow-xs active:scale-95'
                              }`}
                              title="배송완료로 상태 변경"
                            >
                              <CheckCheck className="w-3.5 h-3.5" />
                              <span>배송완료</span>
                            </button>

                            {/* 되돌리기 드롭다운 */}
                            <select
                              value={order.status}
                              disabled={isUpdating}
                              onChange={(e) =>
                                handleStatusChange(
                                  order.orderId,
                                  e.target.value as '접수완료' | '배송준비' | '배송중' | '배송완료' | '주문취소'
                                )
                              }
                              className="text-[11px] font-semibold text-[#6E5745] bg-white border border-[#DECBB4] rounded px-1.5 py-1 cursor-pointer focus:outline-none"
                              title="기타 상태로 변경"
                            >
                              <option value="접수완료">접수완료</option>
                              <option value="배송준비">배송준비</option>
                              <option value="배송중">배송중</option>
                              <option value="배송완료">배송완료</option>
                              <option value="주문취소">주문취소</option>
                            </select>
                          </div>
                          {isUpdating && (
                            <span className="text-[10px] text-[#2563EB] block text-center mt-1">
                              상태 변경 저장 중...
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#FAF6F0] p-3.5 sm:p-4 border-t border-[#DECBB4] flex items-center justify-between text-xs text-[#8C7662] shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>실시간 자동 동기화 활성화됨 (Google Cloud Firestore)</span>
          </div>
          <button
            onClick={onClose}
            className="bg-[#2D5A3A] hover:bg-[#23492F] text-white font-bold px-5 py-2 rounded-xl cursor-pointer text-sm shadow-xs"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
}
