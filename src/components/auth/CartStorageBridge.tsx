"use client";

//hooks
import { useEffect } from "react";
import { useAppDispatch } from "@app/hooks/typedReduxHooks";
//auth 
import { useAuth } from "@clerk/nextjs";
//redux actions
import { setCartStorageKey } from "@features/cart/cartSlice";

//cart updates whenever a user logs in
export default function CartStorageBridge() {
  const { userId, isLoaded } = useAuth();
  const dispatch = useAppDispatch();

  const loadCartFromLocalStorage = (key: string) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (!serializedState)
        return { items: [], totalQuantity: 0, totalPrice: 0 };

      const parsed = JSON.parse(serializedState);

      return {
        items: parsed.items || [],
        totalQuantity: parsed.totalQuantity || 0,
        totalPrice: parsed.totalPrice || 0,
      };
    } catch (e) {
      console.error("Could not load cart from localStorage", e);
      return { items: [], totalQuantity: 0, totalPrice: 0 };
    }
  };

  const mergeItems = (guestItems, userItems) => {
    const itemMap = new Map();
    [...guestItems, ...userItems].forEach((item) => {
      const key =
        item.itemKey || `${item.id}-${item.selectedSize || "default"}`;
      if (itemMap.has(key)) {
        itemMap.get(key).quantity += item.quantity;
      } else {
        itemMap.set(key, { ...item });
      }
    });
    return Array.from(itemMap.values());
  };

  useEffect(() => {
    if (!isLoaded) return;

    const guestKey = "cart:guest";
    const userKey = userId ? `cart:${userId}` : null;

    if (userKey) {
      //Login success: merge guest cart with user cart
      const guestCart = loadCartFromLocalStorage(guestKey);
      const userCart = loadCartFromLocalStorage(userKey);

      const mergedItems = mergeItems(guestCart.items, userCart.items);
      const mergedCart = {
        items: mergedItems,
        totalQuantity: mergedItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        ),
        totalPrice: mergedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        ),
      };

      //save merged cart under user key
      localStorage.setItem(
        userKey,
        JSON.stringify({
          items: mergedCart.items,
          totalQuantity: mergedCart.totalQuantity,
          totalPrice: mergedCart.totalPrice,
        }),
      );

      //clear guest cart
      localStorage.removeItem(guestKey);

      //dispatch setCartStorageKey with user key
      dispatch(setCartStorageKey(userKey));
    } else {
      //logout or no user: switch to guest cart
      dispatch(setCartStorageKey(guestKey));
    }
  }, [userId, isLoaded, dispatch]);

  return null;
}
