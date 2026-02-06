"use client";

import styles from "./ProductsList.module.css";
import cardStyles from "../../components/products/ProductCard/ProductCard.module.css";
import { Skeleton } from "@mui/material";

export default function ProductsListSkeleton() {
  return (
    <section
      className={styles.productsContainer}
      aria-labelledby="products-heading"
    >
      <Skeleton
        variant="text"
        width="200px"
        height="40px"
        sx={{ margin: "0 auto" }}
      />
      <Skeleton
        variant="text"
        width="150px"
        height="20px"
        sx={{ margin: "var(--space-xl) auto 0" }}
      />

      <div className={styles.productsSelector}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.imageBox}>
            <Skeleton variant="rectangular" width="100%" height="100%" />
            <div className={styles.overlay}>
              <Skeleton variant="text" width="100px" height="30px" />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <article key={i} className={cardStyles.productCard}>
            <div
              style={{
                height: "55%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height="40%"
                sx={{ marginBottom: "var(--space-xs)" }}
              />
              <Skeleton variant="text" width="80%" height="20px" />
            </div>
            <Skeleton
              variant="text"
              width="60px"
              height="20px"
              sx={{ marginBottom: "var(--space-md)" }}
            />
            <Skeleton
              variant="text"
              width="80px"
              height="15px"
              sx={{ marginBottom: "var(--space-xs)" }}
            />
            <Skeleton
              variant="rectangular"
              width="100px"
              height="35px"
              sx={{ borderRadius: "var(--radius-small)" }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
