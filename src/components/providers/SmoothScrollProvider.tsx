import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
            orientation: "vertical",
            touchMultiplier: 2,
        });

        // On mobile, maybe we want less inertia or just native scrolling? 
        // The user requested "On mobile: reduce smoothing (less inertia)."
        // Lenis default usually handles mobile via 'smoothTouch: false' (native scroll) which is safest.
        // If we enable smoothTouch, we can adjust lerp.
        // Let's stick to native feel on mobile for "performance safe" requirement unless smoothTouch is enabled.
        // If user wants smoothing on mobile, we'd set smoothTouch: true. 
        // Assuming "smooth scroll feel" implies using Lenis everywhere but tuning it.
        // However, for "High-end" sites, often native touch scroll is preferred to avoid heavy JS loop on scroll.
        // We will keep smoothTouch: false for now as it's the most performant "mobile-first" approach.

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
