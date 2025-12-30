"use client";


import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function AppleCardsCarouselDemo() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-16 md:py-24 bg-white dark:bg-black">
            <h2 className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 font-sans tracking-tight">
                Get to know Klarus.
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                The first rule of growth is to build something remarkable.
                            </span>{" "}
                            We focus on the intersections of creativity, technology, and strategy to move your brand forward with confidence.
                        </p>
                        <img
                            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2526&auto=format&fit=crop"
                            alt="Macbook mockup"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-8"
                        />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Artificial Intelligence",
        title: "AI-Powered Brand Scaling.",
        src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop",
        content: <DummyContent />,
    },
    {
        category: "Productivity",
        title: "Optimized Performance Workflows.",
        src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop",
        content: <DummyContent />,
    },
    {
        category: "Creative",
        title: "Bold Design for the Modern Era.",
        src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop",
        content: <DummyContent />,
    },

    {
        category: "Technology",
        title: "Building the Foundations of Tomorrow.",
        src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop",
        content: <DummyContent />,
    },
    {
        category: "Vision",
        title: "Clarity in a Complex World.",
        src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop",
        content: <DummyContent />,
    },
    {
        category: "Growth",
        title: "Join the Future of Digital Agency.",
        src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop",
        content: <DummyContent />,
    },
];
