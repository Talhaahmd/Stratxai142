import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { ParallaxY } from "./motion/Parallax";
import { Reveal } from "./motion/Reveal";
import { supabase } from "@/lib/supabaseClient";

export interface Case {
    id: string;
    category: string;
    title: string;
    short_description: string;
    thumbnail_url: string;
    what_we_did: string[];
    slug: string;
    is_featured: boolean;
    published: boolean;
    order_index: number;
}

const CaseCard = ({ caseStudy }: { caseStudy: Case }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <a
            href={`/cases/${caseStudy.slug}`}
            className="relative flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[28vw] h-[480px] snap-start group cursor-pointer block"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-black/5 bg-white shadow-sm transition-all duration-500 ease-out hover:shadow-xl">
                {/* Default State Image & Overlay */}
                <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                    <div className="absolute inset-0 w-full h-[120%] -top-[10%]">
                        <ParallaxY speed={-30} className="w-full h-full">
                            <motion.img
                                src={caseStudy.thumbnail_url}
                                alt={caseStudy.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                animate={{
                                    opacity: isExpanded ? 0.4 : 1
                                }}
                                transition={{ duration: 0.5 }}
                            />
                        </ParallaxY>
                    </div>

                    {/* Default State Content Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-between"
                        animate={{ opacity: isExpanded ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex">
                            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[9px] font-bold text-white tracking-widest uppercase">
                                ● {caseStudy.category}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <Reveal variant="fadeUp" duration={0.5}>
                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{caseStudy.title}</h3>
                                </Reveal>
                                <Reveal variant="fadeUp" delay={0.1} duration={0.5}>
                                    <p className="text-white/80 text-sm line-clamp-2 max-w-[90%] font-medium leading-relaxed">
                                        {caseStudy.short_description}
                                    </p>
                                </Reveal>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {caseStudy.what_we_did.slice(0, 2).map((tag, i) => (
                                    <span key={i} className="border border-white/20 px-3 py-1 rounded-full text-[9px] font-medium text-white/90 uppercase tracking-wide">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Blue Strip (Default) */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-14 bg-[#1E2BFF] flex items-center justify-between px-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                    >
                        <div className="flex items-center justify-between w-full text-white">
                            <span className="font-bold text-[10px] tracking-widest uppercase">View Case Study</span>
                            <IconArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    {/* Expanded State Content - Glassmorphism */}
                    <motion.div
                        className="absolute inset-0 bg-black/40 backdrop-blur-md p-8 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ pointerEvents: 'none' }}
                    >
                        {/* Simplified expanded state to focus on visual cleanness */}
                    </motion.div>
                </div>
            </div>
        </a>
    );
};

const CaseSkeleton = () => (
    <div className="flex-shrink-0 w-[80vw] md:w-[40vw] lg:w-[28vw] h-[480px] rounded-2xl bg-neutral-100 animate-pulse border border-black/5" />
);

export default function FeaturedCases() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFeaturedCases() {
            try {
                const { data, error } = await supabase
                    .from('case_studies')
                    .select('*')
                    .eq('is_featured', true)
                    .eq('published', true)
                    .order('order_index', { ascending: true });

                if (error) throw error;
                setCases(data || []);
            } catch (err) {
                console.error("Error fetching cases:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchFeaturedCases();
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    if (!loading && cases.length === 0) return null;

    return (
        <section className="bg-white py-20 md:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="max-w-xl">
                        <span className="text-[#1E2BFF] font-bold tracking-widest uppercase text-[10px]">CASES</span>
                        <h2 className="text-2xl md:text-4xl font-semibold text-black tracking-tight mt-3 mb-4">
                            Featured cases
                        </h2>
                        <p className="text-[#86868b] text-[15px] md:text-[17px] font-medium leading-relaxed">
                            We believe in work that shifts brand perception and drives measurable results.
                        </p>
                    </div>

                    <a href="/cases" className="bg-[#1E2BFF] font-bold text-white px-5 py-2.5 rounded-lg text-[9px] tracking-widest uppercase hover:bg-blue-700 transition-colors flex items-center gap-2 group whitespace-nowrap mb-1 no-underline">
                        VIEW MORE CASES
                        <IconArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>

            <div className="relative group">
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-[max(1.5rem,calc((100vw-80rem)/2))] pb-10 cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {loading ? (
                        [1, 2, 3].map((i) => <CaseSkeleton key={i} />)
                    ) : (
                        cases.map((caseStudy) => (
                            <CaseCard key={caseStudy.id} caseStudy={caseStudy} />
                        ))
                    )}
                </div>

                {!loading && cases.length > 0 && (
                    <div className="flex justify-end gap-2 px-6 max-w-7xl mx-auto -mt-4">
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 flex items-center justify-center border border-black/5 rounded-lg hover:bg-black/5 transition-colors"
                        >
                            <IconChevronLeft className="w-5 h-5 text-black" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 flex items-center justify-center border border-black/5 rounded-lg hover:bg-black/5 transition-colors"
                        >
                            <IconChevronRight className="w-5 h-5 text-black" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );

}

// Dummy data for exports if needed by other components
export const cases: Case[] = [
    {
        id: "1",
        category: "Fintech",
        title: "Revolutionizing Digital Banking",
        short_description: "A complete overhaul of the digital banking experience for a leading fintech startup.",
        thumbnail_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
        what_we_did: ["UX/UI Design", "Mobile App"],
        slug: "digital-banking",
        is_featured: true,
        published: true,
        order_index: 0
    },
    {
        id: "2",
        category: "E-commerce",
        title: "Global Fashion Marketplace",
        short_description: "Scaling a fashion marketplace to reach millions of users worldwide with a seamless shopping experience.",
        thumbnail_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop",
        what_we_did: ["Web Development", "Strategy"],
        slug: "fashion-marketplace",
        is_featured: true,
        published: true,
        order_index: 1
    },
    {
        id: "3",
        category: "Healthcare",
        title: "AI-Powered Diagnostics",
        short_description: "Leveraging diagnostic AI to improve patient outcomes and streamline medical workflows.",
        thumbnail_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1470&auto=format&fit=crop",
        what_we_did: ["AI Integration", "Product Design"],
        slug: "ai-diagnostics",
        is_featured: true,
        published: true,
        order_index: 2
    }
];
