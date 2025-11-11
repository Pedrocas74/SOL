"use client";

import dynamic from 'next/dynamic';

const Cart = dynamic(() => import('../features/cart/Cart'), {
  ssr: false,
  loading: () => <p>Loading cart...</p>
});

export default function ClientCart() {
  return <Cart />;
}