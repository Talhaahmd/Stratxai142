import { Timeline } from "@/components/ui/timeline";

const Img = ({ src, alt }: { src: string; alt: string }) => (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-neutral-100">
        <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            loading="lazy"
        />
    </div>
);

export default function CompanyTimeline() {
    const data = [
        {
            title: "2023",
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        2023 was the foundation year. We focused on website development and media services, with delivery centered on fast performance, clean UX, and conversion-ready pages. We shipped websites for service businesses and product-led brands, and supported them with content assets and launch creatives. The goal was simple. Build reliable digital execution and a repeatable delivery process.
                    </p>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Img
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop"
                            alt="Website development"
                        />
                        <Img
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop"
                            alt="Media production"
                        />
                        <Img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop"
                            alt="Creative workflow"
                        />
                    </div>

                    <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                        Placeholder stats you can finalize: websites shipped, average load time improvement, conversion uplift, content assets produced.
                    </p>
                </div>
            ),
        },

        {
            title: "2024",
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        2024 is where AI became the focus. We built an HR AI product and showcased it at demo days. The feedback pushed us beyond features and into real usage. We improved workflows, onboarding, and reliability, then moved toward production-ready AI systems. Within the same year, we expanded our AI work into automation and integrations so AI could plug into real business operations.
                    </p>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Img
                            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop"
                            alt="Product demo"
                        />
                        <Img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                            alt="AI systems"
                        />
                    </div>

                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        This year shaped our service direction. We started offering AI automation services alongside development, including workflow automation, data pipelines, and AI assisted internal tools.
                    </p>

                    <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                        Placeholder stats you can finalize: demo days attended, product iterations shipped, automation workflows deployed, average time saved per workflow.
                    </p>
                </div>
            ),
        },

        {
            title: "2025",
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        2025 became the scale year. We signed multinational companies and upgraded delivery standards across documentation, security, and QA. We also pushed into global visibility through Canada demo shows and Global AI events. At the same time, UstaHub expanded to 6 countries: Georgia, Armenia, Uzbekistan, Russia, Indonesia, and Malaysia. UstaHub crossed 2,000+ organic downloads in Asia, with no paid growth.
                    </p>

                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        This year also matured our web and AI services. Web delivery improved with stronger SEO foundations and conversion-first structures. AI delivery improved through production automation, structured data flows, and agent-like workflows for real operations.
                    </p>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Img
                            src="https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?q=80&w=1600&auto=format&fit=crop"
                            alt="Global event"
                        />
                        <Img
                            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop"
                            alt="Enterprise delivery"
                        />
                        <Img
                            src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1600&auto=format&fit=crop"
                            alt="Product growth"
                        />
                    </div>

                    <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                        Confirmed stats included: 6 countries, 2,000+ organic downloads in Asia. Add your final numbers for multinational clients, demo shows, and event appearances.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <div className="relative w-full overflow-hidden">
            <Timeline data={data} />
        </div>
    );
}
