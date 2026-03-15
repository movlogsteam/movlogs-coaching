"use client";

import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { CirclePercent } from "lucide-react";
import React, { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const css = `
.candy-bg {
  background-color: hsl(0 0% 96% / 0.012);
  background-image: linear-gradient(
    135deg,
    hsl(0 0% 100% / 0.42) 25%,
    transparent 25.5%,
    transparent 50%,
    hsl(0 0% 100% / 0.42) 50.5%,
    hsl(0 0% 100% / 0.42) 75%,
    transparent 75.5%,
    transparent
  );
  background-size: 12px 12px;
}`;

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  fullLabel: string;
  tone?: string;
};

const metrics: Metric[] = [
  {
    label: "Impressions Created",
    value: 2,
    suffix: "B",
    fullLabel: "2 Billion",
    tone: "bg-sky-400",
  },
  {
    label: "Followers Generated",
    value: 50,
    suffix: "M",
    fullLabel: "50 Million Followers",
    tone: "bg-blue-500",
  },
  {
    label: "Products Launched",
    value: 128,
    suffix: "",
    fullLabel: "128 Products",
    tone: "bg-indigo-500",
  },
  {
    label: "Millions of Money Generated",
    value: 18,
    suffix: "M",
    fullLabel: "$18 Million",
    tone: "bg-cyan-400",
  },
];

const baseHeights = [52, 64, 58, 68];

const Stats = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const heights = useMemo(
    () =>
      metrics.map((_, index) => {
        if (activeIndex === null) return baseHeights[index];
        if (activeIndex === index) return 100;
        return 22;
      }),
    [activeIndex],
  );

  return (
    <section className="py-18 sm:py-24">
      <style>{css}</style>
      <div className="container mx-auto px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="w-full text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            We don&apos;t just talk. We build attention at scale.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Hover any bar to isolate the stat and see what the MoVlogs team has helped create across audiences, products, and revenue.
          </p>
        </div>

        <div className="relative mx-auto mt-10 flex h-[360px] max-w-4xl items-end justify-center gap-2 sm:h-[430px]">
          {metrics.map((metric, index) => {
            const active = activeIndex === index;
            const hasActive = activeIndex !== null;
            const targetHeight = heights[index];

            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="h-full w-[22%] max-w-[210px]"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex((prev) => (prev === index ? null : index))}
              >
                <div className="group relative h-full w-full">
                  <div className="candy-bg relative h-full w-full overflow-hidden rounded-[26px] border border-[var(--border)]">
                    <motion.div
                      animate={{
                        height: `${targetHeight}%`,
                        y: 0,
                        opacity: hasActive ? (active ? 1 : 0.55) : 0.95,
                        filter: hasActive ? (active ? "blur(0px)" : "blur(1px)") : "blur(0px)",
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={cn(
                        "absolute bottom-0 w-full rounded-[26px] p-2 text-white sm:p-3",
                        metric.tone || "bg-sky-400",
                      )}
                    >
                      <div className="relative flex h-12 w-full items-center justify-center gap-1 rounded-full bg-black/20 px-2 text-sm font-semibold tracking-tight sm:h-14 sm:text-base">
                        <NumberFlow value={metric.value} />
                        <span>{metric.suffix}</span>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    animate={{
                      opacity: active ? 1 : 0,
                      y: active ? -6 : 8,
                    }}
                    transition={{ duration: 0.25 }}
                    className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2"
                  >
                    <div className={cn("rounded-xl px-3 py-1 text-xs font-semibold text-white shadow-lg", metric.tone || "bg-sky-400")}>
                      {metric.fullLabel}
                    </div>
                  </motion.div>

                  <p className="mx-auto mt-2 w-fit px-1 text-center text-xs tracking-tight text-muted-foreground sm:text-sm">
                    {metric.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <CirclePercent className="size-4" />
          <span>Hover a bar to focus the stat.</span>
        </div>
      </div>
    </section>
  );
};

export { Stats };
