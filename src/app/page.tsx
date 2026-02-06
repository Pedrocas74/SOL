"use client";

import { Suspense, useEffect } from "react";

import Hero from "@components/layout/Hero";
import InfoSection from "@components/layout/InfoSection";
import Reviews from "@components/layout/Reviews";
import Footer from "@components/layout/Footer/Footer";
import PaymentBanner from "@components/ui/PaymentBanner";
import LazyProductsSection from "@features/products/LazyProductsSection";

export default function Home() {
  useEffect((): (() => void) => {
    const clearHash = () => {
      if (window.location.pathname === "/" && window.location.hash) {
        const cleanUrl = window.location.pathname + window.location.search;
        window.history.replaceState(null, "", cleanUrl);
      }
    };

    //browser scroll, then clean the hash
    if (window.location.hash) {
      setTimeout(clearHash, 0);
    }

    //handle future hash-based navigations like clicking other anchors
    const onHashChange = () => {
      setTimeout(clearHash, 0);
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    //only after full page reload
    const entry = performance.getEntriesByType?.("navigation")?.[0];
    const nav = entry as PerformanceNavigationTiming | undefined;

    const isReload = nav?.type === "reload";

    //scroll automatically to top of the page
    if (isReload && window.location.pathname === "/" && !window.location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  return (
    <main>
      <Suspense>
        <PaymentBanner />
      </Suspense>
      <Hero />
      <div style={{ height: "180vh" }} />
      <InfoSection />
      <LazyProductsSection />
      <Reviews />
      <Footer />
    </main>
  );
}
