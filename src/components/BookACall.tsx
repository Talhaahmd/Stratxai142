"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export default function BookACall({ theme }: { theme?: string }) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countryCode, setCountryCode] = useState("+1");

    const countries = [
        { code: "+1", flag: "🇺🇸", name: "USA" },
        { code: "+1", flag: "🇨🇦", name: "Canada" },
        { code: "+44", flag: "🇬🇧", name: "UK" },
        { code: "+971", flag: "🇦🇪", name: "UAE" },
        { code: "+92", flag: "🇵🇰", name: "Pakistan" },
        { code: "+91", flag: "🇮🇳", name: "India" },
        { code: "+61", flag: "🇦🇺", name: "Australia" },
        { code: "+49", flag: "🇩🇪", name: "Germany" },
        { code: "+33", flag: "🇫🇷", name: "France" },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const fullName = formData.get("fullname") as string;
        const email = formData.get("email") as string;
        const phoneInput = formData.get("phone") as string;
        const description = formData.get("description") as string;

        if (!fullName || !email || !description) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        const finalPhone = phoneInput ? `${countryCode} ${phoneInput}` : "";

        try {
            const { error: supabaseError } = await supabase
                .from('contact_submissions')
                .insert([
                    {
                        full_name: fullName,
                        email: email,
                        phone: finalPhone,
                        description: description,
                    }
                ]);

            if (supabaseError) throw supabaseError;

            setSubmitted(true);
        } catch (err: any) {
            console.error("Error submitting form:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
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

                            {submitted ? (
                                <div className="text-center py-12 space-y-4">
                                    <div className="text-5xl">🎉</div>
                                    <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                                        Message Sent!
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                                        Thank you for reaching out. We will get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-6 text-[#1E2BFF] font-semibold hover:underline text-sm"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form className="my-8" onSubmit={handleSubmit}>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="fullname">Full Name</Label>
                                        <Input
                                            id="fullname"
                                            name="fullname"
                                            placeholder="Tyler Durden"
                                            type="text"
                                            required
                                            disabled={loading}
                                        />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder="projectmayhem@fc.com"
                                            type="email"
                                            required
                                            disabled={loading}
                                        />
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="flex gap-2">
                                            <select
                                                className="flex h-10 w-[110px] items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-800 dark:text-white dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-300"
                                                value={countryCode}
                                                onChange={(e) => setCountryCode(e.target.value)}
                                                disabled={loading}
                                            >
                                                {countries.map((c, i) => (
                                                    <option key={i} value={c.code}>
                                                        {c.flag} {c.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                placeholder="555-0123"
                                                type="tel"
                                                className="flex-1"
                                                disabled={loading}
                                            />
                                        </div>
                                    </LabelInputContainer>

                                    <LabelInputContainer className="mb-8">
                                        <Label htmlFor="description">Description of project</Label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className={cn(
                                                "flex min-h-[120px] w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input transition duration-400 placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600",
                                            )}
                                            placeholder="Tell us about your goals and how we can help..."
                                            required
                                            disabled={loading}
                                        />
                                    </LabelInputContainer>

                                    {error && (
                                        <div className="mb-4 p-3 rounded bg-red-50 text-red-500 text-sm">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-70 disabled:cursor-not-allowed"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Sending..." : "Submit"} &rarr;
                                        <BottomGradient />
                                    </button>
                                </form>
                            )}
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
