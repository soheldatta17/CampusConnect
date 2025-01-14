import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  type DocumentData
} from 'firebase/firestore';
import { db } from '../config';
import type { MenuItem } from '../../../types';

const MENU_COLLECTION = 'menu';
const ORDERS_COLLECTION = 'orders';

export interface Order {
  id: string;
  userId: string;
  items: {
    menuItemId: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentMethod: 'credit' | 'cash';
}

export async function createMenuItem(menuItem: Omit<MenuItem, 'id'>) {
  try {
    const menuItemRef = doc(collection(db, MENU_COLLECTION));
    await setDoc(menuItemRef, {
      ...menuItem,
      id: menuItemRef.id,
      createdAt: new Date().toISOString(),
    });
    return { id: menuItemRef.id, error: null };
  } catch (error) {
    return { id: null, error: error as Error };
  }
}

export async function getMenuItems(category?: string) {
  try {
    let q = query(collection(db, MENU_COLLECTION));
    
    if (category) {
      q = query(q, where('category', '==', category));
    }
    
    const querySnapshot = await getDocs(q);
    const menuItems = querySnapshot.docs.map(doc => doc.data() as MenuItem);
    return { data: menuItems, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function createOrder(orderData: Omit<Order, 'id'>) {
  try {
    const orderRef = doc(collection(db, ORDERS_COLLECTION));
    await setDoc(orderRef, {
      ...orderData,
      id: orderRef.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { id: orderRef.id, error: null };
  } catch (error) {
    return { id: null, error: error as Error };
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  paymentStatus?: Order['paymentStatus']
) {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    const updateData: Partial<Order> = {
      status,
      updatedAt: new Date().toISOString(),
    };

    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    await updateDoc(orderRef, updateData);
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

export async function getUserOrders(userId: string) {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const orders = querySnapshot.docs.map(doc => doc.data() as Order);
    return { data: orders, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}