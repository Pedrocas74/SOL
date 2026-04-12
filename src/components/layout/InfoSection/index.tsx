"use client";

import styles from "./InfoSection.module.css";
//custom components
import Orbit from "./Orbit";

export default function InfoSection() {

  return (
    <section className={styles.infoContainer} aria-labelledby="info-heading">
      <h2 id="info-heading">Why Us?</h2>

      <Orbit />

      <ul className={styles.infoStats}>
        <li
          className={styles.statsItems}
          aria-label="Over 3 million products sold this year alone"
        >
          {/* +3M products sold this year alone  */}
          <span className={styles.numbers}>
            +3M
          </span>
          <p>Products sold this year alone</p>
        </li>

        <li
          className={styles.statsItems}
          aria-label="Over 1 million five-star reviews"
        >
          {/* +1M five star reviews */}
          <span className={styles.numbers}>
            +1M
          </span>
          <p>5 star reviews and counting</p>
        </li>

        <li
          className={styles.statsItems}
          aria-label="Over 8 million happy customers"
        >
          {/* Join 10M happy customers*/}
          <span className={styles.numbers}>
            +8M
          </span>
          <p>Happy customers</p>
        </li>

        <li
          className={styles.statsItems}
          aria-label="Customers in 74 countries"
        >
          {/* 74 countries */}
          <span className={styles.numbers}>
            74
          </span>
          <p>Countries</p>
        </li>

        <li className={styles.statsItems} aria-label="27 years of experience">
          {/* 27 Years */}
          <span className={styles.numbers}>
            27
          </span>
          <p>Years</p>
        </li>
      </ul>

      <div
        id="products-list"
        className={styles.loopContainer}
        aria-hidden="true"
      >
        <div className={styles.loopTrack}>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
          <span className={styles.loopText}>
            <em>WE KNOW </em>•{" "}
            <span>
              <em>WHAT</em>
            </span>{" "}
            • <em>YOU NEED</em>{" "}
          </span>
        </div>
      </div>
    </section>
  );
}
