import HatamexNavbar from "@/components/HatamexNavbar";
import AppleCardsCarouselDemo from "@/components/AppleCardsCarouselDemo";
import ServicesSection from "@/components/ServicesSection";
import BookACall from "@/components/BookACall";
import Footer from "@/components/Footer";

export default function OurClients() {
    return (
        <main className="min-h-screen bg-white selection:bg-[#1E2BFF] selection:text-white">
            <HatamexNavbar />

            {/* Hero Section */}
            <section className="bg-white pt-24 pb-8 md:pt-32 md:pb-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 sm:px-10">
                    <div className="max-w-4xl space-y-6 md:space-y-8 text-center md:text-left">
                        {/* Eyebrow */}
                        <span className="text-[#1E2BFF] font-bold tracking-[0.25em] uppercase text-[10px] md:text-[11px] block">
                            PARTNERSHIPS
                        </span>

                        {/* H1 */}
                        <h1 className="text-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] md:leading-[1.05]">
                            Growth is a <br className="hidden md:block" /> collaborative effort
                        </h1>

                        {/* Subtext */}
                        <p className="text-neutral-500 text-[14px] sm:text-[16px] md:text-[18px] max-w-2xl mx-auto md:mx-0 leading-relaxed font-medium">
                            We work with industry leaders and disruptive startups to build digital experiences that matter. Our clients aren't just names on a list — they are our partners in driving innovation and measurable growth.
                        </p>
                    </div>
                </div>
            </section>

            {/* Get to know StratX Section */}
            <AppleCardsCarouselDemo />

            {/* Service Section */}
            <ServicesSection />

            {/* Calendar Section */}
            <BookACall theme="dark" />

            {/* Footer Section */}
            <Footer theme="dark" />
        </main>
    );
}
