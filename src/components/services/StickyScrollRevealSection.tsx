import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollBlockProps {
    children: React.ReactNode;
    index: number;
    setActive: (index: number) => void;
}

const ScrollBlock = ({ children, index, setActive }: ScrollBlockProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActive(index);
                }
            },
            {
                rootMargin: "-40% 0px -40% 0px",
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [index, setActive]);

    return (
        <div ref={ref} className="py-12 md:py-16 first:pt-0 last:pb-[30vh]">
            {children}
        </div>
    );
};

export const StickyScrollRevealSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const blocks = [
        {
            eyebrow: "WHY DIGITAL DEVELOPMENT",
            title: "Een strategisch fundament dat je merk écht vooruit helpt",
            content: "Digital development is more than just code. It's the technical realization of your brand's vision and business objectives. We create digital products that are built to scale and engineered to convert."
        },
        {
            content: "Our approach ensures that every pixel and every line of code serves a purpose, creating a seamless experience for your users and a robust foundation for your business growth.",
            subpoints: [
                { title: "Scalable Architecture", desc: "Systemen die meegroeien met je ambities, zonder technische beperkingen." },
                { title: "Conversion Driven", desc: "Focus op resultaat door middel van snelle laadtijden en intuïtieve UX." }
            ]
        },
        {
            content: "We bridge the gap between technical complexity and business value. Our team works iteratively to ensure that your digital product remains competitive in a fast-paced market."
        },
        {
            content: "Expert engineering using modern technologies and best practices in development ensures that your solution is not only beautiful but also performant and maintainable.",
            cta: "SEE WHAT WE DO"
        }
    ];

    return (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto overflow-visible">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                {/* Left Column - Scrolling Text */}
                <div className="max-w-[560px]">
                    {blocks.map((block, i) => (
                        <ScrollBlock key={i} index={i} setActive={setActiveIndex}>
                            <div
                                className={`transition-colors duration-300 ${activeIndex === i ? "text-neutral-950" : "text-neutral-400"
                                    }`}
                            >
                                {block.eyebrow && (
                                    <span className="text-[#1E2BFF] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
                                        {block.eyebrow}
                                    </span>
                                )}
                                {block.title && (
                                    <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-8">
                                        {block.title}
                                    </h2>
                                )}
                                <p className="text-lg md:text-xl leading-relaxed mb-8">
                                    {block.content}
                                </p>

                                {block.subpoints && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                                        {block.subpoints.map((pt, j) => (
                                            <div key={j} className="space-y-3">
                                                <h4 className="text-lg font-bold">{pt.title}</h4>
                                                <p className="text-sm leading-relaxed opacity-70">{pt.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {block.cta && (
                                    <div className="pt-6">
                                        <button className="border-2 border-[#1E2BFF] text-[#1E2BFF] font-bold text-xs tracking-widest uppercase px-8 py-3.5 rounded-lg hover:bg-[#1E2BFF] hover:text-white transition-all duration-300">
                                            {block.cta}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </ScrollBlock>
                    ))}
                </div>

                {/* Right Column - Sticky Visual */}
                <div className="hidden lg:block sticky top-24 h-[420px] md:h-[520px] w-full bg-neutral-950 rounded-[28px] overflow-hidden flex items-center justify-center p-12">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl p-8 w-full max-w-[320px] shadow-2xl space-y-4"
                    >
                        <div className="flex gap-1.5 mb-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-100" />
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-100" />
                            <div className="w-2.5 h-2.5 rounded-full bg-neutral-100" />
                        </div>
                        <div className="h-4 w-3/4 bg-neutral-50 rounded" />
                        <div className="h-4 w-1/2 bg-neutral-50 rounded" />
                        <div className="pt-4 h-24 bg-[#1E2BFF]/5 rounded-lg border border-[#1E2BFF]/10 flex items-center justify-center text-[#1E2BFF] font-bold text-xs uppercase tracking-widest">
                            Visual 0{activeIndex + 1}
                        </div>
                    </motion.div>
                </div>

                {/* Mobile View Visual (Static/Stack) */}
                <div className="lg:hidden w-full bg-neutral-950 rounded-[22px] aspect-video flex items-center justify-center p-6 mt-4">
                    <div className="bg-white rounded-lg p-4 w-full max-w-[200px] shadow-xl text-center text-[10px] font-bold text-[#1E2BFF] uppercase tracking-widest">
                        Visual 0{activeIndex + 1}
                    </div>
                </div>

            </div>
        </section>
    );
};
