"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";


const ProductsList = dynamic(
  () => import("@features/products/ProductsList"),
  {
    ssr: false, 
    loading: () => (
      <section
        style={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ opacity: 0.6 }}>Getting products ready…</p>
      </section>
    ),
  }
);

export default function LazyProductsSection() {
  const [shouldRender, setShouldRender] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

   
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect(); // Only load once
        }
      },
      {
        root: null,
        threshold: 0.2,          // 20% visible
        rootMargin: "200px 0px", // start a bit earlier
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef}>
      {shouldRender ? (
        <ProductsList />
      ) : (
        // Lightweight placeholder so mobile doesn’t choke
        <section
          style={{
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ fontWeight: 100, letterSpacing: "0.08em", opacity: 0.5 }}>
            Scroll down to discover the collection…
          </p>
        </section>
      )}
    </div>
  );
}
