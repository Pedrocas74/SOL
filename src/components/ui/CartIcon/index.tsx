"use client";

import { useEffect, useState } from "react";
import styles from "./CartIcon.module.css";
import { ShoppingCart } from "lucide-react";

export default function CartIcon({ count = 0 }) {
    const [pulse, setPulse] = useState(false);
    const [displayCount, setDisplayCount] = useState(count);

    useEffect(() => {
    if (count > 0) {
      const delayBeforePulse = 400; // navbar reveal delay
      const delayBeforeNumberChange = 120; // number appears slightly after pulse starts
      const pulseDuration = 300;
      let pulseTimeout;
      let numberTimeout;

      const delayTimeout = setTimeout(() => {
        setPulse(true);
        numberTimeout = setTimeout(() => {
          setDisplayCount(count);
        }, delayBeforeNumberChange);
        pulseTimeout = setTimeout(() => setPulse(false), pulseDuration);
      }, delayBeforePulse);

      return () => {
        clearTimeout(delayTimeout);
        clearTimeout(numberTimeout);
        clearTimeout(pulseTimeout);
      };
    }
  }, [count]);

  //initial load matches instantly
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