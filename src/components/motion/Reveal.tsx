"use client";
import React, { useRef } from "react";
import { motion, useInView, type Variant } from "motion/react";
import { cn } from "@/lib/utils";

type RevealVariant = "fadeUp" | "fadeIn" | "scaleIn" | "blurIn";

interface RevealProps {
    children: React.ReactNode;
    variant?: RevealVariant;
    delay?: number;
    duration?: number;
    className?: string;
    viewportAmount?: number; // How much of the element is visible before triggering
}

export const Reveal = ({
    children,
    variant = "fadeUp",
    delay = 0,
    duration = 0.6,
    className,
    viewportAmount = 0.2, // Default 20% visible
}: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: viewportAmount });

    const getVariants = (): { hidden: Variant; visible: Variant } => {
        const ease: any = [0.22, 1, 0.36, 1];

        switch (variant) {
            case "fadeUp":
                return {
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration, ease, delay } },
                };
            case "fadeIn":
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration, ease, delay } },
                };
            case "scaleIn":
                return {
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration, ease, delay } },
                };
            case "blurIn":
                return {
                    hidden: { opacity: 0, filter: "blur(10px)" },
                    visible: { opacity: 1, filter: "blur(0px)", transition: { duration, ease, delay } },
                };
            default:
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration, ease, delay } },
                };
        }
    };

    const variants = getVariants();

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            className={cn("will-change-[opacity,transform]", className)}
        >
            {children}
        </motion.div>
    );
};
