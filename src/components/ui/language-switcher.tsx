"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const languages = [
  {
    code: "en",
    name: "Australian",
    flag: "🇦🇺",
    path: "",
  },
  {
    code: "no",
    name: "Norsk",
    flag: "🇳🇴",
    path: "no",
  },
] as const;

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  // Get current language from URL
  const currentLang = pathname.startsWith("/no") ? "no" : "en";

  // Function to switch language
  const switchLanguage = (langPath: string) => {
    const newPath = pathname
      .split("/")
      .filter((segment) => segment !== "no")
      .join("/");

    router.push(langPath ? `/${langPath}${newPath}` : newPath);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <span className="mr-2 text-lg">{currentLanguage?.flag}</span>
          {currentLanguage?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.path)}
            className="cursor-pointer"
          >
            <span className="mr-2 text-lg">{language.flag}</span>
            {language.name}
            {currentLang === language.code && (
              <Check className="ml-auto h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
