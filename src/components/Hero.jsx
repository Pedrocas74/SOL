"use client";

import styles from "./styles/Hero.module.css";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { SquareArrowDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const { scrollY } = useScroll();
  const [isMoving, setIsMoving] = useState(false);
  const [isHeroGone, setIsHeroGone] = useState(false);

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
    [175, 350, 475, 500],
    [200, 225, 500, 525],
    [225, 250, 525, 575],
    [250, 275, 575, 625],
    [275, 300, 625, 675],
  ];

  const opacities = offsets.map(([a, b, c, d]) =>
    useTransform(scrollY, [a, b, c, d], ["0%", "100%", "100%", "0%"])
  );

  const planeX = useTransform(scrollY, [125, 300], ["-100%", "100%"]);
  
  const sunZoom = useTransform(scrollY, [125, 600], [1, 1.4]);
  // const sunOpacity = useTransform(scrollY, [650, 700], [1, 0]);

  // NEW: opacity for the whole overlay
  // 0–600: fully visible, 600–800: fades out
  const heroOpacity = useTransform(scrollY, [0, 600, 800], [1, 1, 0]);

  return (
    <motion.div className={styles.heroPage}
      style={{
        opacity: heroOpacity,
        pointerEvents: isHeroGone ? "none" : "auto",
      }}
    >
      <motion.div
        className={styles.topCity}
        style={{
          y: topCityY,
          scaleY: -1,
          scaleX: -1,
        }}
      >
        <Image
          src="/images/city.webp"
          alt="Top city skyline"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      <div className={styles.heroContainer}>
        <div className={`${styles.arrowLeft} ${styles.heartbeat}`}>
          <SquareArrowDown
            size={30}
            style={{
              opacity: isMoving ? 0 : 0.2
            }}
          />
        </div>
        <div className={`${styles.arrowRight} ${styles.heartbeat}`}>
          <SquareArrowDown
            size={30}
            style={{
              opacity: isMoving ? 0 : 0.2
            }}
          />
        </div>
        <div className={styles.heroWrapper}>
          <div className={styles.topTitleContainer}>
            <motion.div className={styles.plane} style={{ x: planeX, willChange: "transform" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#000000"
                stroke="#000000"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
              </svg>
            </motion.div>
          </div>

          <section className={styles.mainTitleContainer}>
            <motion.h1
              className={styles.title}
              style={{
                opacity: titleOpacity,
              }}
            >
              <span>S</span>
              <span>o</span>
              <span>L</span>
            </motion.h1>

            <motion.div
              className={styles.sun}
              style={{ scale: sunZoom }}
            ></motion.div>
          </section>

          <div className={styles.bottomTitleContainer}>
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
      >
        <Image
          src="/images/city.webp"
          alt="Bottom city skyline"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </motion.div>
    </motion.div>
  );
}
