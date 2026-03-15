"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type GrowthPoint = {
  day: number;
  followersK: number; // thousands of followers
  revenueK: number; // thousands AED
};

// Red line: smooth exponential-like follower growth
// Green line: squiggly but upward-trending revenue growth
const growthData: GrowthPoint[] = [
  { day: 0, followersK: 10, revenueK: 12 },
  { day: 10, followersK: 18, revenueK: 26 },
  { day: 20, followersK: 34, revenueK: 20 },
  { day: 30, followersK: 58, revenueK: 42 },
  { day: 40, followersK: 92, revenueK: 37 },
  { day: 50, followersK: 145, revenueK: 74 },
  { day: 60, followersK: 220, revenueK: 61 },
  { day: 70, followersK: 315, revenueK: 108 },
  { day: 80, followersK: 430, revenueK: 96 },
  { day: 90, followersK: 560, revenueK: 172 },
];

function tickK(value: number) {
  if (value === 0) return "";
  return `${value}k`;
}

export default function GrowthVisionChart() {
  return (
    <section className="relative w-full py-2">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(42%_55%_at_72%_42%,rgba(255,52,52,0.08),transparent_70%),radial-gradient(42%_55%_at_32%_62%,rgba(62,255,149,0.08),transparent_70%)]" />

        <div className="mb-3 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-[11px] text-white/70 backdrop-blur sm:gap-4 sm:text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#39e88b] shadow-[0_0_10px_rgba(57,232,139,0.75)]" />
              <span>Revenue (AED)</span>
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff3b3b] shadow-[0_0_10px_rgba(255,59,59,0.75)]" />
              <span>Followers</span>
            </span>
          </div>
        </div>

        <div className="h-[250px] w-full sm:h-[360px] lg:h-[410px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={growthData}
              margin={{
                top: 8,
                right: 6,
                left: -14,
                bottom: 2,
              }}
            >
              <defs>
                <linearGradient id="followers-red" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6b6b" stopOpacity={0.78} />
                  <stop offset="100%" stopColor="#ff2d2d" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="revenue-green" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7cffbc" stopOpacity={0.75} />
                  <stop offset="100%" stopColor="#39e88b" stopOpacity={0.96} />
                </linearGradient>
                <filter id="line-glow-red" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="line-glow-green" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="2 7"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                ticks={[0, 30, 60, 90]}
                tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                tickFormatter={(value) => `${value}`}
              />

              <YAxis
                yAxisId="followers"
                axisLine={false}
                tickLine={false}
                width={40}
                tickMargin={8}
                ticks={[0, 250, 500]}
                domain={[0, 600]}
                tick={{ fill: "rgba(255,255,255,0.32)", fontSize: 11 }}
                tickFormatter={tickK}
              />

              <YAxis
                yAxisId="revenue"
                orientation="right"
                axisLine={false}
                tickLine={false}
                width={40}
                tickMargin={8}
                ticks={[0, 100, 200]}
                domain={[0, 200]}
                tick={{ fill: "rgba(255,255,255,0.28)", fontSize: 11 }}
                tickFormatter={tickK}
              />

              <Tooltip
                cursor={{ stroke: "rgba(255,255,255,0.06)", strokeDasharray: "3 4" }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) return null;
                  const point = payload[0]?.payload as GrowthPoint;
                  return (
                    <div className="rounded-md border border-white/10 bg-[#070f1c]/90 px-2.5 py-1.5 text-xs text-white/85 shadow-lg backdrop-blur">
                      <div className="font-medium text-white/90">Day {label}</div>
                      <div className="text-white/65">Followers {point.followersK}k</div>
                      <div className="text-white/65">AED {point.revenueK}k</div>
                    </div>
                  );
                }}
              />

              <Line
                yAxisId="followers"
                type="monotone"
                dataKey="followersK"
                stroke="#ff3b3b"
                strokeWidth={9}
                strokeOpacity={0.11}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
              <Line
                yAxisId="followers"
                type="monotone"
                dataKey="followersK"
                stroke="url(#followers-red)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={false}
                filter="url(#line-glow-red)"
                activeDot={{ r: 3, fill: "#ff3b3b", strokeWidth: 0 }}
              />

              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenueK"
                stroke="#39e88b"
                strokeWidth={8}
                strokeOpacity={0.1}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
              <Line
                yAxisId="revenue"
                type="monotone"
                dataKey="revenueK"
                stroke="url(#revenue-green)"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={false}
                filter="url(#line-glow-green)"
                activeDot={{ r: 3, fill: "#39e88b", strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
