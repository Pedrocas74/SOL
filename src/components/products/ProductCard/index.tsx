"use client";

import styles from "./ProductCard.module.css";
//built in
import Link from "next/link";
import Image from "next/image";
//hooks
import { useAppSelector, useAppDispatch } from "@app/hooks";
import { useState } from "react";
//redux actions
import { addToCart } from "../../../features/cart/cartSlice";
//external libraries 
import { toast } from "sonner";
//custom components 
import SizeSelector from "@components/ui/Size Selector";




export default function ProductCard({ product }) {
  const [sizeSelected, setSizeSelected] = useState<string | undefined>(""); //size selected for clothing item (max 1)
  const [showSizeError, setShowSizeError] = useState<boolean>(false); //true, if user tries to add clothing item to cart without selecting a size
  const dispatch = useAppDispatch();
  const { current, rates } = useAppSelector((state) => state.currency);

  const convert = (price: number) => (price * rates[current]).toFixed(2);
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


  const handleAddToCart = () => { //error shown when user tries add clothing item to the cart before selecting a size
    if (product.sizes && !sizeSelected) {
      toast.warning("Must select a size before adding to cart.");
      setShowSizeError(true); 
      setTimeout(() => setShowSizeError(false), 2000);
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
    <article
      className={styles.productCard}
      aria-labelledby={`product-title-${product.id}`}
    >
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.image}
          alt={`Picture of ${product.title}`}
          width={400}
          height={400}
          sizes="(max-width: 768px) 90vw,
       (max-width: 1200px) 40vw,
       25vw"
          loading="lazy"
          style={{ objectFit: "contain" }}
        />
        <h3 className={styles.productTitle} id={`product-title-${product.id}`}>{product.title}</h3>
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
        className={`${styles.stockInfo} stockP`}
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
          aria-disabled="true"
          style={{ opacity: 0.5, cursor: "not-allowed" }}
        >
          Out of Stock
        </button>
      )}

      {/* sizes */}
      {product.sizes && (
        <SizeSelector
          sizes={product.sizes}
          value={sizeSelected ?? ""}
          onChange={setSizeSelected}
          error={showSizeError}
          isDisabled={stockStatus !== "In stock"}
        />
      )}
          
    </article>
  );
}
