import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_KEY = "cart:guest";

const emptyCart = (storageKey = DEFAULT_KEY) => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  cartEvents: 0, //to inform navbar everytime an item is added to cart (movement) 
  storageKey,
});

const loadCartFromLocalStorage = (key = DEFAULT_KEY) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return emptyCart(key);

    const parsed = JSON.parse(serializedState);

    //always reset cartEvents on load.
    return {
      ...emptyCart(key),
      items: parsed.items || [],
      totalQuantity: parsed.totalQuantity || 0,
      totalPrice: parsed.totalPrice || 0,
    };
  } catch (e) {
    console.error("Could not load cart from localStorage", e);
    return emptyCart(key);
  }
};

const saveCartToLocalStorage = (state) => {
  try {
    const key = state.storageKey || DEFAULT_KEY;

    //don’t persist unused cartEvents or the storageKey itself.
    const toPersist = {
      items: state.items,
      totalQuantity: state.totalQuantity,
      totalPrice: state.totalPrice,
    };

    localStorage.setItem(key, JSON.stringify(toPersist));
  } catch (e) {
    console.error("Could not save cart to localStorage", e);
  }
};

const initialState =
  typeof window !== "undefined" ? loadCartFromLocalStorage(DEFAULT_KEY) : emptyCart(DEFAULT_KEY);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartStorageKey: (state, action) => {
      const nextKey = action.payload || DEFAULT_KEY;

      //if key doesn’t change, do nothing
      if (state.storageKey === nextKey) return;

      const loaded = loadCartFromLocalStorage(nextKey);

      state.storageKey = nextKey;
      state.items = loaded.items;
      state.totalQuantity = loaded.totalQuantity;
      state.totalPrice = loaded.totalPrice;
      state.cartEvents = 0;
    },

    addToCart: (state, action) => {
      const { product, selectedSize } = action.payload;
      const itemKey = `${product.id}-${selectedSize || 'default'}`;
      
      const existingItem = state.items.find(item => 
        `${item.id}-${item.selectedSize || 'default'}` === itemKey
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ 
          ...product, 
          quantity: 1, 
          selectedSize: selectedSize || null,
          itemKey //special key
        });
      }
      state.cartEvents += 1;
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      saveCartToLocalStorage(state);
    },
    
    removeFromCart: (state, action) => {
      const itemToRemove = state.items.find(item => 
        `${item.id}-${item.selectedSize || 'default'}` === action.payload
      );
      
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter(item => 
          `${item.id}-${item.selectedSize || 'default'}` !== action.payload
        );
      }
      saveCartToLocalStorage(state);
    },
    
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => 
        `${item.id}-${item.selectedSize || 'default'}` === action.payload
      );
      
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
      saveCartToLocalStorage(state);
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => 
        `${item.id}-${item.selectedSize || 'default'}` === action.payload
      );
      
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= item.price;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(item => 
          `${item.id}-${item.selectedSize || 'default'}` !== action.payload
        );
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
    reconcileWithProducts: (state, action) => {
  
  state.items = state.items.map(item => {
        const productInState = action.payload.find(p => p.id === item.id);
        return {
          ...item,
          unavailable: productInState?.stock === "Sold out"
        };
      });
      
      saveCartToLocalStorage(state);
    }
  },
});

export const {setCartStorageKey, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, reconcileWithProducts } = cartSlice.actions;
export default cartSlice.reducer;

