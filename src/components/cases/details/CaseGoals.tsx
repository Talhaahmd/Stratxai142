"use client";

interface CaseGoal {
    goal_number: number;
    title: string;
    description: string;
    variant: 'light' | 'dark' | 'blue';
}

interface CaseGoalsProps {
    goals: CaseGoal[];
}

export default function CaseGoals({ goals }: CaseGoalsProps) {
    if (!goals || goals.length === 0) return null;

    return (
        <section className="w-full bg-neutral-50 py-20 md:py-32">
            <div className="max-w-[1200px] mx-auto px-6 sm:px-10 space-y-12 md:space-y-16">

                <div className="space-y-4 max-w-2xl">
                    <div className="text-[#1E2BFF] text-[10px] tracking-[0.2em] font-bold uppercase">
                        PROJECT GOALS
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-tight leading-[1.2]">
                        Strategic objectives of the project
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {goals.map((goal, i) => (
                        <div
                            key={i}
                            className={`flex flex-col justify-between p-8 md:p-10 rounded-2xl h-[280px] md:h-[320px] shadow-sm transition-transform duration-500 hover:scale-[1.02] ${goal.variant === 'blue'
                                ? 'bg-[#1E2BFF] text-white border border-white/10'
                                : 'bg-black text-white border border-white/10'
                                }`}
                        >
                            {/* No Number Display */}

                            <div className="space-y-4 mt-auto">
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                                    {goal.title}
                                </h3>
                                <p className="text-[13px] md:text-sm leading-relaxed font-medium text-white/80">
                                    {goal.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
