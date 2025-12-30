import React from 'react';

const IMAGES = [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1974&auto=format&fit=crop",
];

const HeroSection: React.FC = () => {
    return (
        <section className="relative w-full h-[75vh] md:h-[80vh] bg-black text-white overflow-hidden flex flex-col justify-center pt-20">
            <div className="max-w-7xl mx-auto w-full h-full px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                {/* Left Column */}
                <div className="flex flex-col gap-6 md:gap-7 z-10 py-4 md:py-0">
                    <h1 className="text-4xl md:text-5xl lg:text-[52px] font-medium leading-[1.05] tracking-tight max-w-2xl text-balance">
                        The space between <br className="hidden md:block" />
                        creativity and code
                    </h1>

                    <p className="text-white/60 text-sm md:text-[15px] max-w-sm leading-relaxed font-medium">
                        In the space between creativity and code, Hatamex creates
                        digital experiences built for the future. Platforms that adapt,
                        scale, and push your brand forward.
                    </p>

                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-1 rounded">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        </div>
                        <span className="font-bold">5.0</span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-500 fill-current" viewBox="0 0 20 20">
                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="h-14 w-full sm:w-56 bg-primary text-white font-bold tracking-[0.2em] uppercase flex items-center justify-between px-8 group overflow-hidden relative rounded-none flex-shrink-0">
                            <span className="relative z-10 text-xs">BOOK A CALL</span>
                            <div className="flex flex-col gap-0.5 relative z-10 transition-transform group-hover:translate-x-1">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                            </div>
                        </button>
                        <button className="h-14 w-full sm:w-80 bg-white text-black font-bold border border-white/20 px-8 flex items-center justify-center hover:bg-neutral-100 transition-colors uppercase tracking-[0.2em] relative rounded-none flex-shrink-0">
                            <span className="text-xs">EXPLORE OUR WORK</span>
                            <div className="absolute right-8 flex flex-col gap-0.5 md:flex md:flex-col">
                                <div className="w-1 h-1 bg-black rounded-full"></div>
                                <div className="w-1 h-1 bg-black rounded-full"></div>
                                <div className="w-1 h-1 bg-black rounded-full"></div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Right Column (Animated Image Grid - 2 Column Version) */}
                <div className="relative h-full overflow-hidden mask-fade grid grid-cols-2 gap-6 pointer-events-none">

                    {/* Column A (Large Images) */}
                    <div className="flex flex-col gap-6 animate-marquee-up py-4" style={{ animationDuration: '18s' }}>
                        {[...IMAGES, ...IMAGES].map((img, i) => (
                            <div key={i} className="relative w-full aspect-[4/5] overflow-hidden border border-white/10 bg-neutral-910">
                                <img src={img} alt="" className="w-full h-full object-cover grayscale opacity-70" />
                            </div>
                        ))}
                    </div>

                    {/* Column B (Large Images - Reversed) */}
                    <div className="flex flex-col gap-6 animate-marquee-down py-4" style={{ animationDuration: '22s' }}>
                        {[...IMAGES.slice().reverse(), ...IMAGES.slice().reverse()].map((img, i) => (
                            <div key={i} className="relative w-full aspect-[4/5] overflow-hidden border border-white/10 bg-neutral-910">
                                <img src={img} alt="" className="w-full h-full object-cover grayscale opacity-70" />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
