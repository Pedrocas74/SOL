"use client";

import styles from "./styles/RelatedProductsSlider.module.css";
import { useSelector } from "react-redux";

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
      <h3>You may also like</h3>
      <div className={styles.sliderContainer}>
        {relatedProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.title} />
            <p>{product.title}</p>
            <p>{symbolPosition === "left" ? (
            <>
              {symbol}
              {convert(product.price)}
            </>
          ) : (
            <>
              {convert(product.price)}
              {symbol}
            </>
          )}</p>
            </div>
        ))}
      </div>
    </section>
  );
}
