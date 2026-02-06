"use client";

import styles from "./Hero.module.css";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { SquareArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const { scrollY } = useScroll();
  const [isMoving, setIsMoving] = useState(false);
  const [isHeroGone, setIsHeroGone] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isCoarsePointer =
      window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

    const hasTouchSupport =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    setIsTouch(isCoarsePointer || hasTouchSupport);
  }, []);

  const actionVerb = isTouch ? "SWIPE" : "SCROLL";
  const actionDir = isTouch ? "UP" : "DOWN";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsMoving((prev) => (prev === latest > 0 ? prev : latest > 0));

    if (latest > 850 && !isHeroGone) {
      setIsHeroGone(true);
    } else if (latest <= 850 && isHeroGone) {
      setIsHeroGone(false);
    }
  });

  const topCityY = useTransform(scrollY, [0, 425], ["0%", "-50%"]);
  const bottomCityY = useTransform(scrollY, [0, 425], ["0%", "50%"]);
  const titleOpacity = useTransform(scrollY, [100, 200], [0, 1]);

  const letters = ["W", "E", "L", "C", "O", "M", "E"];
  const offsets = [
    [125, 150, 425, 450],
    [150, 175, 450, 475],
    [175, 200, 475, 500],
    [200, 225, 500, 525],
    [225, 250, 525, 575],
    [250, 275, 575, 625],
    [275, 300, 625, 675],
  ];

  const opacities = offsets.map(([a, b, c, d]) =>
    useTransform(scrollY, [a, b, c, d], ["0%", "100%", "100%", "0%"])
  );

  const planeX = useTransform(scrollY, [125, 500], ["-100%", "110%"]);

  const sunZoom = useTransform(scrollY, [125, 600], [1, 1.4]);
  const heroOpacity = useTransform(scrollY, [0, 600, 800], [1, 1, 0]);

  return (
    <motion.div
      className={styles.heroPage}
      role="region"
      aria-labelledby="hero-heading"
      aria-hidden={isHeroGone}
      style={{
        opacity: heroOpacity,
        pointerEvents: isHeroGone ? "none" : "auto",
      }}
    >
      <motion.div
        className={`${styles.motto} ${styles.mottoTop}`}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        translate="no"
      >
        <span>Sunlight</span> brought a store
      </motion.div>
      <motion.div
        className={`${styles.motto} ${styles.mottoBottom}`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
        translate="no"
      >
        For Those Who <span>Shine</span>
      </motion.div>

      <motion.div
        
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeIn" }}
        translate="no"
      >
        <Link
          href="/cart"
          className={`${styles.heroLinks} ${styles.toCartLink}`}
          aria-label="Go to cart page"
          tabIndex={isHeroGone ? -1 : 0}
        >
          [ to Cart ]
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeIn" }}
        translate="no"
      >
        <Link
          href="/#products-list"
          className={`${styles.heroLinks} ${styles.toProductsLink}`}
          aria-label="Skip to products list"
          tabIndex={isHeroGone ? -1 : 0}
        >
          [ to Products ]
        </Link>
      </motion.div>

      <motion.div
        className={styles.topCity}
        style={{
          y: topCityY,
          scaleY: -1,
          scaleX: -1,
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/city.webp"
          alt="Top city skyline"
          fill
          priority
          sizes="(max-width: 425px) 100vw,
         (max-width: 768px) 90vw,
         (max-width: 1440px) 100vw,
         100vw"
        />
      </motion.div>

      <div className={styles.heroContainer}>
        <div
          translate="no"
          className={`${styles.arrowLeft} ${styles.heartbeat}`}
          aria-hidden="true"
        >
          <span
            style={{
              opacity: isMoving ? 0 : 0.3,
            }}
          >
            {actionVerb}
          </span>
          <SquareArrowDown
            size={45}
            style={{
              opacity: isMoving ? 0 : 0.3,
            }}
          />
          <span
            style={{
              opacity: isMoving ? 0 : 0.3,
            }}
          >
            {actionDir}
          </span>
        </div>
        <div
          translate="no"
          className={`${styles.arrowRight} ${styles.heartbeat}`}
          aria-hidden="true"
        >
          <span
            style={{
              opacity: isMoving ? 0 : 0.3,
            }}
          >
            {actionVerb}
          </span>
          <SquareArrowDown
            size={45}
            style={{
              opacity: isMoving ? 0 : 0.3,
            }}
          />
          <span
            style={{
              opacity: isMoving ? 0 : 0.3,
            }}
          >
            {actionDir}
          </span>
        </div>
        <div className={styles.heroWrapper}>
          <div className={styles.topTitleContainer}>
            <motion.div
              className={styles.plane}
              style={{ x: planeX, willChange: "transform" }}
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="#000000"
                stroke="#000000"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
              </svg>
            </motion.div>
          </div>

          <section className={styles.mainTitleContainer}>
            <motion.h1
              id="hero-heading"
              className={`${styles.title} heroTitle`}
              style={{
                opacity: titleOpacity,
              }}
              translate="no"
              aria-labelledby=""
            >
              <span aria-hidden="true">S</span>
              <span aria-hidden="true">{" "}</span>
              <span aria-hidden="true">L</span>
            </motion.h1>

            <motion.div
              className={styles.sun}
              style={{ scale: sunZoom }}
              initial={{ borderWidth: 40 }}
              animate={{ borderWidth: 5 }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
            ></motion.div>
          </section>

          <div className={styles.bottomTitleContainer} aria-hidden="true">
            <p>
              {letters.map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  style={{ opacity: opacities[i] }}
                >
                  {char}
                </motion.span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        className={styles.bottomCity}
        style={{
          y: bottomCityY,
        }}
        aria-hidden="true"
      >
        <Image
          src="/images/city.webp"
          alt="Bottom city skyline"
          fill
          priority
          sizes="(max-width: 425px) 100vw,
         (max-width: 768px) 90vw,
         (max-width: 1440px) 100vw,
         100vw"
        />
      </motion.div>
    </motion.div>
  );
}
