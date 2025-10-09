'use client';


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} from './cartSlice';

export default function Cart() {
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      <button onClick={() => dispatch(clearCart())} style={{ marginBottom: '1rem' }}>
        Clear Cart
      </button>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
          <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
          <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
        </div>
      ))}
      <h3>Total Items: {totalQuantity}</h3>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}
