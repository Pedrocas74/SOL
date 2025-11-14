"use client";

import styles from "./styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import CartIcon from "./CartIcon";
import { usePathname } from "next/navigation";

const CurrencySelector = dynamic(
  () => import("./CurrencySelector"),
  { ssr: false } 
);

export default function Navbar() {
  const { items } = useSelector((state) => state.cart);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const userLocation = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const current = window.scrollY;


      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // hide completely for the first 450px
          if (current < 450 && userLocation === "/") {
            setVisible(false);
          } else {
            // ✔ After 450px, use your original scroll direction behavior
            if (current > lastScrollY.current && current > 50) {
              setVisible(false); // scrolling DOWN
            } else {
              setVisible(true); // scrolling UP
            }
          }

          lastScrollY.current = current;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${visible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.navWrapper}>
        <Link href="/">Home</Link>
        <div className={styles.cartAndCurrency}>
          <Link href="/cart" aria-label="Open cart">
            <CartIcon count={mounted ? totalQuantity : 0} />
          </Link>
          <CurrencySelector />
        </div>
      </div>
    </nav>
  );
}
