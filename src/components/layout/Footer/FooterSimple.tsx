"use client";

import styles from "./FooterSimple.module.css";
import Image from "next/image";

export default function FooterSimple() {
  return (
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
  );
}
