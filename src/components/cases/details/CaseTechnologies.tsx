"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface CaseTechnologiesProps {
    technologies: string[];
    results_description: string;
}

export default function CaseTechnologies({ technologies, results_description }: CaseTechnologiesProps) {
    const containerRef = useRef<HTMLElement | null>(null);
    const words = useMemo(() => (results_description || "").split(" "), [results_description]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 20%"],
    });

    return (
        <section
            ref={containerRef}
            className="w-full bg-white py-20 md:py-32"
        >
            <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-start">

                    <div className="space-y-6">
                        <div className="text-[#1E2BFF] text-[11px] tracking-[0.25em] font-semibold uppercase">
                            RESULTS
                        </div>

                        <div className="font-semibold tracking-tight leading-[1.3] text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] select-none">
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
                    </div>

                    {/* Right side: Core Stack */}
                    {technologies && technologies.length > 0 && (
                        <div className="hidden lg:block pt-12">
                            <div className="space-y-8 pl-12 border-l border-black/5">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold tracking-widest text-black uppercase">CORE STACK</h4>
                                    <ul className="space-y-2 text-sm font-medium text-neutral-500">
                                        {technologies.map((tech, i) => (
                                            <li key={i}>{tech}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}

function WordReveal({ progress, range, text }: { progress: any; range: [number, number]; text: string }) {
    const letters = text.split("");

    return (
        <span className="inline-block">
            {letters.map((char, i) => {
                const charStart = range[0] + (i / letters.length) * (range[1] - range[0]);
                const charEnd = range[0] + ((i + 1) / letters.length) * (range[1] - range[0]);

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
            <span className="inline-block">&nbsp;</span>
        </span>
    );
}

function LetterReveal({ children, progress, range }: { children: string; progress: any; range: [number, number] }) {
    const color = useTransform(progress, range, ["rgba(163, 163, 163, 1)", "rgba(0, 0, 0, 1)"]);

    return (
        <motion.span
            style={{ color }}
            className="inline transition-colors duration-200"
        >
            {children}
        </motion.span>
    );
}
