"use client";

import HatamexNavbar from "../components/HatamexNavbar";
import BookACall from "../components/BookACall";
import Footer from "../components/Footer";

import Header26Video from "../components/about/Header26Video";
import ResultsSection from "../components/ResultsSection";
import OurStorySection from "../components/about/OurStorySection";
import TimelineDemo from "../components/timeline-demo";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#1E2BFF] selection:text-white overflow-x-hidden">
            <HatamexNavbar useSpacer={false} />

            <Header26Video
                videoSrc="https://player.cloudinary.com/embed/?cloud_name=dt93sahp2&public_id=70a70a7e-a661-4114-98a2-3b56a854664e-0_oqlxqw&profile=cld-default"
                overlayLines={[
                    "We move where others are still",
                    "observing",
                    "We build where new space",
                    "begins to open",
                    "We create what",
                    "reaches beyond what exists today",
                ]}
            />

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
