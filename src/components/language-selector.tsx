import { useLanguage } from "@/contexts/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LANGUAGES = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const current = LANGUAGES.find((l) => l.code === language);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          style={{
            minWidth: 120,
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid #e5e7eb",
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            borderRadius: 8,
            fontWeight: 500,
            position: "relative",
            padding: "8px 28px 8px 14px", // plus d'espace à droite pour la flèche
          }}
        >
          <span style={{ fontSize: 20 }}>{current?.flag}</span>
          <span>{current?.label}</span>
          <span
            style={{
              marginLeft: 14, // plus d'espace entre le texte et la flèche
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              opacity: 0.7,
              position: "absolute",
              right: 12,
            }}
            aria-hidden="true"
          >
            ▼
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" style={{ minWidth: 140 }}>
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: lang.code === language ? 700 : 400 }}
          >
            <span style={{ fontSize: 20 }}>{lang.flag}</span>
            <span>{lang.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 