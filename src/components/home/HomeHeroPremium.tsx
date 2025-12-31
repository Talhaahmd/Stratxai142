"use client";

import React from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function HomeHeroPremium() {
    return (
        <section className="relative w-full h-[100svh] overflow-hidden">
            <BackgroundGradientAnimation
                /* Hatamex palette */
                gradientBackgroundStart="rgb(10, 6, 28)"   /* deep purple-black */
                gradientBackgroundEnd="rgb(7, 10, 26)"     /* deep navy */
                firstColor="30, 43, 255"                   /* #1E2BFF */
                secondColor="170, 80, 255"                 /* premium purple */
                thirdColor="255, 90, 210"                  /* pink glow */
                fourthColor="55, 120, 255"                 /* blue glow */
                fifthColor="110, 0, 255"                   /* violet */
                pointerColor="30, 43, 255"
                size="78%"
                blendingValue="hard-light"
                interactive
                containerClassName="h-[100svh] w-full"
            >
                {/* subtle vignette for premium depth */}
                <div className="absolute inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.55)_65%,rgba(0,0,0,0.75)_100%)]" />

                {/* content */}
                <div className="relative z-10 h-full w-full">
                    <div className="mx-auto max-w-6xl px-5 sm:px-8 h-full flex flex-col justify-center items-center text-center">
                        {/* pill */}
                        <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[12px] sm:text-[13px] font-medium tracking-wide text-white/80 backdrop-blur">
                            Data that drives growth
                        </div>

                        {/* headline */}
                        <h1 className="max-w-4xl text-white font-semibold tracking-tight leading-[1.05]
                           text-[36px] sm:text-[46px] md:text-[58px] lg:text-[68px]">
                            Analytics and A/B Testing That
                            <br className="hidden sm:block" />
                            Power Confident Decisions
                        </h1>

                        {/* sub */}
                        <p className="mt-5 max-w-2xl text-white/70 font-medium leading-relaxed
                          text-[14px] sm:text-[16px] md:text-[17px]">
                            We turn marketing metrics into clear insights that boost revenue instead of cluttering reports.
                        </p>

                        {/* CTA (matches screenshot style) */}
                        <div className="mt-8">
                            <button
                                className="rounded-2xl border border-white/20 bg-white/10 px-8 py-4
                           text-white/90 font-semibold backdrop-blur
                           hover:bg-white/15 hover:border-white/30 transition"
                            >
                                Start for Free
                            </button>
                        </div>

                        {/* logos row */}
                        <div className="mt-10 sm:mt-12 w-full">
                            <p className="text-white/45 text-[11px] sm:text-[12px] tracking-wide">
                                Tools We Trust to Turn Data Into Growth
                            </p>

                            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-90">
                                {/* placeholders, swap with real SVGs later */}
                                <LogoText>Tableau</LogoText>
                                <LogoText>Mixpanel</LogoText>
                                <LogoText>Hotjar</LogoText>
                                <LogoText>GA4</LogoText>
                                <LogoText>Amplitude</LogoText>
                            </div>
                        </div>
                    </div>
                </div>
            </BackgroundGradientAnimation>
        </section>
    );
}

function LogoText({ children }: { children: React.ReactNode }) {
    return (
        <div className="text-white/70 text-[14px] sm:text-[15px] font-semibold tracking-wide">
            {children}
        </div>
    );
}
