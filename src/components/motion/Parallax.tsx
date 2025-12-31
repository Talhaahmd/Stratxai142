"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";



export const ParallaxY = ({
    children,
    speed = 100, // Pixels to move
    className,
}: { children: React.ReactNode; speed?: number; className?: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    // If speed is positive, it moves UP relative to natural scroll (slower content)
    // If speed is negative, it moves DOWN (faster content)
    const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

    return (
        <div ref={ref} className={cn("relative", className)}>
            <motion.div style={{ y }} className="w-full h-full">
                {children}
            </motion.div>
        </div>
    );
};

export const ParallaxScale = ({
    children,
    scaleStart = 1,
    scaleEnd = 1.05,
    className,
}: { children: React.ReactNode; scaleStart?: number; scaleEnd?: number; className?: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const scale = useTransform(scrollYProgress, [0.2, 0.8], [scaleStart, scaleEnd]); // Scale mainly when in middle view

    return (
        <div ref={ref} className={cn("overflow-hidden", className)}>
            <motion.div style={{ scale }} className="w-full h-full origin-center">
                {children}
            </motion.div>
        </div>
    );
};

export const ParallaxOpacity = ({
    children,
    className
}: { children: React.ReactNode; className?: string }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    // Fade in as it enters, fade out as it leaves
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

    return (
        <motion.div ref={ref} style={{ opacity }} className={className}>
            {children}
        </motion.div>
    );
};
