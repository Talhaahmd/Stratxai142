"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface CaseMedia {
    image_url: string;
    alt: string;
}

interface CaseImageStackProps {
    images: CaseMedia[];
}

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div ref={ref} className="relative h-screen w-full overflow-hidden">
            <motion.img
                src={src}
                alt={alt}
                style={{ y }}
                className="absolute inset-x-0 -top-[20%] h-[140%] w-full object-cover"
            />
        </div>
    );
}

export default function CaseImageStack({ images }: CaseImageStackProps) {
    if (!images || images.length === 0) return null;

    return (
        <section className="w-full">
            {images.map((img, i) => (
                <ParallaxImage
                    key={i}
                    src={img.image_url}
                    alt={img.alt || `Showcase ${i + 1}`}
                />
            ))}
        </section>
    );
}
