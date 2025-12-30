"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ExpandableCardDemo() {
    const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
        null
    );
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <div className="bg-[#fbfbfd] py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-semibold text-[#1d1d1f] tracking-tight mb-4"
                    >
                        STRATEGIC FOUNDATION
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-[#86868b] font-medium"
                    >
                        Showcasing our AI products
                    </motion.p>
                </div>

                <AnimatePresence>
                    {active && typeof active === "object" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-white/40 backdrop-blur-xl h-full w-full z-[90]"
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {active && typeof active === "object" ? (
                        <div className="fixed inset-0 grid place-items-center z-[100] px-4">
                            <motion.button
                                key={`button-${active.title}-${id}`}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-6 right-6 flex items-center justify-center bg-[#f5f5f7]/80 backdrop-blur-md rounded-full h-10 w-10 shadow-sm border border-black/5"
                                onClick={() => setActive(null)}
                            >
                                <CloseIcon />
                            </motion.button>
                            <motion.div
                                layoutId={`card-${active.title}-${id}`}
                                ref={ref}
                                className="w-full max-w-[600px] h-fit max-h-[90vh] flex flex-col bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[32px] overflow-hidden"
                            >
                                <motion.div layoutId={`image-${active.title}-${id}`}>
                                    <img
                                        src={active.src}
                                        alt={active.title}
                                        className="w-full h-72 lg:h-80 object-cover object-top"
                                    />
                                </motion.div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    <div className="flex justify-between items-start p-8 pb-4">
                                        <div>
                                            <motion.h3
                                                layoutId={`title-${active.title}-${id}`}
                                                className="text-2xl font-bold text-[#1d1d1f]"
                                            >
                                                {active.title}
                                            </motion.h3>
                                            <motion.p
                                                layoutId={`description-${active.description}-${id}`}
                                                className="text-lg text-[#86868b] mt-1"
                                            >
                                                {active.description}
                                            </motion.p>
                                        </div>

                                        <motion.a
                                            layoutId={`button-${active.title}-${id}`}
                                            href={active.ctaLink}
                                            target="_blank"
                                            className="px-6 py-2.5 text-sm rounded-full font-bold bg-[#0071e3] hover:bg-[#0077ed] text-white transition-colors"
                                        >
                                            {active.ctaText}
                                        </motion.a>
                                    </div>
                                    <div className="p-8 pt-0 relative">
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-[#424245] text-base leading-relaxed flex flex-col gap-4"
                                        >
                                            {typeof active.content === "function"
                                                ? active.content()
                                                : active.content}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : null}
                </AnimatePresence>

                <ul className="max-w-4xl mx-auto w-full grid grid-cols-1 gap-6">
                    {cards.map((card) => (
                        <motion.div
                            layoutId={`card-${card.title}-${id}`}
                            key={`card-${card.title}-${id}`}
                            onClick={() => setActive(card)}
                            className="p-6 flex flex-col md:flex-row justify-between items-center bg-white/60 backdrop-blur-md border border-white/20 hover:bg-white/80 transition-all rounded-[24px] cursor-pointer shadow-sm hover:shadow-md group"
                        >
                            <div className="flex gap-6 flex-col md:flex-row items-center">
                                <motion.div layoutId={`image-${card.title}-${id}`}>
                                    <img
                                        width={80}
                                        height={80}
                                        src={card.src}
                                        alt={card.title}
                                        className="h-20 w-20 md:h-24 md:w-24 rounded-2xl object-cover object-top shadow-sm"
                                    />
                                </motion.div>
                                <div className="text-center md:text-left">
                                    <motion.h3
                                        layoutId={`title-${card.title}-${id}`}
                                        className="text-xl font-semibold text-[#1d1d1f]"
                                    >
                                        {card.title}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`description-${card.description}-${id}`}
                                        className="text-[#86868b] text-base"
                                    >
                                        {card.description}
                                    </motion.p>
                                </div>
                            </div>
                            <motion.button
                                layoutId={`button-${card.title}-${id}`}
                                className="px-6 py-2 text-sm rounded-full font-bold bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white transition-all mt-4 md:mt-0 shadow-sm"
                            >
                                {card.ctaText}
                            </motion.button>
                        </motion.div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};

const cards = [
    {
        description: "Lana Del Rey",
        title: "Summertime Sadness",
        src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
        ctaText: "Play",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            );
        },
    },
    {
        description: "Babbu Maan",
        title: "Mitran Di Chhatri",
        src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
        ctaText: "Play",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Babu Maan, a legendary Punjabi singer, is renowned for his soulful
                    voice and profound lyrics that resonate deeply with his audience. Born
                    in the village of Khant Maanpur in Punjab, India, he has become a
                    cultural icon in the Punjabi music industry. <br /> <br /> His songs
                    often reflect the struggles and triumphs of everyday life, capturing
                    the essence of Punjabi culture and traditions. With a career spanning
                    over two decades, Babu Maan has released numerous hit albums and
                    singles that have garnered him a massive fan following both in India
                    and abroad.
                </p>
            );
        },
    },

    {
        description: "Metallica",
        title: "For Whom The Bell Tolls",
        src: "https://assets.aceternity.com/demos/metallica.jpeg",
        ctaText: "Play",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Metallica, an iconic American heavy metal band, is renowned for their
                    powerful sound and intense performances that resonate deeply with
                    their audience. Formed in Los Angeles, California, they have become a
                    cultural icon in the heavy metal music industry. <br /> <br /> Their
                    songs often reflect themes of aggression, social issues, and personal
                    struggles, capturing the essence of the heavy metal genre. With a
                    career spanning over over four decades, Metallica has released numerous hit
                    albums and singles that have garnered them a massive fan following
                    both in the United States and abroad.
                </p>
            );
        },
    },
    {
        description: "Led Zeppelin",
        title: "Stairway To Heaven",
        src: "https://assets.aceternity.com/demos/led-zeppelin.jpeg",
        ctaText: "Play",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Led Zeppelin, a legendary British rock band, is renowned for their
                    innovative sound and profound impact on the music industry. Formed in
                    London in 1968, they have become a cultural icon in the rock music
                    world. <br /> <br /> Their songs often reflect a blend of blues, hard
                    rock, and folk music, capturing the essence of the 1970s rock era.
                    With a career spanning over a decade, Led Zeppelin has released
                    numerous hit albums and singles that have garnered them a massive fan
                    following both in the United Kingdom and abroad.
                </p>
            );
        },
    },
    {
        description: "Mustafa Zahid",
        title: "Toh Phir Aao",
        src: "https://assets.aceternity.com/demos/toh-phir-aao.jpeg",
        ctaText: "Play",
        ctaLink: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    &quot;Aawarapan&quot;, a Bollywood movie starring Emraan Hashmi, is
                    renowned for its intense storyline and powerful performances. Directed
                    by Mohit Suri, the film has become a significant work in the Indian
                    film industry. <br /> <br /> The movie explores themes of love,
                    redemption, and sacrifice, capturing the essence of human emotions and
                    relationships. With a gripping narrative and memorable music,
                    &quot;Aawarapan&quot; has garnered a massive fan following both in
                    India and abroad, solidifying Emraan Hashmi&apos;s status as a
                    versatile actor.
                </p>
            );
        },
    },
];
