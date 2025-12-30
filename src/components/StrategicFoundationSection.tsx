"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function StrategicFoundationSection() {
    return (
        <section className="bg-white text-black py-20 px-6 md:py-32 border-t border-black/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 md:mb-16 text-center md:text-left">
                    <span className="text-[#1E2BFF] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">STRATEGIC FOUNDATION</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight mt-4 mb-6 text-black">
                        The drive behind everything we build
                    </h2>
                    <p className="text-black/50 text-base md:text-lg max-w-2xl leading-relaxed">
                        We don’t just create strategies — we show the numbers. Growth means higher conversions, lower costs, and
                        stronger brands. Discover how we help brands grow smarter.
                    </p>
                </div>

                <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                    <GridItem
                        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                        icon={<Box className="h-4 w-4 text-black" />}
                        title="Do things the right way"
                        description="We focus on clarity and precision in every line of strategy, ensuring your brand stands on solid ground."
                    />

                    <GridItem
                        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                        icon={<Settings className="h-4 w-4 text-black" />}
                        title="Data-Driven Decisions"
                        description="Our insights are powered by real data, not just trends. We build foundations that scale with your growth."
                    />

                    <GridItem
                        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                        icon={<Lock className="h-4 w-4 text-black" />}
                        title="Reliably Secure"
                        description="Trust is our currency. We implement secure-by-design principles across all our creative and technical solutions."
                    />

                    <GridItem
                        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                        icon={<Sparkles className="h-4 w-4 text-black" />}
                        title="Magic in the Details"
                        description="Excellence is found in the small things. We refine every pixel and polish every interaction to perfection."
                    />

                    <GridItem
                        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                        icon={<Search className="h-4 w-4 text-black" />}
                        title="Future-Proof Vision"
                        description="We stay ahead of the curve so you don't have to. Our solutions are built to last in an evolving digital landscape."
                    />
                </ul>
            </div>
        </section>
    );
}

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            <div className="relative h-full rounded-2xl border border-black/[0.08] p-2 md:rounded-3xl md:p-3 bg-neutral-50 shadow-sm">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    variant="white"
                />
                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 shadow-[0px_0px_15px_rgba(0,0,0,0.02)]">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-neutral-200 p-2 bg-white">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem]">
                                {title}
                            </h3>
                            <p className="font-sans text-sm/[1.125rem] text-black/60 md:text-base/[1.375rem]">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
