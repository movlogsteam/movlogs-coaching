"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  className?: string;
  avatar?: string;
  username?: string;
  handle?: string;
  content?: string;
  date?: string;
  verified?: boolean;
  likes?: number;
  retweets?: number;
  tweetUrl?: string;
  onHover?: () => void;
  onLeave?: () => void;
  isActive?: boolean;
  onTap?: () => void;
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg className="size-4 text-[#1d9bf0]" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

function TestimonialCard({
  className,
  avatar,
  username = "PEPE",
  handle = "@PEPE_bigbrother",
  content = "This is amazing! 🔥 Absolutely loving what the team is building here. Can't wait to see what comes next!",
  date = "Jan 5, 2026",
  verified = true,
  likes = 142,
  retweets = 23,
  onHover,
  onLeave,
  isActive,
  onTap,
}: TestimonialCardProps) {
  const onTouchOrClick = () => {
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (isTouchDevice) {
      onTap?.();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onTouchOrClick}
      onTouchEnd={onTouchOrClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className={cn(
        "relative flex min-h-[170px] w-[270px] select-none flex-col rounded-2xl border border-border bg-card/92 px-3 py-3 backdrop-blur-sm transition-all duration-300 sm:min-h-[210px] sm:w-[350px] sm:px-4 sm:py-4",
        "cursor-pointer hover:border-border/80",
        isActive && "ring-2 ring-primary/50",
        className,
      )}
    >
      <div className="mb-2 flex items-start gap-2 sm:mb-3 sm:gap-3">
        <div className="size-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-green-400 via-yellow-400 to-green-500 sm:size-12">
          {avatar ? (
            <img src={avatar} alt={username} className="h-full w-full object-cover" />
          ) : (
            <span className="text-lg sm:text-2xl">🐸</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate text-xs font-bold text-foreground sm:text-base">{username}</span>
            {verified ? <VerifiedBadge /> : null}
          </div>
          <span className="text-[10px] text-muted-foreground sm:text-sm">{handle}</span>
        </div>
        <TwitterIcon className="size-4 shrink-0 text-foreground sm:size-5" />
      </div>

      <p className="mb-2 text-xs leading-relaxed text-foreground sm:mb-3 sm:text-[15px]">
        {content}
      </p>

      <div className="mt-auto flex items-center justify-between text-[10px] text-muted-foreground sm:text-sm">
        <span>{date}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            <span>{retweets}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

interface TestimonialsProps {
  cards?: TestimonialCardProps[];
}

export default function Testimonials({ cards }: TestimonialsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const displayCards = cards || [];
  const focusedIndex = hoveredIndex ?? activeIndex;

  return (
    <div className="mx-auto w-full max-w-[1160px] overflow-visible">
      <div className="overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-end px-2 pb-20 pt-28 sm:px-4 sm:pb-24 sm:pt-32">
          {displayCards.map((cardProps, index) => {
            const isFocused = focusedIndex === index;
            const hasFocus = focusedIndex !== null;
            return (
              <div
                key={index}
                className={cn(
                  "first:ml-0 -ml-44 transition-all duration-300 sm:-ml-56",
                  hasFocus
                    ? isFocused
                      ? "z-30 -translate-y-20 scale-[1.02] sm:-translate-y-28"
                      : "z-10 translate-y-12 scale-[0.96] blur-[1px] opacity-55 saturate-75 sm:translate-y-16"
                    : "z-20",
                )}
              >
                <TestimonialCard
                  {...cardProps}
                  className={cardProps.className || ""}
                  isActive={activeIndex === index}
                  onHover={() => setHoveredIndex(index)}
                  onLeave={() => setHoveredIndex(null)}
                  onTap={() => setActiveIndex(index)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-8">
      <Testimonials />
    </div>
  );
}

export { TestimonialCard, Testimonials, Component };
export type { TestimonialCardProps, TestimonialsProps };
