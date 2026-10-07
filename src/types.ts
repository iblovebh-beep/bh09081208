export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
}

export interface PackageOption {
  id: string;
  name: string;
  pouchCount: number;
  periodText: string;
  originalPrice: number;
  discountPrice: number;
  discountRate: number;
  freeGifts: string[];
  popular?: boolean;
}

export interface OrderForm {
  optionId: string;
  customerName: string;
  phone: string;
  address: string;
  addressDetail: string;
  deliveryRequest: string;
  paymentMethod: 'card' | 'naverPay' | 'kakaoPay' | 'tossPay' | 'bank' | 'phoneCall';
}

export interface OrderRecord {
  orderId: string;
  orderDate: string;
  item: PackageOption;
  customerName: string;
  phone: string;
  address: string;
  deliveryRequest: string;
  paymentMethod: string;
  totalPrice: number;
  status: '접수완료' | '배송준비' | '배송중' | '배송완료' | '주문취소';
  createdAt: string;
  updatedAt: string;
}
