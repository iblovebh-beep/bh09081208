/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { PackageOption, OrderForm, OrderRecord, UserProfile } from './types';
import { PACKAGE_OPTIONS } from './data/productData';
import {
  saveOrderToFirestore,
  subscribeToOrders,
  getAllOrders,
  seedInitialOrderIfEmpty,
} from './services/orderService';
import { subscribeToAuth, signOutUser, seedInitialUserIfEmpty } from './services/authService';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IngredientsSection } from './components/IngredientsSection';
import { RecommendSection } from './components/RecommendSection';
import { HowToDrinkSection } from './components/HowToDrinkSection';
import { ProductOrderSection } from './components/ProductOrderSection';
import { FoodNoticeSection } from './components/FoodNoticeSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { AdminOrderModal } from './components/AdminOrderModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { AuthModal } from './components/AuthModal';
import { PaymentModal } from './components/PaymentModal';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTitle, setAuthModalTitle] = useState('주문 전 회원가입 / 로그인');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pendingOrderFormData, setPendingOrderFormData] = useState<OrderForm | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState(false);
  const [selectedOptionForOrder, setSelectedOptionForOrder] = useState<PackageOption>(PACKAGE_OPTIONS[0]);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [liveOrderToast, setLiveOrderToast] = useState<OrderRecord | null>(null);
  const initialLoadDoneRef = useRef(false);

  // Initialize and subscribe to Firestore orders and Auth in real-time
  useEffect(() => {
    seedInitialOrderIfEmpty();
    seedInitialUserIfEmpty();
    const unsubOrders = subscribeToOrders((liveOrders) => {
      // If new order arrived after initial load, trigger notification toast
      if (initialLoadDoneRef.current && liveOrders.length > 0) {
        const newest = liveOrders[0];
        setLiveOrderToast(newest);
        setTimeout(() => setLiveOrderToast(null), 7000);
      }
      setOrders(liveOrders);
      initialLoadDoneRef.current = true;
    });
    const unsubAuth = subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubOrders();
      unsubAuth();
    };
  }, []);

  const refreshOrders = async () => {
    const list = await getAllOrders();
    setOrders(list);
  };

  const handleOpenOrderModal = (option?: PackageOption) => {
    const targetOption = option || selectedOptionForOrder;
    setSelectedOptionForOrder(targetOption);

    // Requirement: "주문하려면 먼저 회원가입하고 로그인하게 해줘"
    if (!currentUser) {
      setAuthModalTitle('주문 전 회원가입 또는 로그인');
      setIsAuthModalOpen(true);
      return;
    }

    setIsOrderModalOpen(true);
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    // Proceed directly to the order modal after login/signup
    setIsOrderModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  const handleOrderSubmit = async (formData: OrderForm, chosenOption: PackageOption) => {
    // Transition to sandbox practice payment screen
    setPendingOrderFormData(formData);
    setSelectedOptionForOrder(chosenOption);
    setIsOrderModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = async (orderRecord: OrderRecord) => {
    // Save to Firestore real database
    await saveOrderToFirestore(orderRecord);
    setCompletedOrder(orderRecord);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#2C241E] font-sans selection:bg-[#E8DCCF]">
      {/* Top Navigation */}
      <Header
        onOrderClick={() => handleOpenOrderModal()}
        onOpenLookup={() => setIsLookupModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        orderCount={orders.length}
        currentUser={currentUser}
        onOpenAuth={() => {
          setAuthModalTitle('간편 로그인 / 회원가입');
          setIsAuthModalOpen(true);
        }}
        onSignOut={handleSignOut}
      />

      <main className="flex-1">
        {/* 1. 맨위에 "하루한잔,간편한 한끼"라는 큰 문구와 큰 "주문하기"버튼 */}
        <HeroSection onOrderClick={() => handleOpenOrderModal()} />

        {/* 2. 국내산 50가지 곡물, 채소로 만들었다는 소개 */}
        <IngredientsSection />

        {/* 3. 이런분께 좋아(아침 거르는분, 끼니 챙기기 번거로운 분 등) 3가지 */}
        <RecommendSection />

        {/* 4. 물이나 우유에서 타서 드세요(1-> 2 ->3 순서 표시) */}
        <HowToDrinkSection />

        {/* 5. 상품1개와 가격, "주문하기" 버튼 */}
        <ProductOrderSection
          onOrderClickWithOption={(opt) => handleOpenOrderModal(opt)}
        />

        {/* 6. 생식 일반식품 기준 준수 고지 (과장광고 배제, 원재료와 간편함 중심) */}
        <FoodNoticeSection />

        {/* 7. 자주 묻는 질문 FAQ */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenLookup={() => setIsLookupModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
      />

      {/* Mobile-only Sticky bottom bar with quick order */}
      <StickyMobileBar
        price={PACKAGE_OPTIONS[0].discountPrice}
        onOrderClick={() => handleOpenOrderModal()}
      />

      {/* Authentication Modal (Required before order) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        customTitle={authModalTitle}
      />

      {/* Order Modal Form */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        defaultOption={selectedOptionForOrder}
        initialCustomerName={currentUser?.displayName || ''}
        onSubmitOrder={handleOrderSubmit}
      />

      {/* Practice Sandbox Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderForm={pendingOrderFormData}
        packageOption={selectedOptionForOrder}
        onPaymentComplete={handlePaymentComplete}
      />

      {/* Order Complete Modal */}
      <OrderSuccessModal
        orderRecord={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Admin Order Manager Modal */}
      <AdminOrderModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        orders={orders}
        onRefresh={refreshOrders}
      />

      {/* Customer Order Lookup Modal */}
      <OrderLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
        orders={orders}
      />

      {/* Real-time Order Notification Toast (No page refresh needed!) */}
      {liveOrderToast && (
        <div className="fixed top-20 right-4 z-50 max-w-sm w-full bg-white border-2 border-[#2D5A3A] shadow-2xl rounded-2xl p-4 animate-fadeIn transition-all">
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#E8DFC8]">
            <span className="text-xs font-black bg-[#A7F3D0] text-[#1E4329] px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-ping" />
              <span>실시간 새 주문 도착!</span>
            </span>
            <button
              onClick={() => setLiveOrderToast(null)}
              className="text-xs text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="text-sm font-extrabold text-[#261E18] mt-2">
            {liveOrderToast.customerName} 님의 주문 ({liveOrderToast.totalPrice.toLocaleString()}원)
          </p>
          <p className="text-xs text-[#735A46] mt-0.5 truncate">{liveOrderToast.item.name}</p>
          <p className="text-[11px] text-[#8C7662]">주문번호: {liveOrderToast.orderId}</p>
          <button
            onClick={() => {
              setLiveOrderToast(null);
              setIsAdminModalOpen(true);
            }}
            className="mt-3 w-full bg-[#2D5A3A] hover:bg-[#23492F] text-white text-xs font-black py-2 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1"
          >
            <span>주문관리 표에서 즉시 확인하기 →</span>
          </button>
        </div>
      )}
    </div>
  );
}
