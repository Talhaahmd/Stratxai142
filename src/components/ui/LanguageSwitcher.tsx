"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
    className?: string;
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
    const [activeLanguage, setActiveLanguage] = useState<"ENG" | "NL">("ENG");

    return (
        <div className={cn("inline-flex items-center border-2 border-black rounded-md overflow-hidden", className)}>
            <button
                onClick={() => setActiveLanguage("ENG")}
                className={cn(
                    "px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors",
                    activeLanguage === "ENG"
                        ? "bg-white text-black"
                        : "bg-black text-white hover:bg-neutral-800"
                )}
            >
                ENG
            </button>
            <button
                onClick={() => setActiveLanguage("NL")}
                className={cn(
                    "px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors",
                    activeLanguage === "NL"
                        ? "bg-white text-black"
                        : "bg-black text-white hover:bg-neutral-800"
                )}
            >
                NL
            </button>
        </div>
    );
};
