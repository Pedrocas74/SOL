"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Checkout.module.css";
import Link from "next/link";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcAmazonPay,
  FaCcApplePay,
  FaCcStripe,
  FaGooglePay,
} from "react-icons/fa";
import FooterSimple from "@components/FooterSimple";
import Breadcrumbs from "@components/Breadcrumbs";

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const { current, rates } = useSelector((state) => state.currency);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const [discountedTotal, setDiscountedTotal] = useState(totalPrice);

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

  const applyDiscount = () => {
    if (isApplied) return;
    if (code !== "PEDRO74") {
      alert("Invalid code");
      setCode("");
      return;
    }
    const newTotal = totalPrice * 0.9; // 10% discount
    setDiscountedTotal(newTotal);
    setIsApplied(true); // disable further use
    alert("Promo code applied! 10% discount");
  };

  return (
    <>
    <section className={styles.checkoutSection}>
      <Breadcrumbs 
        items={[{label: "Home", href: "/"}, {label: "Cart", href: "/cart"}, {label: "Checkout", href: "/checkout"}]} 
      />
      <h1>Checkout</h1>

      <div className={styles.summarySection}>
        <h2>Order Summary</h2>

        <table className={styles.summaryTable}>
          <thead>
            <tr>
              <th scope="col">Items</th>
              <th scope="col">Subtotal ({symbol})</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className={styles.itemRow}>
                <td>
                  {item.title} × {item.quantity}
                </td>
                <td className={styles.cellPrice}>
                  {convert(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Subtotal ({symbol})</th>
              <td>{totalPrice}</td>
            </tr>
          </tfoot>
        </table>

        <hr />

        <p className={styles.toggleCode} onClick={() => setShowCode(!showCode)}>
          Have a promo code?
        </p>
        {showCode && (
          <div className={styles.promoCodeContainer}>
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isApplied}
            />
            <button
              className="buttonSecondary"
              onClick={applyDiscount}
              disabled={isApplied}
              style={{ opacity: isApplied ? 0.7 : 1 }}
            >
              {isApplied ? "Applied" : "Apply"}
            </button>
          </div>
        )}

        {/* <p>Free Shipping. <Link href="/">Click for more information.</Link></p> */}

        {/* subtotal Price */}
        <p
          className={styles.subtotalPrice}
          style={{
            opacity: isApplied ? 0.7 : 1,
            textDecoration: isApplied ? "line-through" : "none",
            textDecorationThickness: isApplied ? "2px" : 0,
            textDecorationColor: isApplied ? "#333" : "none",
          }}
        >
          Subtotal:{" "}
          {symbolPosition === "left"
            ? `${symbol}${convert(totalPrice)}`
            : `${convert(totalPrice)}${symbol}`}
        </p>
        {/* total price */}
        <p className={styles.totalPrice}>
          Total:{" "}
          {symbolPosition === "left"
            ? `${symbol}${convert(discountedTotal)}`
            : `${convert(discountedTotal)}${symbol}`}{" "}
        </p>
      </div>

      <section className={styles.paymentSection}>
        <h2>Payment</h2>
        <div className={styles.paymentMethodsContainer}>
          <label>
            <input type="radio" name="payment" defaultChecked /> Credit/Debit
            Card
            <span className={styles.paymentIcons}>
              <FaCcVisa size={22} />
              <FaCcMastercard  size={22} />
              <FaCcAmex size={22} />
            </span>
          </label>

          <label>
            <input type="radio" name="payment" value="card" /> PayPal
            <span className={styles.paymentIcons}>
              <FaCcPaypal size={22} />
            </span>
          </label>

          <label>
            <input type="radio" name="payment" value="applepay" /> Apple Pay
            <span className={styles.paymentIcons}>
              <FaCcApplePay size={22} />
            </span>
          </label>

          <label>
            <input type="radio" name="payment" value="googlepay" /> Google Pay
            <span className={styles.paymentIcons}>
              <FaGooglePay size={22} />
            </span>
          </label>

          <label>
            <input type="radio" name="payment" value="other" /> Other methods
            <span className={styles.paymentIcons}>
              <FaCcAmazonPay size={22} />
              <FaCcStripe size={22} />
            </span>
          </label>
        </div>
      </section>

      <button className={`buttonPrimary ${styles.placeOrderButton}`} onClick={() => alert("Order placed!")}>
        Place Order
      </button>
    </section>
    <FooterSimple />
    </>
  );
}
