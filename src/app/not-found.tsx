"use client";

import FooterSimple from "@components/layout/Footer/FooterSimple";
import { CircleX, CornerDownLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {


  return (
    <section
      style={{
        padding: "0 5%",
        minHeight: "100vh",
        margin: "0 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "var(--fs-xl)",
        }}
      >
        <CircleX fill="#D10221" color="white" /> 404{" "}
        <CircleX fill="#D10221" color="white" /> <br />
        Page Not Found
      </h1>
      <p
        style={{
          fontSize: "var(--fs-lg)",
          marginTop: "var(--space-sm)",
        }}
      >
        The page you requested does not exist.
      </p>
      <Link
        href="/"
        className="buttonSecondary"
        style={{
          margin: "var(--space-md) auto",
        }}
      >
        <CornerDownLeft size={13} /> Back
      </Link>
      <FooterSimple />
    </section>
  );
}
