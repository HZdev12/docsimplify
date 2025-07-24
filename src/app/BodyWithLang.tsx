"use client";
import { useLanguage } from "@/contexts/language-context";
import * as React from "react";

export function BodyWithLang({ children }: { children: React.ReactNode }) {
  const { language, isRTL, isLoading } = useLanguage();
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
    }
  }, [language, isRTL]);
  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span>Chargement…</span>
      </div>
    );
  }
  return <>{children}</>;
} 