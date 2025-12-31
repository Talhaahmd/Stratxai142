"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Project = {
    category: string;
    name: string;
    image: string;
};

type Props = {
    trustedLabel?: string;
    brands?: string[];
    projects: Project[];
};

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

export default function ProjectShowcase({
    trustedLabel = "Trusted by innovators worldwide",
    brands = [],
    projects,
}: Props) {
    const [active, setActive] = useState(0);

    const sectionRef = useRef<HTMLElement | null>(null);
    const [parallax, setParallax] = useState({ img: 0, panel: 0 });

    const touch = useRef({ startX: 0, startY: 0, dragging: false });

    const project = useMemo(() => projects[active], [projects, active]);

    const next = () => setActive((p) => (p + 1) % projects.length);
    const prev = () => setActive((p) => (p - 1 + projects.length) % projects.length);

    /* ---------------- PARALLAX ---------------- */
    useEffect(() => {
        let raf = 0;

        const update = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const vh = window.innerHeight || 800;

            const progress = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
            setParallax({
                img: (progress - 0.5) * 34,
                panel: (progress - 0.5) * 18,
            });
        };

        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    /* ---------------- MOBILE SWIPE ---------------- */
    const onTouchStart = (e: React.TouchEvent) => {
        const t = e.touches[0];
        touch.current = { startX: t.clientX, startY: t.clientY, dragging: true };
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!touch.current.dragging) return;
        const t = e.touches[0];
        if (Math.abs(t.clientY - touch.current.startY) > Math.abs(t.clientX - touch.current.startX)) return;
        e.preventDefault();
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touch.current.dragging) return;
        touch.current.dragging = false;

        const dx = e.changedTouches[0].clientX - touch.current.startX;
        if (dx > 45) prev();
        if (dx < -45) next();
    };

    return (
        <section ref={sectionRef} className="bg-white">
            {/* ---------- BRAND MARQUEE ---------- */}
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-6 items-center">
                    <div className="text-lg text-neutral-900">{trustedLabel}</div>

                    <div className="relative overflow-hidden">
                        <div className="flex gap-8 items-center animate-marquee">
                            {brands.map((b, i) => (
                                <div
                                    key={`${b}-${i}`}
                                    className="shrink-0 h-16 w-[240px] px-6 flex items-center justify-center border border-neutral-200 bg-white text-neutral-500 text-sm"
                                >
                                    {b}
                                </div>
                            ))}
                        </div>

                        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* ---------- FULL IMAGE SHOWCASE ---------- */}
            <div
                className="relative w-full overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div className="relative h-[70vh] min-h-[520px] md:h-[80vh]">
                    <img
                        src={project.image}
                        alt={project.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            transform: `translateY(${parallax.img}px) scale(1.04)`,
                        }}
                    />

                    {/* CTA PANEL */}
                    <div
                        className="absolute top-8 right-8 w-[640px] max-w-[calc(100%-2rem)] bg-white shadow-xl"
                        style={{ transform: `translateY(${parallax.panel}px)` }}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#1E2BFF]" />
                                    <span className="text-sm uppercase tracking-wide">{project.category}</span>
                                </div>

                                <div className="flex gap-3">
                                    <button className="w-12 h-12 border border-neutral-300 bg-white" />
                                    <button className="w-12 h-12 border border-neutral-300 bg-white" />
                                </div>
                            </div>

                            <h3 className="mt-3 text-4xl font-medium">{project.name}</h3>
                        </div>

                        <button className="w-full bg-[#1E2BFF] text-white py-5 px-7 uppercase tracking-widest flex justify-between">
                            <span>SEE WORK</span>
                            <span>••</span>
                        </button>
                    </div>

                    {/* LARGE NAV BUTTONS */}
                    <div className="hidden md:flex absolute right-8 bottom-8 gap-4">
                        <button
                            onClick={prev}
                            className="w-20 h-20 bg-white/60 backdrop-blur-xl border border-white/40 flex items-center justify-center text-2xl"
                        >
                            ←
                        </button>
                        <button
                            onClick={next}
                            className="w-20 h-20 bg-white/60 backdrop-blur-xl border border-white/40 flex items-center justify-center text-2xl"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            {/* GLOBAL MARQUEE KEYFRAMES */}
            <style>{`
        .animate-marquee {
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
}
