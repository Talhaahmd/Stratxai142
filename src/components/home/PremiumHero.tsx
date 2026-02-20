import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PremiumHero() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const SplineViewer = "spline-viewer" as any;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 50);

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return (
        <section className="relative h-screen w-full bg-[#0B0B0B] overflow-hidden">

            {/* SPLINE BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">

                <div
                    className="absolute top-1/2 right-[-12vw] -translate-y-1/2"
                    style={{
                        width: isMobile ? "700px" : "1100px",
                        height: isMobile ? "700px" : "1100px",
                        opacity: isLoaded ? 1 : 0,
                        transition: "opacity 800ms ease-out"
                    }}
                >

                    {/* MOBILE OPTIMIZED GLOW */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className={`w-[140%] h-[140%] bg-[#2F5BFF] rounded-full opacity-[0.12] ${isMobile ? "blur-[50px]" : "blur-[140px]"
                                }`}
                        />
                    </div>

                    {/* SPLINE VIEWER — LOW POWER MODE ON MOBILE */}
                    <SplineViewer
                        url="/loop_cards.spline"
                        loading="eager"
                        events-target="global"
                        render-mode={isMobile ? "low-power" : "high-performance"}
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                            background: "transparent",

                            // CRITICAL PERFORMANCE FIX
                            transform: "translateZ(0)",
                            willChange: "transform"
                        }}
                    />

                </div>
            </div>

            {/* GRADIENT */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(90deg, #0B0B0B 0%, rgba(11,11,11,0.96) 30%, rgba(11,11,11,0.7) 55%, rgba(11,11,11,0) 75%)"
                }}
            />

            {/* CONTENT */}
            <div className="relative z-20 h-full flex items-center">
                <div className="max-w-[580px] pl-6 md:pl-20">

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                        className="text-white text-[40px] md:text-[72px] font-bold leading-[1.05] tracking-[-0.03em] mb-6"
                    >
                        We put AI at the core of everything we do.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                        className="text-white/70 text-[18px] leading-[1.6] mb-10"
                    >
                        We design AI-powered apps and marketing systems that automate growth,
                        attract qualified customers, and help brands scale faster with less manual effort.
                    </motion.p>

                    <motion.a
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.3 }}
                        href="/contact"
                        className="inline-flex px-[28px] py-[16px] bg-[#2F5BFF] text-white font-medium text-[16px] rounded-[8px] transition-all duration-300 hover:bg-[#3A66FF] hover:shadow-[0_0_40px_rgba(47,91,255,0.45)]"
                    >
                        Start Your Project
                    </motion.a>

                </div>
            </div>

            {/* GRAIN */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        </section>
    );
}
