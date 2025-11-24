"use client";

import { Suspense } from 'react';

import Hero from '@components/Hero';
import InfoSection from '@components/InfoSection';
import Reviews from '@components/Reviews';
import Footer from '@components/Footer';
import PaymentBanner from '@components/PaymentBanner.';
import LazyProductsSection from '@components/LazyProductsSection';

export default function Home() {


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