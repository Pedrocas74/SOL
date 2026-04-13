"use client";

import styles from "./ProductDetails.module.css";
//custom components
import Footer from "@components/layout/Footer/Footer";
import ImageMagnifier from "@app/product/[id]/ImageMagnifier";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import Breadcrumbs from "@components/ui/Breadcrumbs";
import RelatedProductsSlider from "@components/products/RelatedProductsSlider";
//built-in
import Image from "next/image";
import { toast } from "sonner";
//hooks
import { useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@app/hooks/typedReduxHooks";
import { useState, useEffect } from "react";
import { useCurrency } from "@app/hooks/useCurrency";
//Redux actions
import { addToCart } from "../../../features/cart/cartSlice";
import { fetchProducts } from "../../../features/products/productsSlice";
//icons
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ProductDetails() {
  const [sizeSelected, setSizeSelected] = useState(""); //size selected before adding to cart (max 1)
  const [showSizeError, setShowSizeError] = useState(false); //sets true if clothing product is added to the cart without selecting a size 
  const [openStates, setOpenStates] = useState({ //product's info -> toogles for summary elements
    summary1: false,
    summary2: false,
    summary3: false,
  });
  const [mounted, setMounted] = useState(false);

  const params = useParams();
  const idParam = params.id; //get id of the product (product[id])
  const idStr = Array.isArray(idParam) ? idParam[0] : idParam; 
  const productId = Number(idStr); 

  const dispatch = useAppDispatch(); 

  const product = useAppSelector((state) =>
    state.products.products.find((p) => p.id === productId),
  );
  const loading = useAppSelector((state) => state.products.loading);

  
  useEffect(() => setMounted(true), []);

  //allow browser refreshment
  useEffect(() => {
    if (!product && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product, loading]);

  const stockStatus = product?.stock;

  const arrow1 = openStates.summary1 ? (
    <ChevronUp color="var(--clr-text)" />
  ) : (
    <ChevronDown color="#333" />
  );
  const arrow2 = openStates.summary2 ? (
    <ChevronUp color="var(--clr-text)" />
  ) : (
    <ChevronDown color="#333" />
  );
  const arrow3 = openStates.summary3 ? (
    <ChevronUp color="var(--clr-text)" />
  ) : (
    <ChevronDown color="#333" />
  );

  const toggleSummary = (key) => {  //toggle summary element (open <-> close)
    setOpenStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const { format } = useCurrency();

  //-----------SKELETONS---------
  if (!mounted || !product) {
    return <ProductDetailsSkeleton />;
  }

  const handleAddToCart = () => { 
    if (product.sizes && !sizeSelected) { //set warning if user tries to add clothing product without selecting a size 
      toast.warning("Must select a size before adding to cart.");
      setShowSizeError(true);
      setTimeout(() => setShowSizeError(false), 2000);
      return;
    }

    dispatch( //else adds product to cart (along with size selected, if clothing product)
      addToCart({
        product,
        selectedSize: product.sizes ? sizeSelected : null,
      }),
    );
    setSizeSelected("");
  };

  const upperFirstChars = (str: string) => { //to uppercase only the first letter of the product.category (on breadcrumbs)
    return str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
  };


  return (
    <div className={styles.pageContainer}>
      <section
        className={styles.detailsContainer}
        aria-labelledby="product-title"
      >
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/#products-list", scroll: true },
            { label: upperFirstChars(product.category) },
          ]}
        />

        <h1 className="itemTitle" id="product-title">
          {product.title}
        </h1>
        <p className={styles.price}>
          {format(product.price)}
        </p>

        <figure
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          
          <ImageMagnifier
            src={product.image}
            alt={product.title}
            width={240}
            height={240}
            zoom={1.5}
            lensSize={180}
            lensOffsetX={50}
          />
        </figure>

        {stockStatus === "In stock" && product.sizes && (
          <div
            className={`${styles.sizeSelector} ${
              showSizeError ? styles.sizeError : ""
            }`}
            role="radiogroup"
            aria-label="Select size"
            aria-invalid={showSizeError ? "true" : "false"}
            aria-describedby={
              showSizeError ? `size-error-${product.id}` : undefined
            }
          >
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`buttonSecondary ${
                  sizeSelected === size ? styles.sizeSelectorSelected : ""
                }`}
                role="radio"
                aria-checked={sizeSelected === size}
                onClick={() => {
                  setSizeSelected(size);
                  setShowSizeError(false);
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <div className={styles.buttonAddContainer}>
          {stockStatus === "In stock" ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className="buttonPrimary"
            >
              Add to Cart
            </button>
          ) : (
            <button
              type="button"
              className="buttonPrimary"
              disabled
              aria-disabled="true"
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

                <ul className={styles.careList}>
                  <li>
                    <span className={styles.iconWrapper} aria-hidden="true">
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
                    <span className={styles.iconWrapper} aria-hidden="true">
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
                    <span className={styles.iconWrapper} aria-hidden="true">
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
                    <span className={styles.iconWrapper} aria-hidden="true">
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
                    <span className={styles.iconWrapper} aria-hidden="true">
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
