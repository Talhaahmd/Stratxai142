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
        category: "BRAND CONTENT",
        name: "Studio Avenue",
        image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=2400",
    },
    {
        category: "CREATOR CAMPAIGNS",
        name: "Northside Co.",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2400",
    },
    {
        category: "CONTENT SYSTEMS",
        name: "DailyDrop",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2400",
    },
];

const BRAND_ITEMS = [
    "Instagram",
    "LinkedIn",
    "TikTok",
    "YouTube",
    "Substack",
    "Instagram",
    "LinkedIn",
    "TikTok",
    "YouTube",
    "Substack",
];

const STICKY_BLOCKS = [
    {
        title: "Content strategy that matches your brand",
        description: "We don't believe in vanity metrics. We develop a content strategy that aligns with your brand's voice and business objectives, ensuring every piece of content serves a specific purpose in your customer's journey."
    },
    {
        title: "Production that looks premium, not generic",
        description: "In a world of noise, quality stands out. Our production team creates high-end visuals and written content that captures attention and builds trust, making your brand feel established and authoritative."
    },
    {
        title: "Distribution, consistency & growth loops",
        description: "Great content is only half the battle. We implement distribution systems that ensure your content reaches the right audience consistently, creating compounding growth loops for your brand's attention."
    }
];

export default function SocialMediaContent() {
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
                            Social Media & Content
                        </h1>

                        <p className="mt-5 sm:mt-6 text-neutral-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-[760px]">
                            We create content systems that build attention and trust—strategy,
                            production, and publishing—designed to compound over time.
                        </p>
                    </div>
                </div>
            </section>

            {/* Brands row + Full image project showcase */}
            <ProjectShowcase
                trustedLabel="Working with modern voices"
                brands={BRAND_ITEMS}
                projects={PROJECTS}
            />

            {/* EXTRA SPACE BEFORE STICKY SCROLL */}
            <section className="bg-white pt-14 sm:pt-16 md:pt-20 lg:pt-24">
                <StickyScrollContentSection
                    eyebrow="CONTENT"
                    title="Build a brand that commands attention"
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
