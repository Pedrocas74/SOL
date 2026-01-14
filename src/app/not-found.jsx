"use client";

import FooterSimple from "@components/layout/Footer/FooterSimple";
import { CircleX, CornerDownLeft } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{
        width: "90%",
        margin: "2.5rem auto 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: isMobile ? "2rem" : "2.5rem",
        }}
      >
        <CircleX fill="#D10221" color="white" /> 404{" "}
        <CircleX fill="#D10221" color="white" /> <br />
        Page Not Found
      </h1>
      <p
        style={{
          fontSize: isMobile ? "1rem" : "1.5rem",
          marginTop: "var(--space-sm)",
        }}
      >
        The page you requested does not exist.
      </p>
      <Link
        href="/"
        className="buttonSecondary"
        style={{
          marginTop: "var(--space-sm)",
        }}
      >
        <CornerDownLeft size={13} /> Back
      </Link>
      <FooterSimple />
    </section>
  );
}
