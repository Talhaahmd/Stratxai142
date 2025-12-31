"use client";

import { useEffect, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { supabase } from "@/lib/supabaseClient";

export default function ClientsCarousel() {
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
                    category: client.category || "Strategic Partner",
                    title: client.title,
                    src: client.thumbnail_url,
                    slug: client.slug,
                    content: (
                        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
                            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto leading-relaxed">
                                {client.short_description}
                            </p>
                            <div className="mt-8 flex justify-center">
                                <a
                                    href={`/clients/${client.slug}`}
                                    className="px-8 py-4 bg-[#1E2BFF] text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors"
                                >
                                    View Project
                                </a>
                            </div>
                        </div>
                    )
                }));
                setCards(formattedCards);
            } catch (err) {
                console.error("Error fetching carousel clients:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchClients();
    }, []);

    if (loading) return null;

    return (
        <div className="w-full h-full py-16 md:py-24 bg-white dark:bg-black">
            <h2 className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 font-sans tracking-tight mb-8">
                Our Strategic Partners.
            </h2>
            <Carousel items={cards.map((card, index) => (
                <Card key={card.src} card={card} index={index} />
            ))} />
        </div>
    );
}
