"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface CaseHeroProps {
    title: string;
    category: string;
    short_description: string;
    hero_image_url: string;
    what_we_did: string[];
}

export default function CaseHero({
    title,
    category,
    short_description,
    hero_image_url,
    what_we_did
}: CaseHeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden flex items-end"
        >
            {/* Background with Parallax */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0"
            >
                <img
                    src={hero_image_url}
                    alt={`${title} - Hero`}
                    className="h-[120%] w-full object-cover"
                />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/30 to-black/0" />

            {/* Content Container */}
            <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-10 pb-16 md:pb-24">
                <div className="max-w-2xl space-y-6">
                    <div className="space-y-2">
                        <div className="text-white/70 text-[11px] tracking-[0.25em] font-semibold uppercase">
                            {category}
                        </div>
                        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                            {title}
                        </h1>
                    </div>

                    <p className="text-white/80 text-sm md:text-base max-w-lg leading-relaxed font-medium">
                        {short_description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {what_we_did.map((pill, i) => (
                            <div
                                key={i}
                                className="px-3 py-1.5 border border-white/20 bg-white/5 backdrop-blur-sm rounded-full text-white text-[9px] md:text-[10px] font-bold tracking-wider uppercase"
                            >
                                {pill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
