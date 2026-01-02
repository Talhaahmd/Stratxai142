"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
    videoSrc: string;
    overlayLines?: string[];
};

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function smoothstep(x: number) {
    return x * x * (3 - 2 * x);
}

export default function Header26Video({
    videoSrc,
    overlayLines = [
        "We move where others are still",
        "observing",
        "We build where new space",
        "begins to open",
        "We create what",
        "reaches beyond what exists today",
    ],
}: Props) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    /* ---------------- TEXT META ---------------- */
    const charMeta = useMemo(() => {
        const chars = overlayLines.map((l) => l.split(""));
        let total = 0;
        const offsets: number[] = [];

        chars.forEach((l) => {
            offsets.push(total);
            total += l.length;
        });

        return { chars, offsets, total };
    }, [overlayLines]);

    /* ---------------- VIDEO READY ---------------- */
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onLoad = () => setDuration(v.duration || 0);
        v.addEventListener("loadedmetadata", onLoad);
        return () => v.removeEventListener("loadedmetadata", onLoad);
    }, []);

    /* ---------------- SCROLL → PROGRESS ---------------- */
    useEffect(() => {
        const onScroll = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();
            const scrollLength = rect.height - window.innerHeight;
            const scrolled = clamp(-rect.top / scrollLength, 0, 1);

            setProgress(scrolled);

            if (videoRef.current && duration > 0) {
                videoRef.current.currentTime = scrolled * duration;
                videoRef.current.pause();
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);
    }, [duration]);

    /* ---------------- LETTER STYLE ---------------- */
    const letterStyle = (i: number): React.CSSProperties => {
        const at = i / Math.max(1, charMeta.total - 1);
        const band = 0.08;

        const intensity = 1 - clamp(Math.abs(progress - at) / band, 0, 1);
        const glow = smoothstep(intensity);
        const active = progress >= at;

        return {
            color: active ? "#fff" : "rgba(255,255,255,0.25)",
            textShadow: active
                ? `0 0 ${24 * glow}px rgba(255,255,255,${0.6 * glow})`
                : "none",
            transition: "color 80ms ease, text-shadow 80ms ease",
            whiteSpace: "pre",
            display: "inline-block",
        };
    };

    /* ---------------- RENDER ---------------- */
    return (
        <section
            ref={sectionRef}
            className="relative h-[300vh] bg-black"
        >
            {/* PINNED STAGE */}
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* VIDEO */}
                <div className="absolute inset-0 z-0">
                    <video
                        ref={videoRef}
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* TEXT */}
                <div className="relative z-10 h-full flex items-center">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="font-semibold tracking-tight leading-tight">
                            {charMeta.chars.map((line, i) => (
                                <div
                                    key={i}
                                    className="flex flex-wrap text-[18px] sm:text-[24px] md:text-[32px] lg:text-[40px]"
                                >
                                    {line.map((ch, j) => (
                                        <span
                                            key={`${i}-${j}`}
                                            style={letterStyle(charMeta.offsets[i] + j)}
                                        >
                                            {ch === " " ? "\u00A0" : ch}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
