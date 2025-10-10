'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import CurrencySelector from './CurrencySelector'; 
export default function Navbar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <nav
      style={{
        padding: '1rem',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/">Home</Link>
        <Link href="/cart">Cart ({totalQuantity})</Link>
      </div>

      <CurrencySelector />
    </nav>
  );
}
