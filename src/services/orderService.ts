import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { OrderRecord } from '../types';
import { PACKAGE_OPTIONS } from '../data/productData';

const ORDERS_COLLECTION = 'orders';

// Convert Firestore document data to OrderRecord
function docToOrder(data: any): OrderRecord {
  return {
    orderId: data.orderId,
    orderDate: data.orderDate || new Date(data.createdAt || Date.now()).toLocaleDateString('ko-KR'),
    item: {
      id: data.packageOptionId || 'single',
      name: data.packageName || '1박스 (30포 / 1개월분)',
      pouchCount: data.pouchCount || 30,
      periodText: '매일 1포 기준 30일분',
      originalPrice: data.originalPrice || 58000,
      discountPrice: data.totalPrice || 45000,
      discountRate: data.discountRate || 22,
      freeGifts: data.freeGifts || ['전용 트라이탄 쉐이커 보틀 1개 (무료증정)', '무료 배송'],
    },
    customerName: data.customerName,
    phone: data.phone,
    address: data.address,
    deliveryRequest: data.deliveryRequest || '문 앞에 놓아주세요',
    paymentMethod: data.paymentMethod || '신용/체크카드',
    totalPrice: data.totalPrice,
    status: data.status || '접수완료',
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}

export async function saveOrderToFirestore(order: OrderRecord): Promise<void> {
  const docRef = doc(db, ORDERS_COLLECTION, order.orderId);
  const payload = {
    orderId: order.orderId,
    orderDate: order.orderDate,
    customerName: order.customerName,
    phone: order.phone,
    address: order.address,
    deliveryRequest: order.deliveryRequest,
    packageOptionId: order.item.id,
    packageName: order.item.name,
    pouchCount: order.item.pouchCount,
    originalPrice: order.item.originalPrice,
    discountRate: order.item.discountRate,
    freeGifts: order.item.freeGifts,
    totalPrice: order.totalPrice,
    paymentMethod: order.paymentMethod,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };

  await setDoc(docRef, payload);

  // Also backup locally
  try {
    const existing = JSON.parse(localStorage.getItem('my_recent_orders') || '[]');
    localStorage.setItem('my_recent_orders', JSON.stringify([payload, ...existing]));
  } catch (err) {
    console.warn('LocalStorage backup warning', err);
  }
}

export async function getOrderById(orderId: string): Promise<OrderRecord | null> {
  const docRef = doc(db, ORDERS_COLLECTION, orderId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return docToOrder(snap.data());
}

export async function getAllOrders(): Promise<OrderRecord[]> {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => docToOrder(d.data()));
  } catch (err) {
    console.error('Failed to get orders from Firestore:', err);
    return [];
  }
}

export function subscribeToOrders(callback: (orders: OrderRecord[]) => void): () => void {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const orders = snapshot.docs.map((d) => docToOrder(d.data()));
        callback(orders);
      },
      (err) => {
        console.error('Firestore onSnapshot error:', err);
      }
    );
  } catch (err) {
    console.error('Failed to subscribe to orders:', err);
    return () => {};
  }
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: '접수완료' | '배송준비' | '배송중' | '배송완료' | '주문취소'
): Promise<void> {
  const docRef = doc(db, ORDERS_COLLECTION, orderId);
  await updateDoc(docRef, {
    status: newStatus,
    updatedAt: new Date().toISOString(),
  });
}

// Seed the order from the user's test if none exist
export async function seedInitialOrderIfEmpty(): Promise<void> {
  try {
    const snapshot = await getDocs(collection(db, ORDERS_COLLECTION));
    if (snapshot.empty) {
      const initialOrder: OrderRecord = {
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        orderDate: new Date().toLocaleDateString('ko-KR'),
        item: PACKAGE_OPTIONS[0],
        customerName: '안봉환',
        phone: '010-5548-3144',
        address: '충북 충주시 행정8길 43 408호',
        deliveryRequest: '문 앞에 놓아주세요',
        paymentMethod: '신용/체크카드',
        totalPrice: 45000,
        status: '접수완료',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await saveOrderToFirestore(initialOrder);
    }
  } catch (e) {
    console.warn('Initial seeding error:', e);
  }
}
