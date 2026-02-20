import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PremiumHero() {
    const [isLoaded, setIsLoaded] = useState(false);
    const SplineViewer = "spline-viewer" as any;

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative h-screen w-full bg-[#0B0B0B] overflow-hidden">

            {/* SPLINE TRUE BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">

                {/* force spline canvas to behave like background */}
                <div
                    className="absolute top-1/2 right-[-12vw] -translate-y-1/2"
                    style={{
                        width: "1100px",
                        height: "1100px",
                        opacity: isLoaded ? 1 : 0,
                        transition: "opacity 800ms ease-out"
                    }}
                >
                    {/* ambient glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[140%] h-[140%] bg-[#2F5BFF] blur-[140px] opacity-[0.12] rounded-full" />
                    </div>

                    {/* spline viewer */}
                    <SplineViewer
                        url="/loop_cards.spline"
                        loading="eager"
                        events-target="global"
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                            background: "transparent"
                        }}
                    />
                </div>
            </div>

            {/* LEFT DARK GRADIENT FOR TEXT READABILITY */}
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
