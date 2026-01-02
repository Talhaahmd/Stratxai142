"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX, IconPlus } from "@tabler/icons-react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState, createContext, useContext } from "react";

const NavbarContext = createContext<{ visible: boolean }>({ visible: false });

export const useNavbar = () => useContext(NavbarContext);


interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}

interface NavBodyProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

interface NavItemsProps {
    items: {
        name: string;
        link: string;
    }[];
    className?: string;
    onItemClick?: () => void;
}

interface MobileNavProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

interface MobileNavHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface MobileNavMenuProps {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    });

    return (
        <NavbarContext.Provider value={{ visible }}>
            <motion.div
                ref={ref}
                className={cn("fixed inset-x-0 top-0 z-50 w-full px-4 sm:px-6 lg:px-8", className)}
            >
                {children}
            </motion.div>
        </NavbarContext.Provider>
    );
};

export const NavBody = ({ children, className }: Omit<NavBodyProps, "visible">) => {
    const { visible } = useNavbar();
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(16px)" : "blur(0px)",
                boxShadow: visible
                    ? "0 0 24px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 4px rgba(0, 0, 0, 0.08)"
                    : "none",
                width: visible ? "65%" : "100%",
                y: visible ? 15 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
            }}
            style={{
                minWidth: visible ? "600px" : "100%",
            }}
            className={cn(
                "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-2xl bg-transparent px-8 py-4 lg:flex transition-all duration-300",
                visible ? "bg-white/80 border border-white/30 shadow-2xl" : "bg-transparent",
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <motion.div
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
                className,
            )}
        >
            {items.map((item, idx) => (
                <a
                    onMouseEnter={() => setHovered(idx)}
                    onClick={onItemClick}
                    className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300"
                    key={`link-${idx}`}
                    href={item.link}
                >
                    {hovered === idx && (
                        <motion.div
                            layoutId="hovered"
                            className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                        />
                    )}
                    <span className="relative z-20">{item.name}</span>
                </a>
            ))}
        </motion.div>
    );
};

export const MobileNav = ({ children, className }: Omit<MobileNavProps, "visible">) => {
    const { visible } = useNavbar();
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(16px)" : "blur(0px)",
                boxShadow: visible
                    ? "0 0 24px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    : "none",
                width: visible ? "92%" : "100%",
                y: visible ? 15 : 0,
                borderRadius: visible ? "16px" : "0px",
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 30,
            }}
            className={cn(
                "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-transparent px-4 py-4 lg:hidden transition-all duration-300",
                visible ? "bg-white/80 border border-white/30 shadow-xl" : "bg-transparent",
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

export const MobileNavHeader = ({
    children,
    className,
}: MobileNavHeaderProps) => {
    return (
        <div
            className={cn(
                "flex w-full flex-row items-center justify-between",
                className,
            )}
        >
            {children}
        </div>
    );
};

export const MobileNavMenu = ({
    children,
    className,
    isOpen,
    onClose: _onClose,
}: MobileNavMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
                        className,
                    )}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const MobileNavToggle = ({
    isOpen,
    onClick,
}: {
    isOpen: boolean;
    onClick: () => void;
}) => {
    return isOpen ? (
        <IconX className="text-black dark:text-white" onClick={onClick} />
    ) : (
        <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
    );
};

export const NavbarLogo = ({ visible: _visible }: { visible?: boolean }) => {
    const { visible } = useNavbar();
    return (
        <a
            href="#"
            className="relative z-20 mr-4 flex items-center gap-3 px-1"
        >
            <img
                src="https://res.cloudinary.com/dt93sahp2/image/upload/v1763315593/freepik__background__87989_hvfjjm.png"
                alt="logo"
                className="h-8 md:h-10 w-auto invert dark:invert-0"
            />
            <AnimatePresence mode="wait">
                {!visible && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-lg font-bold tracking-tight text-white dark:text-white whitespace-nowrap"
                    >
                        Klarus AI
                    </motion.span>
                )}
            </AnimatePresence>
        </a>
    );
};

export const NavLink = ({
    href,
    children,
    visible: _visible,
    className
}: {
    href: string;
    children: React.ReactNode;
    visible?: boolean;
    className?: string;
}) => {
    const { visible } = useNavbar();
    return (
        <a
            href={href}
            className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                visible ? "text-black hover:text-neutral-700" : "text-white hover:text-white/80 dark:text-neutral-300",
                className
            )}
        >
            {children}
        </a>
    );
};

export const NavDropdown = ({
    title,
    items,
    visible: _visible
}: {
    title: string;
    items: { name: string; link: string }[];
    visible?: boolean;
}) => {
    const { visible } = useNavbar();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={cn(
                    "flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors",
                    visible ? "text-black hover:text-neutral-700" : "text-white hover:text-white/80 dark:text-neutral-300"
                )}
            >
                {title}
                <IconPlus className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-45")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute left-0 top-full pt-2 min-w-[200px] z-[70]"
                    >
                        <div className="bg-white/90 backdrop-blur-xl border border-neutral-200/50 rounded-2xl p-2 shadow-2xl flex flex-col">
                            {items.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={item.link}
                                    className="px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const NavbarButton = ({
    href,
    as: Tag = "a",
    children,
    className,
    variant = "primary",
    visible: _visible,
    ...props
}: {
    href?: string;
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "dark" | "gradient";
    visible?: boolean;
} & (
        | React.ComponentPropsWithoutRef<"a">
        | React.ComponentPropsWithoutRef<"button">
    )) => {
    const { visible } = useNavbar();
    const baseStyles =
        "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

    const variantStyles = {
        primary:
            "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
        secondary: "bg-transparent shadow-none dark:text-white",
        dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
        gradient:
            "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
    };

    const DynamicTag = Tag as any;

    return (
        <DynamicTag
            href={href || undefined}
            className={cn(
                baseStyles,
                variantStyles[variant],
                visible && "bg-white text-black px-6 shadow-md border border-neutral-200", // Enforce black text on white background for scroll
                className
            )}
            {...props}
        >
            {children}
        </DynamicTag>
    );
};

export { NavMegaMenu } from "./NavMegaMenu";
export { NavServicesMegaMenu } from "./NavServicesMegaMenu";
export { NavAboutMegaMenu } from "./NavAboutMegaMenu";
