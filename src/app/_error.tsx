"use client";

import { useEffect } from "react";


function GlobalError({ error, reset }) {
  // Log error in development; integrate with a reporter if available
  useEffect(() => {
    if (!error) return;
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("App Error Boundary:", error);
    }
    // optionally send to monitoring service here
  }, [error]);

  const isProd = process.env.NODE_ENV === "production";
  const message = error?.message || "An unexpected error occurred.";

  return (
    <section  aria-live="polite" aria-atomic="true">
      <h1 >Something went wrong</h1>
      {!isProd && (
        <pre >
          {message}
        </pre>
      )}
      <button
        type="button"
        // className={styles.button}
        aria-label="Retry the last action"
        onClick={() => reset?.()}
      >
        Try again
      </button>
    </section>
  );
}

export default GlobalError;