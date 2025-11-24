"use client";

import { useRef, useState } from "react";
import styles from "./styles/ImageMagnifier.module.css";

export default function ImageMagnifier({
  src,
  alt = "",
  width = 200,
  height = 200,
  zoom = 2,
  lensSize = 150,
}) {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const bounds = containerRef.current.getBoundingClientRect();

    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const clampedX = Math.max(0, Math.min(x, bounds.width));
    const clampedY = Math.max(0, Math.min(y, bounds.height));

    setPos({ x: clampedX, y: clampedY });
  };

  const lensHalf = lensSize / 2;

  const lensStyle = {
    width: lensSize,
    height: lensSize,
    left: pos.x - lensHalf,
    top: pos.y - lensHalf,
    backgroundImage: `url(${src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${width * zoom}px ${height * zoom}px`,
    backgroundPosition: `${
      -(pos.x * zoom - lensHalf)
    }px ${-(pos.y * zoom - lensHalf)}px`,
  };

  return (
    <div
      className={styles.magnifierContainer}
      style={{ width, height }}
      ref={containerRef}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onMouseMove={handleMouseMove}
    >
      <img src={src} alt={alt} className={styles.image} />

      {isActive && <div className={styles.lens} style={lensStyle} />}
    </div>
  );
}
