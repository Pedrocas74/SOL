"use client";

import styles from "./Reviews.module.css";
import { AnimatePresence, motion, wrap, useReducedMotion } from "framer-motion";
import { forwardRef, useEffect, useState } from "react";
import { UserCircle2, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      pic: UserCircle2,
      text: "Changed the way I shop - five stars.",
      author: "Ana O.",
      date: "07/04/2025",
    },
    {
      pic: UserCircle2,
      text: "My go-to gift for friends. Always a hit! <3",
      author: "Beatriz F.",
      date: "26/06/2025",
    },
    {
      pic: UserCircle2,
      text: "High quality and honestly worth every cent.",
      author: "Jeremy L.",
      date: "07/07/2025",
    },
    {
      pic: UserCircle2,
      text: "Customer service was incredible - resolved my issue same day.",
      author: "Peter M.",
      date: "18/08/2025",
    },
    {
      pic: UserCircle2,
      text: "Bought a jacket to my husband... He never takes it off now! :)",
      author: "Veronika S.",
      date: "01/10/2025",
    },
  ];
  const [[page, direction], setPage] = useState([0, 1]);
  const reviewIndex = wrap(0, reviews.length, page);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function paginate(newDirection) {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection]);
  }

  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const timer = setTimeout(() => paginate(1), 5000);
    return () => clearTimeout(timer);
  }, [page, isPaused, shouldReduceMotion]);

  return (
    <section className={styles.reviewSection} aria-labelledby="reviews-heading">
      <h2 id="reviews-heading">Reviews</h2>

      <div
        className={styles.sliderContainer}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer reviews"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <button
          type="button"
          aria-label="Previous review"
          className={styles.navButton}
          onClick={() => paginate(-1)}
        >
          <ChevronLeft size={20} aria-hidden="true" focusable="false" />
        </button>

        <AnimatePresence initial={false} custom={direction}>
          <Slide
            key={page}
            review={reviews[reviewIndex]}
            direction={direction}
            index={reviewIndex}
            total={reviews.length}
          />
        </AnimatePresence>

        <button
          type="button"
          aria-label="Next review"
          className={styles.navButton}
          onClick={() => paginate(1)}
        >
          <ChevronRight size={20} aria-hidden="true" focusable="false" />
        </button>
      </div>
    </section>
  );
}


const Slide = forwardRef(function Slide(
  { review, direction, index, total },
  ref
) {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.article
      ref={ref}
      id="review-slide"
      className={styles.cardContainer}
      role="group"
      aria-roledescription="slide"
      aria-label={`${review.author}'s review`}
      aria-live="polite"
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction * 100 }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1, x: 0 }
          : {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                visualDuration: 0.6,
                bounce: 0.5,
              },
            }
      }
      exit={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: direction * -100 }
      }
    >
      <div className={styles.mainReview}>
        <div className={styles.user}>
          <review.pic
            color="#0a0a0a"
            className={styles.userIcon}
            aria-hidden="true"
            focusable="false"
          />

          <div className={styles.authorAndStars}>
            <p>{review.author}</p>
            <div
              className={styles.starRow}
              role="img"
              aria-label="5 out of 5 stars"
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  color="var(--clr-text)"
                  fill="var(--clr-text)"
                  aria-hidden="true"
                  focusable="false"
                />
              ))}
            </div>
          </div>
        </div>
        <p className={styles.reviewText}>{review.text}</p>
      </div>
      <p className={styles.reviewDate}>{review.date}</p>
    </motion.article>
  );
});
