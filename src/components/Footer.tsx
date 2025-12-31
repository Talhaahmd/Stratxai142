"use client";

import { IconBrandInstagram } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const NAVIGATION = [
    { name: "ABOUT US", href: "/about-us" },
    { name: "SERVICES", href: "#" }, // Note: This might need specific links or just point to services page
    { name: "OUR CLIENTS", href: "/our-clients" },
    { name: "CASES", href: "/case-studies" },
    { name: "AI PROMPTS", href: "/ai-prompts" },
    { name: "BOOK A CALL", href: "/contact" },
];

const HEADQUARTERS = [
    "TORONTO, CANADA",
    "LAHORE, PAKISTAN",
];

const SUPPORT = [
    "MON-FRI 9AM - 6PM",
];

const REACH_OUT = [
    "Info@stratxio.com",
];

export default function Footer({ theme = "light" }: { theme?: "light" | "dark" }) {
    const isDark = theme === "dark";

    return (
        <footer className={cn(
            "relative py-16 lg:py-24 px-6 md:px-12 lg:px-24 transition-colors duration-500 overflow-hidden",
            isDark ? "bg-black text-white" : "bg-white text-black"
        )}>
            {/* Ambient background glow for dark mode */}
            {isDark && (
                <>
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#1E2BFF] opacity-[0.1] blur-[140px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1E2BFF] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" />
                </>
            )}

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20">
                    <a href="#" className="inline-block">
                        <img
                            src="https://res.cloudinary.com/dt93sahp2/image/upload/v1766958848/Untitled_design_1_vvsld2.png"
                            alt="logo"
                            className={cn("h-16 md:h-20 w-auto transition-all", isDark ? "brightness-110" : "")}
                        />
                    </a>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    {/* Navigation */}
                    <div>
                        <h4 className={cn("text-[10px] font-bold tracking-[0.2em] mb-8 uppercase transition-colors", isDark ? "text-white/60" : "text-black/40")}>
                            NAVIGATION
                        </h4>
                        <ul className="space-y-4">
                            {NAVIGATION.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={cn(
                                            "text-[11px] font-bold tracking-widest hover:text-[#1E2BFF] transition-colors uppercase",
                                            isDark ? "text-white/90" : "text-black"
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Headquarters & Support */}
                    <div className="space-y-12">
                        <div>
                            <h4 className={cn("text-[10px] font-bold tracking-[0.2em] mb-8 uppercase transition-colors", isDark ? "text-white/60" : "text-black/40")}>
                                HEADQUARTERS
                            </h4>
                            <ul className="space-y-1">
                                {HEADQUARTERS.map((item, i) => (
                                    <li key={i} className={cn("text-[11px] font-bold tracking-widest uppercase", isDark ? "text-white/80" : "text-black")}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className={cn("text-[10px] font-bold tracking-[0.2em] mb-8 uppercase transition-colors", isDark ? "text-white/60" : "text-black/40")}>
                                SUPPORT
                            </h4>
                            <ul className="space-y-1">
                                {SUPPORT.map((item, i) => (
                                    <li key={i} className={cn("text-[11px] font-bold tracking-widest uppercase", isDark ? "text-white/80" : "text-black")}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Reach Out */}
                    <div>
                        <h4 className={cn("text-[10px] font-bold tracking-[0.2em] mb-8 uppercase transition-colors", isDark ? "text-white/60" : "text-black/40")}>
                            REACH OUT
                        </h4>
                        <ul className="space-y-4">
                            {REACH_OUT.map((item, i) => (
                                <li key={i} className={cn("text-[11px] font-bold tracking-widest uppercase", isDark ? "text-white/90" : "text-black")}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={cn(
                    "flex flex-col md:flex-row justify-between items-end md:items-center gap-8 pt-12 border-t transition-colors",
                    isDark ? "border-white/10" : "border-black/5"
                )}>
                    <p className={cn("text-[10px] font-bold tracking-[0.2em] uppercase transition-colors", isDark ? "text-white/50" : "text-black/40")}>
                        @2025 Stratx AI LLC All rights Reserved.
                    </p>

                    <div className="flex gap-4">
                        <a
                            href="https://www.instagram.com/stratx_ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-[#1E2BFF] text-white flex items-center justify-center rounded-sm hover:scale-105 transition-transform"
                        >
                            <IconBrandInstagram size={20} stroke={2.5} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
