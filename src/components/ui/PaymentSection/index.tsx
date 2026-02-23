import styles from "./PaymentSection.module.css";
//icons
import { CheckCircle } from "lucide-react";
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
//hooks
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
//custom components 
import LoadingSVG from "../LoadingSVG";

export default function PaymentSection() {
  const [paymentMethod, setPaymentMethod] = useState("card"); //defaul for card payment method
  const [isPlaced, setIsPlaced] = useState(false); //place order button click
  const [isProcessing, setIsProcessing] = useState(false); //payment processing -> successful
  const [supportsApplePay, setSupportsApplePay] = useState(false); //if IOS system -> displays apple pay
  const [supportsGooglePay, setSupportsGooglePay] = useState(false); //if Android system -> displays google pay
  const router = useRouter();

  useEffect(() => { //to check which operative system is the current device using (apple VS android)
      if (typeof window === "undefined" || typeof navigator === "undefined")
        return;
  
      const ua = navigator.userAgent || "";
  
      const isApple = /Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(ua);
      const isAndroid = /Android/i.test(ua);
      setSupportsApplePay(isApple);
      setSupportsGooglePay(isAndroid || !isApple); //states that are later used to remove one of the payment options
    }, []);

    useEffect(() => { //payment simulation after clicking "Place Order" button
        if (!isPlaced) return; 
    
        setIsProcessing(true);
    
        const processingTimer = setTimeout(() => { // 4s for processing after click
          setIsProcessing(false);
        }, 4000);
    
        const successTimer = setTimeout(() => {
          router.replace("/?payment=success");
        }, 6000); //6s after click for, 2 last seconds showing "payment successful"
    
        return () => {
          clearTimeout(processingTimer);
          clearTimeout(successTimer);
        };
      }, [isPlaced, router]);

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

       const handlePlaceOrder = () => { //handler click on Place order button 
          setIsPlaced(true);
          setIsProcessing(true);
        };

    return (
        <>
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
        

        <button
          type="button"
          className={`buttonPrimary ${styles.placeOrderButton}`}
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
        </section>

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
        </>
    );
}