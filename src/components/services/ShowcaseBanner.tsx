import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';

interface ShowcaseBannerProps {
    image: string;
    caseName: string;
    category: string;
}

const ShowcaseBanner = ({ image, caseName, category }: ShowcaseBannerProps) => {
    return (
        <section className="px-4 sm:px-6 lg:px-8 mb-24 md:mb-32">
            <div className="max-w-[1200px] mx-auto">
                <div className="relative rounded-[22px] md:rounded-[28px] overflow-hidden bg-neutral-900 shadow-[0_18px_50px_rgba(0,0,0,0.18)] min-h-[260px] md:min-h-[420px] aspect-[16/9] md:aspect-[21/9]">
                    <img
                        src={image}
                        alt={caseName}
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                    />

                    {/* Overlay CTA Card */}
                    <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-4 md:p-5 border border-black/10 shadow-lg min-w-[200px] md:min-w-[240px] flex flex-col gap-3 md:gap-4"
                        >
                            <div className="flex flex-col">
                                <span className="text-[9px] md:text-[10px] font-bold text-neutral-400 tracking-widest uppercase">
                                    {category}
                                </span>
                                <span className="text-lg md:text-xl font-bold text-black mt-0.5">
                                    {caseName}
                                </span>
                            </div>

                            <button className="bg-[#1E2BFF] text-white h-10 md:h-11 px-4 md:px-5 rounded-xl font-bold text-xs md:text-sm tracking-widest uppercase flex items-center justify-between group">
                                SEE WORK
                                <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShowcaseBanner;
