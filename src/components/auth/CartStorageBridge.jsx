"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { setCartStorageKey } from "@features/cart/cartSlice";

export default function CartStorageBridge() {
  const { userId, isLoaded } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoaded) return;

    const key = userId ? `cart:${userId}` : "cart:guest";
    dispatch(setCartStorageKey(key));
  }, [userId, isLoaded, dispatch]);

  return null;
}
