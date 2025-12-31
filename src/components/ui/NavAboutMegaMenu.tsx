"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconArrowRight, IconPlus, IconUsers, IconTarget, IconRocket } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useNavbar } from "./resizable-navbar";

interface AboutItem {
    icon: React.ReactNode;
    title: string;
    description: string;
    link: string;
}

const aboutItems: AboutItem[] = [
    {
        icon: <IconUsers className="w-8 h-8" />,
        title: "Our Story",
        description: "Learn about our journey, values, and the team behind Klarus AI.",
        link: "#story"
    },
    {
        icon: <IconTarget className="w-8 h-8" />,
        title: "Our Mission",
        description: "Discover how we're transforming businesses through innovative digital solutions.",
        link: "#mission"
    },
    {
        icon: <IconRocket className="w-8 h-8" />,
        title: "Our Approach",
        description: "Explore our methodology and what makes us different in the industry.",
        link: "#approach"
    }
];

interface NavAboutMegaMenuProps {
    title: string;
}

export const NavAboutMegaMenu = ({ title }: NavAboutMegaMenuProps) => {
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
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-2xl font-bold text-black">About Klarus AI</h3>
                                        <a
                                            href="#about"
                                            className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black transition-colors"
                                        >
                                            LEARN MORE ABOUT US
                                            <IconArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>

                                    {/* About Items Grid */}
                                    <div className="grid grid-cols-3 gap-8">
                                        {aboutItems.map((item, index) => (
                                            <motion.a
                                                key={index}
                                                href={item.link}
                                                className="group block"
                                                whileHover={{ y: -4 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="bg-neutral-50 rounded-xl p-6 h-full hover:bg-neutral-100 transition-colors">
                                                    {/* Icon */}
                                                    <div className="w-14 h-14 rounded-lg bg-[#1E2BFF]/10 flex items-center justify-center mb-4 group-hover:bg-[#1E2BFF]/20 transition-colors">
                                                        <div className="text-[#1E2BFF]">
                                                            {item.icon}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <h4 className="text-lg font-bold text-black mb-2 group-hover:text-[#1E2BFF] transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                                                        {item.description}
                                                    </p>

                                                    {/* Link */}
                                                    <div className="flex items-center gap-2 text-sm font-medium text-[#1E2BFF]">
                                                        Explore
                                                        <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
