"use client";

interface CaseDescriptionProps {
    title: string;
    industry: string;
    description_long: string;
    company_info: string;
    thumbnail_url: string;
    what_we_did: string[];
}

export default function CaseDescription({
    title,
    industry,
    description_long,
    company_info,
    thumbnail_url,
    what_we_did
}: CaseDescriptionProps) {
    return (
        <section className="w-full bg-white py-16 md:py-24">
            <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-20 items-start">

                    {/* Left Column: Description */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="text-[#1E2BFF] text-[11px] tracking-[0.25em] font-semibold uppercase">
                                DESCRIPTION
                            </div>
                            <p className="text-black text-[18px] sm:text-[22px] md:text-[26px] leading-[1.3] font-medium max-w-2xl">
                                {description_long}
                            </p>
                        </div>


                    </div>

                    {/* Right Column: Grey Info Card */}
                    <div className="bg-neutral-100 rounded-2xl p-6 md:p-8 space-y-8">
                        <div className="w-20 h-20 overflow-hidden rounded-xl bg-neutral-200 border border-black/5">
                            <img
                                src={thumbnail_url}
                                alt={`${title} Thumbnail`}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="space-y-6">
                            <p className="text-sm font-medium text-neutral-600 leading-relaxed">
                                {company_info}
                            </p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="text-[10px] font-bold tracking-widest text-black uppercase">WHAT WE DID</div>
                                    <div className="flex flex-wrap gap-2">
                                        {what_we_did.map((pill, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-white border border-black/5 text-[9px] font-bold tracking-tight text-neutral-700 rounded-full"
                                            >
                                                {pill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold tracking-widest text-black uppercase">INDUSTRY</div>
                                    <div className="text-sm font-semibold text-neutral-800">{industry}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
