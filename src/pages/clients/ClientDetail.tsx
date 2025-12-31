import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import HatamexNavbar from "@/components/HatamexNavbar";
import BookACall from "@/components/BookACall";
import Footer from "@/components/Footer";
import CaseHero from "@/components/cases/details/CaseHero";
import CaseDescription from "@/components/cases/details/CaseDescription";
import CaseImageStack from "@/components/cases/details/CaseImageStack";
import AppleCardsCarouselDemo from "@/components/AppleCardsCarouselDemo";
import ServicesSection from "@/components/ServicesSection";

interface ClientData {
    id: string;
    title: string;
    category: string;
    industry: string;
    short_description: string;
    description_long: string;
    company_info: string;
    what_we_did: string[];
    hero_image_url: string;
    thumbnail_url: string;
    media_gallery: any[];
}

export default function ClientDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [client, setClient] = useState<ClientData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClient() {
            if (!slug) return;
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('our_clients')
                    .select('id, title, category, industry, short_description, description_long, company_info, what_we_did, hero_image_url, thumbnail_url, media_gallery')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setClient(data);
            } catch (err) {
                console.error("Error fetching client detail:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchClient();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#1E2BFF] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!client) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Client Not Found</h1>
                    <a href="/" className="text-[#1E2BFF] hover:underline">Back to Home</a>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-black text-white selection:bg-[#1E2BFF] selection:text-white overflow-hidden">
            <HatamexNavbar useSpacer={false} />

            <CaseHero
                title={client.title}
                category={client.category}
                short_description={client.short_description}
                hero_image_url={client.hero_image_url}
                what_we_did={client.what_we_did}
            />

            <CaseDescription
                title={client.title}
                industry={client.industry}
                description_long={client.description_long}
                company_info={client.company_info}
                thumbnail_url={client.thumbnail_url}
                what_we_did={client.what_we_did}
            />

            {client.media_gallery && client.media_gallery.length > 0 && (
                <CaseImageStack images={client.media_gallery} />
            )}

            <AppleCardsCarouselDemo />
            <ServicesSection />

            <BookACall theme="dark" />
            <Footer theme="dark" />
        </main>
    );
}
