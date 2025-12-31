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
        category: "OPERATIONS AUTOMATION",
        name: "FlowOps",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2400",
    },
    {
        category: "CUSTOMER SUPPORT AI",
        name: "ResolveDesk",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=2400",
    },
    {
        category: "SALES ENABLEMENT",
        name: "Pipeline AI",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2400",
    },
];

const BRAND_ITEMS = [
    "OpenAI",
    "Make.com",
    "Zapier",
    "Anthropic",
    "LangChain",
    "OpenAI",
    "Make.com",
    "Zapier",
    "Anthropic",
    "LangChain",
];

const STICKY_BLOCKS = [
    {
        title: "Automations built around your process",
        description: "We don't force you into a tool. We map your existing workflows and build custom AI automations that eliminate manual tasks, reduce errors, and free up your team for higher-value work."
    },
    {
        title: "Integrations across your stack",
        description: "Our solutions connect seamlessly with your CRM, communication tools, and databases. We ensure data flows flawlessly between systems, creating a unified and efficient operational backbone."
    },
    {
        title: "Reliable monitoring & continuous improvement",
        description: "AI systems need maintenance. We provide ongoing monitoring to ensure your automations are running smoothly and continuously refine them as your business evolves and new AI capabilities emerge."
    }
];

export default function AIAutomation() {
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
                            AI Automation Services
                        </h1>

                        <p className="mt-5 sm:mt-6 text-neutral-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-[760px]">
                            We design automation systems that eliminate busywork, connect your tools,
                            and deliver outcomes—using AI agents, workflows, and smart integrations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Brands row + Full image project showcase */}
            <ProjectShowcase
                trustedLabel="Innovating with AI-first companies"
                brands={BRAND_ITEMS}
                projects={PROJECTS}
            />

            {/* EXTRA SPACE BEFORE STICKY SCROLL */}
            <section className="bg-white pt-14 sm:pt-16 md:pt-20 lg:pt-24">
                <StickyScrollContentSection
                    eyebrow="AUTOMATION"
                    title="Scale your operations with intelligent systems"
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
