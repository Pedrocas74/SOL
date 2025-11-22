"use client";

import dynamic from "next/dynamic";


const Cart = dynamic(() => import("../features/cart/Cart"), {
  ssr: false,
  loading: () => (
    <p
      style={{
        margin: "10vh 2vh" ,
      }}
    >
      LOADING CART...
    </p>
  ),
});

export default function ClientCart() {
  return <Cart />;
}
