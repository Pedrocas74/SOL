"use client";

import dynamic from "next/dynamic";
import LoadingSVG from "@components/ui/LoadingSVG/LoadingSVG";


const Cart = dynamic(() => import("../../features/cart/Cart"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "var(--space-xxl) auto",
      }}
    >
      <LoadingSVG />
    </div>
  ),
});

export default function ClientCart() {
  return <Cart />;
}
