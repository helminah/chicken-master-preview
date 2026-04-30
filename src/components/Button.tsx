import type { ButtonHTMLAttributes } from "react";
import { cn } from "../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-black uppercase tracking-wide transition duration-300 focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-coal disabled:opacity-50",
        variant === "primary" &&
          "bg-ember text-coal shadow-ember hover:-translate-y-0.5 hover:bg-yellow-400",
        variant === "ghost" && "bg-white/8 text-cream hover:bg-white/14",
        variant === "outline" &&
          "border border-white/18 bg-black/20 text-cream hover:border-ember hover:text-ember",
        className,
      )}
      {...props}
    />
  );
}
