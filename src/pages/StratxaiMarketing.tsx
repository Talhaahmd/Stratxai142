import HatamexNavbar from '../components/HatamexNavbar';
import Footer from '../components/Footer';
import { IconDots } from "@tabler/icons-react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import CinematicSection from '@/components/CinematicSection';
import BookACall from '../components/BookACall';

const marketingContent = [
    {
        title: "Real Leads. Not Vanity Metrics.",
        description: (
            <>
                <p>
                    We run Meta Ads focused purely on lead generation, bringing in consistent,
                    real inquiries instead of likes or impressions.
                </p>
                <p>
                    Every campaign is optimized for conversions so your budget goes toward
                    people who are actually interested in your service.
                </p>
                <p>
                    Most businesses start seeing booked calls within days, not months.
                </p>
            </>
        ),
        content: (
            <div className="h-full w-full">
                <img
                    src="https://res.cloudinary.com/dt93sahp2/image/upload/v1769879152/3_cqzxkw.png"
                    className="h-full w-full object-cover rounded-2xl"
                    alt="Meta Ads Leads Results"
                />
            </div>
        ),
    },
    {
        title: "Lower Cost Per Lead. Higher Intent.",
        description: (
            <>
                <p>
                    We research your audience deeply and test multiple creatives to find
                    what actually converts.
                </p>
                <p>
                    Cost per lead is continuously reduced through data-driven optimization,
                    not guesswork.
                </p>
                <p>
                    The result is high-intent leads who are ready to talk, not just browse.
                </p>
            </>
        ),
        content: (
            <div className="h-full w-full">
                <img
                    src="https://res.cloudinary.com/dt93sahp2/image/upload/v1769879151/4_ww9ng9.png"
                    className="h-full w-full object-cover rounded-2xl"
                    alt="Cost Per Lead Performance"
                />
            </div>
        ),
    },
    {
        title: "Ads That Turn Clicks Into Booked Calls",
        description: (
            <>
                <p>
                    Our ads are built around conversion-focused funnels, not random traffic.
                </p>
                <p>
                    Every landing page is designed to guide visitors toward one clear action.
                </p>
                <p>
                    Less browsing, fewer distractions, and more calls booked directly on your calendar.
                </p>
            </>
        ),
        content: (
            <div className="h-full w-full">
                <img
                    src="https://res.cloudinary.com/dt93sahp2/image/upload/v1769879152/3_cqzxkw.png"
                    className="h-full w-full object-cover rounded-2xl"
                    alt="Ad Funnel Conversions"
                />
            </div>
        ),
    },
    {
        title: "We Scale What Works",
        description: (
            <>
                <p>
                    Losing ads are paused quickly so your budget is never wasted.
                </p>
                <p>
                    Winning campaigns are scaled with confidence using real performance data.
                </p>
                <p>
                    This keeps results stable over time without burnout or ad fatigue.
                </p>
            </>
        ),
        content: (
            <div className="h-full w-full">
                <img
                    src="https://res.cloudinary.com/dt93sahp2/image/upload/v1769879152/5_mn3aw8.png"
                    className="h-full w-full object-cover rounded-2xl"
                    alt="Ad Scaling Results"
                />
            </div>
        ),
    },
    {
        title: "Proof Over Promises",
        description: (
            <>
                <p>
                    We show real campaign data so you can see exactly how ads are performing.
                </p>
                <p>
                    Everything is transparent, from spend to results.
                </p>
                <p>
                    No buzzwords, no hiding behind reports that do not mean anything.
                </p>
            </>
        ),
        content: (
            <div className="h-full w-full">
                <img
                    src="https://res.cloudinary.com/dt93sahp2/image/upload/v1769879152/2_qkevp1.png"
                    className="h-full w-full object-cover rounded-2xl"
                    alt="Live Campaign Proof"
                />
            </div>
        ),
    },
    {
        title: "If You Want Results, Book the Call",
        description: (
            <>
                <p>
                    On the call, we walk you through exactly what we would run for your business.
                </p>
                <p>
                    You get clear numbers, a clear plan, and realistic expectations.
                </p>
                <p>
                    No pressure, no sales tricks, just clarity before you decide.
                </p>
            </>
        ),
        content: (
            <div className="h-full w-full">
                <img
                    src="https://res.cloudinary.com/dt93sahp2/image/upload/v1769879151/1_ahs5xq.png"
                    className="h-full w-full object-cover rounded-2xl"
                    alt="Book a Strategy Call"
                />
            </div>
        ),
    },
];


export default function StratxaiMarketing() {

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-[#1E2BFF] selection:text-white">
            <HatamexNavbar />

            {/* Full-screen Hero Section with Video Background */}
            <section className="relative min-h-[calc(100vh-80px)] bg-[#0B0B0B] overflow-hidden">
                {/* Background Video */}
                <div className="absolute inset-0 w-full h-full">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source
                            src="https://res.cloudinary.com/dt93sahp2/video/upload/v1769875242/social-media-icons-fly-over-city-downtown-showing-2025-12-17-22-08-31-utc_1_oz2vj9.mov"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>

                    {/* Black Gradient Overlay - stronger on left for text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-20 lg:py-24 min-h-[calc(100vh-80px)] flex items-center">
                    <div className="max-w-2xl">
                        {/* BADGE */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-[1px] w-12 bg-white/20" />
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-[11px] font-medium tracking-[0.2em] text-white/60 uppercase">
                                BOOK A CALL TODAY AND GET A FREE WEBSITE AUDIT
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white leading-[0.95] tracking-tight mb-8">
                            Your Complete Marketing Team For Just $499/month
                        </h1>

                        {/* Paragraph */}
                        <p className="text-sm md:text-base text-white/80 leading-relaxed mb-10 font-normal">
                            Stop guessing what works.

                            We handle everything. You focus on your business.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="/contact" className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#1E2BFF] text-white text-sm font-semibold tracking-wide rounded-xl hover:bg-[#1E2BFF]/90 transition-all duration-300 hover:scale-105">
                                BOOK A CALL
                                <IconDots className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                            </a>

                        </div>
                    </div>
                </div>
            </section>

            {/* Marketing Scroll Section */}
            <section className="bg-[#0B0B0B] py-20">
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .sticky-scroll-dark h2 {
                            color: white !important;
                        }
                        .sticky-scroll-dark p {
                            color: rgba(255, 255, 255, 0.6) !important;
                        }
                    `
                }} />
                <div className="sticky-scroll-dark">
                    <StickyScroll
                        content={marketingContent}
                        contentClassName="bg-[#0B0B0B] border-white/10"
                    />
                </div>
            </section>

            {/* Our Focus Section */}
            <section className="bg-[#0B0B0B] py-20 md:py-32 border-t border-white/10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
                    {/* Header */}
                    <div className="text-center mb-16 md:mb-20">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Our <span className="text-[#1E2BFF]">Focus.</span>
                        </h2>
                        <p className="text-base md:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
                            We specialize in strategic social media management, delivering measurable growth through personalized support.
                        </p>
                    </div>

                    {/* Focus Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {/* Listen */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-[#1E2BFF] mb-4">Listen</h3>
                            <p className="text-sm md:text-base text-white/50 leading-relaxed">
                                We actively listen to our clients, understanding their goals, challenges, and audience to gain insights into their brand identity.
                            </p>
                        </div>

                        {/* Plan */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-[#1E2BFF] mb-4">Plan</h3>
                            <p className="text-sm md:text-base text-white/50 leading-relaxed">
                                We develop customized social media strategies by analyzing market trends, competitor strategies, and audience preferences.
                            </p>
                        </div>

                        {/* Create */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-[#1E2BFF] mb-4">Create</h3>
                            <p className="text-sm md:text-base text-white/50 leading-relaxed">
                                Our team crafts engaging content that reflects our clients' brand, voice and values.
                            </p>
                        </div>

                        {/* Share */}
                        <div className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold text-[#1E2BFF] mb-4">Share</h3>
                            <p className="text-sm md:text-base text-white/50 leading-relaxed">
                                We strategically share content across social media platforms to maximize reach and engagement.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <CinematicSection />
            <BookACall theme="dark" />




            <Footer theme="dark" />
        </div>
    );
}
