"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clapperboard,
  HandCoins,
  ImageIcon,
  MessageCircleMore,
  Repeat2,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface FeatureLoopItem {
  title: string;
  subtitle: string;
}

interface FeatureSectionProps {
  items: FeatureLoopItem[];
  className?: string;
}

const iconByTitle: Array<{ match: RegExp; icon: React.ReactNode }> = [
  { match: /position/i, icon: <Target className="h-4 w-4" /> },
  { match: /content engine/i, icon: <Clapperboard className="h-4 w-4" /> },
  { match: /packaging/i, icon: <ImageIcon className="h-4 w-4" /> },
  { match: /growth loops/i, icon: <Repeat2 className="h-4 w-4" /> },
  { match: /monetis|monetiz/i, icon: <HandCoins className="h-4 w-4" /> },
  { match: /access|accountability/i, icon: <MessageCircleMore className="h-4 w-4" /> },
];

function iconFor(title: string) {
  return iconByTitle.find((entry) => entry.match.test(title))?.icon ?? (
    <CheckCircle2 className="h-4 w-4" />
  );
}

export default function FeatureSection({ items, className }: FeatureSectionProps) {
  const loopItems = React.useMemo(
    () =>
      [...items, ...items].map((item, index) => ({
        ...item,
        icon: iconFor(item.title),
        key: `${item.title}-${index}`,
      })),
    [items],
  );

  return (
    <section className={cn("relative w-full py-2", className)}>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative w-full">
          <Card className="overflow-hidden rounded-2xl border-[var(--border)] bg-[#0b1424]/75 shadow-[0_14px_36px_rgba(4,8,18,0.34)] backdrop-blur">
            <CardContent className="relative h-[340px] overflow-hidden p-0 sm:h-[380px]">
              <div className="relative h-full overflow-hidden">
                <motion.div
                  className="absolute w-full"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 18,
                    ease: "linear",
                  }}
                >
                  {loopItems.map((task) => (
                    <div
                      key={task.key}
                      className="relative flex items-center gap-3 border-b border-white/8 px-4 py-3.5 sm:px-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-white/[0.03] text-[var(--accent)]">
                        {task.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white sm:text-[15px]">{task.title}</p>
                        <p className="truncate text-xs text-white/55 sm:text-[13px]">{task.subtitle}</p>
                      </div>
                      <div className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]/70" />
                    </div>
                  ))}
                </motion.div>

                <div className="pointer-events-none absolute left-0 top-0 h-14 w-full bg-gradient-to-b from-[#0b1424] via-[#0b1424]/80 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-14 w-full bg-gradient-to-t from-[#0b1424] via-[#0b1424]/80 to-transparent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            Mentorship Focus
          </Badge>

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What we&apos;re actually mentoring you on.
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              This is not vague motivation. We work on the levers that change a creator&apos;s trajectory:
              positioning, content systems, packaging, distribution, monetisation, and accountability so you ship consistently.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Badge className="px-4 py-1.5 text-sm">1:1 Coaching</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
