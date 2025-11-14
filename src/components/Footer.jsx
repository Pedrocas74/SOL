"use client";

import styles from "./styles/Footer.module.css";
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

export default function Footer() {
  return (
    <section className={styles.bigContainer}>
      <div className={styles.promotionContainer}>
        <h5>10% DISCOUNT</h5>
        <h6>
          Apply the code <span>PEDRO74</span> at the checkout
        </h6>
      </div>
      {/* <hr /> */}

      <div className={styles.policiesContainer}>
        <div className={styles.leftContainer}>
          <p>
            &copy; 2025 SOL, Inc. <br />
            All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/shipping-info">Shipping Info</Link>
            <Link href="/terms-of-use">Terms of Use</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/returns-and-refunds">Returns & Refunds</Link>
          </div>
          <a
            href="https://fakestoreapi.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by FakeStore API
          </a>
        </div>
        <div className={styles.rightContainer}>
          <a href="/" className="buttonPrimary">
            Contact
          </a>
          <div className={styles.creditContainer}>
            <p>Methods of Payment:</p>
            <FaCcVisa size={25} color="#333333" />
            <FaCcMastercard size={25} color="#333333" />
            <FaCcAmex size={25} color="#333333" />
            <FaCcPaypal size={25} color="#333333" />
            <FaCcAmazonPay size={25} color="#333333" />
            <FaCcApplePay size={25} color="#333333" />
            <FaCcStripe size={25} color="#333333" />
            <FaGooglePay size={25} color="#333333" fill="#333333" />
          </div>
        </div>
      </div>

      <footer className={styles.footer} id="footer">
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
            >
              <Image
                src="/images/icons/socials/github-mark-white.png"
                fill
                priority
                alt="Github link"
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
                priority
                alt="Linkedin link"
              />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
