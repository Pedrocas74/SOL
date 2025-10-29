"use client";

import styles from "./styles/InfoSection.module.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
// import { CircleChevronRight } from "lucide-react";

export default function InfoSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section ref={ref} className={styles.infoContainer}>
      <h2>Why Shop With Us?</h2>
      <p>
        We have been in the market for 27 years, we know what you need.
      </p>

      <ul className={styles.infoStats}>
        <li className={styles.statsItems}>
          {/* +3M products sold this year alone  */}
          
          <span>+{inView && <CountUp end={3} duration={3} />}M&nbsp;</span>
          <p>Products sold this year alone</p>
        </li>

        <li className={styles.statsItems}>
          {/* +1M five star reviews */}
          <span>+{inView && <CountUp end={1} duration={2} />}M&nbsp;</span>
          <p>5 star reviews and counting</p>
        </li>

        <li className={styles.statsItems}>
          {/* Join 10M happy customers*/}
          <span>+{inView && <CountUp end={10} duration={5} />}M&nbsp;</span>
          <p>happy customers</p>
        </li>

        <li className={styles.statsItems}>
          {/* 74 countries */}
          <span>{inView && <CountUp end={74} duration={4} />}&nbsp;</span>
          <p>Countries</p>
        </li>
      </ul>

      <div className={styles.infoChecks}>
        <span>✅ quality</span>
        <span>✅ prices</span>
        <span>✅ delivery</span>
      </div>
    </section>
  );
}
