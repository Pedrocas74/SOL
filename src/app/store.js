import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import currencyReducer from '../features/currency/currencySlice'; // 👈 new

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    currency: currencyReducer, 
  },
});
