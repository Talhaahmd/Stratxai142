"use client";

import { IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";

const NAVIGATION = [
    { name: "HOME", href: "#" },
    { name: "SERVICES", href: "#" },
    { name: "CASES", href: "#" },
    { name: "ABOUT", href: "#" },
    { name: "CONTACT", href: "#" },
];

const HEADQUARTERS = [
    "VOLMERLAAN 5",
    "2288GC",
    "RIJSWIJK, ZH",
    "THE NETHERLANDS",
];

const SUPPORT = [
    "MON-FRI 9AM - 6PM",
];

const LEGAL = [
    { name: "PRIVACY POLICY", href: "#" },
    { name: "TERMS & CONDITIONS", href: "#" },
];

const REACH_OUT = [
    "HELLO@HATAMEX.AGENCY",
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white text-black py-16 lg:py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <a href="#" className="inline-block">
                        <img
                            src="https://res.cloudinary.com/dt93sahp2/image/upload/v1763315593/freepik__background__87989_hvfjjm.png"
                            alt="logo"
                            className="h-10 md:h-12 w-auto"
                        />
                    </a>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
                    {/* Navigation */}
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-black/40 mb-8 uppercase">
                            NAVIGATION
                        </h4>
                        <ul className="space-y-4">
                            {NAVIGATION.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className="text-[11px] font-bold tracking-widest hover:text-[#1E2BFF] transition-colors uppercase"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Headquarters & Support */}
                    <div className="space-y-12">
                        <div>
                            <h4 className="text-[10px] font-bold tracking-[0.2em] text-black/40 mb-8 uppercase">
                                HEADQUARTERS
                            </h4>
                            <ul className="space-y-1">
                                {HEADQUARTERS.map((item, i) => (
                                    <li key={i} className="text-[11px] font-bold tracking-widest uppercase">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold tracking-[0.2em] text-black/40 mb-8 uppercase">
                                SUPPORT
                            </h4>
                            <ul className="space-y-1">
                                {SUPPORT.map((item, i) => (
                                    <li key={i} className="text-[11px] font-bold tracking-widest uppercase">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-black/40 mb-8 uppercase">
                            LEGAL
                        </h4>
                        <ul className="space-y-4">
                            {LEGAL.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className="text-[11px] font-bold tracking-widest hover:text-[#1E2BFF] transition-colors uppercase"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Reach Out */}
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.2em] text-black/40 mb-8 uppercase">
                            REACH OUT
                        </h4>
                        <ul className="space-y-4">
                            {REACH_OUT.map((item, i) => (
                                <li key={i} className="text-[11px] font-bold tracking-widest uppercase">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-8 pt-12 border-t border-black/5">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase">
                        ©{currentYear} HATAMEX DIGITAL AGENCY ALL RIGHTS RESERVED
                    </p>

                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="w-10 h-10 bg-[#1E2BFF] text-white flex items-center justify-center rounded-sm hover:scale-105 transition-transform"
                        >
                            <IconBrandInstagram size={20} stroke={2.5} />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 bg-[#1E2BFF] text-white flex items-center justify-center rounded-sm hover:scale-105 transition-transform"
                        >
                            <IconBrandLinkedin size={20} stroke={2.5} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
