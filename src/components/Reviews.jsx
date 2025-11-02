"use client";

import styles from "./styles/Reviews.module.css";
import { AnimatePresence, motion, wrap } from "framer-motion";
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

  function paginate(newDirection) {
    setPage([page + newDirection, newDirection]);
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => paginate(1), 5000);
  //   return () => clearTimeout(timer);
  // }, [page]);

  return (
    <section className={styles.reviewSection}>
      <h2>Reviews</h2>

      <div className={styles.sliderContainer}>
        <button
          aria-label="Previous"
          className={styles.navButton}
          onClick={() => paginate(-1)}
        >
          <ChevronLeft size={20} />
        </button>

        <AnimatePresence initial={false} custom={direction}>
          <Slide
            key={page}
            review={reviews[reviewIndex]}
            direction={direction}
          />
        </AnimatePresence>

        <button
          aria-label="Next"
          className={styles.navButton}
          onClick={() => paginate(1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}

const Slide = forwardRef(function Slide({ review, direction }, ref) {
  return (
    <motion.div
      ref={ref}
      className={styles.cardContainer}
      initial={{ opacity: 0, x: direction * 100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          visualDuration: 0.6,
          bounce: 0.5,
        },
      }}
      exit={{ opacity: 0, x: direction * -100 }}
    >
      <div className={styles.mainReview}>
        <div className={styles.user}>
        <review.pic color="#1a1a1a" className={styles.userIcon} />

        <div className={styles.authorAndStars}>
          <h5>{review.author}</h5>
          <div className={styles.starRow}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} color="#1a1a1a" fill="#1a1a1a" />
            ))}
          </div>
        </div>
        </div>
        <p className={styles.reviewText}>{review.text}</p>
      </div>
      <p className={styles.reviewDate}>{review.date}</p>
    </motion.div>
  );
});
