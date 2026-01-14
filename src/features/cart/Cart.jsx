"use client";

import styles from "./Cart.module.css";
import Link from "next/link";
import React from "react";
import { Minus, Plus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  reconcileWithProducts,
} from "./cartSlice";
import Footer from "@components/layout/Footer/Footer";
import Breadcrumbs from "@components/ui/Breadcrumbs";
import { fetchProducts } from "../products/productsSlice.js";

export default function Cart() {
  const { items = [] } = useSelector((state) => state.cart || { items: [] }); //items in cart
  const { current, rates } = useSelector((state) => state.currency);
  const { products = [] } = useSelector((state) => state.products); //products in productList
  const dispatch = useDispatch();

  //fetch products if they're not loaded
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  //update stock status on cart
  useEffect(() => {
    if (items.length > 0 && products.length > 0) {
      dispatch(reconcileWithProducts(products));
    }
  }, [dispatch, items.length, products]);

  const totalQuantity =
    items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice =
    items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

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

  const unavailableItems = items?.filter((item) => item.unavailable) || [];

  // EMPTY CARD MESSAGE
  if (!items?.length) {
    return (
      <>
        <section className={styles.cartSection} aria-labelledby="cart-heading">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/#products-list" },
              { label: "Cart", href: "/cart" },
            ]}
          />
          <h1 id="cart-heading">Cart</h1>
          <div className={styles.emptyCartAction}>
            <div
              className={styles.emptyCartImg}
              role="img"
              aria-label="Your cart is currently empty"
            ></div>
            <Link href="/#products-list" className="buttonSecondary">
              Continue Shopping
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <section className={styles.cartSection} aria-labelledby="cart-heading">
        <Breadcrumbs
          id="warning" //to scroll the view to the top of the page
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/#products-list" },
            { label: "Cart", href: "/cart" },
          ]}
        />
        <h1 id="cart-heading">Cart</h1>

        {/* WARNING if there are unavailable items */}
        {unavailableItems.length > 0 && (
          <div
            className={styles.warningBanner}
            role="alert"
            aria-live="assertive"
          >
            <p>Some items in your cart are currently out of stock:</p>
            <ul>
              {unavailableItems.map((item) => (
                <li
                  key={`unavailable-${item.id}-${
                    item.selectedSize || "default"
                  }`}
                >
                  {item.title}{" "}
                  {item.selectedSize ? `(Size: ${item.selectedSize})` : ""}
                </li>
              ))}
            </ul>
            <div className={styles.removeAllContainer}>
              <button
                type="button"
                className="buttonSecondary"
                onClick={() => {
                  unavailableItems.forEach((item) =>
                    dispatch(
                      removeFromCart(
                        `${item.id}-${item.selectedSize || "default"}`
                      )
                    )
                  );
                }}
              >
                Remove Unavailable Items
              </button>
            </div>
            <p>Until this items are removed, it's not possible to checkout.</p>
          </div>
        )}

        <div className={styles.itemsContainer}>
          {items.map((item) => (
            <article
              key={`${item.id}-${item.selectedSize || "default"}`}
              className={`${styles.cartItem} ${
                item.unavailable ? styles.unavailableItem : ""
              }`}
            >
              <img src={item.image} alt={`Image of ${item.title}`} />
              <div className={styles.rightContainer}>
                <div className={styles.itemInformation}>
                  <p className={styles.title}>{item.title}</p>
                  <p className={styles.price}>
                    <span>Price: </span>
                    {symbolPosition === "left" ? (
                      <>
                        {symbol}
                        {convert(item.price)}
                      </>
                    ) : (
                      <>
                        {convert(item.price)}
                        {symbol}
                      </>
                    )}
                  </p>
                  <p className={styles.quantity}>
                    <span>Quantity: </span>
                    {item.quantity}
                  </p>
                  {item.selectedSize && (
                    <p className={styles.size}>
                      <span>Size: </span> {item.selectedSize}
                    </p>
                  )}

                  {item.unavailable && (
                    <div className={styles.unavailableOverlay}>
                      Currently Unavailable
                    </div>
                  )}
                </div>

                <div className={styles.buttonsContainer}>
                  <button
                    type="button"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="buttonPrimary"
                    onClick={() =>
                      dispatch(
                        increaseQuantity(
                          `${item.id}-${item.selectedSize || "default"}`
                        )
                      )
                    }
                  >
                    <Plus size={15} />
                  </button>
                  <button
                    type="button"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity:
                        item.quantity === 1 && !item.unavailable ? 0.2 : 1,
                      color:
                        item.quantity === 1 && !item.unavailable
                          ? "black"
                          : "white",
                      cursor:
                        item.quantity === 1 && !item.unavailable
                          ? "not-allowed"
                          : "pointer",
                    }}
                    className="buttonPrimary"
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(
                          `${item.id}-${item.selectedSize || "default"}`
                        )
                      )
                    }
                    disabled={item.quantity === 1 ? true : false}
                  >
                    <Minus size={15} />
                  </button>
                  <button
                    type="button"
                    className="buttonSecondary"
                    onClick={() =>
                      dispatch(
                        removeFromCart(
                          `${item.id}-${item.selectedSize || "default"}`
                        )
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.clearAllContainer}>
          <button
            type="button"
            className={`buttonTertiary ${styles.clearAllButton} `}
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
        <hr />
        <section
          className={styles.summarySection}
          aria-labelledby="cart-summary-heading"
        >
          <h2 id="cart-summary-heading">Summary</h2>
          <div className={styles.summaryInfoContainer} aria-live="polite">
            <p className={styles.totalItems}>
              <span>Total Items:</span> {totalQuantity}
            </p>
            <p className={styles.subtotalPrice}>
              <span>Subtotal:</span>{" "}
              {symbolPosition === "left"
                ? `${symbol}${convert(totalPrice)}`
                : `${convert(totalPrice)}${symbol}`}
            </p>
          </div>
          <div className={styles.summaryButtonsContainer}>
            <Link href="/#products-list" className="buttonSecondary">
              Continue Shopping
            </Link>
            <Link
              href={unavailableItems.length > 0 ? "#warning" : "/checkout"}
              scroll={true}
              className="buttonPrimary"
            >
              Proceed to Checkout
            </Link>
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}
