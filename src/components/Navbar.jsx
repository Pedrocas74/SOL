"use client";

import styles from "./styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import CartIcon from "./CartIcon";

const CurrencySelector = dynamic(
  () => import("./CurrencySelector"),
  { ssr: false } // <- client-side only
);

export default function Navbar() {
  const { items } = useSelector((state) => state.cart);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // requestAnimationFrame for smoother updates
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // hide when scrolling down past 50px, show when scrolling up
          if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            setVisible(false);
          } else {
            setVisible(true);
          }
          lastScrollY.current = currentScrollY;
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
