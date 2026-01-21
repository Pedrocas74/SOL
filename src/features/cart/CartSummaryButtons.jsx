"use client";

import styles from "./Cart.module.css";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function CartSummaryButtons({ unavailableItems }) {
  const { isLoaded, userId } = useAuth();

  const hasUnavailable = unavailableItems.length > 0;

  const checkoutHref = hasUnavailable
    ? "#warning"
    : !isLoaded
      ? "/checkout"
      : userId
        ? "/checkout"
        : "/sign-in?redirect_url=/checkout";

  //disable while Clerk is loading, to avoid a weird “wrong link” click
  const disableCTA = !hasUnavailable && !isLoaded;

  const ctaLabel = hasUnavailable
    ? "Resolve items to continue"
    : !isLoaded
      ? "Proceed to Checkout"
      : userId
        ? "Proceed to Checkout"
        : "Sign in to Checkout";

  return (
    <div className={styles.summaryButtonsContainer}>
      <Link href="/#products-list" className="buttonSecondary">
        Continue Shopping
      </Link>

      {disableCTA ? (
        <button className="buttonPrimary" disabled aria-disabled="true">
          Proceed to Checkout
        </button>
      ) : (
        <Link
          href={checkoutHref}
          scroll={hasUnavailable} // only scroll for #warning
          className="buttonPrimary"
          aria-describedby={hasUnavailable ? "warning" : undefined}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
