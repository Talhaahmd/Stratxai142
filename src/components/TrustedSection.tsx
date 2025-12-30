import React from 'react';

const COMPANIES = [
    "Stripe", "Shopify", "Vercel", "Notion", "Linear",
    "Figma", "Webflow", "Atlassian", "HubSpot", "AWS"
];

const TrustedSection: React.FC = () => {
    return (
        <section className="bg-black text-white py-32 md:py-48 px-6 md:px-10 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20">

                {/* Left: Heading */}
                <div className="flex-shrink-0">
                    <h2 className="text-xl md:text-2xl font-normal tracking-tight text-white/90 leading-tight max-w-[200px]">
                        Trusted by innovators worldwide
                    </h2>
                </div>

                {/* Right: Logos/Cards Marquee-style or Grid */}
                <div className="flex-1 w-full overflow-hidden mask-fade-horizontal">
                    <div className="flex gap-4 animate-marquee-left">
                        {[...COMPANIES, ...COMPANIES].map((company, idx) => (
                            <div
                                key={`${company}-${idx}`}
                                className="flex-shrink-0 w-36 h-20 md:w-48 md:h-24 border border-[#2A2A2A] rounded-sm flex items-center justify-center group hover:border-white/20 transition-all duration-300"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-white/40 group-hover:text-white transition-opacity duration-300 font-medium text-base md:text-lg tracking-wide">
                                        {company}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default TrustedSection;
