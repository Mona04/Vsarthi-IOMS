import React, { ReactNode, HTMLAttributes } from "react";
import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  vertical?: boolean;
  repeat?: number;
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      className,
      reverse = false,
      pauseOnHover = false,
      children,
      vertical = false,
      repeat = 2, 
      ...props
    },
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          "group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
          vertical ? "flex-col" : "flex-row",
          className
        )}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              vertical ? "flex-col animate-marquee-vertical" : "flex-row animate-marquee",
              reverse && "[animation-direction:reverse]",
              pauseOnHover && "group-hover:[animation-play-state:paused]"
            )}
          >
            {children}
          </div>
        ))}
      </div>
    );
  }
);

Marquee.displayName = "Marquee";

export default Marquee;
