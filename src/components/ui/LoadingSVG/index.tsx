import { motion } from "framer-motion";

export default function LoadingSVG() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "var(--space-xxl) auto",
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "block" }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        aria-hidden="true"
        focusable="false"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </motion.svg>
    </div>
  );
}
