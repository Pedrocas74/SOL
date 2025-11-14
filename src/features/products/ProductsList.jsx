"use client";

import styles from "./ProductsList.module.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "./productsSlice";
import ProductCard from "../../components/ProductCard";
import Image from "next/image";

export default function ProductsList() {
  const [selectedCategory, setSelectedCategory] = useState(null); //null = show all products
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const categoryMap = {
    Clothing: ["men's clothing", "women's clothing"],
    Jewelry: ["jewelery"],
    Electronics: ["electronics"],
  };

  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.productsContainer} id="products-list">
      <h2>Our Products</h2>
      <p>Select a category</p>

      <div className={styles.productsSelector}>
        <div className={styles.imageBox} onClick={() => setSelectedCategory("Clothing")} >
          <Image
            src="/images/clothing.jpg"
            alt="Clothing"
            fill
            // priority
            style={{ objectFit: "cover" }}
          />
          <div className={styles.overlay}>Clothing</div>
        </div>

        <div className={styles.imageBox} onClick={() => setSelectedCategory("Jewelry")}>
          <Image
            src="/images/jewelry.jpg"
            alt="Jewelry"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div className={styles.overlay}>Jewelry</div>
        </div>

        <div className={styles.imageBox} onClick={() => setSelectedCategory("Electronics")}>
          <Image
            src="/images/electronics.jpg"
            alt="Electronics"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div className={styles.overlay}>Electronics</div>
        </div>
      </div>
      <button className="buttonTertiary" style={{
        marginBottom: "10vh",
        visibility: selectedCategory === null ? "hidden" : "visible"
      }} type="button" onClick={() => setSelectedCategory(null)}>Show All</button>
      <div className={styles.grid}>
        {products
          .filter(
            (product) =>
              !selectedCategory ||
              categoryMap[selectedCategory].includes(product.category)
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
}
