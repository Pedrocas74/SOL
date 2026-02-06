"use client";

import styles from "./Footer.module.css";
import Link from "next/link";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcAmazonPay,
  FaCcApplePay,
  FaCcStripe,
  FaGooglePay,
} from "react-icons/fa";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const isInHome = usePathname() === '/';

  return (
    <section className={styles.bigContainer}>
      <div className={styles.promotionContainer}
        style={{paddingBottom: isInHome ? "2em" : "0"}}
      >
        <h4>
          10% DISCOUNT
        </h4>
        <p>
          Apply the code <span>PEDRO74</span> at the checkout
        </p>
      </div>

      <div className={styles.policiesContainer}>
        <div className={styles.leftContainer}>
          <p>
            &copy; 2025 SOL, Inc. <br />
            All rights reserved.
          </p>
          <nav className={styles.legalLinks} aria-label="Legal and store information">
            <Link href="/shipping-info" className="buttonLink">Shipping info</Link>
            <Link href="/terms-of-use" className="buttonLink">Terms of use</Link>
            <Link href="/privacy-policy" className="buttonLink">Privacy policy</Link>
            <Link href="/returns-and-refunds" className="buttonLink">Returns &amp; refunds</Link>
          </nav>
          
          <div className={styles.apiLink}>
          Powered by{" "}
          <a
            href="https://fakestoreapi.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="buttonLink"
          >
          FakeStore API
          </a>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <a href="/contact" className="buttonSecondary">
            Contact
          </a>
          <div className={styles.creditContainer}>
          <div className={styles.cards}>
            <FaCcVisa size={35} color="#0A0A0A" />
            <FaCcMastercard size={35} color="#0A0A0A" />
            <FaCcAmex size={35} color="#0A0A0A" />
            <FaCcPaypal size={35} color="#0A0A0A" />
            <FaCcAmazonPay size={35} color="#0A0A0A" />
            <FaCcApplePay size={35} color="#0A0A0A" />
            <FaCcStripe size={35} color="#0A0A0A" />
            <FaGooglePay size={35} color="#0A0A0A" fill="#0A0A0A" />
            </div>
          </div>
        </div>
      </div>

      <footer id="footer-section" className={styles.footer}>
        <div className={styles.footerWrapper}>
          <a
            href="https://www.pedromagalhaes.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.madeByPedro}
          >
            Made by Pedro
          </a>
          <div className={styles.socials}>
            <a
              href="https://github.com/Pedrocas74"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Social profiles"
            >
              <Image
                src="/images/icons/socials/github-mark-white.png"
                fill         
                alt="Github link"
                aria-label="Pedro's GitHub profile (opens in a new tab)"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/pedro-magalhães-1a3651334"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/icons/socials/InBug-White.png"
                fill       
                alt="Linkedin link"
                aria-label="Pedro's LinkedIn profile (opens in a new tab)"
              />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
