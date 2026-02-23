"use client";

import styles from "./RelatedProductsSlider.module.css";
//hooks
import { useAppSelector } from "@app/hooks/typedReduxHooks";
import { useCurrency } from "@app/hooks/useCurrency";
//built in
import Link from "next/link";
import Image from "next/image";

export default function RelatedProductsSlider({ category, id }) {
  const products = useAppSelector((state) => state.products.products);
  const relatedProducts = products.filter(
    (product) => product.category === category && product.id !== id
  ); //array of products from the same category as current product[id]

  const { format } = useCurrency();

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
              {format(product.price)}
            </p>
          </div>
        ))}
        
      </div>
    </section>
  );
}
