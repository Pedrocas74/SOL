"use client";

//hooks
import { useEffect } from "react";
import { useAppDispatch } from "@app/hooks/typedReduxHooks";
import { useSearchParams, useRouter } from "next/navigation";
//external libraries
import { toast } from "sonner";
//redux actions
import { clearCart } from '@features/cart/cartSlice';

export default function PaymentBanner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentStatus = searchParams.get("payment");
  const dispatch = useAppDispatch();

  useEffect(() => { //dislay success toaster notification while at '/'
    if (paymentStatus === "success") {
      toast.success("The order is on your way!");
      router.replace(window.location.pathname);
      dispatch(clearCart());
    }
  }, [paymentStatus, router, dispatch]);

  return null; 
}
