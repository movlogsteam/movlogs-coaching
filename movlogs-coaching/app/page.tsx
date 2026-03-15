"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GrowthVisionChart from "@/components/ui/growth-vision-chart";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import FeatureSection from "@/components/ui/feature-section";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { type Story } from "@/components/ui/story-viewer";
import { trackClick } from "@/lib/tracking";

const includes = [
  {
    title: "Channel Positioning",
    text: "Pick a lane people instantly understand — and a brand they remember.",
  },
  {
    title: "Content Engine (Ideas → Scripts → Uploads)",
    text: "A repeatable system for topics, hooks, structure, and consistency.",
  },
  {
    title: "Packaging That Gets Clicks",
    text: "Thumbnails + titles + first 30 seconds — reviewed with you.",
  },
  {
    title: "Growth Loops",
    text: "Shorts, collabs, trends, and distribution that compounds.",
  },
  {
    title: "Monetisation (without selling your soul)",
    text: "Offers, brand deals, and turning attention into revenue.",
  },
  {
    title: "Direct Access + Accountability",
    text: "Regular calls + feedback between calls so you actually ship.",
  },
];

const process = [
  {
    step: "Apply",
    text: "Let us find your goal, your niche, and where you're stuck.",
  },
  {
    step: "2-minute fit call",
    text: "We'll see if it's a match and what you need first.",
  },
  {
    step: "90-day sprint (1:1)",
    text: "We execute weekly; you post; we refine momentum stacks.",
  },
];

const lifestylePhotos = [
  {
    src: "/lifestyle/lifestyle-1.jpeg",
    objectPosition: "center 22%",
  },
  {
    src: "/lifestyle/lifestyle-2.jpeg",
    objectPosition: "center 8%",
  },
  {
    src: "/lifestyle/lifestyle-3.jpeg",
    objectPosition: "center 34%",
  },
  {
    src: "/lifestyle/lifestyle-4.jpeg",
    objectPosition: "center 16%",
  },
  {
    src: "/lifestyle/lifestyle-5.jpeg",
    objectPosition: "center 20%",
  },
] as const;

type CreatorStoryProfile = {
  username: string;
  avatar: string;
  timestamp: string;
  stories: Story[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- kept for future restoration of the archived Success Stories section
const creatorStories: CreatorStoryProfile[] = [
  {
    username: "Anas",
    avatar: "/success-stories/Anas/avatar.png",
    timestamp: "2026-02-21T12:00:00.000Z",
    stories: [],
  },
  {
    username: "Lana",
    avatar: "/success-stories/Lana/avatar.png",
    timestamp: "2026-02-21T08:00:00.000Z",
    stories: [],
  },
  {
    username: "Mummy-Mo",
    avatar: "/success-stories/Mummy-Mo/avatar.png",
    timestamp: "2026-02-20T18:00:00.000Z",
    stories: [],
  },
  {
    username: "Nicole",
    avatar: "/success-stories/Nicole/avatar.png",
    timestamp: "2026-02-20T10:00:00.000Z",
    stories: [],
  },
  {
    username: "Yasmina",
    avatar: "/success-stories/Yasmina/avatar.png",
    timestamp: "2026-02-19T14:00:00.000Z",
    stories: [],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Home() {
  const [mobileHeaderHidden, setMobileHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 768) return;

      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (y < 24) {
        setMobileHeaderHidden(false);
      } else if (delta > 6) {
        setMobileHeaderHidden(true);
      } else if (delta < -6) {
        setMobileHeaderHidden(false);
      }

      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goToApply(eventName: string) {
    trackClick(eventName);
    window.location.href = "/apply";
  }

  return (
    <div className="bg-background text-foreground">
      <header
        className={`sticky top-0 z-40 border-b border-white/10 bg-[#080b12]/85 backdrop-blur transition-transform duration-300 ${
          mobileHeaderHidden ? "-translate-y-full md:translate-y-0" : "translate-y-0"
        }`}
      >
        <div className="mx-auto grid h-[62px] w-full max-w-6xl grid-cols-[auto_1fr] items-center px-4 sm:h-[76px] sm:px-8 md:grid-cols-[1fr_auto_1fr]">
          <a className="inline-flex items-center gap-3 md:justify-self-start" href="#hero" onClick={() => trackClick("nav_logo")}>
            <Image
              src="/mo-vlogs-logo.png"
              alt="MoVlogs logo"
              width={42}
              height={42}
              className="h-8 w-8 rounded-sm object-contain sm:h-9 sm:w-9"
              priority
            />
          </a>

          <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex md:justify-self-center">
            <a className="text-sm text-white/80 transition hover:text-[var(--accent)]" href="#community">
              Community
            </a>
            <a className="text-sm text-white/80 transition hover:text-[var(--accent)]" href="#success">
              Success Stories
            </a>
            <a className="text-sm text-white/80 transition hover:text-[var(--accent)]" href="#about">
              About
            </a>
          </nav>

          <ShimmerButton
            type="button"
            background="rgba(18, 24, 36, 0.98)"
            shimmerColor="rgba(184, 255, 205, 0.95)"
            shimmerDuration="2.8s"
            className="hidden border-white/15 px-5 py-2.5 text-sm shadow-[0_10px_28px_rgba(6,10,18,0.4)] md:inline-flex md:justify-self-end"
            onClick={() => goToApply("cta_header_desktop")}
          >
            <span className="text-sm font-semibold text-[#dff7e7]">See if I&apos;m a fit</span>
          </ShimmerButton>
        </div>
      </header>

      <main className="pb-24 md:pb-0">
        <section
          id="hero"
          className="relative w-full overflow-hidden px-5 pb-12 pt-6 sm:px-8 sm:pb-14 sm:pt-8"
        >
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(56rem_34rem_at_18%_18%,rgba(79,140,255,0.26),transparent_62%),radial-gradient(56rem_34rem_at_82%_8%,rgba(79,140,255,0.18),transparent_65%)]" />
          <div className="pointer-events-none absolute inset-0 z-0 md:hidden bg-gradient-to-b from-[#0a152b]/72 via-[#0a152b]/44 to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-0 hidden opacity-52 md:block">
            <HeroGeometric
              showContent={false}
              showVignette={false}
              className="min-h-full"
              backgroundClassName="bg-transparent"
            />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-[52%] z-0 h-[32rem] w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(79,140,255,0.14)_0%,rgba(79,140,255,0.07)_36%,rgba(79,140,255,0.03)_52%,transparent_74%)] blur-3xl md:bg-[radial-gradient(ellipse_at_center,rgba(79,140,255,0.2)_0%,rgba(79,140,255,0.1)_36%,rgba(79,140,255,0.05)_52%,transparent_74%)]" />

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="relative z-10 mx-auto max-w-5xl py-3 text-center sm:py-4"
          >
            <p className="inline-flex flex-wrap items-center justify-center rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
              30M+ Followers • 4B+ Views • 10+ Years
            </p>
            <h1 className="mx-auto mt-3 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Build a <span className="glow-word">brand</span>.
              <br />
              Turn views into <span className="glow-word">millions</span>.
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
              Watch the video below to see how we grow personal brands, scale audiences, and monetize online.
            </p>

            <div className="mt-5 flex justify-center">
              <ShimmerButton
                type="button"
                background="rgba(18, 24, 36, 0.98)"
                shimmerColor="rgba(184, 255, 205, 0.95)"
                shimmerDuration="2.8s"
                className="border-white/15 px-6 py-3 shadow-[0_10px_28px_rgba(6,10,18,0.4)]"
                onClick={() => goToApply("cta_hero_secondary")}
              >
                <span className="text-sm font-semibold text-[#dff7e7]">See if I&apos;m a fit</span>
              </ShimmerButton>
            </div>
            <p className="mt-2 text-sm text-white/55">No pressure. If we&apos;re not a fit, I&apos;ll tell you.</p>

            <div className="relative mx-auto mt-5 max-w-[1080px] isolate">
              <div className="pointer-events-none absolute inset-x-[-14%] -top-24 bottom-[34%] z-0 bg-[radial-gradient(70%_90%_at_50%_85%,rgba(79,140,255,0.25),rgba(79,140,255,0.1)_46%,transparent_80%)] blur-2xl md:bg-[radial-gradient(70%_90%_at_50%_85%,rgba(79,140,255,0.4),rgba(79,140,255,0.17)_46%,transparent_80%)]" />
              <div className="pointer-events-none absolute inset-x-[2%] -top-10 bottom-[56%] z-0 bg-[radial-gradient(66%_95%_at_50%_88%,rgba(79,140,255,0.18),transparent_78%)] blur-3xl md:bg-[radial-gradient(66%_95%_at_50%_88%,rgba(79,140,255,0.27),transparent_78%)]" />
              <div className="pointer-events-none absolute inset-x-[3%] -bottom-28 top-[62%] z-0 bg-[radial-gradient(62%_70%_at_50%_28%,rgba(79,140,255,0.08),transparent_74%)] blur-3xl md:bg-[radial-gradient(62%_70%_at_50%_28%,rgba(79,140,255,0.15),transparent_74%)]" />
              <div className="relative z-10 overflow-hidden rounded-2xl border border-[var(--border)] shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
                <iframe
                  src="https://www.youtube.com/embed/znKTZ5tG6fE"
                  title="MoVlogs Coaching VSL"
                  loading="lazy"
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mx-auto mt-7 w-full max-w-5xl rounded-2xl border border-white/18 bg-[#0b1424]/88 p-4 shadow-[0_12px_34px_rgba(2,8,20,0.46)] backdrop-blur-sm sm:p-6">
              <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-0">
                <div className="flex items-center gap-2 px-3 text-sm font-semibold text-[var(--accent)] sm:text-base">
                  <Image src="/emoji-followers.png" alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                  <span>30M+ Followers</span>
                </div>
                <div className="hidden h-6 w-px bg-[var(--border)] sm:block" />
                <div className="flex items-center gap-2 px-3 text-sm font-semibold text-[var(--accent)] sm:text-base">
                  <Image src="/emoji-years.png" alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                  <span>10+ Years Online</span>
                </div>
                <div className="hidden h-6 w-px bg-[var(--border)] sm:block" />
                <div className="flex items-center gap-2 px-3 text-sm font-semibold text-white/85 sm:text-base">
                  <Image src="/emoji-views.png" alt="" width={16} height={16} className="h-4 w-4 object-contain" />
                  <span>Billions of Views</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-lg text-white/80 sm:text-xl">
                  <span className="inline-flex items-center gap-2">
                    <Image
                      src="/emoji-official-program.png"
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                    <span>Official Creator Growth Program</span>
                  </span>
                </p>
                <p className="mt-1 text-sm text-white/60">
                  <span className="inline-flex items-center justify-center gap-1.5">
                    <Image
                      src="/emoji-apply.png"
                      alt=""
                      width={14}
                      height={14}
                      className="hidden h-3.5 w-3.5 object-contain sm:inline-block"
                    />
                    <span>Apply below only through this page to avoid fake links.</span>
                  </span>
                </p>
              </div>

              <div className="mt-5 flex justify-center">
                <ShimmerButton
                  type="button"
                  background="rgba(18, 24, 36, 0.98)"
                  shimmerColor="rgba(184, 255, 205, 0.95)"
                  shimmerDuration="2.8s"
                  className="border-white/15 px-8 py-3 shadow-[0_10px_28px_rgba(6,10,18,0.4)]"
                  onClick={() => goToApply("cta_post_video")}
                >
                  <span className="text-sm font-semibold text-[#dff7e7] sm:text-base">See if I&apos;m a fit</span>
                </ShimmerButton>
              </div>

              <p className="mt-5 text-center text-base text-white/80">
                <span className="inline-flex flex-col items-center justify-center gap-1 sm:flex-row sm:items-center sm:gap-1.5">
                  <Image
                    src="/emoji-spots.png"
                    alt=""
                    width={18}
                    height={18}
                    className="hidden h-[18px] w-[18px] object-contain sm:inline-block"
                  />
                  <span className="text-center">
                    <span className="font-semibold text-[#8be7b0]">Private spots fill fast:</span> Join the next intake window.
                  </span>
                </span>
              </p>

              <div className="mt-4 rounded-xl border border-[var(--border)] bg-white/[0.02] px-4 py-3 text-center text-sm text-white/72">
                <Shield className="mr-2 inline size-4 text-[var(--accent)]" />
                Priority is given to creators ready to execute consistently for the next 90 days.
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          id="community"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8"
        >
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">Inside The 1:1</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">What you get when you&apos;re accepted.</h2>
          </div>
          <FeatureSection items={includes.map((item) => ({ title: item.title, subtitle: item.text }))} />
        </motion.section>

        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-12"
        >
          <GrowthVisionChart />
        </motion.section>

        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8"
        >
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">Your Path</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Apply. Get accepted. Build momentum.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {process.map((item) => (
              <article key={item.step} className="surface-card rounded-2xl p-5">
                <h3 className="text-lg font-semibold">
                  {item.step.toLowerCase().includes("apply") ? (
                    <span className="inline-flex items-center gap-2">
                      <Image src="/emoji-apply.png" alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                      <span>{item.step}</span>
                    </span>
                  ) : (
                    item.step
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/72">{item.text}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8"
        >
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">At The Top</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">The brand, the reach, the rooms it gets you into.</h2>
          </div>
          <div className="hidden sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-5">
            {lifestylePhotos.map((photo, index) => (
              <div
                key={photo.src}
                className="surface-card relative aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <Image
                  src={photo.src}
                  alt={`Lifestyle photo ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  className="object-cover"
                  style={{ objectPosition: photo.objectPosition }}
                />
              </div>
            ))}
          </div>

          <div className="sm:hidden">
            <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
              {lifestylePhotos.map((photo, index) => (
                <div
                  key={photo.src}
                  className="surface-card relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-2xl"
                >
                  <Image
                    src={photo.src}
                    alt={`Lifestyle photo ${index + 1}`}
                    fill
                    sizes="78vw"
                    loading="eager"
                    unoptimized
                    className="object-cover"
                    style={{ objectPosition: photo.objectPosition }}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Success Stories / Case Snapshot section intentionally removed from active page for now.
            Keep `creatorStories` data and StoryViewer imports in place so this block can be restored later. */}

        <motion.section
          id="about"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8"
        >
          <div className="mx-auto grid max-w-5xl items-start gap-5 lg:grid-cols-[0.58fr_1.18fr]">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)]">
              <Image
                src="/movlogs-quote-photo.jpeg"
                alt="MoVlogs portrait"
                width={1000}
                height={1200}
                className="h-full min-h-[220px] w-full object-cover"
              />
            </div>
            <article className="p-1 sm:p-2">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">About MoVlogs</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Built on reputation at scale.</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-[var(--border)] bg-white/[0.03] px-3 py-1 text-xs text-white/70">30M+ Total Followers</span>
                <span className="rounded-full border border-[var(--border)] bg-white/[0.03] px-3 py-1 text-xs text-white/70">11M+ Main YouTube</span>
                <span className="rounded-full border border-[var(--border)] bg-white/[0.03] px-3 py-1 text-xs text-white/70">10M+ Arabic YouTube</span>
              </div>
              <p className="mt-4 rounded-xl border border-[var(--border)] bg-white/[0.03] p-4 text-base italic leading-relaxed text-white/90 sm:text-lg">
                &quot;I thought getting 10 million subscribers on YouTube was luck, so I did it{" "}
                <span className="glow-word underline decoration-[rgba(141,190,255,0.8)] underline-offset-4">again</span>{" "}
                and{" "}
                <span className="glow-word underline decoration-[rgba(141,190,255,0.8)] underline-offset-4">again</span>{" "}
                and{" "}
                <span className="glow-word underline decoration-[rgba(141,190,255,0.8)] underline-offset-4">again</span>
                .&quot;
              </p>
            </article>
          </div>
        </motion.section>

        <motion.section
          id="apply"
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-full max-w-6xl px-5 pb-24 pt-14 sm:px-8"
        >
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">Ready To Start?</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/emoji-apply.png"
                  alt=""
                  width={24}
                  height={24}
                  className="hidden h-5 w-5 object-contain sm:inline-block sm:h-6 sm:w-6"
                />
                <span>Apply for private 1:1 mentorship.</span>
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/74">
              If you&apos;re serious about building a channel and monetising your personal brand, apply. If accepted, you&apos;ll book a fit call.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-white/80">
              <span className="rounded-full border border-[var(--border)] bg-white/[0.03] px-3 py-1">
                <span className="inline-flex items-center gap-1.5">
                  <Image
                    src="/emoji-apply.png"
                    alt=""
                    width={14}
                    height={14}
                    className="hidden h-3.5 w-3.5 object-contain sm:inline-block"
                  />
                  <span>Application-only</span>
                </span>
              </span>
              <span className="rounded-full border border-[var(--border)] bg-white/[0.03] px-3 py-1">Direct 1:1 access</span>
              <span className="rounded-full border border-[var(--border)] bg-white/[0.03] px-3 py-1">Execution accountability</span>
            </div>

            <div className="mt-6 flex justify-center">
              <ShimmerButton
                type="button"
                background="rgba(79, 140, 255, 1)"
                shimmerColor="#d8e7ff"
                shimmerDuration="2.8s"
                className="px-8 py-3"
                onClick={() => goToApply("cta_final_apply")}
              >
                <span className="text-sm font-semibold text-[#05152f] sm:text-base">Apply now</span>
              </ShimmerButton>
            </div>

            <p className="mt-6 text-sm text-white/70">
              <Shield className="mr-2 inline size-4 text-[var(--accent)]" />
              Security Warning: beware of fake pages and impersonator accounts.
            </p>
            <p className="mt-1 text-sm text-white/70">Only use official links shared on this page.</p>
          </div>
        </motion.section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#080b12]/95 p-3 backdrop-blur md:hidden">
        <ShimmerButton
          type="button"
          background="rgba(18, 24, 36, 0.98)"
          shimmerColor="rgba(184, 255, 205, 0.95)"
          shimmerDuration="2.8s"
          className="w-full border-white/15 px-5 py-3 shadow-[0_10px_28px_rgba(6,10,18,0.4)]"
          onClick={() => goToApply("cta_mobile_sticky")}
        >
          <span className="text-sm font-semibold text-[#dff7e7]">See if I&apos;m a fit</span>
        </ShimmerButton>
      </div>
    </div>
  );
}
