"use client";

import styles from "./styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CurrencySelector = dynamic(
  () => import("./CurrencySelector"),
  { ssr: false } // <- client-side only
);

export default function Navbar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`${styles.navbar} ${visible ? styles.visible : styles.hidden}`}
    >
      <Link href="/">Home</Link>
      <div className={styles.cartAndCurrency}>
        {mounted ? (
          <Link href="/cart">Cart ({totalQuantity})</Link>
        ) : (
          <Link href="/cart">Cart (0)</Link>
        )}
        <CurrencySelector />
      </div>
    </nav>
  );
}
