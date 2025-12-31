"use client";

import { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { supabase } from "@/lib/supabaseClient";

export default function AppleCardsCarouselDemo() {
    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClients() {
            try {
                const { data, error } = await supabase
                    .from('our_clients')
                    .select('title, category, thumbnail_url, slug, short_description')
                    .eq('published', true)
                    .order('order_index', { ascending: true });

                if (error) throw error;

                const formattedCards = (data || []).map((client) => ({
                    category: client.category,
                    title: client.title,
                    src: client.thumbnail_url,
                    slug: client.slug,
                    href: `/clients/${client.slug}`,
                    content: <ProjectContent client={client} />,
                }));
                setCards(formattedCards);
            } catch (err) {
                console.error("Error fetching clients for carousel:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchClients();
    }, []);

    if (loading) return null;

    const items = cards.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-20 bg-black">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8 text-left">
                <h2 className="text-xl md:text-5xl font-bold text-white font-sans">
                    Our Clients.
                </h2>
            </div>
            <Carousel items={items} />
        </div>
    );
}

const ProjectContent = ({ client }: { client: any }) => {
    return (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4 text-left">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl leading-relaxed">
                <span className="font-bold text-neutral-700 dark:text-neutral-200">
                    {client.title}
                </span>{" "}
                {client.short_description}
            </p>
            <div className="mt-8">
                <a
                    href={`/clients/${client.slug}`}
                    className="px-8 py-4 bg-[#1E2BFF] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors inline-block"
                >
                    View Full Project
                </a>
            </div>
            <img
                src={client.thumbnail_url}
                alt={client.title}
                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-cover rounded-2xl mt-8 shadow-lg"
            />
        </div>
    );
};
