import { IconArrowRight } from '@tabler/icons-react';

interface ServiceHeroProps {
    eyebrow: string;
    title: string;
    description: string;
    ctaText?: string;
}

export const TrustedByRow = () => {
    const brands = [
        { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
        { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
        { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Apple_logo_grey.svg" },
        { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    ];

    return (
        <div className="mt-24 md:mt-32">
            <p className="text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase mb-10">
                Trusted by innovative brands
            </p>
            <div className="flex flex-wrap gap-8 md:gap-16 items-center opacity-30 grayscale hover:opacity-50 transition-opacity">
                {brands.map((brand) => (
                    <img key={brand.name} src={brand.logo} alt={brand.name} className="h-6 md:h-7 w-auto" />
                ))}
            </div>
        </div>
    );
};

export const ServiceHero = ({ eyebrow, title, description, ctaText = "LET’S WORK TOGETHER" }: ServiceHeroProps) => {
    return (
        <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="flex flex-col gap-6 md:gap-8">
                <span className="text-[#1E2BFF] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                    {eyebrow}
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-[72px] font-bold leading-[1.1] tracking-tight max-w-4xl">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-[560px]">
                    {description}
                </p>
                <div className="pt-4">
                    <button className="bg-black text-white px-8 py-4 rounded-lg font-bold text-xs tracking-widest uppercase hover:bg-neutral-800 transition-all duration-300 flex items-center gap-3">
                        {ctaText}
                        <IconArrowRight size={16} />
                    </button>
                </div>
            </div>
            <TrustedByRow />
        </section>
    );
};
