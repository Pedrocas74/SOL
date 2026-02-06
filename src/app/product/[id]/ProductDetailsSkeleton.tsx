"use client";

import styles from "./ProductDetails.module.css";
import { Skeleton } from "@mui/material";

export default function ProductDetailsSkeleton() {
  return (
    <div className={styles.pageContainer}>
      <section
        className={styles.detailsContainer}
        aria-labelledby="product-title"
      >
        {/* Breadcrumbs skeleton */}
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <Skeleton variant="text" width="220px" height="20px" />
        </div>

        {/* Title skeleton */}
        <Skeleton
          variant="text"
          width="50%"
          height="60px"
          sx={{ marginBottom: "var(--space-xs)" }}
        />

        {/* Price skeleton */}
        <Skeleton
          variant="text"
          width="80px"
          height="25px"
          sx={{ marginBottom: "var(--space-lg)" }}
        />

        {/* Image skeleton */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginBottom: "var(--space-lg)",
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height="300px"
            sx={{ borderRadius: "var(--radius-small)", margin: "0 auto" }}
          />
        </div>

        {/* Size selector skeleton */}
        <div
          className={styles.sizeSelector}
          style={{ marginBottom: "var(--space-lg)" }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width="70px"
              height="35px"
              sx={{
                borderRadius: "var(--radius-small)",
                marginRight: "0.5rem",
              }}
            />
          ))}
        </div>

        {/* Add to Cart button skeleton */}
        <div className={styles.buttonAddContainer}>
          <Skeleton
            variant="rectangular"
            width="120px"
            height="40px"
            sx={{ borderRadius: "var(--radius-small)" }}
          />
        </div>

        {/* Summaries container */}
        <div className={styles.summariesContainer}>
          {/* Description summary skeleton */}     
            <Skeleton
              variant="text"
              width="100%"
              height="66px"
              sx={{ marginBottom: "var(--space-xxs)" }}
            />

          {/* Delivery summary skeleton */}
            <Skeleton
              variant="text"
              width="100%"
              height="66px"
              sx={{ marginBottom: "var(--space-xxs)" }}
            />

          {/* Care summary skeleton */}
            <Skeleton
              variant="text"
              width="100%"
              height="66px"
              sx={{ marginBottom: "var(--space-xxs)" }}
            />
        </div>
      </section>

      {/* Related products slider skeleton */}
      <div
        style={{ marginTop: "var(--space-xxl)", padding: "var(--space-lg) 0" }}
      >
        <Skeleton
          variant="text"
          width="250px"
          height="45px"
          sx={{ marginBottom: "var(--space-lg)", textAlign: "center" }}
        />
        <div
          style={{
            display: "flex",
            gap: "var(--space-md)",
            overflow: "hidden",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ flexShrink: 0, width: "250px" }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="300px"
                sx={{ borderRadius: "var(--radius-small)" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer skeleton - simplified */}
      <div
        style={{
          marginTop: "var(--space-xxl)",
          padding: "var(--space-xl) 0",
          backgroundColor: "var(--clr-bg-dark)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 var(--space-lg)",
          }}
        >
          <div>
            <Skeleton
              variant="text"
              width="150px"
              height="25px"
              sx={{ marginBottom: "var(--space-md)" }}
            />
            <Skeleton variant="text" width="100px" height="15px" />
            <Skeleton variant="text" width="120px" height="15px" />
          </div>
          <div>
            <Skeleton
              variant="text"
              width="100px"
              height="25px"
              sx={{ marginBottom: "var(--space-md)" }}
            />
            <Skeleton variant="text" width="80px" height="15px" />
            <Skeleton variant="text" width="90px" height="15px" />
          </div>
        </div>
      </div>
    </div>
  );
}
