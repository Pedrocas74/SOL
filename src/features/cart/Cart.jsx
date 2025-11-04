"use client";

import styles from "./Cart.module.css";
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
    <section className={styles.cartSection}>
      <h1>Your Cart</h1>

      <div className={styles.itemsContainer}>
        {items.map((item) => (
          <article
            key={`${item.id}-${item.selectedSize || "default"}`}
            className={styles.cartItem}
          >
            <img src={item.image} alt={`Image of ${item.title}`} />
          <div className={styles.rightContainer}>
            <div className={styles.itemInformation}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.price}>
                <span>Price:{" "}</span>
                {symbolPosition === "left" ? (
                  <>
                    {symbol}
                    {convert(item.price)}
                  </>
                ) : (
                  <>
                    {convert(item.price)}
                    {symbol}
                  </>
                )}
              </p>
              <p className={styles.quantity}><span>Quantity:{" "} </span>{item.quantity}</p>
              {item.selectedSize && <p className={styles.size}><span>Size:{" "} </span> {item.selectedSize}</p>}
            </div>

          <div className={styles.buttonsContainer}>
            <button
              className="buttonSecondary"
              onClick={() =>
                dispatch(
                  increaseQuantity(
                    `${item.id}-${item.selectedSize || "default"}`
                  )
                )
              }
            >
              +
            </button>
            <button
              className="buttonSecondary"
              onClick={() =>
                dispatch(
                  decreaseQuantity(
                    `${item.id}-${item.selectedSize || "default"}`
                  )
                )
              }
            >
              -
            </button>
            <button
              className="buttonSecondary"
              onClick={() =>
                dispatch(
                  removeFromCart(`${item.id}-${item.selectedSize || "default"}`)
                )
              }
            >
              Remove
            </button>
          </div>
        </div>
          </article>
        ))}
      </div>

      <button className={`buttonTertiary ${styles.clearAllButton} `} onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>

      <section className={styles.summarySection}>
        <h2>Order Summary</h2>
        <p className={styles.totalItems}>Total Items: {totalQuantity}</p>
        <p className={styles.totalPrice}>
          Total Price:{" "}
          {symbolPosition === "left"
            ? `${symbol}${convert(totalPrice)}`
            : `${convert(totalPrice)}${symbol}`}
        </p>
      </section>
    </section>
  );
}
