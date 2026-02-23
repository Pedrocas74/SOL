"use client";

import styles from "./Checkout.module.css";
//hooks
import { useState, useEffect } from "react";
import { useAppSelector } from "@app/hooks/typedReduxHooks";
import { useRouter } from "next/navigation";
import { useCurrency } from "@app/hooks/useCurrency";
//custom components
import FooterSimple from "@components/layout/Footer/FooterSimple";
import Breadcrumbs from "@components/ui/Breadcrumbs";
import LoadingSVG from "@components/ui/LoadingSVG";
import PaymentSection from "@components/ui/PaymentSection";
//dependecies
import { toast } from "sonner";
//auth 
import { useAuth } from "@clerk/nextjs";


export default function Checkout() {
  const { isLoaded, isSignedIn } = useAuth();  //clerk auth properties
  const { items } = useAppSelector((state) => state.cart); //array of items objects
  const { current } = useAppSelector((state) => state.currency);
  const [showCode, setShowCode] = useState(false); //promo code input display set | hidden -> visible
  const [code, setCode] = useState(""); //promo code input
  const [isApplied, setIsApplied] = useState(false); //promo code validation
  const totalPrice: number = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ); //total price at the end of the checkout
  const [discountedTotal, setDiscountedTotal] = useState(totalPrice); //total price BEFORE|AFTER discount

  const router = useRouter();
  const { format } = useCurrency(); 

  // clerk auth logic
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { //if it's not signed in when the user enters checkout, it's redirected to signed in component
      router.replace("/sign-in?redirect_url=/checkout");
    }
  }, [isLoaded, isSignedIn, router]);

  // -----------------------------------------------------------------------------
  
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
                  Subtotal ({current})
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
                    {format(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Subtotal ({ current })</th>
                <td>{format(totalPrice)}</td>
              </tr>
            </tfoot>
          </table>

          <hr />
        
          <button
            type="button"
            className={`${styles.toggleCode} buttonTertiary`}
            onClick={() => setShowCode(!showCode)}
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
            {format(totalPrice)}
          </p>
          {/* total price */}
          <p className={styles.totalPrice}>
            Total:{" "}
            {format(discountedTotal)}
          </p>
       </div>
          <PaymentSection />
     

        
        
      </section>
            <FooterSimple />
      
    </div>
  );
}
