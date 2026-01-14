"use client";

import styles from "./MockupPage.module.css";
import Link from "next/link";
import { CornerDownLeft, Smile } from "lucide-react";
import FooterSimple from "../Footer/FooterSimple";

export default function MockupPage({ title, description }) {
  return (
    <>
      <section className={styles.mainSection} aria-labelledby="mockup-heading">
        <h1 id="mockup-heading">{title}</h1>
        <p className={styles.description}>
          {description ||
            "This page is part of a demo eCommerce project built with Next.js."}
        </p>

        <p className={styles.disclaimer} role="note">
          No real transactions or personal data are collected — this website is
          for portfolio and educational purposes only.
        </p>

        <Link
          href="/#footer-section"
          scroll
          className="buttonSecondary"
          aria-label="Back to the footer section on the homepage"
        >
          <CornerDownLeft size={13} color="black" /> Back
        </Link>
        <div className={styles.smile} aria-hidden="true">
          <Smile
            size={150}
            color="black"
            strokeWidth={1.5}
            fill="var(--clr-secondary)"
            aria-hidden="true"
          />
        </div>
      </section>
      <FooterSimple />
    </>
  );
}
