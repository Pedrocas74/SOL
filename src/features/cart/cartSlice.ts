import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { StockStatus } from "@features/products/productsSlice";

const DEFAULT_KEY = "cart:guest";

//--------- TYPES -------
export interface ProductInCart {
  id: number;
  title?: string;
  price: number;
  image?: string;
  stock?: StockStatus; //from products slice
  sizes?: string[];

  //cart-specific
  quantity: number;
  selectedSize: string | null;
  itemKey: string;
  unavailable?: boolean;
}

export interface CartState { 
  items: ProductInCart[];
  totalQuantity: number;
  totalPrice: number;
  cartEvents: number;
  storageKey: string;
}

type AddToCartPayload = {
  product: Omit<ProductInCart, "quantity" | "selectedSize" | "itemKey" | "unavailable">; //omit these as they are cart-specific
  selectedSize?: string | null;
};

//product list used by reconcileWithProducts
type ProductForReconcile = { id: number; stock?: StockStatus };

//-------- HELPERS ------
const emptyCart = (storageKey: string = DEFAULT_KEY): CartState => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  cartEvents: 0,
  storageKey,
});

type PersistedCart = Pick<CartState, "items" | "totalQuantity" | "totalPrice">; 

const loadCartFromLocalStorage = (key: string = DEFAULT_KEY): CartState => {
  try {
    //SSR safety: if called on server, return empty
    if (typeof window === "undefined") return emptyCart(key);

    const serializedState = localStorage.getItem(key);
    if (!serializedState) return emptyCart(key);

    const parsed: Partial<PersistedCart> = JSON.parse(serializedState);

    return {
      ...emptyCart(key),
      items: Array.isArray(parsed.items) ? parsed.items : [],
      totalQuantity: typeof parsed.totalQuantity === "number" ? parsed.totalQuantity : 0,
      totalPrice: typeof parsed.totalPrice === "number" ? parsed.totalPrice : 0,
    };
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
    return emptyCart(key);
  }
};

const saveCartToLocalStorage = (state: CartState) => {
  try {
    if (typeof window === "undefined") return;

    const key = state.storageKey || DEFAULT_KEY;

    const toPersist: PersistedCart = {
      items: state.items,
      totalQuantity: state.totalQuantity,
      totalPrice: state.totalPrice,
    };

    localStorage.setItem(key, JSON.stringify(toPersist));
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
};

//initial state (SSR-safe)
const initialState: CartState =
  typeof window !== "undefined" ? loadCartFromLocalStorage(DEFAULT_KEY) : emptyCart(DEFAULT_KEY);

// ----------SLICE----
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartStorageKey: (state, action: PayloadAction<string | undefined>) => {
      const nextKey = action.payload || DEFAULT_KEY;
      if (state.storageKey === nextKey) return;

      const loaded = loadCartFromLocalStorage(nextKey);

      state.storageKey = nextKey;
      state.items = loaded.items;
      state.totalQuantity = loaded.totalQuantity;
      state.totalPrice = loaded.totalPrice;
      state.cartEvents = 0;
    },

    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, selectedSize } = action.payload;

      const normalizedSize = selectedSize ?? null;
      const itemKey = `${product.id}-${normalizedSize || "default"}`;

      const existingItem = state.items.find(
        (item) => `${item.id}-${item.selectedSize || "default"}` === itemKey,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem: ProductInCart = {
          ...product,
          quantity: 1,
          selectedSize: normalizedSize,
          itemKey,
        };
        state.items.push(newItem);
      }

      state.cartEvents += 1;
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemKey = action.payload;

      const itemToRemove = state.items.find(
        (item) => `${item.id}-${item.selectedSize || "default"}` === itemKey,
      );

      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter(
          (item) => `${item.id}-${item.selectedSize || "default"}` !== itemKey,
        );
      }

      saveCartToLocalStorage(state);
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const itemKey = action.payload;

      const item = state.items.find((i) => `${i.id}-${i.selectedSize || "default"}` === itemKey);

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }

      saveCartToLocalStorage(state);
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const itemKey = action.payload;

      const item = state.items.find((i) => `${i.id}-${i.selectedSize || "default"}` === itemKey);

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      } else {
        state.items = state.items.filter((i) => `${i.id}-${i.selectedSize || "default"}` !== itemKey);
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      }

      saveCartToLocalStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartToLocalStorage(state);
    },

    reconcileWithProducts: (state, action: PayloadAction<ProductForReconcile[]>) => { //adapts stockstatus from items in cart according to current products list stock
      const products = action.payload;

      state.items = state.items.map((item) => {
        const productInState = products.find((p) => p.id === item.id);
        return {
          ...item,
          unavailable: productInState?.stock === "Sold out",
        };
      });

      saveCartToLocalStorage(state);
    },
  },
});

export const {
  setCartStorageKey,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  reconcileWithProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
