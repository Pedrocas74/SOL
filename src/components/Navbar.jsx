'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import CurrencySelector from './CurrencySelector';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { current: currentCurrency } = useSelector((state) => state.currency);
  // Track if the component has mounted (hydration safe)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
         
        {mounted ? (
          <Link href="/cart">Cart ({totalQuantity})</Link>
        ) : (
          <Link href="/cart">Cart (0)</Link>
        )}
      </div>

      {mounted ? (
        <CurrencySelector />
      ) : (
        <span>Currency: {currentCurrency}</span>
      )}
    </nav>
  );
}
