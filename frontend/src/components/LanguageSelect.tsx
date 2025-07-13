import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];

export default function LanguageSelect() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={e => setLanguage(e.target.value)}
      className="rounded px-2 py-1 border border-gray-300 text-black"
      style={{ marginBottom: 16 }}
      aria-label="Select language"
    >
      {SUPPORTED_LANGUAGES.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
} 