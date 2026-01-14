"use client";

import styles from "./RelatedProductsSlider.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

export default function RelatedProductsSlider({ category, id }) {
  const products = useSelector((state) => state.products.products);
  const { current, rates } = useSelector((state) => state.currency);
  const relatedProducts = products.filter(
    (product) => product.category === category && product.id !== id
  );

  const convert = (price) => (price * rates[current]).toFixed(2);
  let symbolPosition = "right"; //euro as default
  const getSymbol = () => {
    switch (current) {
      case "USD":
        symbolPosition = "left";
        return "$";
      case "GBP":
        symbolPosition = "left";
        return "£";
      default:
        symbolPosition = "right";
        return "€";
    }
  };
  const symbol = getSymbol();

  return (
    <section className={styles.relatedProductsSection}>
      <h2 className="youMayAlsoLike">You may also like</h2>
      <div className={styles.sliderContainer}>
        {relatedProducts.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <Link href={`/product/${product.id}`}>
            <Image src={product.image} width={300} height={300} alt={product.title} loading="lazy" />
            <p className={styles.productTitle}>{product.title}</p>
            </Link>
            <p>
              {symbolPosition === "left" ? (
                <>
                  {symbol}
                  {convert(product.price)}
                </>
              ) : (
                <>
                  {convert(product.price)}
                  {symbol}
                </>
              )}
            </p>
          </div>
        ))}
        
      </div>
    </section>
  );
}
