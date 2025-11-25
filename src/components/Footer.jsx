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
import { usePathname } from "next/navigation";

export default function Footer() {
  const isInHome = usePathname() === '/';

  return (
    <section className={styles.bigContainer}>
      <div className={styles.promotionContainer}
        style={{paddingBottom: isInHome ? "2em" : "0"}}
      >
        <h5>
          10% DISCOUNT
        </h5>
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
          
          <div className={styles.apiLink}>
          Powered by{" "}
          <a
            href="https://fakestoreapi.com/"
            target="_blank"
            rel="noopener noreferrer"
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
            <p>Methods of Payment:</p>
          <div className={styles.cards}>
            <FaCcVisa size={35} color="#474747" />
            <FaCcMastercard size={35} color="#474747" />
            <FaCcAmex size={35} color="#474747" />
            <FaCcPaypal size={35} color="#474747" />
            <FaCcAmazonPay size={35} color="#474747" />
            <FaCcApplePay size={35} color="#474747" />
            <FaCcStripe size={35} color="#474747" />
            <FaGooglePay size={35} color="#474747" fill="#474747" />
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
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
                alt="Linkedin link"
              />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
