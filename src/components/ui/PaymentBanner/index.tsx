"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { clearCart } from '@features/cart/cartSlice';
import { useAppSelector, useAppDispatch } from "@app/hooks";

export default function PaymentBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentStatus = searchParams.get("payment");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success("The order is on your way!");
      router.replace(window.location.pathname);
      dispatch(clearCart());
    }
  }, [paymentStatus, router, dispatch]);

  return null; 
}
