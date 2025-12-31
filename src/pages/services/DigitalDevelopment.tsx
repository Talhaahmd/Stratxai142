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
        category: "ELECTRICAL ENGINEERING",
        name: "BMR Elektra",
        image:
            "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=2400",
    },
    {
        category: "CONSTRUCTION",
        name: "Arslan Group",
        image:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2400",
    },
    {
        category: "HEALTHCARE",
        name: "Nova Clinics",
        image:
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2400",
    },
];

const BRAND_ITEMS = [
    "Arslan Group",
    "Four Stories",
    "ADCM",
    "Elektra",
    "Kolkke",
    "Arslan Group",
    "Four Stories",
    "ADCM",
    "Elektra",
    "Kolkke",
];

export default function DigitalDevelopment() {
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
                            Digital Development
                        </h1>

                        <p className="mt-5 sm:mt-6 text-neutral-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-[760px]">
                            We build next-level websites and webshops with fast code, smart architecture,
                            and a seamless brand experience designed for lasting commercial results.
                        </p>
                    </div>
                </div>
            </section>

            {/* Brands row + Full image project showcase */}
            <ProjectShowcase
                trustedLabel="Trusted by innovators worldwide"
                brands={BRAND_ITEMS}
                projects={PROJECTS}
            />

            {/* EXTRA SPACE BEFORE STICKY SCROLL (mobile optimized) */}
            <section className="bg-white pt-14 sm:pt-16 md:pt-20 lg:pt-24">
                <StickyScrollContentSection />
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
