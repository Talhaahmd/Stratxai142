"use client";

import HatamexNavbar from "../components/HatamexNavbar";
import BookACall from "../components/BookACall";
import Footer from "../components/Footer";

import AboutUsHero from "../components/about/AboutUsHero";
import ResultsSection from "../components/ResultsSection";
import OurStorySection from "../components/about/OurStorySection";
import TimelineDemo from "../components/timeline-demo";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#1E2BFF] selection:text-white overflow-x-hidden">
            <HatamexNavbar useSpacer={false} />

            <AboutUsHero />

            <ResultsSection />

            <OurStorySection />

            <TimelineDemo />

            <div id="book-a-call">
                <BookACall theme="dark" />
            </div>
            <Footer theme="dark" />
        </div>
    );
}
