import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HatamexNavbar from "@/components/HatamexNavbar";
import CaseHero from "@/components/cases/details/CaseHero";
import CaseDescription from "@/components/cases/details/CaseDescription";
import CaseGoals from "@/components/cases/details/CaseGoals";
import CaseImageStack from "@/components/cases/details/CaseImageStack";
import CaseTechnologies from "@/components/cases/details/CaseTechnologies";
import FeaturedCases from "@/components/FeaturedCases";
import BookACall from "@/components/BookACall";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";

interface CaseData {
    id: string;
    slug: string;
    title: string;
    category: string;
    industry: string;
    short_description: string;
    description_long: string;
    company_info: string;
    what_we_did: string[];
    technologies: string[];
    hero_image_url: string;
    thumbnail_url: string;
    results_description: string;
    goals: any[];
    media_gallery: any[];
}

export default function CaseStudyDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [caseData, setCaseData] = useState<CaseData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchCaseStudy() {
            if (!slug) return;

            setLoading(true);
            setError(false);

            try {
                const { data, error } = await supabase
                    .from('case_studies')
                    .select('*')
                    .eq('slug', slug)
                    .eq('published', true)
                    .single();

                if (error || !data) throw error || new Error("Not found");

                setCaseData(data);
            } catch (err) {
                console.error("Error fetching case study:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchCaseStudy();
    }, [slug]);

    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <HatamexNavbar useSpacer={false} />
                <div className="h-screen w-full bg-neutral-100 animate-pulse" />
                <div className="max-w-[1200px] mx-auto px-10 py-24 space-y-12">
                    <div className="h-4 w-1/4 bg-neutral-100 rounded" />
                    <div className="h-12 w-1/2 bg-neutral-100 rounded" />
                    <div className="h-40 w-full bg-neutral-100 rounded" />
                </div>
            </main>
        );
    }

    if (error || !caseData) {
        return (
            <main className="min-h-screen bg-white flex flex-col pt-32 items-center text-center px-6">
                <HatamexNavbar />
                <h1 className="text-4xl font-bold tracking-tight text-neutral-900 leading-tight">Case study not found</h1>
                <p className="text-neutral-500 mt-6 leading-relaxed font-medium max-w-md">
                    The case study you are looking for does not exist or has been unpublished.
                </p>
                <a href="/" className="mt-10 inline-flex h-12 items-center justify-center px-8 bg-[#1E2BFF] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-black rounded-none no-underline">
                    Back to home
                </a>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-[#1E2BFF] selection:text-white">
            <HatamexNavbar useSpacer={false} />

            <CaseHero
                title={caseData.title}
                category={caseData.category}
                short_description={caseData.short_description}
                hero_image_url={caseData.hero_image_url}
                what_we_did={caseData.what_we_did}
            />

            <CaseDescription
                title={caseData.title}
                industry={caseData.industry}
                description_long={caseData.description_long}
                company_info={caseData.company_info}
                thumbnail_url={caseData.thumbnail_url}
                what_we_did={caseData.what_we_did}
            />

            <CaseGoals goals={caseData.goals} />

            <CaseImageStack images={caseData.media_gallery} />

            <CaseTechnologies
                technologies={caseData.technologies}
                results_description={caseData.results_description}
            />

            <FeaturedCases />
            <BookACall theme="dark" />
            <Footer theme="dark" />
        </main>
    );
}
