"use client"

import * as React from "react";

const locales = {
  fr: () => import("../locales/fr.json").then((m) => m.default),
  en: () => import("../locales/en.json").then((m) => m.default),
  es: () => import("../locales/es.json").then((m) => m.default),
  de: () => import("../locales/de.json").then((m) => m.default),
  it: () => import("../locales/it.json").then((m) => m.default),
  ar: () => import("../locales/ar.json").then((m) => m.default),
};

const RTL_LANGS = ["ar"];

type Language = "fr" | "en" | "es" | "de" | "it" | "ar";

type LanguageContextType = {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  isLoading: boolean;
};

const LanguageContext = React.createContext<LanguageContextType>({
  t: (key) => key,
  language: "fr",
  setLanguage: () => {},
  isRTL: false,
  isLoading: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>("fr");
  const [messages, setMessages] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    locales[language]().then((msgs) => {
      setMessages(msgs);
      setIsLoading(false);
    });
  }, [language]);

  const t = React.useCallback(
    (key: string) => messages[key] || key,
    [messages]
  );

  const isRTL = RTL_LANGS.includes(language);

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage, isRTL, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return React.useContext(LanguageContext);
} 