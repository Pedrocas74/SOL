"use client";

import styles from '../components/styles/MockupPage.module.css';
import Link from "next/link";
import { CornerDownLeft, Smile } from 'lucide-react';

export default function MockupPage ({ title, description }) {
  return (
    <main className={styles.mainSection}>
      <h1>{title}</h1>
      <p className={styles.description}>
        {description || "This page is part of a demo eCommerce project built with Next.js."}
      </p>
      <div className={styles.smile}>
      <Smile size={30} color='#1a1a1a' fill='#e9c46a'/>
      </div>
      <p className={styles.disclaimer}>
        No real transactions or personal data are collected — this website is for
        portfolio and educational purposes only.
      </p>
      <Link href="/#footer" className='buttonTertiary'>
        <CornerDownLeft size={13} color='#1a1a1a' /> Back
      </Link>
      
    </main>
  );
}
