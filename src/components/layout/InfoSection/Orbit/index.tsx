import styles from "./Orbit.module.css";
//icons
import { Star } from "lucide-react";

export default function Orbit() {
  return (
    <div className={styles.checksWrapper}>
      <div className={styles.infoChecks}>
        <div className={styles.starOrbit} aria-hidden="true">
          <Star
            className={`${styles.star} ${styles.star1}`}
            size={7}
            color={"var(--clr-bg)"}
            fill={"var(--clr-bg)"}
            opacity={0.7}
            aria-hidden="true"
            focusable="false"
          />
          <Star
            className={`${styles.star} ${styles.star2}`}
            size={6}
            color={"var(--clr-bg)"}
            fill={"var(--clr-bg)"}
            aria-hidden="true"
            focusable="false"
          />
          <Star
            className={`${styles.star} ${styles.star3}`}
            size={7}
            color={"var(--clr-bg)"}
            fill={"var(--clr-bg)"}
            aria-hidden="true"
            focusable="false"
          />
          <Star
            className={`${styles.star} ${styles.star4}`}
            size={10}
            color={"var(--clr-bg)"}
            fill={"var(--clr-bg)"}
            opacity={0.7}
            aria-hidden="true"
            focusable="false"
          />
          <Star
            className={`${styles.star} ${styles.star5}`}
            size={7}
            color={"var(--clr-bg)"}
            fill={"var(--clr-bg)"}
            aria-hidden="true"
            focusable="false"
          />
          <Star
            className={`${styles.star} ${styles.star6}`}
            size={5}
            color={"var(--clr-bg)"}
            fill={"var(--clr-bg)"}
            opacity={0.7}
            aria-hidden="true"
            focusable="false"
          />
          <Star
            className={`${styles.star} ${styles.star7}`}
            size={10}
            color={"var(--clr-bg)"}
            fill={"var(--clr-bg)"}
            aria-hidden="true"
            focusable="false"
          />
        </div>
        <span className={styles.bestSpan}>BEST</span>
        <span className={`${styles.check} ${styles.check1}`}>quality</span>
        <span className={`${styles.check} ${styles.check2}`}>prices</span>
        <span className={`${styles.check} ${styles.check3}`}>service</span>
      </div>
    </div>
  );
}
