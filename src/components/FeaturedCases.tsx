import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { IconArrowRight, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
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
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-black/5 bg-white shadow-sm transition-all duration-500 ease-out">
                {/* Default State Image & Overlay */}
                <div className="relative w-full h-full overflow-hidden">
                    <motion.img
                        src={caseStudy.thumbnail_url}
                        alt={caseStudy.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        animate={{
                            height: isExpanded ? "40%" : "100%",
                            y: 0
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Default State Content Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 flex flex-col justify-between"
                        animate={{ opacity: isExpanded ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex">
                            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white tracking-widest uppercase">
                                ● {caseStudy.category}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1.5">{caseStudy.title}</h3>
                                <p className="text-white/80 text-xs line-clamp-2 max-w-[90%] font-medium">
                                    {caseStudy.short_description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {caseStudy.what_we_did.slice(0, 2).map((tag, i) => (
                                    <span key={i} className="border border-white/20 px-2.5 py-0.5 rounded-full text-[8px] font-medium text-white/90 uppercase">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Blue Strip (Default) */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-12 bg-[#1E2BFF] flex items-center justify-between px-5"
                    >
                        <motion.div
                            className="flex items-center justify-between w-full"
                            animate={{ y: isExpanded ? "100%" : 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="text-white font-bold text-[10px] tracking-widest uppercase">SEE WORK</span>
                            <IconArrowRight className="text-white w-4 h-4" />
                        </motion.div>
                    </div>

                    {/* Expanded State Content - Glassmorphism */}
                    <motion.div
                        className="absolute top-[40%] inset-x-0 bottom-0 bg-white/70 backdrop-blur-xl p-6 overflow-hidden border-t border-white/30"
                        initial={{ y: "100%" }}
                        animate={{ y: isExpanded ? 0 : "100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="space-y-4 h-full flex flex-col justify-center">
                            <div>
                                <h3 className="text-2xl font-bold text-black leading-tight tracking-tight">{caseStudy.title}</h3>
                                <p className="text-[#86868b] text-sm font-medium mt-2 leading-relaxed line-clamp-3">
                                    {caseStudy.short_description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {caseStudy.what_we_did.map((tag, i) => (
                                    <span key={i} className="bg-[#1E2BFF] px-3 py-1.5 rounded-full text-[8px] font-bold text-white tracking-wide uppercase">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
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
