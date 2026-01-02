import { Timeline } from "@/components/ui/timeline";

export default function CompanyTimeline() {
    const data = [
        {
            title: "2024 — Foundation",
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        2024 marked the foundation phase of StratX AI. This year was focused on
                        building internal capability, refining execution standards, and
                        establishing the core direction of the company. We worked across
                        websites, digital systems, and early AI workflows, prioritizing
                        reliability, performance, and real business use cases over experimentation.
                    </p>

                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        The objective was simple: build strong delivery fundamentals and a
                        repeatable execution process that could later support scale. This year
                        shaped our operational discipline and technical depth.
                    </p>
                </div>
            ),
        },

        {
            title: "2025 — Scale & Visibility",
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        2025 became the scale year. StratX AI expanded beyond foundational work
                        into structured growth. We scaled internal operations, improved delivery
                        standards, and formalized our AI offering with a strong focus on HR AI
                        systems and applied automation.
                    </p>

                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        This year also marked our entry into global visibility. We participated
                        in major AI events, including the Global AI Show, positioning StratX AI
                        as a serious execution partner rather than a conceptual AI studio.
                    </p>

                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        By the end of 2025, StratX AI had transitioned from a build-focused
                        company into a scale-ready AI firm with clear service lines, stronger
                        governance, and international exposure.
                    </p>
                </div>
            ),
        },

        {
            title: "2026 — International Expansion",
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        2026 represents the expansion phase. StratX AI is entering new markets,
                        beginning with the United Kingdom and the United Arab Emirates. This
                        phase is focused on regional partnerships, enterprise deployments, and
                        adapting AI systems for international regulatory and operational
                        environments.
                    </p>

                    <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                        The objective is not rapid geographic presence, but sustainable global
                        growth. Our focus remains on building long-term value through reliable,
                        ethical, and outcome-driven AI systems for organizations operating at
                        scale.
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
