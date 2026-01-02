"use client";

import Carousel from "@/components/ui/carousel";

export default function CarouselDemo() {
    const slideData = [
        {
            title: "Innovation & Strategy",
            button: "Explore Our Approach",
            src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3534&auto=format&fit=crop",
        },
        {
            title: "AI-Powered Solutions",
            button: "Discover Our Technology",
            src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=3387&auto=format&fit=crop",
        },
        {
            title: "Global Impact",
            button: "See Our Reach",
            src: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=3456&auto=format&fit=crop",
        },
        {
            title: "Future-Ready Teams",
            button: "Meet Our Experts",
            src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3540&auto=format&fit=crop",
        },
    ];

    return (
        <div className="relative overflow-hidden w-full h-full py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
                    Our Journey in Pictures
                </h2>
                <p className="text-center text-neutral-600 max-w-2xl mx-auto">
                    Explore the milestones and moments that define StratX AI
                </p>
            </div>
            <Carousel slides={slideData} />
        </div>
    );
}
