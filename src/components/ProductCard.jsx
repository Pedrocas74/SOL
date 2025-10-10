'use client';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useState, useEffect } from 'react';
import Skeleton from './Skeleton';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { current, rates } = useSelector((state) => state.currency);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const convert = (price) => (price * rates[current]).toFixed(2);
  const getSymbol = () => {
    switch (current) {
      case 'USD': return '$';
      case 'GBP': return '£';
      default: return '€';
    }
  };

  if (!mounted) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '1rem',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <Skeleton width="150px" height="150px" style={{ margin: '0 auto' }} />
      <Skeleton width="80%" height="1rem" style={{ margin: '0.5rem auto' }} />
      <Skeleton width="50px" height="1rem" style={{ margin: '0.5rem auto' }} />
      <Skeleton width="80px" height="2rem" style={{ margin: '0.5rem auto' }} />
    </div>
  );
}

  return (
    <div style={{
      border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', textAlign: 'center'
    }}>
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} width={150} height={150} style={{ objectFit: 'contain' }} />
        <h3>{product.title}</h3>
      </Link>
      <p>{getSymbol()}{convert(product.price)}</p>
      <button
        onClick={() => dispatch(addToCart(product))}
        style={{ marginTop: '0.5rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
      >
        Add to Cart
      </button>
    </div>
  );
}
