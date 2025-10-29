"use client";

import styles from "./styles/Footer.module.css";

export default function Footer() {
  return (
    <section className={styles.bigContainer}>

      <div className={styles.promotionContainer}>
        <h5>10% DISCOUNT</h5>
        <h6>
          Apply the code <span>PEDRO74</span> at the checkout
        </h6>
      </div>
      <hr />


      <div className={styles.policiesContainer}>
        <div className={styles.policiesLinks}>
          <p>&copy; 2025 NAME, Inc. All rights reserved.</p>
          <a href="/">Shipping Info</a>
          <a href="/">Terms of Use</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Returns and Refunds</a>
        </div>
        <div className={styles.rightContainer}>
            <button type="button">Contact</button>
            <div className={styles.creditContainer}>
                <p>CARDS</p>
            </div>
        </div>
      </div>


      <footer className={styles.footer}>
        <a
          href="https://fakestoreapi.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Powered by</span> FakeStore API
        </a>
        <a
          href="https://www.pedromagalhaes.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Pedro
        </a>
        <div className={styles.socials}>
          <span>github</span>
          <span>linkedin</span>
        </div>
      </footer>

    </section>
  );
}
