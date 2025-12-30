"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { IconChevronLeft, IconChevronRight, IconCheck, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_SLOTS = ["5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm", "7:30pm"];

export default function BookACall() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // Dec 2025
    const [selectedDate, setSelectedDate] = useState<number | null>(30);
    const [selectedTime, setSelectedTime] = useState<string | null>("5:00pm");
    const [is24h, setIs24h] = useState(false);

    const daysInMonth = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay(); // 0 is Sun
        const totalDays = new Date(year, month + 1, 0).getDate();

        // Adjust for Mon-Sun (Mon is 1, Sun is 0 -> 6)
        const offset = firstDay === 0 ? 6 : firstDay - 1;

        const days = [];
        // Prev month padding
        for (let i = 0; i < offset; i++) {
            days.push({ day: null, current: false });
        }
        // Current month days
        for (let i = 1; i <= totalDays; i++) {
            days.push({ day: i, current: true });
        }
        return days;
    }, [currentMonth]);

    const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

    return (
        <section className="relative bg-[#000000] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#1E2BFF] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Pitch */}
                    <div className="flex flex-col space-y-9 order-2 lg:order-1">
                        <div className="space-y-5">
                            <span className="text-[#1E2BFF] font-bold tracking-[0.2em] uppercase text-[10px]">BOOK A CALL</span>
                            <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-[1.1] max-w-lg">
                                Ready to create impact <br /> that lasts?
                            </h2>
                            <p className="text-white/70 text-[15px] md:text-[17px] font-medium max-w-md leading-relaxed">
                                Pick a moment that works for you. Together we'll uncover:
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                "The challenges currently slowing your business down",
                                "Where the opportunities are for growth, faster results",
                                "The simplest roadmap to measurable outcomes"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3.5 group">
                                    <div className="mt-1 w-4.5 h-4.5 rounded-md bg-[#1E2BFF] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <IconCheck className="text-white w-3 h-3 stroke-[3]" />
                                    </div>
                                    <p className="text-white/90 text-[14px] md:text-[16px] font-medium leading-tight">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Founder Profile */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex items-center justify-between shadow-2xl">
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
                                    <div className="absolute inset-0 bg-neutral-800" /> {/* Fallback if image missing */}
                                    <img src="/images/founder.jpg" alt="Tarik Polat" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">Tarik Polat, Founder</h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Not available</span>
                                    </div>
                                </div>
                            </div>

                            <button className="hidden sm:flex bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-xl text-[10px] font-bold text-white tracking-wider uppercase transition-colors items-center gap-2">
                                REACH OUT
                                <IconArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        <button className="w-full sm:hidden bg-white/5 border border-white/10 py-5 rounded-3xl text-[11px] font-bold text-white tracking-[0.2em] uppercase transition-all active:scale-[0.98]">
                            REACH OUT IN ANOTHER WAY
                        </button>
                    </div>

                    {/* Right Column: Calendar Glass Card */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.06] backdrop-blur-[40px] border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                        >
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-white font-semibold text-lg">{monthName}</h3>
                                <div className="flex items-center gap-2">
                                    <button onClick={prevMonth} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                        <IconChevronLeft className="text-white w-5 h-5 border-white/0" />
                                    </button>
                                    <button onClick={nextMonth} className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                        <IconChevronRight className="text-white w-5 h-5 border-white/0" />
                                    </button>
                                </div>
                            </div>

                            {/* Weekday labels */}
                            <div className="grid grid-cols-7 gap-1 mb-4">
                                {DAYS.map((day) => (
                                    <div key={day} className="text-white/40 text-[10px] font-bold uppercase tracking-widest text-center py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1.5 md:gap-2 mb-10">
                                {daysInMonth.map((d, i) => (
                                    <button
                                        key={i}
                                        disabled={!d.current}
                                        onClick={() => d.day && setSelectedDate(d.day)}
                                        className={cn(
                                            "aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200",
                                            !d.current ? "text-white/20 bg-white/[0.02] cursor-not-allowed" : "text-white hover:bg-white/10 bg-white/[0.05]",
                                            selectedDate === d.day && d.current && "bg-[#1E2BFF] text-white hover:bg-[#1E2BFF] scale-[1.05]"
                                        )}
                                    >
                                        {d.day}
                                    </button>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-white/10 w-full mb-8" />

                            {/* Time Slots */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-white font-semibold text-base">Tue {selectedDate || 30}</h4>
                                    <div className="bg-white/5 p-1 rounded-full border border-white/10 flex items-center">
                                        <button
                                            onClick={() => setIs24h(false)}
                                            className={cn("px-3 py-1 rounded-full text-[9px] font-bold transition-all", !is24h ? "bg-white/10 text-white" : "text-white/40")}
                                        >
                                            12h
                                        </button>
                                        <button
                                            onClick={() => setIs24h(true)}
                                            className={cn("px-3 py-1 rounded-full text-[9px] font-bold transition-all", is24h ? "bg-white/10 text-white" : "text-white/40")}
                                        >
                                            24h
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {TIME_SLOTS.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={cn(
                                                "py-3 rounded-2xl text-[13px] font-semibold transition-all duration-200 border border-white/10",
                                                selectedTime === time ? "bg-[#1E2BFF] text-white border-[#1E2BFF]" : "bg-white/5 text-white/70 hover:bg-white/10"
                                            )}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
