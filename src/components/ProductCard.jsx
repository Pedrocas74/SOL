"use client";

import styles from "./styles/ProductCard.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useState, useEffect } from "react";
import Skeleton from "./Skeleton";
import { Ruler } from "lucide-react";

export default function ProductCard({ product }) {
  const [sizeSelected, setSizeSelected] = useState("");
  const dispatch = useDispatch();
  const { current, rates } = useSelector((state) => state.currency);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  const handleAddToCart = () => {
    if (product.sizes && !sizeSelected) {
      alert("Please select a size");
      return;
    }
    dispatch(
      addToCart({
        product,
        selectedSize: product.sizes ? sizeSelected : null,
      })
    );
  };

  return (
    <div className={styles.productCard}>
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>
        {symbolPosition === "left" ? (
          <>
            {symbol}{convert(product.price)}
          </>
        ) : (
          <>
            {convert(product.price)}{symbol}
          </>
        )}
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
        <button onClick={handleAddToCart}>Add to Cart</button>
      ) : (
        <button disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
          Out of Stock
        </button>
      )}

      {/* sizes */}
      {product.sizes && (
        <>
          <label htmlFor="size-select"></label>
          <div className={styles.selectWrapper}>
            <Ruler className={styles.selectIcon} />
            <select
              className={styles.sizeSelector}
              onChange={(e) => setSizeSelected(e.target.value)}
              name="sizes"
              id="size-select"
              defaultValue=""
              disabled={stockStatus !== "In stock"}
              aria-label="Select size"
            >
              <option value="" disabled hidden></option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}
