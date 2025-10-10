"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const { current, rates } = useSelector((state) => state.currency);

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

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
      }}
    >
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          width={150}
          height={150}
          style={{ objectFit: "contain" }}
        />
        <h3>{product.title}</h3>
      </Link>

      <p>
        {getSymbol()}
        {convert(product.price)}
      </p>

      <button
        onClick={() => dispatch(addToCart(product))}
        style={{
          marginTop: "0.5rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
