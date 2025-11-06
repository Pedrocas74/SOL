"use client";

import styles from "./ProductDetails.module.css";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../features/cart/cartSlice";
import { useState, useEffect } from "react";
import Skeleton from "@components/Skeleton";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import RelatedProductsSlider from "@components/RelatedProductsSlider";
import Footer from "@components/Footer";
import Breadcrumbs from "@components/Breadcrumbs";

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [openStates, setOpenStates] = useState({
    summary1: false,
    summary2: false,
    summary3: false,
  });
  const [mounted, setMounted] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === parseInt(id))
  );

  const { current, rates } = useSelector((state) => state.currency);
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
  const stockStatus = product?.stock;

  const arrow1 = openStates.summary1 ? (
    <ChevronUp color="#333" />
  ) : (
    <ChevronDown color="#333" />
  );
  const arrow2 = openStates.summary2 ? (
    <ChevronUp color="#333" />
  ) : (
    <ChevronDown color="#333" />
  );
  const arrow3 = openStates.summary3 ? (
    <ChevronUp color="#333" />
  ) : (
    <ChevronDown color="#333" />
  );

  const toggleSummary = (key) => {
    setOpenStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!mounted || !product) {
    return (
      <div
        style={{
          height: "85vh",
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Skeleton width="70%" height="1.5rem" style={{ marginLeft: "2em" }} />
        <Skeleton width="25%" height="1rem" style={{ marginLeft: "2em" }} />
        <Skeleton width="80%" height="50vh" style={{ margin: "0 auto" }} />
        <Skeleton
          width="120px"
          height="2rem"
          borderRadius="8px"
          style={{ margin: "0 auto" }}
        />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert("Please select a size");
      return;
    }
    dispatch(
      addToCart({
        product,
        selectedSize: product.sizes ? selectedSize : null,
      })
    );
  };

  const upperFirstChars = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (
    <div className={styles.pageContainer}>
      <section className={styles.detailsContainer}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: upperFirstChars(product.category) },
          ]}
        />

        <h1>{product.title}</h1>
        <h2 className={styles.price}>
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
        </h2>
        <figure>
          <img
            src={product.image}
            alt={product.title}
            style={{ objectFit: "contain" }}
            className={styles.productImage}
          />
        </figure>

        {product.sizes && (
          <div className={styles.sizeSelector}>
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`buttonTertiary ${
                  selectedSize === size ? styles.selected : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <div className={styles.buttonAddContainer}>
          {stockStatus === "In stock" ? (
            <button onClick={handleAddToCart} className={styles.buttonAdd}>
              Add to Cart
            </button>
          ) : (
            <button
              className={styles.buttonAdd}
              disabled
              style={{ opacity: 0.6 }}
            >
              Out of Stock
            </button>
          )}
        </div>

        <div className={styles.summariesContainer}>
          {/* DESCRIPTION OF THE PRODUCT */}
          <details open={openStates.summary1}>
            <summary
              onClick={(e) => {
                e.preventDefault();
                toggleSummary("summary1");
              }}
              className={styles.instructions}
            >
              Description <span>{arrow1}</span>
            </summary>
            <p className={styles.productDescription}>{product.description}</p>
          </details>

          {/* DELIVERY AND RETURN RULES */}
          <details open={openStates.summary2}>
            <summary
              onClick={(e) => {
                e.preventDefault();
                toggleSummary("summary2");
              }}
              className={styles.instructions}
            >
              Free delivery and returns <span>{arrow2}</span>
            </summary>
            <ul className={styles.careList}>
              <li>✓ 30 Day Returns </li>
              <li>✓ Free Worldwide Shipping </li>
              <li>✓ Shipped within 48 hours</li>
            </ul>
          </details>

          {/* WASHING INSTRUCTIONS */}
          {(product.category === "men's clothing" ||
            product.category === "women's clothing") &&
            !product.title.toLowerCase().includes("backpack") && (
              <details open={openStates.summary3}>
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSummary("summary3");
                  }}
                  className={styles.instructions}
                >
                  Care <span>{arrow3}</span>
                </summary>
                <h3 className={styles.instructionsTitle}>
                  Washing Instructions
                </h3>
                <ul className={styles.careList}>
                  <li>
                    <span className={styles.iconWrapper}>
                      <Image
                        src="/images/icons/instructions/not-bleach.png"
                        alt="Do not bleach"
                        fill
                        priority
                      />
                    </span>
                    Do not bleach
                  </li>
                  <li>
                    <span className={styles.iconWrapper}>
                      <Image
                        src="/images/icons/instructions/tumble-dry.png"
                        alt="Do not tumble dry"
                        fill
                        priority
                      />
                    </span>
                    Do not tumble dry
                  </li>
                  <li>
                    <span className={styles.iconWrapper}>
                      <Image
                        src="/images/icons/instructions/do-not-dry.png"
                        alt="Do not dry clean"
                        fill
                        priority
                      />
                    </span>
                    Do not dry clean
                  </li>
                  <li>
                    <span className={styles.iconWrapper}>
                      <Image
                        src="/images/icons/instructions/ironing.png"
                        alt="Iron on the lowest setting"
                        fill
                        priority
                      />
                    </span>
                    Iron on the lowest setting
                  </li>
                  <li>
                    <span className={styles.iconWrapper}>
                      <Image
                        src="/images/icons/instructions/wash-30.png"
                        alt="Wash at low temperature"
                        fill
                        priority
                      />
                    </span>
                    Wash at low temperature and on delicate cycle
                  </li>
                </ul>
              </details>
            )}
        </div>
      </section>
      <RelatedProductsSlider id={product.id} category={product.category} />
      <Footer />
    </div>
  );
}
