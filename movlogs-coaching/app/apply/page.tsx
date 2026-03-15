import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft } from "lucide-react";

import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#080b12]/85 backdrop-blur">
        <div className="mx-auto grid h-[76px] w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/mo-vlogs-logo.png"
              alt="MoVlogs logo"
              width={42}
              height={42}
              className="h-9 w-9 rounded-sm object-contain"
              priority
            />
          </Link>

          <div className="justify-self-center text-sm font-medium text-white/70">Private 1:1 Mentorship Application</div>

          <Link href="/" className="justify-self-end">
            <ShimmerButton
              background="rgba(13, 20, 34, 0.96)"
              shimmerColor="rgba(79, 140, 255, 0.95)"
              shimmerDuration="2.8s"
              className="border-[color:var(--border)] px-4 py-2"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/90">
                <ArrowLeft className="h-4 w-4" />
                Back
              </span>
            </ShimmerButton>
          </Link>
        </div>
      </header>

      <main className="relative overflow-hidden px-5 pb-14 pt-6 sm:px-8 sm:pb-20 sm:pt-10">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(56rem_34rem_at_18%_18%,rgba(79,140,255,0.26),transparent_62%),radial-gradient(56rem_34rem_at_82%_8%,rgba(79,140,255,0.18),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 md:hidden bg-gradient-to-b from-[#0a152b]/72 via-[#0a152b]/44 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-0 hidden opacity-52 md:block">
          <HeroGeometric showContent={false} showVignette={false} className="min-h-full" backgroundClassName="bg-transparent" />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-[24rem] z-0 h-[34rem] w-[135%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(79,140,255,0.18)_0%,rgba(79,140,255,0.08)_38%,rgba(79,140,255,0.03)_54%,transparent_74%)] blur-3xl" />

        <section className="relative z-10 mx-auto w-full max-w-5xl text-center">
          <p className="inline-flex rounded-full border border-[var(--border)] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
            Private 1:1 Mentorship Application
          </p>
          <h1 className="mx-auto mt-3 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            See if you&apos;re a fit to work with us.
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-pretty text-base leading-relaxed text-white/72 sm:text-lg">
            Complete the short application below. If it&apos;s a match, you&apos;ll be invited to book a fit call.
          </p>
        </section>

        <section className="relative z-10 mx-auto mt-8 w-full max-w-5xl rounded-2xl border border-white/18 bg-[#0b1424]/84 p-2 shadow-[0_16px_40px_rgba(2,8,20,0.44)] backdrop-blur-sm sm:mt-10 sm:p-3">
          <div className="overflow-hidden rounded-xl border border-white/60 bg-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]">
            <iframe
              data-tally-src="https://tally.so/embed/rj68vM?alignLeft=1&hideTitle=1&transparentBackground=0&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="620"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Mo Vlogs — Private 1:1 Mentorship Application"
              className="w-full"
            />
          </div>
          <p className="px-3 pb-3 pt-3 text-center text-sm text-white/60 sm:px-4">
            No pressure. We&apos;ll review your application and let you know if this is the right fit.
          </p>
        </section>
      </main>

      <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
      <Script id="tally-embed-init" strategy="afterInteractive">{`
        (function(){
          var d=document;
          var v=function(){
            if (typeof window !== 'undefined' && window.Tally && typeof window.Tally.loadEmbeds === 'function') {
              window.Tally.loadEmbeds();
            } else {
              d.querySelectorAll('iframe[data-tally-src]:not([src])').forEach(function(e){ e.src = e.dataset.tallySrc; });
            }
          };
          v();
        })();
      `}</Script>
    </div>
  );
}
