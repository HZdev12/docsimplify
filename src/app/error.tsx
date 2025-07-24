"use client";
import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div style={{ padding: 40, textAlign: "center" }}>
          <h2>Une erreur est survenue</h2>
          <pre style={{ color: "red" }}>{error.message}</pre>
          <button onClick={() => reset()} style={{ marginTop: 20 }}>
            Recharger la page
          </button>
        </div>
      </body>
    </html>
  );
} 