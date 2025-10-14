import ProductsList from '@features/products/ProductsList';
import Hero from '@components/Hero';

export default function Home() {
  return (
    <div>
      <Hero />
      <h1>Our Products</h1>
      <ProductsList />
    </div>
  );
}