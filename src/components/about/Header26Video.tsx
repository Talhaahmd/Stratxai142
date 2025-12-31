"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
    videoSrc: string;
    overlayLines?: string[];
};

export type Header26VideoProps = React.ComponentPropsWithoutRef<"section"> &
    Partial<Props>;

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function smoothstep(edge0: number, edge1: number, x: number) {
    const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
}

function toDirectCloudinaryMp4(input: string) {
    try {
        if (input.includes("/video/upload/") && !input.includes("player.cloudinary.com")) {
            if (!/\.(mp4|webm|mov)(\?|#|$)/i.test(input)) return `${input}.mp4`;
            return input;
        }
        const u = new URL(input);
        const cloud = u.searchParams.get("cloud_name");
        const publicId = u.searchParams.get("public_id");
        if (cloud && publicId) {
            return `https://res.cloudinary.com/${cloud}/video/upload/${publicId}.mp4`;
        }
    } catch { }
    return input;
}

export default function Header26Video({
    videoSrc = "https://player.cloudinary.com/embed/?cloud_name=dt93sahp2&public_id=70a70a7e-a661-4114-98a2-3b56a854664e-0_oqlxqw&profile=cld-default",
    overlayLines = [
        "We move where others are still",
        "observing",
        "We build where new space",
        "begins to open",
        "We create what",
        "reaches beyond what exists today",
    ],
    ...rest
}: Header26VideoProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [duration, setDuration] = useState(0);
    const [ready, setVideoReady] = useState(false);

    const progressRef = useRef(0);
    const [progressUI, setProgressUI] = useState(0);

    const activeRef = useRef(false);
    const touchStartYRef = useRef(0);

    const resolvedVideoSrc = useMemo(() => toDirectCloudinaryMp4(videoSrc), [videoSrc]);

    const charMeta = useMemo(() => {
        const lines = overlayLines ?? [];
        const charsByLine = lines.map((l) => l.split(""));
        const totalChars = Math.max(1, charsByLine.reduce((acc, arr) => acc + arr.length, 0));

        const lineOffsets: number[] = [];
        let run = 0;
        for (let i = 0; i < charsByLine.length; i++) {
            lineOffsets.push(run);
            run += charsByLine[i].length;
        }
        return { lines, charsByLine, lineOffsets, totalChars };
    }, [overlayLines]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onLoaded = () => {
            const d = Number.isFinite(v.duration) ? v.duration : 0;
            setDuration(d);
            setVideoReady(true);
            v.pause();
            v.currentTime = 0;
        };

        v.addEventListener("loadedmetadata", onLoaded);
        return () => v.removeEventListener("loadedmetadata", onLoaded);
    }, [resolvedVideoSrc]);

    const setProgress = (p: number) => {
        const next = clamp(p, 0, 1);
        progressRef.current = next;
        setProgressUI(next);

        const v = videoRef.current;
        if (ready && v && duration > 0) {
            const t = clamp(next * duration, 0, Math.max(0, duration - 0.03));
            if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t;
            v.pause();
        }
    };

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                // We consider active when mostly in view
                activeRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.5;
            },
            { threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const wheelSpeed = 0.0011;
        const touchSpeed = 0.0014;

        const onWheel = (e: WheelEvent) => {
            if (!activeRef.current) return;

            const p = progressRef.current;
            const movingForward = e.deltaY > 0;
            const movingBackward = e.deltaY < 0;

            // Boundary checks: Only prevent default if we are scrubbing
            if (movingForward && p < 0.999) {
                e.preventDefault();
                setProgress(p + e.deltaY * wheelSpeed);
            } else if (movingBackward && p > 0.001) {
                e.preventDefault();
                setProgress(p + e.deltaY * wheelSpeed);
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            if (!activeRef.current) return;
            touchStartYRef.current = e.touches[0]?.clientY ?? 0;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!activeRef.current) return;

            const p = progressRef.current;
            const y = e.touches[0]?.clientY ?? touchStartYRef.current;
            const dy = touchStartYRef.current - y; // swipe up => positive delta
            touchStartYRef.current = y;

            const movingForward = dy > 0;
            const movingBackward = dy < 0;

            if (movingForward && p < 0.999) {
                e.preventDefault();
                setProgress(p + dy * touchSpeed);
            } else if (movingBackward && p > 0.001) {
                e.preventDefault();
                setProgress(p + dy * touchSpeed);
            }
        };

        document.addEventListener("wheel", onWheel, { passive: false, capture: true });
        document.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
        document.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });

        return () => {
            document.removeEventListener("wheel", onWheel as any, true);
            document.removeEventListener("touchstart", onTouchStart as any, true);
            document.removeEventListener("touchmove", onTouchMove as any, true);
        };
    }, [ready, duration]);

    const letterStyle = (globalIndex: number): React.CSSProperties => {
        const total = charMeta.totalChars;
        const at = globalIndex / Math.max(1, total - 1);

        const p = progressUI;
        const active = p >= at;

        const band = 0.06;
        const intensity = 1 - clamp(Math.abs(p - at) / band, 0, 1);
        const glow = smoothstep(0, 1, intensity);

        return {
            color: active ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.28)",
            opacity: active ? 1 : 0.4,
            textShadow: active ? `0 0 ${22 * glow}px rgba(255,255,255,${0.55 * glow})` : "none",
            transition: "color 90ms ease-out, opacity 90ms ease-out, text-shadow 90ms ease-out",
            display: "inline-block",
            whiteSpace: "pre",
            willChange: "color, opacity, text-shadow",
        };
    };

    return (
        <section ref={sectionRef} className="relative w-full bg-black h-[100svh] overflow-hidden" {...rest}>
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                >
                    <source src={resolvedVideoSrc} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/30" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_55%,rgba(0,0,0,0.7)_100%)]" />
            </div>

            {/* Visual Content: Pinned overlay text */}
            <div className="relative z-10 h-full w-full flex items-center">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
                    <div className="max-w-[840px] select-none">
                        <div className="font-semibold tracking-tight leading-[1.12]">
                            {charMeta.lines.map((_, lineIdx) => {
                                const offset = charMeta.lineOffsets[lineIdx];
                                const chars = charMeta.charsByLine[lineIdx];

                                return (
                                    <div
                                        key={lineIdx}
                                        className="flex flex-wrap text-[18px] sm:text-[24px] md:text-[32px] lg:text-[40px]"
                                    >
                                        {chars.map((ch, i) => (
                                            <span key={`${lineIdx}-${i}`} style={letterStyle(offset + i)}>
                                                {ch === " " ? "\u00A0" : ch}
                                            </span>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-8 text-white/30 text-xs sm:text-sm tracking-widest uppercase font-medium">
                            We are StratX AI
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
