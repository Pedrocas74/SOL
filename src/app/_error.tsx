"use client";

import { useEffect } from "react";


function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error in development; integrate with a reporter if available
  useEffect(() => {
    if (!error) return;
    if (process.env.NODE_ENV !== "production") { //avoid leaking internal errors in prod
      console.error("App Error Boundary:", error);
      console.error("Digest:", error.digest); //for server crashes
    }
    
  }, [error]);

  const isProd = process.env.NODE_ENV === "production";
  const message = error?.message || "An unexpected error occurred.";

  return (
    <section  aria-live="polite" aria-atomic="true">
      <h1 >Something went wrong</h1>
      {!isProd && (
        <pre>
          {message}
        </pre>
      )}
      <button
        type="button"
        aria-label="Retry the last action"
        onClick={() => reset?.()}
      >
        Try again
      </button>
    </section>
  );
}

export default GlobalError;