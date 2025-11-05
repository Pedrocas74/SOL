"use client";

import styles from "./Cart.module.css";
import Link from "next/link";
import React from "react";
import { Minus, Plus } from "lucide-react";
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

  // if (items.length === 0) return <p>Your cart is empty</p>;

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
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              className="buttonSecondary"
              onClick={() =>
                dispatch(
                  increaseQuantity(
                    `${item.id}-${item.selectedSize || "default"}`
                  )
                )
              }
            >
              <Plus size={15} /> 
            </button>
            <button
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              className="buttonSecondary"
              onClick={() =>
                dispatch(
                  decreaseQuantity(
                    `${item.id}-${item.selectedSize || "default"}`
                  )
                )
              }
              disabled={item.quantity === 1 ? true : false}
            >
              <Minus size={15} />
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
      
      <div className={styles.clearAllContainer}>
      <button className={`buttonTertiary ${styles.clearAllButton} `} onClick={() => dispatch(clearCart())}>
        Clear Cart
      </button>
      </div>
        <hr />
      <section className={styles.summarySection}>
        <h2>Order Summary</h2>
        <p className={styles.totalItems}><span>Total Items:</span> {totalQuantity}</p>
        <p className={styles.subtotalPrice}>
          <span>Subtotal:</span>{" "}
          {symbolPosition === "left"
            ? `${symbol}${convert(totalPrice)}`
            : `${convert(totalPrice)}${symbol}`}
        </p>
        

        <div className={styles.summaryButtonsContainer}>
          <Link href="/#products-list" className="buttonSecondary" >Continue Shopping</Link>
          <Link href="/checkout" className="buttonPrimary">Proceed to Checkout</Link>
        </div>
      </section>
    </section>
  );
}
