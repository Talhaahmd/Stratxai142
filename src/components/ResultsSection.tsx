import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// --- Custom Hook: useInView ---
function useInView(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return { ref, isInView };
}

// --- Component: AnimatedText ---
const AnimatedText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    const { ref, isInView } = useInView({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    return (
        <div
            ref={ref}
            className={cn(
                "transition-colors duration-700 ease-in-out",
                isInView ? "text-black" : "text-black/20",
                className
            )}
        >
            {children}
        </div>
    );
};

// --- Component: HoverCard (Customized cards-demo-1 logic) ---
interface HoverCardProps {
    title: string;
    description: string;
    bgImage: string;
    hoverGif: string;
}

const HoverCard: React.FC<HoverCardProps> = ({ title, description, bgImage, hoverGif }) => {
    return (
        <div className="w-full">
            <div
                className={cn(
                    "group w-full cursor-pointer overflow-hidden relative card h-[320px] md:h-[380px] rounded-2xl shadow-xl mx-auto flex flex-col justify-end p-6 md:p-8 border border-white/5 transition-all duration-500",
                    "bg-cover bg-center bg-neutral-900",
                )}
                style={{
                    backgroundImage: `url(${bgImage})`,
                }}
            >
                {/* Hover GIF Layer */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-cover bg-center z-0"
                    style={{ backgroundImage: `url(${hoverGif})` }}
                />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                <div className="text relative z-20 transition-transform duration-500 group-hover:-translate-y-2">
                    <h1 className="font-bold text-xl md:text-2xl text-white relative leading-tight tracking-tight">
                        {title}
                    </h1>
                    <p className="font-medium text-[13px] md:text-sm text-white/90 relative my-3 leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const ResultsSection: React.FC = () => {
    const { ref: ref1, isInView: isInView1 } = useInView({ threshold: 0.1 });
    const { ref: ref2, isInView: isInView2 } = useInView({ threshold: 0.1 });
    const { ref: ref3, isInView: isInView3 } = useInView({ threshold: 0.1 });

    return (
        <section className="bg-white text-black py-12 md:py-16 font-sans overflow-hidden">
            <div className="max-w-6xl mx-auto px-5 lg:px-8">

                {/* Top Block: Results Heading & Paragraph */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
                    <div className="flex flex-col gap-2">
                        <span className="text-[#1E2BFF] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">RESULTS</span>
                        <AnimatedText className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.15] tracking-tight">
                            Impact you can feel
                        </AnimatedText>
                    </div>

                    <div className="flex flex-col gap-4 items-start md:max-w-sm">
                        <AnimatedText className="text-[13px] md:text-sm text-black/70 leading-relaxed font-medium">
                            Clear and effortless interactions build trust. That trust translates
                            into better performance, higher conversions and stronger
                            customer relationships and you see that directly in the numbers.
                        </AnimatedText>
                        <a href="/about-us" className="h-9 md:h-10 px-4 md:px-5 bg-[#1E2BFF] text-white text-[9px] md:text-[10px] font-bold tracking-widest uppercase hover:bg-blue-700 transition-colors flex items-center gap-3 group">
                            LEARN MORE ABOUT US
                            <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-y border-black/10 mb-10 md:mb-12">
                    {[
                        { val: "95%", cap: "Clients who stayed with us for over a year because we consistently deliver results" },
                        { val: "4+", cap: "Multinational Companies signed up with us in last 2 years" },
                        { val: "100%", cap: "Reliable, secure systems that perform with unwavering stability" }
                    ].map((stat, i) => (
                        <div key={i} className={cn(
                            "py-8 md:py-10 px-6 md:px-8 flex flex-col gap-2",
                            i !== 2 && "md:border-r border-black/10",
                            "border-b md:border-b-0 border-black/10 last:border-b-0"
                        )}>
                            <AnimatedText className="text-4xl lg:text-5xl font-medium tracking-tight">
                                {stat.val}
                            </AnimatedText>
                            <AnimatedText className="text-[10px] md:text-xs text-black/50 leading-normal max-w-[180px]">
                                {stat.cap}
                            </AnimatedText>
                        </div>
                    ))}
                </div>

                {/* Second Block: Philosophy */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-10 md:mb-12">
                    <div className="flex flex-col gap-3 md:flex-1">
                        <span className="text-[#1E2BFF] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">WE SEE WHAT OTHERS MISS</span>
                        <AnimatedText className="text-[13px] sm:text-sm md:text-[15px] lg:text-[17px] font-medium leading-relaxed tracking-tight max-w-2xl">
                            Digital growth doesn't start with tools or trends. It starts with deeper insight understanding <span className="text-black/20 italic">what's holding your brand back</span>, what drives it forward, and where the real room to accelerate lies. Hatamex brings clarity in a world that's only getting more complex. We connect strategy, creativity and technology into solutions that feel intuitive and move your brand with confidence, direction and impact.
                        </AnimatedText>
                    </div>
                    <div className="flex justify-start pt-1">
                        <a href="/contact" className="h-9 md:h-10 px-5 md:px-6 bg-[#1E2BFF] text-white text-[9px] md:text-[10px] font-bold tracking-widest uppercase hover:bg-blue-700 transition-colors flex items-center gap-3 group">
                            LET'S WORK TOGETHER
                            <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Feature Cards Grid - Now using HoverCard logic */}{/* Feature Cards Grid - Updated Visual Logic */}{/* Feature Cards Grid - Corrected Hover Behavior */}
                {/* Feature Cards Grid - Dark Image Base + Hover GIF */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">

                    {/* CREATIVITY */}
                    <div
                        ref={ref1}
                        className={cn(
                            "transition-all duration-1000 ease-out",
                            isInView1 ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-6 blur-sm"
                        )}
                    >
                        <HoverCard
                            title="Creativity"
                            description="Creativity isn't decoration. It's the starting point of progress. We translate your brand into a story that carries strength."
                            bgImage="https://images.pexels.com/photos/16560315/pexels-photo-16560315.jpeg"
                            hoverGif="https://i.giphy.com/media/syEfLvksYQnmM/giphy.gif"
                        />
                    </div>

                    {/* TECHNOLOGY */}
                    <div
                        ref={ref2}
                        className={cn(
                            "transition-all duration-1000 ease-out delay-150",
                            isInView2 ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-6 blur-sm"
                        )}
                    >
                        <HoverCard
                            title="Technology"
                            description="Technology shouldn't be complicated. It should work, connect, and elevate. We build digital foundations that scale."
                            bgImage="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg "
                            hoverGif="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif"
                        />
                    </div>

                    {/* CONVERSION */}
                    <div
                        ref={ref3}
                        className={cn(
                            "transition-all duration-1000 ease-out delay-300",
                            isInView3 ? "opacity-100 translate-y-0 blur-none" : "opacity-0 translate-y-6 blur-sm"
                        )}
                    >
                        <HoverCard
                            title="Conversion"
                            description="Results don't happen by accident. They come from focused decisions and journeys engineered to convert."
                            bgImage="https://images.pexels.com/photos/6120215/pexels-photo-6120215.jpeg"
                            hoverGif="https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif"
                        />
                    </div>

                </div>


            </div>
        </section>
    );
};

export default ResultsSection;
