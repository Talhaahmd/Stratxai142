"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import HatamexNavbar from "@/components/HatamexNavbar";
import BookACall from "@/components/BookACall";
import Footer from "@/components/Footer";
import FeaturedCases from "@/components/FeaturedCases";
import CaseImageStack from "@/components/cases/details/CaseImageStack";
import { motion } from "motion/react";

interface StoryData {
    id: string;
    title: string;
    category: string;
    thumbnail_url: string;
    long_description: string;
    short_description: string;
    images: string[];
    video_section: string;
    story_by: string;
    position: string;
    link: string;
}

export default function StoryDetail() {
    const { slug } = useParams<{ slug: string }>();
    const [story, setStory] = useState<StoryData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStory() {
            if (!slug) return;
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('our_story')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setStory(data);
            } catch (err) {
                console.error("Error fetching story detail:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchStory();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#1E2BFF] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!story) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Story Not Found</h1>
                    <a href="/" className="text-[#1E2BFF] hover:underline">Back to Home</a>
                </div>
            </div>
        );
    }

    const getInstagramEmbedUrl = (url: string) => {
        if (!url) return "";
        const cleanUrl = url.split('?')[0];
        return `${cleanUrl.endsWith('/') ? cleanUrl : cleanUrl + '/'}embed`;
    };

    return (
        <main className="bg-white text-black selection:bg-[#1E2BFF] selection:text-white overflow-hidden">
            <HatamexNavbar />

            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <img
                    src={story.thumbnail_url}
                    alt={story.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 text-center px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white/80 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase block mb-4"
                    >
                        {story.category}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-white text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight max-w-5xl mx-auto leading-tight"
                    >
                        {story.title}
                    </motion.h1>
                </div>
            </section>

            <section className="w-full py-20 md:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="text-[#1E2BFF] text-[10px] font-bold tracking-widest uppercase">THE NARRATIVE</span>
                                <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                                    Deep dive into our <br /> philosophy & growth.
                                </h2>
                            </div>
                            <p className="text-neutral-600 text-[17px] md:text-[20px] leading-relaxed font-medium">
                                {story.long_description}
                            </p>
                            <div className="pt-6 border-t border-neutral-100 mt-8">
                                <p className="text-black font-bold text-xl">{story.story_by}</p>
                                <p className="text-neutral-500 text-sm font-medium tracking-wide">{story.position}</p>
                            </div>
                        </div>

                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[380px] aspect-[9/16] bg-black rounded-[2.5rem] border-[8px] border-neutral-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden scale-90 md:scale-100">
                                <iframe
                                    src={getInstagramEmbedUrl(story.link)}
                                    className="absolute inset-0 w-full h-full border-0"
                                    allowTransparency={true}
                                    allow="autoplay; encrypted-media"
                                    scrolling="no"
                                />
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-900 rounded-b-2xl z-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-24 bg-neutral-50 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-2xl md:text-[42px] font-medium tracking-tight text-neutral-800 leading-[1.25]">
                        "{story.short_description}"
                    </p>
                </div>
            </section>

            {story.images && story.images.length > 0 && (
                <CaseImageStack images={story.images.map(url => ({ image_url: url, alt: "Story image" }))} />
            )}

            <FeaturedCases />

            <BookACall theme="dark" />
            <Footer theme="dark" />
        </main>
    );
}
