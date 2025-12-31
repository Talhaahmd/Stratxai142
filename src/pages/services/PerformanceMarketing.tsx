"use client";

import HatamexNavbar from "../../components/HatamexNavbar";
import FeaturedCases from "../../components/FeaturedCases";
import BookACall from "../../components/BookACall";
import Footer from "../../components/Footer";
import StickyScrollContentSection from "../../components/services/StickyScrollContentSection";
import ProjectShowcase from "../../components/services/ProjectShowcase";
import ServicesSection from "../../components/ServicesSection";

const PROJECTS = [
    {
        category: "ECOMMERCE GROWTH",
        name: "Luna Commerce",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2400",
    },
    {
        category: "LEAD GENERATION",
        name: "Orion Clinics",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2400",
    },
    {
        category: "SAAS ACQUISITION",
        name: "Pilot CRM",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536ad0b?q=80&w=2400",
    },
];

const BRAND_ITEMS = [
    "Google Ads",
    "Meta Ads",
    "TikTok Ads",
    "LinkedIn Ads",
    "HubSpot",
    "Google Ads",
    "Meta Ads",
    "TikTok Ads",
    "LinkedIn Ads",
    "HubSpot",
];

const STICKY_BLOCKS = [
    {
        title: "Creative testing that scales",
        description: "We don't just set and forget. We continuously test different creative angles, messaging, and visual formats to identify what resonates most with your audience and drives the lowest cost per acquisition."
    },
    {
        title: "Tracking, attribution & conversion clarity",
        description: "Stop guessing which channel is working. We implement advanced server-side tracking and attribution models that show exactly where your customers come from and how they convert."
    },
    {
        title: "Always-on optimization",
        description: "Our team proactively manages your campaigns daily, shifting budget toward high-performing segments and refining audience targeting to ensure your growth is sustainable and efficient."
    }
];

export default function PerformanceMarketing() {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#1E2BFF] selection:text-white overflow-x-hidden">
            <HatamexNavbar />

            {/* COMPACT HERO */}
            <section className="bg-white pt-16 md:pt-20 pb-8">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-[880px]">
                        <div className="text-[#1E2BFF] text-[11px] tracking-[0.22em] font-semibold uppercase mb-4">
                            SERVICES
                        </div>

                        <h1 className="text-[44px] leading-[1.02] tracking-tight font-bold sm:text-[54px] md:text-[76px]">
                            Performance Marketing
                        </h1>

                        <p className="mt-5 sm:mt-6 text-neutral-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-[760px]">
                            We run performance-driven campaigns built on testing, creative iteration,
                            and conversion-focused tracking—so growth is measurable and scalable.
                        </p>
                    </div>
                </div>
            </section>

            {/* Brands row + Full image project showcase */}
            <ProjectShowcase
                trustedLabel="Trusted by high-growth startups"
                brands={BRAND_ITEMS}
                projects={PROJECTS}
            />

            {/* EXTRA SPACE BEFORE STICKY SCROLL */}
            <section className="bg-white pt-14 sm:pt-16 md:pt-20 lg:pt-24">
                <StickyScrollContentSection
                    eyebrow="PERFORMANCE"
                    title="Data-driven growth that actually performs"
                    blocks={STICKY_BLOCKS}
                />
            </section>

            {/* FEATURED CASES */}
            <FeaturedCases />

            {/* OUR SERVICES SECTION */}
            <ServicesSection />

            {/* BOOK A CALL */}
            <BookACall theme="dark" />

            <Footer theme="dark" />
        </div>
    );
}
