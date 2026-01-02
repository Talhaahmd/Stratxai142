"use client";

import { useRef } from "react";
import { motion, useAnimationFrame } from "motion/react";
import { IconDots } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// Premium placeholder images
const images = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop",
    "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=1000&fit=crop",
];

function AnimatedImageColumn({
    images,
    direction = "up",
    className,
}: {
    images: string[];
    direction?: "up" | "down";
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const yOffset = useRef(0);

    useAnimationFrame((_t, delta) => {
        if (!ref.current) return;

        const speed = direction === "up" ? -20 : 20;
        yOffset.current += (speed * delta) / 1000;

        const totalHeight = ref.current.scrollHeight / 2;
        if (Math.abs(yOffset.current) >= totalHeight) {
            yOffset.current = 0;
        }

        ref.current.style.transform = `translateY(${yOffset.current}px)`;
    });

    const duplicatedImages = [...images, ...images];

    return (
        <div className={cn("relative overflow-hidden", className)}>
            <div ref={ref} className="flex flex-col gap-4">
                {duplicatedImages.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative aspect-[4/5] rounded-xl overflow-hidden flex-shrink-0"
                    >
                        <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function HomeHeroHatamex() {
    return (
        <section className="relative min-h-[calc(100vh-80px)] bg-[#0B0B0B] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column */}
                    <div className="flex flex-col justify-center space-y-8">

                        {/* BADGE — TEXT ONLY CHANGED */}
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-white/20" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase">
                                BOOK A CALL TODAY AND GET A FREE WEBSITE AUDIT
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-5xl lg:text-6xl font-normal text-white leading-[0.95] tracking-tight max-w-xl">
                            Double your leads with AI-powered growth systems
                        </h1>

                        {/* Paragraph */}
                        <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-lg font-normal">
                            Meta and Google Ads campaigns built on continuous testing and
                            conversion tracking for measurable growth.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a href="/contact" className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#1E2BFF] text-white text-sm font-semibold tracking-wide rounded-xl hover:bg-[#1E2BFF]/90 transition-all duration-300">
                                BOOK A CALL
                                <IconDots className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="/case-studies" className="group flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white text-sm font-semibold tracking-wide rounded-xl hover:bg-white/5 hover:border-white/30 transition-all duration-300">
                                EXPLORE OUR WORK
                                <IconDots className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>

                    {/* Right Column – Desktop */}
                    <div className="hidden lg:block relative h-[600px]">
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0B0B0B] to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0B0B] to-transparent z-10" />

                        <div className="grid grid-cols-2 gap-4 h-full">
                            <AnimatedImageColumn images={images.slice(0, 4)} direction="up" />
                            <AnimatedImageColumn images={images.slice(4, 8)} direction="down" />
                        </div>
                    </div>

                    {/* Mobile Image Collage */}
                    <div className="lg:hidden relative h-[300px] -mx-6">
                        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#0B0B0B] to-transparent z-10" />
                        <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#0B0B0B] to-transparent z-10" />

                        <div className="flex gap-4 h-full overflow-hidden px-6">
                            {[...images, ...images].map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    className="relative w-[240px] h-full rounded-xl overflow-hidden flex-shrink-0"
                                    animate={{ x: [0, -2400] }}
                                    transition={{
                                        duration: 30,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
