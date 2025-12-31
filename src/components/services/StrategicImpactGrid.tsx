import { IconBriefcase, IconLayout, IconBolt, IconSettings, IconDatabase } from '@tabler/icons-react';

export const StrategicImpactGrid = () => {
    const mainCards = [
        { title: "Website Architecture & Planning", desc: "Rigorous planning to ensure your digital ecosystem is built on a solid, future-proof foundation.", icon: <IconBriefcase /> },
        { title: "UI Engineering & Design Systems", desc: "Crafting beautiful, reusable components that ensure consistency across all your digital touchpoints.", icon: <IconLayout /> },
        { title: "Performance & SEO Foundations", desc: "Speed is a feature. We optimize for Core Web Vitals and search rankings from day one.", icon: <IconBolt /> },
    ];

    const bottomCards = [
        { title: "Integrations & Automations", desc: "Connecting your digital stack to streamline workflows and unlock data-driven insights.", icon: <IconSettings /> },
        { title: "CMS & Content Workflows", desc: "Empowering your team with intuitive tools to manage content effortlessly and at scale.", icon: <IconDatabase /> },
    ];

    const Card = ({ title, desc, icon, className = "" }: { title: string; desc: string; icon: React.ReactNode; className?: string }) => (
        <div className={`p-10 rounded-[28px] border border-neutral-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col gap-8 ${className}`}>
            <div className="w-14 h-14 rounded-2xl bg-[#1E2BFF]/5 flex items-center justify-center text-[#1E2BFF]">
                {icon}
            </div>
            <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
                <p className="text-neutral-500 leading-relaxed text-base font-medium">{desc}</p>
            </div>
        </div>
    );

    return (
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50/50">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 md:mb-20">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-6xl font-bold tracking-tight leading-[1.1]">Development with strategic impact</h2>
                    </div>
                    <button className="bg-[#1E2BFF] text-white px-8 py-4 rounded-xl font-bold text-[11px] tracking-widest uppercase hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20 whitespace-nowrap">
                        SEE THE PRICING
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {mainCards.map((card, i) => (
                        <Card key={i} {...card} />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {bottomCards.map((card, i) => (
                        <Card key={i} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
};
