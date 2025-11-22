"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Checkout.module.css";
import { useRouter } from "next/navigation";
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
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const { current, rates } = useSelector((state) => state.currency);
  const [showCode, setShowCode] = useState(false); //promo code input display set | hidden -> visible
  const [code, setCode] = useState(""); //promo code input
  const [isApplied, setIsApplied] = useState(false); //promo code validation
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const [discountedTotal, setDiscountedTotal] = useState(totalPrice); //total price BEFORE|AFTER discount
  const [paymentMethod, setPaymentMethod] = useState("card"); //defaul for card payment method
  const [isPlaced, setIsPlaced] = useState(false); //place order button click
  const [isProcessing, setIsProcessing] = useState(false); //payment processing -> successful
  const router = useRouter();

  useEffect(() => {
    //show payment banner and redirect to home (showing success toaster)
    if (!isPlaced) return;

    setIsProcessing(true);

    const totalDelay = 4000 + 4000;
    const timer = setTimeout(() => {
      setIsProcessing(false);
      router.replace("/?payment=success");
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [isPlaced, router]);

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
      setCode("");
      toast.info("Reminder: PEDRO74");
      toast.error("Wrong code! :(");
      return;
    }
    const newTotal = totalPrice * 0.9; // 10% discount
    setDiscountedTotal(newTotal);
    setIsApplied(true); // disable further use
    toast.success("10% discount applied! :)");
  };

  const isMobile = window.innerWidth <= 768;

  const renderPaymentIcons = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <>
            <FaCcVisa size={40} />
            <FaCcMastercard size={40} />
            <FaCcAmex size={40} />
          </>
        );
      case "paypal":
        return <FaCcPaypal size={40} />;
      case "applepay":
        return <FaCcApplePay size={40} />;
      case "googlepay":
        return <FaGooglePay size={40} />;
      case "other":
        return (
          <>
            <FaCcAmazonPay size={40} />
            <FaCcStripe size={40} />
          </>
        );
      default:
        return null;
    }
  };

  const handlePlaceOrder = () => {
    setIsPlaced(true);
    setIsProcessing(true);
  };

  return (
    <>
      <section className={styles.checkoutSection}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout", href: "/checkout" },
          ]}
        />
        <h1>Checkout</h1>

        <div className={styles.summarySection}>
          <h2>Order Summary</h2>

          <table className={styles.summaryTable}>
            <thead>
              <tr>
                <th scope="col">Items</th>
                <th style={{ textAlign: "right" }} scope="col">
                  Subtotal ({symbol})
                </th>
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
                <td>{totalPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <hr />

          <p
            className={`${styles.toggleCode} buttonTertiary`}
            onClick={() => setShowCode(!showCode)}
          >
            Have a promo code?
          </p>
          {showCode && (
            <>
              <div className={styles.promoCodeContainer}>
                <input
                  type="text"
                  placeholder="Enter code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isApplied) {
                      applyDiscount();
                      e.target.blur();
                    }
                  }}
                  disabled={isApplied}
                />

                <button
                  className="buttonSecondary"
                  onClick={applyDiscount}
                  disabled={isApplied}
                  style={{
                    opacity: isApplied ? 0.5 : 1,
                    cursor: isApplied ? "not-allowed" : "pointer",
                  }}
                >
                  {isApplied ? "DONE" : "Apply"}
                </button>
              </div>
            </>
          )}

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
              <input
                className={styles.paymentInput}
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Credit/Debit Card
              <span className={styles.paymentIcons}>
                <FaCcVisa size={isMobile ? 22 : 32 } />
                <FaCcMastercard size={isMobile ? 22 : 32 } />
                <FaCcAmex size={isMobile ? 22 : 32 } />
              </span>
            </label>

            <label>
              <input
                className={styles.paymentInput}
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              PayPal
              <span className={styles.paymentIcons}>
                <FaCcPaypal size={isMobile ? 22 : 32 } />
              </span>
            </label>

            <label>
              <input
                className={styles.paymentInput}
                type="radio"
                name="payment"
                value="applepay"
                checked={paymentMethod === "applepay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Apple Pay
              <span className={styles.paymentIcons}>
                <FaCcApplePay size={isMobile ? 22 : 32 } />
              </span>
            </label>

            <label>
              <input
                className={styles.paymentInput}
                type="radio"
                name="payment"
                value="googlepay"
                checked={paymentMethod === "googlepay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Google Pay
              <span className={styles.paymentIcons}>
                <FaGooglePay size={isMobile ? 22 : 32 } />
              </span>
            </label>

            <label>
              <input
                className={styles.paymentInput}
                type="radio"
                name="payment"
                value="other"
                checked={paymentMethod === "other"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Other methods
              <span className={styles.paymentIcons}>
                <FaCcAmazonPay size={isMobile ? 22 : 32 } />
                <FaCcStripe size={isMobile ? 22 : 32 } />
              </span>
            </label>
          </div>
        </section>

        <button
          className={`buttonPrimary ${styles.placeOrderButton}`}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
        {isPlaced && (
          <section className={styles.placeContainer}>
            <span className={styles.placePaymentIcons}>
              {renderPaymentIcons()}
            </span>
            <div className={styles.placeInfo}>
              {isProcessing ? (
                <>
                  <h3>Your payment is being processed...</h3>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ display: "block" }}
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </motion.svg>
                </>
              ) : (
                <>
                  <h3>Payment successful!</h3>
                  <CheckCircle size={50} />
                </>
              )}
            </div>
          </section>
        )}
      </section>
      <FooterSimple />
    </>
  );
}
