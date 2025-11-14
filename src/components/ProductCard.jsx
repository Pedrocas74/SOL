"use client";

import styles from "./styles/ProductCard.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useState, useEffect } from "react";
import Skeleton from "./Skeleton";
import { Ruler } from "lucide-react";
import { Select, SelectItem } from "@heroui/select";

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
  const stockColor = stockStatus === "In stock" ? "#1a1a1abd " : "#8f1010ff";

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
      <h4>
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
      </h4>
      <p
        className={styles.stockInfo}
        style={{
          color: stockColor,
        }}
      >
        {stockStatus}
      </p>

      {stockStatus === "In stock" ? (
        <button className="buttonPrimary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      ) : (
        <button
          className="buttonPrimary"
          disabled
          style={{ opacity: 0.5, cursor: "not-allowed" }}
        >
          Out of Stock
        </button>
      )}

      {/* sizes */}
      {product.sizes && (
        <div className={styles.selectWrapper}>
          <Select
            style={{ all: "unset" }}
            aria-label="Select size"
            isDisabled={stockStatus !== "In stock"}
            selectedKeys={sizeSelected ? [sizeSelected] : []}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0];
              setSizeSelected(value);
            }}
            selectorIcon={
              <Ruler
                className={styles.selectIcon}
                size={20}
                // color="#333"
                
                opacity={0.5}
            
                style={{
                  visibility: sizeSelected === "" ? "visible" : "hidden",
                }}
              />
            }
            className={styles.sizeSelector}
            classNames={{
              trigger: styles.sizeTrigger,
              value: styles.sizeValue,
              popoverContent: styles.dropdownContent,
              listbox: styles.dropdownList,
              item: styles.dropdownItem,
            }}
          >
            {product.sizes.map((size) => (
              <SelectItem className={styles.dropdownItem} key={size} value={size}>
                {size}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
}
