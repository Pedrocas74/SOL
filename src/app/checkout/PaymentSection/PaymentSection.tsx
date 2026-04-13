import styles from "./PaymentSection.module.css";
//hooks
import { useState, useEffect } from "react";
import { useCurrency } from "@app/hooks/useCurrency";
import { useRouter } from "next/navigation";
//built in
import Link from "next/link";
//external
import { toast } from "sonner";
//custom components
import MethodPayRadio from "@app/checkout/MethodPayRadio";
import LoadingSVG from "@components/ui/LoadingSVG";
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

export default function PaymentSection({ totalPrice }) {
  const [paymentMethod, setPaymentMethod] = useState("card"); //default for card
  const [code, setCode] = useState(""); //promo code input
  const [isApplied, setIsApplied] = useState(false); //promo code validation
  const [discountedTotal, setDiscountedTotal] = useState(totalPrice); //total price BEFORE|AFTER discount
  const [isPlaced, setIsPlaced] = useState(false); //place order button click
  const [isProcessing, setIsProcessing] = useState(false); //payment processing -> successful

  const { format } = useCurrency();
  const router = useRouter();

  useEffect(() => {
    //payment simulation after clicking "Place Order" button
    if (!isPlaced) return;

    setIsProcessing(true);

    const processingTimer = setTimeout(() => {
      // 4s for processing after click
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

  const renderPaymentIcons = (method = paymentMethod) => {
  switch (method) {
    case "card":
      return (<><FaCcVisa size={40}/><FaCcMastercard size={40}/><FaCcAmex size={40}/></>);
    case "paypal": return <FaCcPaypal size={40}/>;
    case "applepay": return <FaCcApplePay size={40}/>;
    case "googlepay": return <FaGooglePay size={40}/>;
    case "other": return (<><FaCcAmazonPay size={40}/><FaCcStripe size={40}/></>);
    default: return null;
  }
};

  return (
    <>
    <section
      aria-labelledby="payment-heading"
      className={styles.paymentSection}
    >
      <h2 id="payment-heading">Payment</h2>

      <div className={styles.flexWrapper}>
        {/* left container  */}
        <MethodPayRadio paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

        {/* right container  */}
        <div className={styles.rightContainer}>
          <div className={styles.prices}>
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
              Subtotal: {format(totalPrice)}
            </p>
            {/* total price */}
            <p className={styles.totalPrice}>
              Total: {format(discountedTotal)}
            </p>
          </div>
        
        <div className={styles.promoCodeContainer}>
          <p className={styles.promoAd}>Have a promo code?</p>

          <div className={styles.promoInputGroup}>
            <label htmlFor="promo-code" className={styles.promoLabel} />

              <input
                id="promo-code"
                type="text"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isApplied) {
                    applyDiscount();
                  }
                }}
                disabled={isApplied}
                aria-disabled={isApplied}
              />

              <button
                type="button"
                className="buttonSecondary"
                onClick={applyDiscount}
                disabled={isApplied}
                aria-disabled={isApplied}
              >
                Apply
              </button>
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <Link
              href="/cart"
              className={`buttonSecondary ${styles.placeOrderButton}`}
            >
              Back to Cart
            </Link>
            {/*---------- PLACE ORDER BUTTON --------------- */}
            <button
              type="button"
              className={`buttonPrimary ${styles.placeOrderButton}`}
              onClick={() => {
                setIsPlaced(true);
                setIsProcessing(true);
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>

     {isPlaced && (
      <div className={styles.overlay}>
        <section
          className={styles.placeContainer}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className={styles.placePaymentIcons} aria-hidden="true">
            {renderPaymentIcons(paymentMethod)}
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
        </div>
      )} 
    </>
  );
}
