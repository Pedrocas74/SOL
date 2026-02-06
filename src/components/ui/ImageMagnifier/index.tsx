"use client";

import { useRef, useState } from "react";
import styles from "./ImageMagnifier.module.css";
import Image from "next/image";

export default function ImageMagnifier({
  src,
  alt = "",
  width = 240,
  height = 240,
  zoom = 1.5,
  lensSize = 150,
  lensOffsetX = 0,
  lensOffsetY = 0,
}) {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const updatePosition = (clientX, clientY) => {
    if (!containerRef.current) return;

    const bounds = containerRef.current.getBoundingClientRect();
    const x = clientX - bounds.left;
    const y = clientY - bounds.top;

    const clampedX = Math.max(0, Math.min(x, bounds.width));
    const clampedY = Math.max(0, Math.min(y, bounds.height));

    setPos({ x: clampedX, y: clampedY });
  };

  const handleMouseMove = (e) => {
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    setIsActive(true);
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsActive(false);
  };

  const lensHalf = lensSize / 2;

  const lensStyle = {
    width: lensSize,
    height: lensSize,
    left: pos.x - lensHalf + lensOffsetX,
    top: pos.y - lensHalf + lensOffsetY,
    backgroundImage: `url(${src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `${width * zoom}px ${height * zoom}px`,
    backgroundPosition: `${-(pos.x * zoom - lensHalf)}px ${-(
      pos.y * zoom -
      lensHalf
    )}px`,
  };

  return (
    <div
      className={`${styles.magnifierContainer} ${
        isActive ? styles.magnifierActive : ""
      }`}
      style={{ width, height }}
      ref={containerRef}
      onClick={() => setIsActive(!isActive)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={src}
        alt={alt}
        priority
        className={styles.image}
        width={240}
        height={240}
      />

      {isActive && <div className={styles.lens} style={lensStyle} />}
    </div>
  );
}
