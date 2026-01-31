"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string;
        description: string | React.ReactNode;
        content?: React.ReactNode | any;
    }[];
    contentClassName?: string;
}) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<any>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0,
        );
        setActiveCard(closestBreakpointIndex);
    });

    return (
        <div
            className="relative flex flex-col lg:flex-row justify-center lg:space-x-20 py-24 px-6 md:p-10"
            ref={ref}
        >
            <div className="div relative flex items-start px-4 w-full lg:w-1/2">
                <div className="max-w-2xl">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="mb-24 md:mb-80 last:mb-0">
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tight"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.div
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-lg md:text-xl mt-10 max-w-lg text-neutral-500 leading-relaxed font-medium transition-colors duration-500"
                            >
                                {item.description}
                            </motion.div>
                            {/* Mobile Image (Visible only on mobile) */}
                            <div className="mt-12 lg:hidden w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-neutral-100">
                                {content[index].content ?? null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div
                className={cn(
                    "sticky top-32 hidden lg:flex h-[60vh] w-1/2 overflow-hidden rounded-[28px] bg-neutral-100 border border-neutral-200 shadow-[0_20px_60px_rgba(0,0,0,0.08)]",
                    contentClassName,
                )}
            >
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    {content[activeCard].content ?? null}
                </div>
            </div>
        </div>
    );
};
