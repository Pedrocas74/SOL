"use client";

import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import CartIcon from "@components/ui/CartIcon";
import { usePathname } from "next/navigation";

import {
  UserButton,
  SignedIn,
  SignInButton,
  SignedOut,
  SignUpButton
} from '@clerk/nextjs'

const CurrencySelector = dynamic(
  () => import("../../ui/CurrencySelector"),
  {
    ssr: false,
  }
);

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
      aria-label="Main navigation"
      className={`${styles.navbar} ${visible ? styles.visible : styles.hidden}`}
    >
      <div className={styles.navWrapper}>
        <div className={styles.logoWrapper}>
          <Link href="/" aria-label="Go to homepage">
            <div className={styles.logo} aria-hidden="true">
              <span>S</span>
              <span>-</span>
              <span>L</span>
            </div>
          </Link>
          <div className={styles.sun} aria-hidden="true"></div>
        </div>

        <div className={styles.right}>
          <Link href="/cart" aria-label="Open cart">
            <CartIcon count={mounted ? totalQuantity : 0} />
          </Link>
          <CurrencySelector />

            {/* clerk user button  */}
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          
          
        </div>
      </div>
    </nav>
  );
}
