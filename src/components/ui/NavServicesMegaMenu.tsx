"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconArrowRight, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useNavbar } from "./resizable-navbar";
import type { ServiceItem } from "../ServicesSection";

interface NavServicesMegaMenuProps {
    title: string;
    services: ServiceItem[];
}

export const NavServicesMegaMenu = ({ title, services }: NavServicesMegaMenuProps) => {
    const { visible } = useNavbar();
    const [isOpen, setIsOpen] = useState(false);
    const [activeService, setActiveService] = useState<ServiceItem>(services[0]);
    let hoverTimeout: number;

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => setIsOpen(true), 150);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => setIsOpen(false), 200);
    };

    // Service-specific images (placeholder - you can replace with actual images)
    const serviceImages: Record<string, string> = {
        'strategy': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
        'development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
        'marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'content': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop'
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

            {/* Mega Menu Dropdown - Full Width, No Gap */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-[90] top-0"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Mega Menu Content - Attached to Navbar */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="fixed left-0 right-0 top-[72px] z-[100]"
                        >
                            <div className="bg-white shadow-2xl">
                                <div className="max-w-7xl mx-auto">
                                    <div className="grid grid-cols-12 min-h-[400px]">
                                        {/* Left Sidebar - Service List */}
                                        <div className="col-span-3 bg-neutral-50 p-8 border-r border-neutral-200">
                                            <div className="space-y-2">
                                                {services.map((service) => (
                                                    <button
                                                        key={service.id}
                                                        onClick={() => setActiveService(service)}
                                                        onMouseEnter={() => setActiveService(service)}
                                                        className={cn(
                                                            "w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all",
                                                            activeService.id === service.id
                                                                ? "bg-white text-black shadow-sm"
                                                                : "text-neutral-600 hover:text-black hover:bg-white/50"
                                                        )}
                                                    >
                                                        {service.title}
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Explore All Button */}
                                            <div className="mt-8 pt-8 border-t border-neutral-200">
                                                <a
                                                    href="#services"
                                                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-black text-black text-sm font-bold rounded-lg hover:bg-black hover:text-white transition-colors"
                                                >
                                                    EXPLORE ALL SERVICES
                                                    <IconArrowRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Center - Description */}
                                        <div className="col-span-5 p-10 flex flex-col justify-center">
                                            <motion.div
                                                key={activeService.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <h3 className="text-3xl font-bold text-black mb-6">
                                                    {activeService.title}
                                                </h3>
                                                <p className="text-lg text-neutral-600 leading-relaxed">
                                                    {activeService.description}
                                                </p>
                                            </motion.div>
                                        </div>

                                        {/* Right - Image */}
                                        <div className="col-span-4 relative overflow-hidden bg-neutral-100">
                                            <motion.img
                                                key={activeService.id}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.4 }}
                                                src={serviceImages[activeService.id]}
                                                alt={activeService.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </div>
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
