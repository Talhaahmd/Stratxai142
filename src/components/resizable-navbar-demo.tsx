"use client";
import {
    Navbar,
    NavBody,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    NavLink,
    NavMegaMenu,
    NavServicesMegaMenu,
    NavAboutMegaMenu,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { cases } from "@/components/FeaturedCases";
import { services } from "@/components/ServicesSection";

export default function NavbarDemo() {
    const aboutUsItems = [
        { name: "Our story", link: "#story" },
        { name: "Our Clients", link: "#clients" },
        { name: "Our Products", link: "#products" },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <div className="flex items-center gap-2">
                        <NavLink href="/">Home</NavLink>
                        <NavAboutMegaMenu title="About us" />
                        <NavServicesMegaMenu title="Services we offer" services={services} />
                        <NavMegaMenu title="Case Studies" cases={cases} />
                    </div>
                    <div className="flex items-center gap-4">
                        <NavbarButton variant="dark" href="/contact">Book a call</NavbarButton>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="flex flex-col gap-4">
                            <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-neutral-600">Home</a>
                            <div className="flex flex-col gap-2 pl-4 border-l border-neutral-100">
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">About us</span>
                                {aboutUsItems.map((item, idx) => (
                                    <a key={idx} href={item.link} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-neutral-600 italic">
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-neutral-600">Services we offer</a>
                            <a href="#cases" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-neutral-600">Case Studies</a>
                        </div>
                        <div className="flex w-full flex-col gap-4 pt-4 border-t border-neutral-100">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="dark"
                                className="w-full"
                            >
                                Book a call
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}
