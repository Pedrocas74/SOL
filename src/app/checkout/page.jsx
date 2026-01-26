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
import FooterSimple from "@components/layout/Footer/FooterSimple";
import Breadcrumbs from "@components/ui/Breadcrumbs";
import LoadingSVG from "@components/ui/LoadingSVG/LoadingSVG";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

export default function Checkout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { items } = useSelector((state) => state.cart);
  const { current, rates } = useSelector((state) => state.currency);
  const [showCode, setShowCode] = useState(false); //promo code input display set | hidden -> visible
  const [code, setCode] = useState(""); //promo code input
  const [isApplied, setIsApplied] = useState(false); //promo code validation
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const [discountedTotal, setDiscountedTotal] = useState(totalPrice); //total price BEFORE|AFTER discount
  const [paymentMethod, setPaymentMethod] = useState("card"); //defaul for card payment method
  const [isPlaced, setIsPlaced] = useState(false); //place order button click
  const [isProcessing, setIsProcessing] = useState(false); //payment processing -> successful
  const [supportsApplePay, setSupportsApplePay] = useState(false); //if IOS system -> displays apple pay
  const [supportsGooglePay, setSupportsGooglePay] = useState(false); //if Android system -> displays google pay

  const router = useRouter();

  // clerk auth logic
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace("/sign-in?redirect_url=/checkout");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined")
      return;

    const ua = navigator.userAgent || "";

    const isApple = /Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(ua);
    const isAndroid = /Android/i.test(ua);
    setSupportsApplePay(isApple);
    setSupportsGooglePay(isAndroid || !isApple);
  }, []);

  useEffect(() => {
    if (!isPlaced) return;

    setIsProcessing(true);

    const processingTimer = setTimeout(() => {
      setIsProcessing(false);
    }, 4000);

    const successTimer = setTimeout(() => {
      router.replace("/?payment=success");
    }, 6000);

    return () => {
      clearTimeout(processingTimer);
      clearTimeout(successTimer);
    };
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
      setTimeout(() => {
        toast.info("Reminder: PEDRO74");
      }, 2000);
      toast.error("Wrong code! :(");
      return;
    }
    const newTotal = totalPrice * 0.9; // 10% discount
    setDiscountedTotal(newTotal);
    setIsApplied(true); // disable further use
    toast.success("10% discount applied! :)");
  };

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

  if (!isLoaded) return <LoadingSVG />;
  if (!isSignedIn) return null;

  return (
    <div className={styles.checkoutPage}>
      <section
        className={styles.checkoutSection}
        aria-labelledby="checkout-heading"
      >
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/#products-list" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout", href: "/checkout" },
          ]}
        />
        <h1 id="checkout-heading">Checkout</h1>

        <div className={styles.summarySection}>
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
                    {item.title} × {item.quantity}{" "}
                    {item.selectedSize && (
                      <span style={{ fontWeight: 300 }}>
                        ({item.selectedSize})
                      </span>
                    )}
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
                <td>{convert(totalPrice.toFixed(2))}</td>
              </tr>
            </tfoot>
          </table>

          <hr />

          <button
            type="button"
            className={`${styles.toggleCode} buttonTertiary`}
            onClick={() => setShowCode(!showCode)}
            style={{ textDecoration: "underline" }}
            aria-expanded={showCode}
            aria-controls="promo-code-section"
          >
            Have a promo code?
          </button>
          {showCode && (
            <>
              <div
                className={styles.promoCodeContainer}
                id="promo-code-section"
              >
                <input
                  id="promo-code"
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
                  type="button"
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

        <section
          className={styles.paymentSection}
          aria-labelledby="payment-heading"
        >
          <h2 id="payment-heading">Payment</h2>
          <div className={styles.paymentMethodsContainer}>
            <label>
              <div>
                <input
                  className={styles.paymentInput}
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Credit Card
              </div>
              <span className={styles.paymentIcons} aria-hidden="true">
                <FaCcVisa size={27} />
                <FaCcMastercard size={27} />
                <FaCcAmex size={27} />
              </span>
            </label>

            <label>
              <div>
                <input
                  className={styles.paymentInput}
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                PayPal
              </div>
              <span className={styles.paymentIcons} aria-hidden="true">
                <FaCcPaypal size={27} />
              </span>
            </label>

            {supportsApplePay && (
              <label>
                <div>
                  <input
                    className={styles.paymentInput}
                    type="radio"
                    name="payment"
                    value="applepay"
                    checked={paymentMethod === "applepay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />{" "}
                  Apple Pay
                </div>
                <span className={styles.paymentIcons} aria-hidden="true">
                  <FaCcApplePay size={27} />
                </span>
              </label>
            )}

            {supportsGooglePay && (
              <label>
                <div>
                  <input
                    className={styles.paymentInput}
                    type="radio"
                    name="payment"
                    value="googlepay"
                    checked={paymentMethod === "googlepay"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />{" "}
                  Google Pay
                </div>
                <span className={styles.paymentIcons} aria-hidden="true">
                  <FaGooglePay size={27} />
                </span>
              </label>
            )}

            <label>
              <div>
                <input
                  className={styles.paymentInput}
                  type="radio"
                  name="payment"
                  value="other"
                  checked={paymentMethod === "other"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Other methods
              </div>
              <span className={styles.paymentIcons} aria-hidden="true">
                <FaCcAmazonPay size={27} />
                <FaCcStripe size={27} />
              </span>
            </label>
          </div>
        </section>

        <button
          type="button"
          className={`buttonPrimary ${styles.placeOrderButton}`}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
        
      </section>
            <FooterSimple />
      {isPlaced && (
        <section
          className={styles.placeContainer}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className={styles.placePaymentIcons} aria-hidden="true">
            {renderPaymentIcons()}
          </span>
          <div className={styles.placeInfo}>
            {isProcessing ? (
              <>
                <p>Your payment is being processed...</p>
                <LoadingSVG />
              </>
            ) : (
              <>
                <p>Payment successful!</p>
                <CheckCircle size={50} aria-hidden="true" />
              </>
            )}
          </div>
        </section>
      )}
      
    </div>
  );
}
