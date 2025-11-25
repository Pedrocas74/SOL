"use client";

import styles from "./styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import CartIcon from "./CartIcon";
import { usePathname } from "next/navigation";

const CurrencySelector = dynamic(() => import("./CurrencySelector"), {
  ssr: false,
});

export default function Navbar() {
  const { items, cartEvents } = useSelector((state) => state.cart);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    setMounted(true);
    lastScrollY.current = window.scrollY;

    const HERO_END = 850;

    const handleScroll = () => {
      const current = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const onHome = pathname === "/";

          if (onHome && current < HERO_END) {
            setVisible(false);
          } else {
            if (current > lastScrollY.current && current > 50) {
              //down
              setVisible(false);
            } else {
              //up
              setVisible(true);
            }
          }

          lastScrollY.current = current;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    //run once so the navbar is correct immediately on mount/route change
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (cartEvents <= 0) return;

    const HERO_END = 850;
    const current = window.scrollY;
    const onHome = pathname === "/";

    if (!onHome || current >= HERO_END) {
      setVisible(true);
    }
  }, [cartEvents, pathname]);

  return (
    <nav
      className={`${styles.navbar} ${visible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.navWrapper}>
        <div className={styles.logoWrapper}>
          <Link href="/">
            <div className={styles.logo}>
              <span>S</span>
              <span>-</span>
              <span>L</span>
            </div>
          </Link>
          <div className={styles.sun}></div>
        </div>

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
