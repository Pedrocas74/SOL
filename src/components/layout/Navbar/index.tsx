"use client";

import styles from "./Navbar.module.css";
//hooks
import { useAppSelector } from "@app/hooks/typedReduxHooks";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
//built-in
import Link from "next/link";
import dynamic from "next/dynamic";
//custom components
import CartIcon from "@components/ui/CartIcon";

//client-side rendering (AUTH CLERK COMPONENTS)
const UserButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => ({ default: mod.UserButton })),
  { ssr: false },
);
const SignedIn = dynamic(
  () => import("@clerk/nextjs").then((mod) => ({ default: mod.SignedIn })),
  { ssr: false },
);
const SignInButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => ({ default: mod.SignInButton })),
  { ssr: false },
);
const SignedOut = dynamic(
  () => import("@clerk/nextjs").then((mod) => ({ default: mod.SignedOut })),
  { ssr: false },
);
const SignUpButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => ({ default: mod.SignUpButton })),
  { ssr: false },
);
//client-side rendering (CUSTOM COMPONENTS)
const CurrencySelector = dynamic(() => import("../../ui/CurrencySelector"), {
  ssr: false,
});

export default function Navbar() {
  const { items, cartEvents } = useAppSelector((state) => state.cart); //items in cart + number of cart events to detect additions to the cart (icon signaling)
  const totalQuantity = items.reduce((sum: number, item) => sum + item.quantity, 0); //total number of cart's items
  const [visible, setVisible] = useState(false); //toogle for navbar visibility (animation)
    const [mounted, setMounted] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    setMounted(true);
    lastScrollY.current = window.scrollY;

    const HERO_END = 850; //vertical breakpoint of Hero to InfoSection

    const handleScroll = () => { //control navbar visibility across all routes, according to vertical scroll
      const current = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const onHome = pathname === "/";

          if (onHome && current < HERO_END) { //don't show navbar while displaying Hero component
            setVisible(false);
          } else {
            if (current > lastScrollY.current && current > 50) { //50px up or down to animate the Navbar movement
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

  useEffect(() => { //every time an item is added to the cart (cartEvents++), the navbar is shown
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

          {/* clerk auth */}
          {/* when signed out:  */}
          <SignedOut>
            <SignInButton>
              <button type="button" className="buttonLog" style={{ fontSize: "var(--fs-xs)" }}>
              Log In
              </button>
            </SignInButton>
            <SignUpButton>
              <button type="button" className="buttonPrimary" style={{ border: "2px solid var(--clr-primary-light)", fontSize: "var(--fs-xs)"}} >
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          {/* when signed in: */}
          <SignedIn> 
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
