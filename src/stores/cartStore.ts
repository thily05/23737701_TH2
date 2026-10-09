import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STUDENT } from '@constants/student';

export interface CartItem {
    id: number;
    title: string;
    price: number;
    qty: number;
}

interface CartState {
    items: CartItem[];
    addToCart: (item: { id: number; title: string; price: number }) => void;
    updateQty: (id: number, qty: number) => void;
    removeItem: (id: number) => void;
    getTotalQuantity: () => number;
    getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (product) => {
                const existing = get().items.find((i) => i.id === product.id);
                if (existing) {
                    set({
                        items: get().items.map((i) =>
                            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
                        ),
                    });
                } else {
                    set({
                        items: [...get().items, { id: product.id, title: product.title, price: product.price, qty: 1 }],
                    });
                }
            },
            updateQty: (id, qty) => {
                if (qty <= 0) {
                    get().removeItem(id);
                } else {
                    set({
                        items: get().items.map((i) => (i.id === id ? { ...i, qty } : i)),
                    });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },
            getTotalQuantity: () => get().items.reduce((sum, item) => sum + item.qty, 0),
            getTotalAmount: () => get().items.reduce((sum, item) => sum + item.price * item.qty, 0),
        }),
        {
            name: `ktxgo-cart-${STUDENT.mssv}`,
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);