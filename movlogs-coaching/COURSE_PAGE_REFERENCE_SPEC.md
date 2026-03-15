# MoVlogs Landing Page (Next.js) - Full Reference Spec for Building a Low-Ticket Course Page

This document describes the current **Next.js / Tailwind** page implementation in detail so you can recreate the same visual language and layout system for a **low-ticket course offer page**.

Project path:
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching`

Primary source files:
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching/app/page.tsx`
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching/app/globals.css`
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching/app/apply/page.tsx`
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching/components/ui/*`

## 1. Stack / Architecture

- Framework: **Next.js (App Router)**
- Language: **TypeScript**
- Styling: **Tailwind CSS** + custom CSS variables in `globals.css`
- Motion: **Framer Motion**
- Icons: **lucide-react**
- Media:
  - `next/image` for local assets
  - YouTube `iframe` embed for VSL
  - Tally embed on `/apply`

## 2. Core Visual Direction (What to Preserve)

This page is designed as a **premium creator/influencer offer page**, not an agency page.

### Design intent
- Dark background, blue-accented, premium minimal
- Strong hero typography with selective glow words
- Rounded panels with subtle borders and blur
- High contrast CTA hierarchy
- Mobile-first readability with desktop visual richness

### Current palette (CSS variables)
Defined in `/app/globals.css`:

- `--background: #080b12`
- `--surface: #0f1420`
- `--surface-elevated: #141b2a`
- `--foreground: #f5f7ff`
- `--muted: #9eabc2`
- `--border: rgba(79, 140, 255, 0.22)`
- `--accent: #4f8cff`

### Background treatment
- `body` uses layered **radial blue gradients** + dark base fill.
- Hero adds extra radial glows and animated abstract blue shapes (`HeroGeometric`) on desktop.
- Mobile reduces background interference with a darker scrim overlay.

## 3. Typography System (Current)

### Font
- Uses `Manrope` via `--font-manrope` (mapped to Tailwind `font-sans` in `@theme inline`).

### Headings
- Hero H1:
  - Mobile: `text-4xl`
  - Small screens: `sm:text-5xl`
  - Desktop: `lg:text-6xl`
  - Weight: `font-semibold`
  - Line-height: `leading-[1.08]`
  - Tracking: `tracking-tight`
  - Width cap: `max-w-4xl`

- Section H2 (most sections):
  - Mobile: `text-3xl`
  - Small screens: `sm:text-4xl`
  - Weight: `font-semibold`
  - Tracking: `tracking-tight`

- Smaller section headings/cards:
  - `text-xl`, `text-lg`, `text-base` depending on density.

### Labels / Eyebrows
- Typically:
  - `text-xs`
  - `font-semibold`
  - `uppercase`
  - `tracking-[0.08em]`
  - Accent color `text-[var(--accent)]`

### Body text
- Primary supporting copy: `text-base sm:text-lg`, `leading-relaxed`
- Secondary muted copy: `text-sm`, `text-white/60-75`

### Glow text pattern
Class in `globals.css`:
- `.glow-word` = blue color + text-shadow glow
- Glow is reduced on mobile (`@media (max-width: 640px)`) for readability

Use this for **selective words only** (e.g., “brand”, “millions”), not whole paragraphs.

## 4. Layout System (Current)

### Max widths used repeatedly
- Overall content containers: `max-w-6xl`
- Hero text cluster: `max-w-5xl`
- Hero heading: `max-w-4xl`
- Video wrapper: `max-w-[1080px]`
- Success stories row wrapper: `max-w-5xl`
- Final CTA: `max-w-4xl`

### Section horizontal padding
- Most sections: `px-5 sm:px-8`

### Section spacing (typical)
- `py-14`, `py-16`, `pt-14`, `pb-24` etc.
- Hero has tighter top spacing to show the video earlier without scrolling.

## 5. Header (Current Behavior + Styling)

### Structure
- Sticky header with auto-hide on mobile scroll down.
- Grid layout on desktop for proper visual centering:
  - Left: logo
  - Center: nav
  - Right: CTA button

### Header styling
- `sticky top-0 z-40`
- `border-b border-white/10`
- `bg-[#080b12]/85`
- `backdrop-blur`

### Heights
- Mobile: `h-[62px]`
- Small+ screens: `sm:h-[76px]`

### Mobile behavior
- Header hides when scrolling down; reappears when scrolling up.
- This preserves vertical screen space because a sticky bottom CTA also exists.

## 6. CTA System (Important - Reuse This)

### Primary recurring CTA style (current preferred style)
Used for all `See if I’m a fit` buttons.

Component:
- `ShimmerButton` (`/components/ui/shimmer-button.tsx`)

Current standardized style:
- Background: `rgba(18, 24, 36, 0.98)` (dark gray/navy)
- Shimmer color: `rgba(184, 255, 205, 0.95)` (green tint)
- Border: `border-white/15`
- Text color: `#dff7e7`
- Shadow: `shadow-[0_10px_28px_rgba(6,10,18,0.4)]`

This style is intentionally different from the blue accent so the CTA reads as an action state rather than a decorative brand accent.

### Other CTA styles
- Final `Apply now` button still uses a **blue** filled shimmer style (separate conversion tier / final commit CTA).
- Mobile sticky CTA mirrors the green-tinted dark style.

## 7. Page Structure (Current) - Section by Section

Order from `/app/page.tsx`:

### A. Hero (`#hero`)
Includes:
- Top stat pill: `30M+ Followers • 4B+ Views • 10+ Years`
- Large headline (2-line):
  - `Build a brand.`
  - `Turn views into millions.`
- Subheadline
- Single CTA (`See if I’m a fit`)
- Microcopy: `No pressure...`
- YouTube VSL embed (`NMH3Hck--rE`)
- Post-video trust/info card (stats + official program + CTA + urgency + priority line)

#### Hero details to replicate for course page
- Keep the same layered blue ambient background and glow around the video area.
- Keep headline split into **two lines** for balance.
- Keep one high-clarity CTA above the video.
- Keep a post-video “trust card” with social proof + CTA + urgency.

### B. “Inside The 1:1” / Offer Deliverables (`#community`)
Current title + subtitle pattern:
- Eyebrow: `Inside The 1:1`
- Heading: `What you get when you're accepted.`

Render component:
- `FeatureSection` (`/components/ui/feature-section.tsx`)

Current behavior:
- Left side: looping list of deliverables (animated vertical loop)
- Right side: explanation of what is mentored
- Right-side extra mini tags removed (kept intentionally minimal)

#### For low-ticket course version
Change the semantics from done-with-you mentorship to self-paced/assisted course:
- Rename to `Inside the Course`
- Replace “1:1 coaching” references with:
  - modules
  - templates
  - checklists
  - office hours / community (if applicable)

### C. Visual Growth Graph (custom, non-technical)
Current component:
- `GrowthVisionChart` (`/components/ui/growth-vision-chart.tsx`)

Current visual intent:
- Red line = follower growth (exponential-ish)
- Green line = revenue (AED) trend, squiggly upward
- Minimal axis labels
- Small indicator above chart clarifies colors:
  - green = revenue
  - red = followers
- No card wrapper (integrated into page background)

#### For low-ticket course version
Keep the same “cool proof graphic” concept, but consider switching the story:
- `Views -> clicks -> sales`
- `Students -> completions -> results`
- Keep it visual, not analytical.

### D. Process / Path section
Current:
- Eyebrow: `Your Path`
- Heading: `Apply. Get accepted. Build momentum.`
- 3 process cards (dark surface cards)

#### For low-ticket course version
This should become simpler and lower-friction, e.g.:
- `Buy -> Start -> Implement`
- `Watch -> Apply -> Repeat`

And card copy should match low-ticket behavior (no acceptance/fit call if not relevant).

### E. Lifestyle / Brand section
Current:
- Eyebrow: `At The Top`
- Heading: `The brand, the reach, the rooms it gets you into.`
- Grid of 4 lifestyle images (`/public/lifestyle/*`)

Purpose:
- Reputation and aspiration without sounding salesy.

#### For low-ticket course version
Keep this section if the course sells identity/status outcomes.
If not, replace with:
- dashboard screenshots
- curriculum previews
- student implementation snapshots

### F. Success Stories (`#success`)
Current:
- Eyebrow + centered heading: `Who we've worked with.`
- Story-style avatar row (Instagram stories visual language)
- Fallback static avatars when no story assets exist
- Case snapshot card underneath

Current avatar asset path:
- `/public/success-stories/<Name>/avatar.png`

Current profiles wired:
- Anas
- Lana
- Mummy-Mo
- Nicole
- Yasmina

#### For low-ticket course version
Reuse the same row pattern, but likely rename the section:
- `Students inside the course`
- `Creators in the community`
- `Real people implementing this`

### G. About (`#about`)
Current layout:
- Left: portrait image (`/movlogs-quote-photo.jpeg`)
- Right: tags + headline + quote
- Quote emphasizes `again and again and again` using blue glow/underline on the word `again` only

This section is credibility and authority framing.

#### For low-ticket course version
Still include an authority section, but shift the angle:
- why this course exists
- what it helps with specifically
- what it does **not** promise

### H. Final CTA (`#apply`)
Current:
- Eyebrow: `Ready To Start?`
- Heading: `Apply for private 1:1 mentorship.`
- Supporting text
- Trust pills
- Blue `Apply now` button
- Security warning line

#### For low-ticket course version (important change)
This should likely become a checkout CTA section, not application CTA:
- `Start the course today`
- `Get instant access`
- `One-time payment` / `Payment plan` (if applicable)
- `Checkout` / `Enroll now`

## 8. Mobile-Specific Optimizations Already Implemented (Carry Forward)

These are important and should be preserved in your next page:

- Header auto-hide on scroll (mobile only)
- Sticky bottom CTA on mobile (`md:hidden`)
- Reduced hero glow intensity / scrim overlay on mobile for text legibility
- Emoji icons hidden on small screens in certain lines to avoid awkward wrapping
- Reduced glow intensity for `.glow-word` on mobile (`globals.css` media query)

## 9. Content / Copy Patterns Worth Reusing for Low-Ticket

### Good patterns to keep
- Clear, outcome-led hero headline (no hype language)
- One primary CTA above fold
- VSL or preview video early
- Immediate social proof/trust block under video
- Visual proof section (graph, screenshots, story avatars)
- Process broken into 3 steps
- Strong final CTA repeated at end

### What to change for low-ticket specifically
Current page is built for high-ticket 1:1 coaching. For a course page, replace:
- `Apply` language -> `Enroll`, `Get instant access`, `Start now`
- `Accepted` / `fit call` language -> `checkout` / `start learning` / `module 1 today`
- `Direct 1:1 access` claims -> `community`, `support`, `office hours`, `Q&A`, `feedback` (only if true)
- Scarcity messaging -> ethical enrollment framing (price raise date, cohort start, bonus expiry)

## 10. Component Inventory (Current)

Used on main page:
- `/components/ui/shimmer-button.tsx`
- `/components/ui/shape-landing-hero.tsx`
- `/components/ui/feature-section.tsx`
- `/components/ui/story-viewer.tsx`
- `/components/ui/growth-vision-chart.tsx`
- `/components/ui/line-chart.tsx` (chart utility)

Other integrated/archived utilities still in project (not all active on page):
- `statistics-card.tsx` (bar chart section removed from page but kept in codebase)
- `twitter-testimonial-cards.tsx` (replaced)
- `typewriter-testimonial.tsx` (replaced)

## 11. Assets / File Organization (Current)

Important asset paths in `/public`:
- `/mo-vlogs-logo.png`
- `/movlogs-quote-photo.jpeg`
- `/graph-1.png` (legacy, not currently used in page section)
- `/lifestyle/lifestyle-1.jpg` ... `/lifestyle/lifestyle-4.jpg`
- `/success-stories/<Name>/avatar.png`
- `/emoji-*.png` custom icons

Recommended approach for the low-ticket page:
- Create a new folder for course-specific assets, e.g.:
  - `/public/course/`
  - `/public/course/testimonials/`
  - `/public/course/screenshots/`

## 12. Spacing / Formatting Summary (Quick Reference)

### Repeated visual tokens
- Rounded panels: `rounded-2xl`
- Section cards: `surface-card` (+ sometimes `p-5` / `p-6`)
- Borders: `border border-[var(--border)]` or `border-white/18` for stronger separation
- Muted text: `text-white/60` to `text-white/75`
- Accent text: `text-[var(--accent)]`

### Common paddings
- Section horizontal: `px-5 sm:px-8`
- Section card padding: `p-4`, `p-5`, `p-6`
- CTA area vertical rhythm: `mt-5`, `mt-6`, `mt-7`

### Common widths
- Sections: `max-w-6xl`
- Hero center content: `max-w-5xl`
- Final CTA center content: `max-w-4xl`

## 13. Tracking / Behavior Notes

Current CTA/event tracking helper:
- `trackClick` from `/lib/tracking`

Examples currently tracked:
- `cta_header_desktop`
- `cta_hero_secondary`
- `cta_post_video`
- `cta_final_apply`
- `cta_mobile_sticky`
- `story_view`
- `story_complete`

For a course page, keep tracking but rename events to match funnel stages:
- `cta_hero_enroll`
- `cta_pricing_buy_now`
- `cta_footer_checkout`
- `video_play_intro`

## 14. Apply Page (/apply) - Reference

Route:
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching/app/apply/page.tsx`

Behavior:
- Same dark blue ambient page background style
- Tally form embedded in a **white card** for contrast (`transparentBackground=0`)
- Used as destination for all `See if I’m a fit` / `Apply now` CTAs

For a low-ticket course flow, you may replace `/apply` with:
- `/checkout`
- `/waitlist`
- `/offer`
- or keep `/apply` only if using qualification

## 15. How to Use This Spec for a Low-Ticket Course Page (Practical Prompting Guidance)

When prompting another AI, give it:
1. This file
2. Your new offer details (course name, price, promise, modules)
3. Your funnel goal (checkout vs waitlist vs application)
4. What stays the same (blue theme, hero/video style, CTA style)
5. What changes (1:1 language -> course language)

### Suggested adaptation checklist
- Keep: header, hero background, VSL layout, post-video trust card, story-avatar section, premium spacing
- Change: all copy tied to applications/acceptance/1:1 mentorship
- Add for low-ticket: pricing block, module breakdown, FAQ, guarantee/refund policy (if applicable), checkout CTA(s)
- Simplify: reduce qualification friction and emphasize immediate clarity/value

## 16. Recommended New File for the Course Version

If you build a second page inside the same project, use one of these:
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching/app/course/page.tsx`
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching/app/academy/page.tsx`
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching/app/start/page.tsx`

## 17. Notes / Caveats

- `story-viewer.tsx` currently uses raw `<img>` tags and produces lint warnings (`@next/next/no-img-element`), but no build errors.
- Recharts may emit a non-blocking width warning during static generation for the custom chart; build still succeeds.

---

If needed, a follow-up spec can be generated for the **low-ticket course page itself** with exact section copy, pricing block structure, and checkout-first CTA hierarchy using this page’s design system.
