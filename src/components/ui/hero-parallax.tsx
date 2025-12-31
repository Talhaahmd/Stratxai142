"use client";
import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    MotionValue,
} from "motion/react";

interface Product {
    title: string;
    link: string;
    thumbnail: string;
    prompt: string;
    category: string;
}

export const HeroParallax = ({
    products,
}: {
    products: Product[];
}) => {
    const firstRow = products.slice(0, 5);
    const secondRow = products.slice(5, 10);
    const thirdRow = products.slice(10, 15);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

    const translateX = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1000]),
        springConfig
    );
    const translateXReverse = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, -1000]),
        springConfig
    );
    const rotateX = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [15, 0]),
        springConfig
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
        springConfig
    );
    const rotateZ = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [20, 0]),
        springConfig
    );
    const translateY = useSpring(
        useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
        springConfig
    );

    return (
        <div
            ref={ref}
            className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-black"
        >
            <Header />
            <motion.div
                style={{
                    rotateX,
                    rotateZ,
                    translateY,
                    opacity,
                }}
                className=""
            >
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
                    {firstRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row  mb-20 space-x-20 ">
                    {secondRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateXReverse}
                            key={product.title}
                        />
                    ))}
                </motion.div>
                <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
                    {thirdRow.map((product) => (
                        <ProductCard
                            product={product}
                            translate={translateX}
                            key={product.title}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export const Header = () => {
    return (
        <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-6 w-full left-0 top-0 text-white">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
                Revolutionize your <br className="hidden md:block" /> AI workflows
            </h1>
            <p className="max-w-2xl text-base md:text-xl mt-8 text-neutral-400 font-medium leading-relaxed">
                Explore Klarus' curation of high-performance AI prompts designed to scale intelligence,
                automate creative labor, and unlock the next frontier of digital innovation.
            </p>
        </div>
    );
};

export const ProductCard = ({
    product,
    translate,
}: {
    product: Product;
    translate: MotionValue<number>;
}) => {
    return (
        <motion.div
            style={{
                x: translate,
            }}
            whileHover={{
                y: -20,
            }}
            key={product.title}
            className="group/product h-64 w-[18rem] md:h-96 md:w-[30rem] relative shrink-0"
        >
            <div className="block group-hover/product:shadow-2xl h-full w-full relative">
                <img
                    src={product.thumbnail}
                    height="600"
                    width="600"
                    className="object-cover object-left-top absolute h-full w-full inset-0 rounded-2xl"
                    alt={product.title}
                />
                <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-40 bg-black pointer-events-none rounded-2xl transition-opacity"></div>
            </div>
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent rounded-t-2xl pointer-events-none" />
            <div className="absolute top-6 left-6 z-40">
                <p className="text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                    {product.category}
                </p>
                <h2 className="text-white font-bold text-2xl tracking-tight">
                    {product.title}
                </h2>
            </div>
        </motion.div>
    );
};
