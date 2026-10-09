import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT, PRICE_MULTIPLIER } from '@constants/student';
import { Product } from '@services/productApi';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    qty: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: any) => void;
    addToCart: (product: any) => void;
    removeItem: (id: number) => void;
    changeQty: (id: number, qty: number) => void;
    totalQuantity: () => number;
    totalAmount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product: any) => {
                if (!product) return;
                const currentItems = get().items || [];
                const rawPrice = Number(product.price) || 0;
                // Tự động nhận diện giá: nếu giá nhỏ từ API thì nhân multiplier, nếu đã nhân sẵn thì giữ nguyên
                const calculatedPrice = rawPrice < 1000
                    ? Math.round(rawPrice * PRICE_MULTIPLIER)
                    : Math.round(rawPrice);

                const existing = currentItems.find((i) => i.id === product.id);
                if (existing) {
                    set({
                        items: currentItems.map((i) =>
                            i.id === product.id ? { ...i, qty: (i.qty || 1) + 1 } : i
                        ),
                    });
                } else {
                    set({
                        items: [
                            ...currentItems,
                            {
                                id: product.id,
                                title: product.title || `Món #${product.id}`,
                                price: calculatedPrice,
                                qty: 1,
                            },
                        ],
                    });
                }
            },
            addToCart: (product: any) => get().addItem(product),
            changeQty: (id: number, qty: number) => {
                const currentItems = get().items || [];
                if (qty <= 0) {
                    get().removeItem(id);
                } else {
                    set({
                        items: currentItems.map((i) => (i.id === id ? { ...i, qty } : i)),
                    });
                }
            },
            removeItem: (id: number) => {
                const currentItems = get().items || [];
                set({ items: currentItems.filter((i) => i.id !== id) });
            },
            totalQuantity: () => (get().items || []).reduce((sum, item) => sum + (item.qty || 0), 0),
            totalAmount: () => (get().items || []).reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0),
        }),
        {
            name: `ktxgo-cart-${STUDENT.mssv}`,
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);