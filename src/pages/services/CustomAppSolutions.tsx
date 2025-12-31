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
        category: "MOBILE PLATFORM",
        name: "Atlas App",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2400",
    },
    {
        category: "MARKETPLACE SYSTEM",
        name: "ProLink",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2400",
    },
    {
        category: "INTERNAL TOOLING",
        name: "OpsConsole",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2400",
    },
];

const BRAND_ITEMS = [
    "iOS",
    "Android",
    "React Native",
    "Node.js",
    "AWS",
    "iOS",
    "Android",
    "React Native",
    "Node.js",
    "AWS",
];

const STICKY_BLOCKS = [
    {
        title: "Architecture designed for scale",
        description: "We don't just build for now; we build for your future. Our team designs robust architectures that can handle rapid user growth and evolving business requirements without compromising on stability."
    },
    {
        title: "Polished UI with performance in mind",
        description: "A great app must be both beautiful and fast. We focus on creating smooth, intuitive user interfaces that respond instantly, providing a premium experience that keeps your users engaged."
    },
    {
        title: "Launch, support & iteration",
        description: "Deployment is just the beginning. We provide full launch support and continuous iteration based on real-world usage and feedback, ensuring your custom solution stays ahead of the curve."
    }
];

export default function CustomAppSolutions() {
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
                            Custom App Solutions
                        </h1>

                        <p className="mt-5 sm:mt-6 text-neutral-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-[760px]">
                            We build custom apps that solve real workflows—fast, secure,
                            and scalable—across mobile and web.
                        </p>
                    </div>
                </div>
            </section>

            {/* Brands row + Full image project showcase */}
            <ProjectShowcase
                trustedLabel="Building enterprise-grade apps"
                brands={BRAND_ITEMS}
                projects={PROJECTS}
            />

            {/* EXTRA SPACE BEFORE STICKY SCROLL */}
            <section className="bg-white pt-14 sm:pt-16 md:pt-20 lg:pt-24">
                <StickyScrollContentSection
                    eyebrow="APPLICATIONS"
                    title="Workflows solved with custom technology"
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
