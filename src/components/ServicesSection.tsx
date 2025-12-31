"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';

export interface ServiceItem {
    id: string;
    number: string;
    title: string;
    description: string;
}

export const services: ServiceItem[] = [
    {
        id: 'digital-development',
        number: '01',
        title: 'Digital Development',
        description: 'Custom-built websites and webshops that combine speed, conversion, and scalability.',
    },
    {
        id: 'performance-marketing',
        number: '02',
        title: 'Performance Marketing',
        description: 'Data-driven campaigns built on testing and conversion tracking for measurable growth.',
    },
    {
        id: 'ai-automation',
        number: '03',
        title: 'AI Automation Services',
        description: 'Smart workflows and AI integrations that eliminate busywork and deliver outcomes.',
    },
    {
        id: 'social-media-content',
        number: '04',
        title: 'Social Media & Content',
        description: 'Premium content systems and strategies designed to build attention and brand trust.',
    },
    {
        id: 'custom-app-solutions',
        number: '05',
        title: 'Custom App Solutions',
        description: 'Scalable mobile and web applications built to solve complex business workflows.',
    }
];

const ServicesSection: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string | null>(null);

    return (
        <section
            className="bg-black text-white py-20 md:py-32 font-sans border-t border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">

                    {/* Left Side: Header */}
                    <div className="flex flex-col gap-6 lg:sticky lg:top-32 h-fit">
                        <span className="text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">EXPERTISE</span>
                        <h2 className="text-3xl md:text-4xl lg:text-[52px] font-semibold leading-tight tracking-tight">
                            Expertise that performs
                        </h2>
                        <p className="text-[15px] md:text-[17px] text-white/50 leading-relaxed max-w-lg mt-3 font-medium">
                            Every organization moves differently. That's why we develop solutions
                            built on insight, expertise, and a deep understanding of your brand.
                            Our strategic, creative, and technological disciplines strengthen one
                            another giving you an approach that aligns precisely with the growth
                            you want to achieve.
                        </p>
                    </div>

                    {/* Right Side: Services List */}
                    <div className="flex flex-col border-t border-white/10">
                        {services.map((service) => (
                            <a
                                key={service.id}
                                href={`/services/${service.id}`}
                                className="group relative border-b border-white/10 py-10 md:py-12 cursor-pointer block"
                                onMouseEnter={() => setActiveItem(service.id)}
                                onMouseLeave={() => setActiveItem(null)}
                            >
                                <div className="flex items-start md:items-center justify-between gap-8">
                                    <div className="flex gap-8 md:gap-12 items-start">
                                        <span className="text-white/30 text-xs md:text-sm font-medium pt-1 md:pt-0">
                                            {service.number}
                                        </span>
                                        <div className="flex flex-col gap-2.5">
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight group-hover:translate-x-3 transition-transform duration-500">
                                                {service.title}
                                            </h3>
                                            <p className="text-[13px] md:text-sm text-white/40 max-w-md group-hover:text-white/70 transition-colors duration-500 leading-relaxed font-medium">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <motion.div
                                            animate={{ rotate: activeItem === service.id ? 45 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <svg className="w-6 h-6 md:w-8 md:h-8 text-white/20 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
