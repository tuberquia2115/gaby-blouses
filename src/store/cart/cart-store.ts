import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];
  getSummaryInformation: () => {
    subtotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  addProductToCart(product: CartProduct): void;
  updateProductQuantity(product: CartProduct, quantity: number): void;
  removeProduct(product: CartProduct): void;
  clearCart(): void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productExistsInCart = cart.some((item) => item.id === product.id && item.size === product.size);

        if (!productExistsInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Se que el producto existe por talla... tengo que incrementar el quantity;
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subtotal = cart.reduce((subtotal, product) => product.quantity * product.price + subtotal, 0);
        const tax = subtotal * 0.15;
        const total = subtotal + tax;
        const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

        return {
          subtotal,
          tax,
          total,
          itemsInCart,
        };
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },
      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
      },
      clearCart: () => {
        set({ cart: [] });
      },
    }),

    { name: 'shopping-cart' }
  )
);
