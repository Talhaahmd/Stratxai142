import React from 'react';

const CinematicSection: React.FC = () => {
    return (
        <section className="bg-black text-white pt-24 pb-32 md:pt-32 md:pb-48">
            <div className="max-w-4xl mx-auto px-6 text-center mb-16 md:mb-20">
                <h2 className="text-3xl md:text-[52px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-8">
                    Built to look premium.<br />
                    Engineered to perform.
                </h2>
                <p className="text-white/60 text-[15px] md:text-[17px] max-w-2xl mx-auto leading-relaxed font-medium">
                    We combine strategy, design, and engineering to create digital
                    experiences that feel effortless and convert.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-0 h-[45vh] md:h-[85vh]">
                <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover object-center"
                    >
                        <source src="https://cdn.dribbble.com/userupload/13542375/file/original-84fb757fac42148dc3d4fe49b07ef420.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Subtle Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default CinematicSection;
