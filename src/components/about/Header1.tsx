"use client";

import { Button } from "@/components/ui/Button";
import type { ButtonProps } from "@/components/ui/Button";

type ImageProps = {
    src: string;
    alt?: string;
};

type Props = {
    heading: string;
    description: string;
    buttons: ButtonProps[];
    image: ImageProps;
};

export type Header1Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Header1 = (props: Header1Props) => {
    const { heading, description, buttons, image } = {
        ...Header1Defaults,
        ...props,
    };

    return (
        <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
                    <div>
                        <h1 className="mb-5 text-4xl font-bold md:mb-6 md:text-6xl lg:text-7xl leading-tight">
                            {heading}
                        </h1>
                        <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                            {buttons.map((button, index) => (
                                <Button key={index} {...button}>
                                    {button.title}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="w-full">
                        <img
                            src={image.src}
                            className="w-full h-auto object-cover rounded-2xl shadow-2xl"
                            alt={image.alt}
                            loading="eager"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export const Header1Defaults: Props = {
    heading: "Building the Future of AI-Powered Business Solutions",
    description:
        "At StratX AI, we combine cutting-edge artificial intelligence with strategic business insights to help companies transform their operations, automate workflows, and unlock new growth opportunities.",
    buttons: [
        { title: "Get Started", variant: "primary" },
        { title: "Learn More", variant: "secondary" }
    ],
    image: {
        src: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
        alt: "StratX AI Team Collaboration",
    },
};
