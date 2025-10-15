import ProductsList from '@features/products/ProductsList';
import Hero from '@components/Hero';
import InfoSection from '@components/InfoSection';
import Navbar from '@components/Navbar';

export default function Home() {
  return (
    <main>
      <Hero />
      <Navbar />
      <InfoSection />
      <h1>Our Products</h1>
      <ProductsList />
    </main>
  );
}