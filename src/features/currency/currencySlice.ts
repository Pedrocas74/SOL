"use client";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CurrencyCode = "EUR" | "USD" | "GBP"; //3 only options 

const defaultCurrency: CurrencyCode = "EUR";

const conversionRates: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.1,
  GBP: 0.85,
};

//maintained in localStorage
const loadCurrency = (): CurrencyCode => {
  if (typeof window === "undefined") return defaultCurrency;

  const stored = localStorage.getItem("currency");
  if (stored === "EUR" || stored === "USD" || stored === "GBP") return stored;

  return defaultCurrency;
};

const saveCurrency = (currency: CurrencyCode) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("currency", currency);
  }
};

export interface CurrencyState {
  current: CurrencyCode;
  rates: Record<CurrencyCode, number>;
}

const initialState: CurrencyState = {
  current: loadCurrency(),
  rates: conversionRates,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.current = action.payload;
      saveCurrency(state.current);
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
