"use client";

import styles from "./styles/InfoSection.module.css";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";

export default function InfoSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section  className={styles.infoContainer}>
      <h2>Why Us?</h2>

      <div className={styles.checksWrapper}>
        
        <div className={styles.infoChecks}>
          <div className={styles.starOrbit}>
          <Star
            className={`${styles.star} ${styles.star1}`}
            size={7}
            color="#ffffffff"
            fill= "#ffffffff"
            opacity={0.7}
          />
          <Star
            className={`${styles.star} ${styles.star2}`}
            size={6}
            color="#ffffffff"
            fill= "#ffffffff"
          />
          <Star
            className={`${styles.star} ${styles.star3}`}
            size={7}
            color="#ffffffff"
            fill= "#ffffffff"
          />
          <Star
            className={`${styles.star} ${styles.star4}`}
            size={10}
            color="#ffffffff"
            fill= "#ffffffff"
            opacity={0.7}
          />
          <Star
            className={`${styles.star} ${styles.star5}`}
            size={7}
            color="#ffffffff"
            fill= "#ffffffff"
          />
          <Star
            className={`${styles.star} ${styles.star6}`}
            size={5}
            color="#ffffffff"
            fill= "#ffffffff"
            opacity={0.7}
          />
          <Star
            className={`${styles.star} ${styles.star7}`}
            size={10}
            color="#ffffffff"
            fill= "#ffffffff"
          />
        </div>
          <span className={styles.bestSpan}>BEST</span>
          <span className={`${styles.check} ${styles.check1}`}>quality</span>
          <span className={`${styles.check} ${styles.check2}`}>prices</span>
          <span className={`${styles.check} ${styles.check3}`}>service</span>
        </div>
        
      </div>

      <ul ref={ref} className={styles.infoStats}>
        <li className={styles.statsItems}>
          {/* +3M products sold this year alone  */}
          <span className={styles.numbers}>+{inView && <CountUp end={3} duration={3} />}M&nbsp;</span>
          <p>Products sold this year alone</p>
        </li>

        <li className={styles.statsItems}>
          {/* +1M five star reviews */}
          <span className={styles.numbers}>+{inView && <CountUp end={1} duration={3} />}M&nbsp;</span>
          <p>5 star reviews and counting</p>
        </li>

        <li className={styles.statsItems}>
          {/* Join 10M happy customers*/}
          <span className={styles.numbers}>+{inView && <CountUp end={8} duration={4} />}M&nbsp;</span>
          <p>Happy customers</p>
        </li>

        <li className={styles.statsItems}>
          {/* 74 countries */}
          <span className={styles.numbers}>{inView && <CountUp end={74} duration={4} />}&nbsp;</span>
          <p>Countries</p>
        </li>

        <li className={styles.statsItems}>
          {/* 27 Years */}
          <span className={styles.numbers}>{inView && <CountUp end={27} duration={6} />}&nbsp;</span>
          <p>Years</p>
        </li>
      </ul>

      <div className={styles.finalStatement}>
        <p>We know what you need.</p>
      </div>
    </section>
  );
}
