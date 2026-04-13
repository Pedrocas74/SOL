"use client";

import styles from "./Checkout.module.css";
//hooks
import { useEffect } from "react";
import { useAppSelector } from "@app/hooks/typedReduxHooks";
import { useRouter } from "next/navigation";
import { useCurrency } from "@app/hooks/useCurrency";
//custom components
import FooterSimple from "@components/layout/Footer/FooterSimple";
import Breadcrumbs from "@components/ui/Breadcrumbs";
import LoadingSVG from "@components/ui/LoadingSVG";
import PaymentSection from "@app/checkout/PaymentSection/PaymentSection";
//auth 
import { useAuth } from "@clerk/nextjs";


export default function Checkout() {
  const { isLoaded, isSignedIn } = useAuth();  //clerk auth properties
  const { items } = useAppSelector((state) => state.cart); //array of items objects
  const { current } = useAppSelector((state) => state.currency);

  const totalPrice: number = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ); //total price at the end of the checkout


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

        <div className={styles.Section}>
          <table className={styles.table}>
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
        </div>
          <hr />
        {/* ----------------------------------------------------------------------- */}
             
          <PaymentSection totalPrice={totalPrice} />
        
      </section>
            <FooterSimple />
      
    </div>
  );
}
