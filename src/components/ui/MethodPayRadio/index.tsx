import styles from "./MethodPayRadio.module.css";
//icons
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


export default function MethodPayRadio() {
  const [paymentMethod, setPaymentMethod] = useState("card"); //defaul for card payment method
  const [supportsApplePay, setSupportsApplePay] = useState(false); //if IOS system -> displays apple pay
  const [supportsGooglePay, setSupportsGooglePay] = useState(false); //if Android system -> displays google pay

  
  useEffect(() => { //to check which operative system is the current device using (apple VS android)
      if (typeof window === "undefined" || typeof navigator === "undefined")
        return;
  
      const ua = navigator.userAgent || "";
  
      const isApple = /Macintosh|Mac OS X|iPhone|iPad|iPod/i.test(ua);
      const isAndroid = /Android/i.test(ua);
      setSupportsApplePay(isApple);
      setSupportsGooglePay(isAndroid || !isApple); //states that are later used to remove one of the payment options
    }, []);

    

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

    return (           
          <div className={styles.methodContainer}>
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
        

          
        












        

        
        
    );
}