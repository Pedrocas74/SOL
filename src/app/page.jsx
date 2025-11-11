"use client";

import Hero from '@components/Hero';
import InfoSection from '@components/InfoSection';
import ProductsList from '@features/products/ProductsList';
import Reviews from '@components/Reviews';
import Footer from '@components/Footer';
import { useSearchParams } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  return (
    <main>
      {paymentStatus === "success" && (
        <div>Your order is on the way. Thank you for shopping with us!</div>
      )}
      <Hero />  
      <InfoSection />
      <ProductsList />
      <Reviews />
      <Footer />
    </main>
  );
}