import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Products {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

interface AddProducts {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity?: number;
}

interface ProductId {
  product: Products[];
  addProduct: (token: AddProducts) => void;
  decrement: (id: number) => void;
  increment: (id: number) => void;
  removeProduct: (i: number) => void;
  reset: () => void;
}

const initialState = {
  product: [],
};

export const useProductsStore = create<
  ProductId,
  [["zustand/persist", ProductId]]
>(
  persist(
    (set) => ({
      ...initialState,
      addProduct: (prod) =>
        set((state) => {
          const existedProductIndex = state.product.findIndex(
            (item) => item.id === prod.id
          );
          if (existedProductIndex !== -1) {
            let updatedBasket = [...state.product];
            updatedBasket[existedProductIndex].quantity++;
            return { product: [...updatedBasket] };
          } else {
            return { product: [...state.product, { ...prod, quantity: 1 }] };
          }
        }),
      decrement: (id) =>
        set((state) => {
          const selectedProduct = state.product.findIndex(
            (item) => item.id === id
          );
          //create an if statement, so that the quantity of the product doesn't go beyond 1
          if (state.product[selectedProduct].quantity === 1) {
            return { basket: [...state.product] };
          }
          const updatedBasket = [...state.product];
          updatedBasket[selectedProduct].quantity -= 1;
          return { product: [...updatedBasket] };
        }),
      increment: (id) =>
        set((state) => {
          const selectedProduct = state.product.findIndex(
            (item: { id: number }) => item.id === id
          );
          const updatedBasket = [...state.product];
          updatedBasket[selectedProduct].quantity += 1;
          return { product: [...updatedBasket] };
        }),
      removeProduct: (id) =>
        set((state) => {
          const updatedProducts = state.product.filter(
            (prod) => prod.id !== id
          );
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
