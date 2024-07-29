import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Products {
    id: number;
    image: string;
    name: string;
    price: number;
}

interface ProductId {
    product: Products[];
    addProduct: (token: Products) => void;
    removeProduct: (i: number) => void;
    reset: () => void;
}

const initialState = {
    product: [],
};

export const useProductsStore = create<ProductId, [["zustand/persist", ProductId]]>(
    persist(
        (set) => ({
            ...initialState,
            addProduct: (prod) => set((state) => ({ product: [...state.product, prod] })),
            removeProduct: (id) =>
                set((state) => {
                    const updatedProducts = state.product.filter((prod) =>  prod.id !== id);
                    return { product: updatedProducts };
                }),
            reset: () => set(initialState),
        }),
        {
            name: "product-storage",
            getStorage: () => localStorage,
        }
    )
);
