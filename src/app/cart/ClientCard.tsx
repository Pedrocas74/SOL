"use client";

import dynamic from "next/dynamic";
import LoadingSVG from "@components/ui/LoadingSVG/LoadingSVG";

const Cart = dynamic(() => import("../../features/cart/Cart"), {
  ssr: false,
  loading: () => <LoadingSVG />,
});

export default function ClientCart() {
  return <Cart />;
}
