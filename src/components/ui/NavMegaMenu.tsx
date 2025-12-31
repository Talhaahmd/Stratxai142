"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { Case } from "../FeaturedCases";

interface NavMegaMenuProps {
    title: string;
    cases: Case[];
    visible?: boolean;
}

export const NavMegaMenu = ({ title, cases, visible: _visible }: NavMegaMenuProps) => {
    const { visible } = useNavbar();
    const [isOpen, setIsOpen] = useState(false);
    let hoverTimeout: number;

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => setIsOpen(true), 150);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => setIsOpen(false), 200);
    };

    // Show only first 3 cases
    const featuredCases = cases.slice(0, 3);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger Button */}
            <button
                className={cn(
                    "flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors",
                    visible ? "text-black hover:text-neutral-700" : "text-white hover:text-white/80 dark:text-neutral-300"
                )}
            >
                {title}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <IconPlus className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-45")} />
                </motion.div>
            </button>

            {/* Mega Menu Dropdown - Full Width Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-[90] top-[80px]"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Mega Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="fixed left-0 right-0 top-[80px] z-[100]"
                        >
                            <div className="max-w-7xl mx-auto px-8">
                                <div className="bg-white rounded-2xl shadow-2xl border border-neutral-100 p-10">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-2xl font-bold text-black">Our latest case studies</h3>
                                        <a
                                            href="#cases"
                                            className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black transition-colors"
                                        >
                                            EXPLORE ALL CASES
                                            <IconArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>

                                    {/* Case Studies Grid */}
                                    <div className="grid grid-cols-3 gap-6">
                                        {featuredCases.map((caseItem) => (
                                            <motion.a
                                                key={caseItem.id}
                                                href={caseItem.href}
                                                className="group block"
                                                whileHover={{ y: -4 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="bg-neutral-50 rounded-xl overflow-hidden">
                                                    {/* Image */}
                                                    <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                                                        <img
                                                            src={caseItem.image}
                                                            alt={caseItem.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-5 space-y-3">
                                                        <div>
                                                            <p className="text-[10px] font-bold tracking-[0.2em] text-neutral-500 uppercase mb-2">
                                                                {caseItem.category}
                                                            </p>
                                                            <h4 className="text-lg font-bold text-black group-hover:text-[#1E2BFF] transition-colors">
                                                                {caseItem.title}
                                                            </h4>
                                                        </div>

                                                        {/* See Work Button */}
                                                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1E2BFF] text-white text-xs font-bold rounded-lg hover:bg-[#1a25d9] transition-colors">
                                                            SEE WORK
                                                            <IconArrowRight className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

// Import useNavbar hook
import { useNavbar } from "./resizable-navbar";
import { IconPlus } from "@tabler/icons-react";
