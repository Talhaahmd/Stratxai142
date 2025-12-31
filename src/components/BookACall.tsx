"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { IconChevronLeft, IconChevronRight, IconCheck, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_SLOTS = ["5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm", "7:30pm"];

export default function BookACall({ theme = "dark" }: { theme?: "dark" | "light" }) {
    const isLight = theme === "light";
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
        <section className={cn(
            "relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-500",
            isLight ? "bg-white" : "bg-black"
        )}>
            {/* Ambient background glow - more prominent in dark mode with shades of blue */}
            {!isLight && (
                <>
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1E2BFF] opacity-[0.15] blur-[150px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1E2BFF] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />
                </>
            )}
            {isLight && (
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#1E2BFF] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
            )}

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Pitch */}
                    <div className="flex flex-col space-y-9 order-2 lg:order-1">
                        <div className="space-y-4">
                            <span className="text-[#1E2BFF] font-bold tracking-[0.2em] uppercase text-[9px]">BOOK A CALL</span>
                            <h2 className={cn(
                                "text-2xl md:text-3xl font-semibold tracking-tight leading-[1.1] max-w-lg transition-colors",
                                isLight ? "text-black" : "text-white"
                            )}>
                                Ready to create impact <br /> that lasts?
                            </h2>
                            <p className={cn(
                                "text-[13px] md:text-[14px] font-medium max-w-md leading-relaxed transition-colors",
                                isLight ? "text-black/60" : "text-white/80"
                            )}>
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
                                    <p className={cn(
                                        "text-[12px] md:text-[13px] font-medium leading-tight transition-colors",
                                        isLight ? "text-black/80" : "text-white/95"
                                    )}>
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Founder Profile */}
                        <div className={cn(
                            "backdrop-blur-xl border rounded-2xl p-4 flex items-center justify-between shadow-2xl transition-all",
                            isLight ? "bg-black/[0.03] border-black/10" : "bg-white/5 border-white/10"
                        )}>
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "relative w-10 h-10 rounded-full overflow-hidden border",
                                    isLight ? "border-black/10" : "border-white/20"
                                )}>
                                    <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800" />
                                    <img src="/images/founder.jpg" alt="Tarik Polat" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className={cn("font-bold text-xs", isLight ? "text-black" : "text-white")}>Tarik Polat, Founder</h4>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                                        <span className={cn("text-[9px] uppercase font-bold tracking-wider", isLight ? "text-black/40" : "text-white/60")}>Not available</span>
                                    </div>
                                </div>
                            </div>

                            <button className={cn(
                                "hidden sm:flex px-3 py-2 rounded-lg text-[9px] font-bold tracking-wider uppercase transition-colors items-center gap-1.5",
                                isLight ? "bg-black/5 hover:bg-black/10 text-black" : "bg-white/10 hover:bg-white/15 text-white"
                            )}>
                                REACH OUT
                                <IconArrowRight className="w-3 h-3" />
                            </button>
                        </div>

                        <button className={cn(
                            "w-full sm:hidden border py-4 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all active:scale-[0.98]",
                            isLight ? "bg-black/5 border-black/10 text-black" : "bg-white/5 border-white/10 text-white"
                        )}>
                            REACH OUT IN ANOTHER WAY
                        </button>
                    </div>

                    {/* Right Column: Calendar Glass Card */}
                    <div className="order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "backdrop-blur-[40px] border rounded-[24px] p-5 sm:p-6 shadow-2xl transition-all",
                                isLight ? "bg-black/[0.04] border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.1)]" : "bg-white/[0.06] border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                            )}
                        >
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className={cn("font-semibold text-base transition-colors", isLight ? "text-black" : "text-white")}>{monthName}</h3>
                                <div className="flex items-center gap-2">
                                    <button onClick={prevMonth} className={cn(
                                        "w-8 h-8 flex items-center justify-center rounded-lg border transition-colors",
                                        isLight ? "bg-black/5 hover:bg-black/10 border-black/5 text-black" : "bg-white/5 hover:bg-white/10 border-white/5 text-white"
                                    )}>
                                        <IconChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button onClick={nextMonth} className={cn(
                                        "w-8 h-8 flex items-center justify-center rounded-lg border transition-colors",
                                        isLight ? "bg-black/5 hover:bg-black/10 border-black/5 text-black" : "bg-white/5 hover:bg-white/10 border-white/5 text-white"
                                    )}>
                                        <IconChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Weekday labels */}
                            <div className="grid grid-cols-7 gap-1 mb-3">
                                {DAYS.map((day) => (
                                    <div key={day} className={cn(
                                        "text-[9px] font-bold uppercase tracking-widest text-center py-1.5 transition-colors",
                                        isLight ? "text-black/40" : "text-white/40"
                                    )}>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 md:gap-1.5 mb-6">
                                {daysInMonth.map((d, i) => (
                                    <button
                                        key={i}
                                        disabled={!d.current}
                                        onClick={() => d.day && setSelectedDate(d.day)}
                                        className={cn(
                                            "aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-200 border",
                                            !d.current
                                                ? (isLight ? "text-black/10 bg-black/[0.02] border-transparent cursor-not-allowed" : "text-white/20 bg-white/[0.02] border-transparent cursor-not-allowed")
                                                : (isLight ? "text-black hover:bg-black/5 bg-black/[0.03] border-black/5" : "text-white hover:bg-white/10 bg-white/[0.05] border-white/5"),
                                            selectedDate === d.day && d.current && "bg-[#1E2BFF] text-white hover:bg-[#1E2BFF] border-[#1E2BFF] scale-[1.05]"
                                        )}
                                    >
                                        {d.day}
                                    </button>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className={cn("h-px w-full mb-6", isLight ? "bg-black/10" : "bg-white/10")} />

                            {/* Time Slots */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className={cn("font-semibold text-sm transition-colors", isLight ? "text-black" : "text-white")}>Tue {selectedDate || 30}</h4>
                                    <div className={cn("p-1 rounded-full border flex items-center transition-colors", isLight ? "bg-black/5 border-black/10" : "bg-white/5 border-white/10")}>
                                        <button
                                            onClick={() => setIs24h(false)}
                                            className={cn("px-3 py-1 rounded-full text-[9px] font-bold transition-all", !is24h ? (isLight ? "bg-black/10 text-black" : "bg-white/10 text-white") : (isLight ? "text-black/40" : "text-white/40"))}
                                        >
                                            12h
                                        </button>
                                        <button
                                            onClick={() => setIs24h(true)}
                                            className={cn("px-3 py-1 rounded-full text-[9px] font-bold transition-all", is24h ? (isLight ? "bg-black/10 text-black" : "bg-white/10 text-white") : (isLight ? "text-black/40" : "text-white/40"))}
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
                                                "py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border",
                                                selectedTime === time
                                                    ? "bg-[#1E2BFF] text-white border-[#1E2BFF]"
                                                    : (isLight ? "bg-black/5 border-black/5 text-black/70 hover:bg-black/10" : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10")
                                            )}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>

                                {/* Confirm Booking Button */}
                                {selectedDate && selectedTime && (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 mt-4",
                                            "bg-[#1E2BFF] text-white hover:bg-[#1a25d9] active:scale-[0.98]",
                                            "shadow-lg hover:shadow-xl"
                                        )}
                                    >
                                        Confirm Booking
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
