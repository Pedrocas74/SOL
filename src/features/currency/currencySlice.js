'use client';

import { createSlice } from '@reduxjs/toolkit';

const defaultCurrency = 'EUR';
const conversionRates = {
  EUR: 1,
  USD: 1.1,
  GBP: 0.85,
};

const loadCurrency = () => {
  if (typeof window === 'undefined') return defaultCurrency;
  return localStorage.getItem('currency') || defaultCurrency;
};

const saveCurrency = (currency) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('currency', currency);
  }
};

const initialState = {
  current: loadCurrency(),
  rates: conversionRates,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.current = action.payload;
      saveCurrency(state.current);
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
