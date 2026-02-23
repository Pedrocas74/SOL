"use client";

import styles from "./ProductsList.module.css";
//hooks
import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@app/hooks";
//redux actions
import { fetchProducts } from "./productsSlice";
//custom components
import ProductCard from "../../components/products/ProductCard";
import ProductsListSkeleton from "./ProductsListSkeleton";
//built-in
import Image from "next/image";
//types
import { RootState } from "@app/store";
import { Product } from "./productsSlice";

export default function ProductsList() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(null); //null = show all products
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
  (state: RootState) => state.products
);

  const categoryMap: Record<Exclude<Category, null>, Product["category"][]> = {
  Clothing: ["men's clothing", "women's clothing"],
  Jewelry: ["jewelery"],
  Electronics: ["electronics"],
};

  type Category = "Clothing" | "Jewelry" | "Electronics" | null;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //to change category selected (NULL when none selected)
  const onToggle = (cat: Exclude<Category, null>) => {
    setSelectedCategory((prev) => (prev === cat ? null : cat));
  };

  //fallbackUI
  if (loading) return <ProductsListSkeleton />;
  if (error)
    return (
      <p
        role="alert"
        style={{ textAlign: "center", margin: "var(--space-xxl) auto" }}
      >
        Error: {error}
      </p>
    );

  return (
    <section
      className={styles.productsContainer}
      aria-labelledby="products-heading"
    >
      <h2 id="products-heading">Our Products</h2>
      <p>Select a category</p>
      {/* CATEGORIES SELECTOR  */}
      <div
        className={`${styles.productsSelector} ${
          selectedCategory ? styles.hasSelected : ""
        }`}
        role="radiogroup"
        aria-label="Filter products by category"
      >
        <div
          className={`${styles.imageBox} ${
            selectedCategory === "Clothing" ? styles.selected : ""
          }`}
          role="radio"
          tabIndex={0}
          aria-pressed={selectedCategory === "Clothing"}
          onClick={() => onToggle("Clothing")}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && onToggle("Clothing")
          }
        >
          <Image
            src="/images/clothing.webp"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
          <div className={styles.overlay}>Clothing</div>
        </div>

        <div
          className={`${styles.imageBox} ${
            selectedCategory === "Jewelry" ? styles.selected : ""
          }`}
          role="radio"
          tabIndex={0}
          aria-pressed={selectedCategory === "Jewelry"}
          onClick={() => onToggle("Jewelry")}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
            (e.key === "Enter" || e.key === " ") && onToggle("Jewelry")
          }
        >
          <Image
            src="/images/jewelerySun.webp"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
          <div className={styles.overlay}>Jewelry</div>
        </div>

        <div
          className={`${styles.imageBox} ${
            selectedCategory === "Electronics" ? styles.selected : ""
          }`}
          role="radio"
          tabIndex={0}
          aria-pressed={selectedCategory === "Electronics"}
          onClick={() => onToggle("Electronics")}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") && onToggle("Electronics")
          }
        >
          <Image
            src="/images/electronicsOrange.webp"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
          <div className={styles.overlay}>Electronics</div>
        </div>
      </div>
      <button
        className="buttonTertiary"
        style={{
          marginBottom: "var(--space-xxl)",
          display: selectedCategory === null ? "none" : "inline-block",
        }}
        type="button"
        onClick={() => setSelectedCategory(null)}
      >
        Show all products
      </button>
      <div className={styles.grid}>
        {products.filter((product: Product) => {  //to only display products from a certain category if any is selected
          if (!selectedCategory) return true;
          return categoryMap[selectedCategory].includes(product.category);
        })
          .map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
}
