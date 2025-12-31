import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { IconPlus, IconMenu2, IconX, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { services } from "./ServicesSection";
import { supabase } from "@/lib/supabaseClient";

interface NavItem {
    label: string;
    href?: string;
    hasMegaMenu?: boolean;
    megaMenuType?: "cases" | "services" | "clients";
}

interface Case {
    id: string;
    title: string;
    category: string;
    thumbnail_url: string;
    slug: string;
}

interface Client {
    id: string;
    title: string;
    slug: string;
    thumbnail_url: string;
}

const navItems: NavItem[] = [
    { label: "ABOUT US", href: "/about-us" },
    { label: "SERVICES", hasMegaMenu: true, megaMenuType: "services" },
    { label: "OUR CLIENTS", hasMegaMenu: true, megaMenuType: "clients" },
    { label: "CASES", hasMegaMenu: true, megaMenuType: "cases" },
    { label: "AI PROMPTS", href: "/ai-prompts" },
];

export default function HatamexNavbar({ useSpacer = true }: { useSpacer?: boolean }) {
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredService, setHoveredService] = useState(services[0]);
    const [scrolled, setScrolled] = useState(false);
    const [cases, setCases] = useState<Case[]>([]);
    const [loadingCases, setLoadingCases] = useState(true);
    const [clients, setClients] = useState<Client[]>([]);
    const [hoveredClient, setHoveredClient] = useState<Client | null>(null);
    const { scrollY } = useScroll();
    let closeTimeout: any;

    // Fetch data on mount
    useEffect(() => {
        async function fetchData() {
            setLoadingCases(true);
            try {
                // Fetch Cases
                const { data: casesData, error: casesError } = await supabase
                    .from('case_studies')
                    .select('id, title, category, thumbnail_url, slug')
                    .eq('published', true)
                    .order('order_index', { ascending: true })
                    .limit(3);

                if (casesError) throw casesError;
                setCases(casesData || []);

                // Fetch Clients
                const { data: clientsData, error: clientsError } = await supabase
                    .from('our_clients')
                    .select('id, title, thumbnail_url, slug')
                    .eq('published', true)
                    .order('order_index', { ascending: true })
                    .limit(15);

                if (clientsError) throw clientsError;
                const fetchedClients = clientsData || [];
                setClients(fetchedClients);
                if (fetchedClients.length > 0) {
                    setHoveredClient(fetchedClients[0]);
                }
            } catch (err) {
                console.error("Error fetching navbar data:", err);
            } finally {
                setLoadingCases(false);
            }
        }
        fetchData();
    }, []);

    // Scroll detection
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest >= 20);
    });

    const handleMouseEnter = (menuType: string) => {
        clearTimeout(closeTimeout);
        setActiveMegaMenu(menuType);
    };

    const handleMouseLeave = () => {
        closeTimeout = setTimeout(() => {
            setActiveMegaMenu(null);
        }, 150);
    };

    // Service images
    const serviceImages: Record<string, string> = {
        'digital-development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=600&fit=crop',
        'performance-marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop',
        'ai-automation': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=600&fit=crop',
        'social-media-content': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop',
        'custom-app-solutions': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop'
    };

    return (
        <>
            {/* Main Navbar with Glassmorphism */}
            <motion.nav
                className="fixed top-0 left-0 right-0 z-50"
                animate={{
                    y: scrolled ? -2 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-4">
                    <motion.div
                        className={cn(
                            "rounded-2xl border transition-all duration-300 ease-out",
                            "shadow-[0_10px_30px_rgba(0,0,0,0.25)] relative overflow-hidden",
                            // Glass effect
                            scrolled
                                ? "bg-[rgba(10,10,10,0.65)] backdrop-blur-[20px] backdrop-saturate-[160%]"
                                : "bg-[rgba(10,10,10,0.45)] backdrop-blur-[18px] backdrop-saturate-[160%]",
                            // Border
                            "border-[rgba(255,255,255,0.08)]",
                        )}
                        animate={{
                            height: scrolled ? "72px" : "88px",
                            paddingLeft: scrolled ? "16px" : "24px",
                            paddingRight: scrolled ? "16px" : "24px",
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <div className="flex items-center justify-between h-full">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <a href="/" className="flex items-center">
                                    <img
                                        src="https://res.cloudinary.com/dt93sahp2/image/upload/v1766958848/Untitled_design_mrev4u.png"
                                        alt="StratX AI"
                                        className={cn(
                                            "w-auto transition-all duration-300",
                                            scrolled ? "h-12 md:h-14" : "h-16 md:h-18 lg:h-20"
                                        )}
                                    />
                                </a>
                            </div>

                            {/* Center Navigation - Desktop */}
                            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                                {navItems.map((item) => (
                                    <div
                                        key={item.label}
                                        className="relative"
                                        onMouseEnter={() => item.hasMegaMenu && handleMouseEnter(item.megaMenuType!)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {item.hasMegaMenu ? (
                                            <button
                                                className={cn(
                                                    "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors",
                                                    activeMegaMenu === item.megaMenuType
                                                        ? "text-white"
                                                        : "text-white/70 hover:text-white"
                                                )}
                                            >
                                                {item.label}
                                                <IconPlus className="w-3 h-3 opacity-50" />
                                            </button>
                                        ) : (
                                            <a
                                                href={item.href}
                                                className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/70 hover:text-white transition-colors"
                                            >
                                                {item.label}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Right Side */}
                            <div className="flex items-center gap-3">
                                <a
                                    href="/contact"
                                    className="px-4 md:px-6 py-2 md:py-3 bg-[#1E2BFF] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#1a25d9] transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    BOOK A CALL
                                </a>

                                {/* Mobile Hamburger */}
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="lg:hidden p-2 text-white/90 hover:text-white transition-colors"
                                >
                                    {isMobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed inset-0 z-[49] bg-black pt-[100px] px-6 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-8 pb-12">
                            <div className="space-y-4">
                                <a href="/about-us" onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-medium text-white hover:text-[#1E2BFF] transition-colors">About</a>
                            </div>

                            <div className="space-y-6">
                                <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Services</p>
                                <div className="flex flex-col gap-5">
                                    {services.map((service) => (
                                        <a
                                            key={service.id}
                                            href={`/services/${service.id}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-2xl font-medium text-white hover:text-[#1E2BFF] transition-colors"
                                        >
                                            {service.title}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Clients</p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {clients.map((client) => (
                                        <a href={`/clients/${client.slug}`} key={client.id} className="text-lg font-medium text-white/50 hover:text-white transition-colors">
                                            {client.title}
                                        </a>
                                    ))}
                                    <a
                                        href="/our-clients"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-lg font-bold text-[#1E2BFF] uppercase tracking-widest"
                                    >
                                        READ ALL
                                    </a>
                                </div>
                            </div>

                            {cases.length > 0 && (
                                <div className="space-y-6">
                                    <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Cases</p>
                                    <div className="flex flex-col gap-5">
                                        {cases.map((caseItem) => (
                                            <a
                                                key={caseItem.id}
                                                href={`/cases/${caseItem.slug}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="text-2xl font-medium text-white hover:text-[#1E2BFF] transition-colors"
                                            >
                                                {caseItem.title}
                                            </a>
                                        ))}
                                        <a
                                            href="/case-studies"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-lg font-bold text-[#1E2BFF] flex items-center gap-2 mt-2 uppercase tracking-widest"
                                        >
                                            Read all
                                            <IconArrowRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            )}

                            <div className="h-px bg-white/10 w-full my-4" />

                            <div className="space-y-4">
                                <a href="/ai-prompts" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg text-white/70 hover:text-white">AI Prompts</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mega Menu Overlays */}
            <AnimatePresence mode="wait">
                {activeMegaMenu === "services" && (
                    <motion.div
                        key="services-mega"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "fixed left-0 right-0 z-40 bg-white shadow-xl",
                            scrolled ? "top-[86px]" : "top-[106px]"
                        )}
                        onMouseEnter={() => handleMouseEnter("services")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="max-w-[1400px] mx-auto px-8 py-12">
                            <div className="grid grid-cols-12 gap-12">
                                {/* Left - Service List */}
                                <div className="col-span-3 space-y-6">
                                    {services.map((service) => (
                                        <a
                                            key={service.id}
                                            href={`/services/${service.id}`}
                                            onMouseEnter={() => setHoveredService(service)}
                                            className={cn(
                                                "block text-left text-2xl font-normal transition-colors w-full",
                                                hoveredService.id === service.id
                                                    ? "text-black"
                                                    : "text-neutral-400 hover:text-neutral-600"
                                            )}
                                        >
                                            {service.title}
                                        </a>
                                    ))}
                                </div>

                                {/* Center - Description */}
                                <div className="col-span-5 flex items-center">
                                    <motion.div
                                        key={hoveredService.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-lg text-neutral-600 leading-relaxed">
                                            {hoveredService.description}
                                        </p>
                                    </motion.div>
                                </div>

                                {/* Right - Image */}
                                <div className="col-span-4">
                                    <motion.div
                                        key={hoveredService.id}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.25 }}
                                        className="aspect-square rounded-2xl overflow-hidden bg-neutral-100"
                                    >
                                        <img
                                            src={serviceImages[hoveredService.id] || serviceImages['digital-development']}
                                            alt={hoveredService.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeMegaMenu === "cases" && (
                    <motion.div
                        key="cases-mega"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "fixed left-0 right-0 z-40 bg-white shadow-xl",
                            scrolled ? "top-[86px]" : "top-[106px]"
                        )}
                        onMouseEnter={() => handleMouseEnter("cases")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="max-w-[1400px] mx-auto px-8 py-12">
                            <div className="flex items-end justify-between mb-8">
                                <h2 className="text-4xl font-normal text-black">Our latest case studies</h2>
                                <a
                                    href="/case-studies"
                                    className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1E2BFF] hover:text-black transition-colors"
                                >
                                    Read all
                                    <IconArrowRight className="w-3 h-3" />
                                </a>
                            </div>

                            {loadingCases ? (
                                <div className="grid grid-cols-3 gap-8">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="space-y-4 animate-pulse">
                                            <div className="aspect-[4/3] rounded-xl bg-neutral-100" />
                                            <div className="h-4 w-24 bg-neutral-100 rounded" />
                                            <div className="h-6 w-48 bg-neutral-100 rounded" />
                                        </div>
                                    ))}
                                </div>
                            ) : cases.length > 0 ? (
                                <div className="grid grid-cols-3 gap-8 mb-8">
                                    {cases.map((caseItem) => (
                                        <a key={caseItem.id} href={`/cases/${caseItem.slug}`} className="group block">
                                            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 mb-4">
                                                <img
                                                    src={caseItem.thumbnail_url}
                                                    alt={caseItem.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">{caseItem.category}</p>
                                            <h3 className="text-xl font-normal text-black group-hover:text-[#1E2BFF] transition-colors">{caseItem.title}</h3>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center text-neutral-400">
                                    No case studies available at the moment.
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeMegaMenu === "clients" && (
                    <motion.div
                        key="clients-mega"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "fixed left-0 right-0 z-40 bg-white shadow-xl",
                            scrolled ? "top-[86px]" : "top-[106px]"
                        )}
                        onMouseEnter={() => handleMouseEnter("clients")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="max-w-[1400px] mx-auto px-8 py-12">
                            <div className="grid grid-cols-12 gap-16">
                                {/* Left - 4x4 Grid of Names */}
                                <div className="col-span-8">
                                    <div className="grid grid-cols-4 gap-y-8 gap-x-12">
                                        {clients.map((client) => (
                                            <a
                                                key={client.id}
                                                href={`/clients/${client.slug}`}
                                                onMouseEnter={() => setHoveredClient(client)}
                                                className={cn(
                                                    "text-left text-[13px] md:text-[15px] font-bold tracking-[0.1em] uppercase transition-all duration-300",
                                                    hoveredClient?.id === client.id
                                                        ? "text-black translate-x-1"
                                                        : "text-neutral-400 hover:text-black"
                                                )}
                                            >
                                                {client.title}
                                            </a>
                                        ))}
                                        <a
                                            href="/our-clients"
                                            className="text-left text-[13px] md:text-[15px] font-bold tracking-[0.1em] uppercase text-[#1E2BFF] hover:text-black transition-colors"
                                        >
                                            Read all
                                        </a>
                                    </div>
                                </div>

                                {/* Right - Dynamic Image Preview */}
                                <div className="col-span-4 pl-12 border-l border-neutral-100 flex items-center">
                                    {hoveredClient && (
                                        <div className="w-full space-y-6">
                                            <div className="text-[10px] font-bold tracking-[0.25em] text-[#1E2BFF] uppercase">Client Showcase</div>
                                            <motion.div
                                                key={hoveredClient.id}
                                                initial={{ opacity: 0, scale: 1.05 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                                className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 shadow-2xl"
                                            >
                                                <img
                                                    src={hoveredClient.thumbnail_url}
                                                    alt={hoveredClient.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                            <div className="space-y-2">
                                                <h4 className="text-2xl font-normal text-black">{hoveredClient.title}</h4>
                                                <p className="text-sm text-neutral-500 font-medium tracking-tight">Strategic Digital Partnership</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer */}
            {useSpacer && (
                <div className={cn("transition-all duration-300", scrolled ? "h-[72px] md:h-[88px]" : "h-[88px] md:h-[108px]")} />
            )}
        </>
    );
}
