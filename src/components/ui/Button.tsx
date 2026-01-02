import React from "react";
import { clsx } from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ title, variant = "primary", size = "md", className, children, ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

        const variantStyles = {
            primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
            secondary: "bg-white text-black border-2 border-black hover:bg-black hover:text-white focus:ring-black",
            outline: "bg-transparent text-black border-2 border-black hover:bg-black hover:text-white focus:ring-black",
        };

        const sizeStyles = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <button
                ref={ref}
                className={clsx(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {children || title}
            </button>
        );
    }
);

Button.displayName = "Button";
