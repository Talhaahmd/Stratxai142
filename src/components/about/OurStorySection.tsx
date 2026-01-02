"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const STORY_TEXT =
    "StratX AI exists to turn advanced technology into clear, practical business advantage. We believe AI should simplify decisions, accelerate execution, and deliver measurable impact, not complexity or hype. Built at the intersection of strategy and engineering, StratX AI designs scalable, ethical, and outcome-driven systems that help organizations move faster, operate smarter, and grow with confidence in an increasingly complex world.";

export default function OurStorySection() {
    const containerRef = useRef<HTMLElement | null>(null);
    const words = useMemo(() => STORY_TEXT.split(" "), []);

    // Scroll progress for the section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 75%", "end 25%"],
    });

    return (
        <section ref={containerRef} className="w-full bg-white py-20 md:py-32">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-[1000px]">
                    <div className="text-[#1E2BFF] text-[11px] tracking-[0.22em] font-semibold uppercase mb-8">
                        OUR STORY
                    </div>

                    <div className="font-semibold tracking-tight leading-[1.15] text-[24px] sm:text-[32px] md:text-[42px] lg:text-[48px] select-none">
                        {words.map((word, i) => {
                            const start = i / words.length;
                            const end = (i + 1) / words.length;

                            return (
                                <WordReveal
                                    key={i}
                                    progress={scrollYProgress}
                                    range={[start, end]}
                                    text={word}
                                />
                            );
                        })}
                    </div>

                    <div className="mt-12 md:mt-16 border-t border-black/5 pt-8">
                        <p className="text-sm md:text-base text-neutral-500">
                            Founder & CEO – StratX AI
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ================= WORD REVEAL ================= */

function WordReveal({
    progress,
    range,
    text,
}: {
    progress: any;
    range: [number, number];
    text: string;
}) {
    const letters = text.split("");

    return (
        <span className="inline-block">
            {letters.map((char, i) => {
                const charStart =
                    range[0] + (i / letters.length) * (range[1] - range[0]);
                const charEnd =
                    range[0] + ((i + 1) / letters.length) * (range[1] - range[0]);

                return (
                    <LetterReveal
                        key={i}
                        progress={progress}
                        range={[charStart, charEnd]}
                    >
                        {char}
                    </LetterReveal>
                );
            })}

            {/* ✅ EXPLICIT SPACE BETWEEN WORDS */}
            <span className="inline-block">&nbsp;</span>
        </span>
    );
}

/* ================= LETTER REVEAL ================= */

function LetterReveal({
    children,
    progress,
    range,
}: {
    children: string;
    progress: any;
    range: [number, number];
}) {
    const color = useTransform(progress, range, [
        "rgba(163, 163, 163, 1)",
        "rgba(0, 0, 0, 1)",
    ]);

    return (
        <motion.span style={{ color }} className="inline transition-colors duration-150">
            {children}
        </motion.span>
    );
}
