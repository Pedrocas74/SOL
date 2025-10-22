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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div>
        {/* <Link href="/">Home</Link> */}

        {mounted ? (
          <Link href="/cart">Cart ({totalQuantity})</Link>
        ) : (
          <Link href="/cart">Cart (0)</Link>
        )}
      </div>

      <CurrencySelector />
    </nav>
  );
}
