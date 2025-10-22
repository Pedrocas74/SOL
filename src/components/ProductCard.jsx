"use client";

import styles from "./styles/ProductCard.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useState, useEffect } from "react";
import Skeleton from "./Skeleton";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { current, rates } = useSelector((state) => state.currency);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const convert = (price) => (price * rates[current]).toFixed(2);
  const getSymbol = () => {
    switch (current) {
      case "USD":
        return "$";
      case "GBP":
        return "£";
      default:
        return "€";
    }
  };

  const stockStatus = product.stock;
  const stockColor = stockStatus === "In stock" ? "#1a140ece " : "#630d0df3";

  if (!mounted) {
    return (
      <div className={styles.groupOfSkeletons}>
        <Skeleton width="150px" height="150px" style={{ margin: "0 auto" }} />
        <Skeleton width="80%" height="1rem" style={{ margin: "0.5rem auto" }} />
        <Skeleton
          width="50px"
          height="1rem"
          style={{ margin: "0.5rem auto" }}
        />
        <Skeleton
          width="80px"
          height="2rem"
          style={{ margin: "0.5rem auto" }}
        />
      </div>
    );
  }

  return (
    <div className={styles.productCard}>
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>
        {getSymbol()}
        {convert(product.price)}
      </p>
      <p
        className={styles.stockInfo}
        style={{
          color: stockColor,
        }}
      >
        {stockStatus}
      </p>
      {stockStatus === "In stock" ? (
        <button onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>
      ) : (
        <button disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
          Out of Stock
        </button>
      )}
    </div>
  );
}
