'use client';

import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../features/cart/cartSlice';
import { useState, useEffect } from 'react';
import Skeleton from '@components/Skeleton';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === parseInt(id))
  );

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

  if (!mounted || !product) {
  return (
    <div style={{ padding: '1rem' }}>
      <Skeleton width="300px" height="300px" style={{ marginBottom: '1rem' }} />
      <Skeleton width="50%" height="1.5rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="80%" height="1rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="100px" height="2rem" borderRadius="8px" style={{ marginTop: '0.5rem' }} />
    </div>
  );
}

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} width={300} style={{ objectFit: 'contain' }} />
      <p>{product.description}</p>
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

