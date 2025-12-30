"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows.`;

export default function TextGenerateEffectDemo() {
    return (
        <div className="bg-[#fbfbfd] pb-32 px-6">
            <div className="max-w-5xl mx-auto">
                <TextGenerateEffect words={words} className="text-3xl md:text-5xl lg:text-6xl text-center leading-[1.1] tracking-tight text-[#1d1d1f]" />
            </div>
        </div>
    );
}
