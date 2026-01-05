import { useRef, useState, useEffect } from "react";
import {
    IconArrowRight,
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";
import { supabase } from "@/lib/supabaseClient";

/* ================= TYPES ================= */

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

/* ================= CASE CARD ================= */
const CaseCard = ({ caseStudy }: { caseStudy: Case }) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <a
            href={`/cases/${caseStudy.slug}`}
            className="relative flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[45vw] lg:w-[30vw] h-[420px] md:h-[480px] snap-start block no-underline"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-md bg-white">

                {/* IMAGE */}
                <div className="absolute inset-0">
                    <img
                        src={caseStudy.thumbnail_url}
                        alt={caseStudy.title}
                        onError={() => console.error(`Failed to load image for ${caseStudy.title}:`, caseStudy.thumbnail_url)}
                        className={`w-full h-full object-cover transition-all duration-700 ease-out ${hovered ? "blur-[8px] scale-105" : "blur-0 scale-100"
                            }`}
                    />
                    <div
                        className={`absolute inset-0 transition-opacity duration-700 ${hovered ? "bg-black/20" : "bg-black/40"
                            }`}
                    />
                </div>

                {/* CATEGORY BADGE */}
                <div className="absolute top-4 left-4 z-30">
                    <span className="bg-white/90 px-3 py-1 rounded-full text-[9px] font-bold text-black uppercase tracking-widest">
                        ● {caseStudy.category}
                    </span>
                </div>

                {/* GLASS MORPHISM (BOTTOM HALF) */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-[60%] z-20 transition-all duration-700 ${hovered
                        ? "bg-white/60 backdrop-blur-xl"
                        : "bg-transparent backdrop-blur-0"
                        }`}
                />

                {/* CONTENT BLOCK (MOVES UP) */}
                <div
                    className={`absolute inset-x-0 bottom-0 z-30 p-5 transition-transform duration-700 ease-out ${hovered ? "-translate-y-12" : "translate-y-0"
                        }`}
                >
                    <h3
                        className={`font-bold mb-2 transition-all duration-700 ${hovered
                            ? "text-[#1E2BFF] scale-[1.05]"
                            : "text-white scale-100"
                            }`}
                        style={{ transformOrigin: "left bottom" }}
                    >
                        {caseStudy.title}
                    </h3>

                    <p
                        className={`text-sm line-clamp-2 mb-4 max-w-[90%] transition-all duration-700 ${hovered
                            ? "text-black/80 scale-[1.03]"
                            : "text-white/80 scale-100"
                            }`}
                        style={{ transformOrigin: "left bottom" }}
                    >
                        {caseStudy.short_description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {(caseStudy.what_we_did || []).slice(0, 3).map((tag: string, i: number) => (
                            <span
                                key={i}
                                className={`px-3 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wide transition-all duration-700 ${hovered
                                    ? "bg-[#1E2BFF] text-white scale-105"
                                    : "border border-white/50 text-white scale-100"
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* CTA BAR (ENTERS AFTER TEXT MOVES) */}
                <div
                    className={`absolute bottom-0 inset-x-0 z-40 bg-[#1E2BFF] transition-all duration-700 ease-out ${hovered
                        ? "translate-y-0 opacity-100 delay-150"
                        : "translate-y-full opacity-0"
                        }`}
                >
                    <div className="w-full py-4 flex items-center justify-center text-white text-[10px] font-bold tracking-widest uppercase gap-2">
                        VIEW CASE STUDY
                        <IconArrowRight size={16} />
                    </div>
                </div>

                {/* MOBILE CTA (ALWAYS VISIBLE, NO OVERLAP) */}
                <div className="md:hidden absolute bottom-0 inset-x-0 z-40 bg-[#1E2BFF]">
                    <div className="w-full py-4 flex items-center justify-center text-white text-[10px] font-bold tracking-widest uppercase gap-2">
                        SEE WORK
                        <IconArrowRight size={16} />
                    </div>
                </div>
            </div>
        </a>
    );
};

/* ================= SKELETON ================= */

const CaseSkeleton = () => (
    <div className="flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[45vw] lg:w-[30vw] h-[420px] sm:h-[450px] md:h-[480px] rounded-xl md:rounded-2xl bg-neutral-100 animate-pulse border border-black/5" />
);

/* ================= FEATURED CASES ================= */

export default function FeaturedCases() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);

    const resolveSupabaseUrl = (url: string) => {
        if (!url) return "";
        if (url.startsWith("http") || url.startsWith("https") || url.startsWith("/")) return url;
        // Fallback: assume it's a path in 'case-studies' bucket
        return supabase.storage.from('case-studies').getPublicUrl(url).data.publicUrl;
    };

    useEffect(() => {
        async function fetchCases() {
            const { data } = await supabase
                .from("case_studies")
                .select("*")
                .eq("is_featured", true)
                .eq("published", true)
                .order("order_index", { ascending: true });

            if (data) {
                console.log("FeaturedCases fetched:", data.length);
                const processedData = data.map((item: Case) => ({
                    ...item,
                    thumbnail_url: resolveSupabaseUrl(item.thumbnail_url)
                }));
                setCases(processedData);
            } else {
                console.error("FeaturedCases: No data returned from Supabase");
            }
            setLoading(false);
        }

        fetchCases();
    }, []);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        const { scrollLeft, clientWidth } = scrollRef.current;

        scrollRef.current.scrollTo({
            left:
                dir === "left"
                    ? scrollLeft - clientWidth / 2
                    : scrollLeft + clientWidth / 2,
            behavior: "smooth",
        });
    };

    if (!loading && cases.length === 0) {
        return <div className="p-10 text-center text-red-500">DEBUG: No cases found. Check console.</div>;
    }

    return (
        <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6">
                <div className="max-w-xl">
                    <span className="text-[#1E2BFF] font-bold tracking-widest uppercase text-[9px] sm:text-[10px]">
                        CASES
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 sm:mt-3 mb-3 sm:mb-4 text-black">
                        Featured case studies
                    </h2>

                    <p className="text-[#86868b] text-sm sm:text-[15px] md:text-[17px]">
                        We believe in work that shifts brand perception and drives measurable results.
                    </p>
                </div>

                <a
                    href="/case-studies"
                    className="bg-[#1E2BFF] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[8px] sm:text-[9px] font-bold tracking-widest uppercase flex items-center gap-2 no-underline whitespace-nowrap hover:bg-[#1a25d9] transition-colors"
                >
                    READ ALL CASE STUDIES
                    <IconArrowRight className="w-3 h-3" />
                </a>
            </div>

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 sm:px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2))] pb-6 sm:pb-8 md:pb-10"
                >
                    {loading
                        ? [1, 2, 3].map((i) => <CaseSkeleton key={i} />)
                        : cases.map((c) => <CaseCard key={c.id} caseStudy={c} />)}
                </div>

                {!loading && cases.length > 0 && (
                    <div className="flex justify-end gap-2 px-4 sm:px-6 max-w-7xl mx-auto -mt-2 sm:-mt-4">
                        <button
                            onClick={() => scroll("left")}
                            className="w-9 h-9 sm:w-10 sm:h-10 border border-black/10 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors"
                            aria-label="Scroll left"
                        >
                            <IconChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-9 h-9 sm:w-10 sm:h-10 border border-black/10 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors"
                            aria-label="Scroll right"
                        >
                            <IconChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
