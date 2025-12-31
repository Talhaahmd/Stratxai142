import { useEffect, useState } from "react";
import HatamexNavbar from "@/components/HatamexNavbar";
import { HeroParallax } from "@/components/ui/hero-parallax";
import ExpandableCardDemo from "@/components/ui/expandable-card-demo-standard";
import { supabase } from "@/lib/supabaseClient";
import BookACall from "@/components/BookACall";
import Footer from "@/components/Footer";

export default function AiPrompts() {
    const [prompts, setPrompts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPrompts() {
            try {
                const { data, error } = await supabase
                    .from('ai_prompts')
                    .select('*')
                    .eq('published', true)
                    .order('order_index', { ascending: true });

                if (error) throw error;
                setPrompts(data || []);
            } catch (err) {
                console.error("Error fetching AI prompts:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPrompts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#1E2BFF] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const cards = prompts.map(p => ({
        title: p.title,
        description: p.category,
        src: p.image_url,
        ctaText: "Copy Prompt",
        ctaLink: "#",
        content: p.prompt
    }));

    return (
        <main className="bg-black selection:bg-[#1E2BFF] selection:text-white min-h-screen">
            <HatamexNavbar />

            <HeroParallax products={prompts.map(p => ({
                title: p.title,
                link: "#",
                thumbnail: p.image_url,
                prompt: p.prompt,
                category: p.category
            }))} />

            <ExpandableCardDemo cards={cards} />

            <div className="bg-black">
                <BookACall theme="dark" />
                <Footer theme="dark" />
            </div>
        </main>
    );
}
