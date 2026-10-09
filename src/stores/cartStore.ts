import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT, PRICE_MULTIPLIER } from '@constants/student';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    qty: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (product: { id: number; title: string; price: number }) => void;
    addItem: (product: { id: number; title: string; price: number }) => void;
    removeItem: (id: number) => void;
    updateQty: (id: number, qty: number) => void;
    changeQty: (id: number, qty: number) => void;
    totalQuantity: () => number;
    getTotalQuantity: () => number;
    totalAmount: () => number;
    getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (product) => {
                const calculatedPrice = Math.round(product.price);
                const existing = get().items.find((i) => i.id === product.id);
                if (existing) {
                    set({
                        items: get().items.map((i) =>
                            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
                        ),
                    });
                } else {
                    set({
                        items: [...get().items, { id: product.id, title: product.title, price: calculatedPrice, qty: 1 }],
                    });
                }
            },
            addItem: (product) => get().addToCart(product),
            changeQty: (id, qty) => {
                if (qty <= 0) {
                    get().removeItem(id);
                } else {
                    set({
                        items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
                    });
                }
            },
            updateQty: (id, qty) => get().changeQty(id, qty),
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },
            totalQuantity: () => (get().items || []).reduce((sum, item) => sum + item.qty, 0),
            getTotalQuantity: () => get().totalQuantity(),
            totalAmount: () => (get().items || []).reduce((sum, item) => sum + item.price * item.qty, 0),
            getTotalAmount: () => get().totalAmount(),
        }),
        {
            name: `ktxgo-cart-${STUDENT.mssv}`,
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);