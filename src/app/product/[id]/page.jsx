"use client";

import styles from "./ProductDetails.module.css";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";
import { useState, useEffect } from "react"
import Link from "next/link";
import Skeleton from "@components/Skeleton";
import Navbar from "@components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === parseInt(id))
  );

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

  if (!mounted || !product) {
    return (
      <div style={{ padding: "1em" }}>
        <Skeleton
          width="30%"
          height="1.5rem"
          style={{ marginBottom: "0.5rem" }}
        />
        <Skeleton
          width="80%"
          height="1rem"
          style={{ marginBottom: "0.5rem" }}
        />
        <Skeleton
          width="300px"
          height="300px"
          style={{ marginBottom: "1rem" }}
        />
        <Skeleton
          width="100px"
          height="2rem"
          borderRadius="8px"
          style={{ marginTop: "0.5rem" }}
        />
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <section className={styles.detailsContainer}>
        {/* <button>Back</button> */}
        <span>HomePage/category</span>
        <h1>{product.title}</h1>
        <p className={styles.price}>
          {getSymbol()}
          {convert(product.price)}
        </p>
        <figure>
          <img
            src={product.image}
            alt={product.title}
            style={{ objectFit: "contain" }}
          />
        </figure>
        
        {product.sizes && (
          <div className={styles.sizeSelector}>
            {product.sizes.map((size) => (
              <button key={size} className={styles.sizeButton}>
                {size}
              </button>
            ))}
          </div>
        )}

        <Link href='/'><span>See the product description</span></Link>

        {product.stock === "In stock" && (
          <button
            className={styles.buttonAdd}
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        )}
      </section>
    </div>
  );
}
