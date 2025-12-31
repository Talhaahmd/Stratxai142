"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface StaggerGroupProps {
    children: React.ReactNode;
    stagger?: number;
    className?: string;
    delay?: number;
}

export const StaggerGroup = ({
    children,
    stagger = 0.1,
    className,
    delay = 0,
}: StaggerGroupProps) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            transition={{ staggerChildren: stagger, delayChildren: delay }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    // Matches default "fadeUp" but controlled by parent StaggerGroup
    const variants = {
        hidden: { opacity: 0, y: 14 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as any
            }
        },
    };

    return (
        <motion.div variants={variants} className={className}>
            {children}
        </motion.div>
    );
};
