'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link href="/cart">Cart ({totalQuantity})</Link>
    </nav>
  );
}
