"use client";

import styles from "./CartIcon.module.css";
//hooks
import { useEffect, useState } from "react";
//icons
import { ShoppingCart } from "lucide-react";

export default function CartIcon({ count = 0 }) {
    const [pulse, setPulse] = useState<boolean>(false); //true when an item is added to the cart
    const [displayCount, setDisplayCount] = useState<number>(count); //total number of items in the cart

    useEffect(() => {
    if (count <= 0) return;
    //constants for pulse animation 
    const delayBeforePulse = 400;
    const delayBeforeNumberChange = 120;
    const pulseDuration = 300;

    const delayTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setPulse(true);

      const numberTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {
        setDisplayCount(count);
      }, delayBeforeNumberChange);

      const pulseTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {
        setPulse(false);
      }, pulseDuration);

      return () => {
        clearTimeout(numberTimeout);
        clearTimeout(pulseTimeout);
      };
    }, delayBeforePulse);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, [count]);

  //initial load
  useEffect(() => {
    if (count === 0) setDisplayCount(0);
  }, [count]);

    return (
        <div
            className={styles.wrapper}
            aria-live="polite"
            aria-atomic="true"
            title={`Cart (${displayCount})`}
        >
            <ShoppingCart className={styles.icon}/>
            {displayCount  > 0 && <span className={`${styles.badge} ${pulse ? styles.pulse : ""}`}>{displayCount}</span>}
        </div>
    );
}