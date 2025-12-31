"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Block = {
    title: string;
    description: string;
};

type Props = {
    eyebrow?: string;
    title?: string;
    blocks?: Block[];
};

const defaultBlocks: Block[] = [
    {
        title: "Built on strategy, not on templates",
        description:
            "We don't build websites based on templates. We build them on your brand’s DNA. Every page is custom-designed for clarity, performance, and usability, guiding visitors naturally toward conversion.",
    },
    {
        title: "Built on the platform that fits your business",
        description:
            "From high-end custom code to flexible no-code solutions, we choose the right system for your organization. Everything connects seamlessly with your tools, systems, and payment providers.",
    },
    {
        title: "Continuous growth & optimization",
        description:
            "After launch, we continuously refine performance, conversions, and technical stability so your website stays fast, reliable, and effective.",
    },
];

export default function StickyScrollContentSection({
    eyebrow = "Digital development",
    title = "Creative production that makes brands stand out",
    blocks = defaultBlocks,
}: Props) {
    const [activeIdx, setActiveIdx] = useState(0);

    // store block DOM nodes (for IntersectionObserver)
    const refs = useRef<Array<HTMLDivElement | null>>([]);

    const sectionRef = useRef<HTMLElement | null>(null);
    const rightColRef = useRef<HTMLDivElement | null>(null);

    const [pinY, setPinY] = useState(0);

    // match your earlier top offset feel
    const TOP_OFFSET = 96; // px
    const IMAGE_H = 520; // pinned element height (square)

    /* ---------------- Grey → black reveal ---------------- */
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!("IntersectionObserver" in window)) return;

        const obs = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (!visible.length) return;

                visible.sort(
                    (a, b) =>
                        Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
                );

                const idx = refs.current.indexOf(visible[0].target as HTMLDivElement);
                if (idx !== -1) setActiveIdx(idx);
            },
            {
                rootMargin: "-45% 0px -45% 0px",
                threshold: 0.1,
            }
        );

        refs.current.forEach((el) => el && obs.observe(el));
        return () => obs.disconnect();
    }, [blocks]);

    /* ---------------- Sticky image movement ---------------- */
    const computePinY = () => {
        const section = sectionRef.current;
        const rightCol = rightColRef.current;
        if (!section || !rightCol) return;

        // Desktop only
        const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
        if (!isDesktop) {
            setPinY(0);
            return;
        }

        const scrollY = window.scrollY;

        const rect = section.getBoundingClientRect();
        const sectionTop = scrollY + rect.top;
        const sectionBottom = scrollY + rect.bottom;

        // start/end ranges for the pinned image to "travel"
        const start = sectionTop - TOP_OFFSET;
        const end = sectionBottom - TOP_OFFSET - IMAGE_H;

        const raw = scrollY - start;
        const max = Math.max(0, end - start);
        const clamped = Math.min(Math.max(raw, 0), max);

        setPinY(clamped);
    };

    const useSafeLayoutEffect =
        typeof window !== "undefined" ? useLayoutEffect : useEffect;

    useSafeLayoutEffect(() => {
        if (typeof window === "undefined") return;
        computePinY();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(computePinY);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", computePinY);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", computePinY);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section ref={sectionRef} className="bg-white overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:min-h-[170vh]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* LEFT COLUMN */}
                    <div className="max-w-[560px]">
                        <div className="mb-10">
                            <div className="text-[#1E2BFF] text-[10px] tracking-[0.22em] font-semibold uppercase mb-3">
                                {eyebrow}
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-semibold tracking-tight leading-tight text-neutral-950">
                                {title}
                            </h2>
                        </div>

                        {/* Mobile square image */}
                        <div className="lg:hidden w-full aspect-square rounded-2xl overflow-hidden bg-neutral-100 mb-10 shadow-sm">
                            <img
                                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80"
                                alt="Workspace"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            {blocks.map((b, i) => {
                                const isActive = i === activeIdx;
                                return (
                                    <div
                                        key={i}
                                        ref={(el: HTMLDivElement | null) => {
                                            refs.current[i] = el;
                                        }}
                                        className={`py-8 border-t border-neutral-100 first:border-t-0 transition-colors duration-300 ${isActive ? "text-neutral-950" : "text-neutral-400"
                                            }`}
                                    >
                                        <h3 className="text-lg md:text-xl font-semibold mb-3">
                                            {b.title}
                                        </h3>
                                        <p className="text-sm md:text-[15px] leading-relaxed max-w-prose">
                                            {b.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* spacer to keep scroll length so the image stays pinned */}
                        <div className="hidden lg:block h-[40vh]" />
                    </div>

                    {/* RIGHT COLUMN (PINNED SQUARE IMAGE) */}
                    <div ref={rightColRef} className="hidden lg:block relative">
                        <div className="relative w-full min-h-[720px]">
                            <div
                                style={{
                                    transform: `translate3d(0, ${pinY}px, 0)`,
                                    willChange: "transform",
                                }}
                                className="absolute top-0 left-0 w-full"
                            >
                                <div className="aspect-square w-full rounded-[26px] overflow-hidden bg-neutral-100 shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-black/5">
                                    <img
                                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1800&q=80"
                                        alt="Workspace"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END GRID */}
                </div>
            </div>
        </section>
    );
}
