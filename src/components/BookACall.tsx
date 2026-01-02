"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function BookACall({ theme }: { theme?: string }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        <section className={cn("w-full py-14 md:py-20 bg-black dark:bg-black", theme === 'dark' ? 'bg-black' : '')}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">

                    {/* LEFT: Sticky Text Content */}
                    <div className="w-full lg:w-1/2 lg:sticky lg:top-36 self-start space-y-6">
                        <div className="space-y-4">
                            <p className="text-blue-500 text-xs font-medium uppercase tracking-wider">
                                Contact us
                            </p>
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                Let's Build Something <br /> <span className="text-blue-600">Extraordinary.</span>
                            </h2>
                            <p className="text-base md:text-lg text-neutral-400 max-w-lg leading-relaxed">
                                We help ambitious brands and enterprises scale with AI-driven solutions.
                                Whether you need a strategic partner or technical expertise, we're here to turn your vision into reality.
                            </p>
                            <p className="text-base md:text-lg text-neutral-400 max-w-lg leading-relaxed">
                                Our approach combines cutting-edge technology with human-centric design to create seamless experiences. We believe in building long-term partnerships that drive sustainable growth and innovation.
                            </p>
                            <div className="pt-4">
                                <p className="text-sm text-neutral-500 dark:text-neutral-500 italic">
                                    "Innovation distinguishes between a leader and a follower."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="w-full lg:w-1/2">
                        <div className="shadow-input w-full rounded-2xl bg-white p-4 md:p-8 dark:bg-black border border-neutral-200 dark:border-white/10">
                            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                                Book a Call
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
                                Fill out the form below and we will get back to you within 24 hours.
                            </p>

                            <form className="my-8" onSubmit={handleSubmit}>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="fullname">Full Name</Label>
                                    <Input id="fullname" placeholder="Tyler Durden" type="text" />
                                </LabelInputContainer>

                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                                </LabelInputContainer>

                                <LabelInputContainer className="mb-8">
                                    <Label htmlFor="description">Description of project</Label>
                                    <textarea
                                        id="description"
                                        className={cn(
                                            "flex min-h-[120px] w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input transition duration-400 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600",
                                        )}
                                        placeholder="Tell us about your goals and how we can help..."
                                    />
                                </LabelInputContainer>

                                <button
                                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                                    type="submit"
                                >
                                    Submit &rarr;
                                    <BottomGradient />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
