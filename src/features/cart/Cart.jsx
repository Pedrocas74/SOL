"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "./cartSlice";

export default function Cart() {
  const { items } = useSelector((state) => state.cart);
  const { current, rates } = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const convert = (price) => (price * rates[current]).toFixed(2);
  let symbolPosition = "right"; //euro as default
  const getSymbol = () => {
    switch (current) {
      case "USD":
        symbolPosition = "left";
        return "$";
      case "GBP":
        symbolPosition = "left";
        return "£";
      default:
        symbolPosition = "right";
        return "€";
    }
  };
  const symbol = getSymbol();

  if (items.length === 0) return <p>Your cart is empty</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      <button
        onClick={() => dispatch(clearCart())}
        style={{ marginBottom: "1rem" }}
      >
        Clear Cart
      </button>
      {items.map((item) => (
        <div
          key={`${item.id}-${item.selectedSize || "default"}`}
          style={{
            marginBottom: "1rem",
            borderBottom: "1px solid #ccc",
            paddingBottom: "1rem",
          }}
        >
          <h3>{item.title}</h3>
          <p>Price:{" "}
        {symbolPosition === "left" ? (
          <>
            {symbol}{convert(item.price)}
          </>
        ) : (
          <>
            {convert(item.price)}{symbol}
          </>
        )}
      </p>
          <p>Quantity: {item.quantity}</p>
          {item.selectedSize && <p>Size: {item.selectedSize}</p>}
          <button onClick={() => dispatch(increaseQuantity(`${item.id}-${item.selectedSize || 'default'}`))}>+</button>
          <button onClick={() => dispatch(decreaseQuantity(`${item.id}-${item.selectedSize || 'default'}`))}>-</button>
          <button onClick={() => dispatch(removeFromCart(`${item.id}-${item.selectedSize || 'default'}`))}>
            Remove
          </button>
        </div>
      ))}
      <h3>Total Items: {totalQuantity}</h3>
      <h3>Total Price:{" "} {symbolPosition === "left" ? (
          <>
            {symbol}{convert(totalPrice)}
          </>
        ) : (
          <>
            {convert(totalPrice)}{symbol}
          </>
        )}</h3>
    </div>
  );
}
