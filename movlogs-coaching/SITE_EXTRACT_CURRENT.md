# MoVlogs Landing Page (Next.js) - Current Build Extraction

This document extracts the current state of the Next.js landing page implementation so another AI can review/improve it without reading the codebase first.

Project path:
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching`

Primary page file:
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching/app/page.tsx`

## 1) Stack / Tech

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v4
- Framer Motion (section reveals + animated background + testimonial hover UI)
- lucide-react (icons)
- Custom `ShimmerButton` component (shadcn-style folder structure)

## 2) Brand / Visual Direction (Current)

- Theme: dark navy/black background with blue accent
- Accent color: `#4f8cff`
- White text with blue glow highlights on key words
- Premium/minimal layout with sections inspired by `anasali.school`, adapted for influencer coaching (MoVlogs)
- Hero uses animated abstract background shapes (`HeroGeometric`) on desktop, reduced on mobile for readability

## 3) Global Design Tokens / Styles (from `app/globals.css`)

CSS variables:
- `--background: #080b12`
- `--surface: #0f1420`
- `--surface-elevated: #141b2a`
- `--foreground: #f5f7ff`
- `--muted: #9eabc2`
- `--border: rgba(79, 140, 255, 0.22)`
- `--accent: #4f8cff`

Global background:
- Layered radial blue glows in the body background to create soft ambient lighting

Reusable utility styles:
- `.surface-card`: dark elevated card with themed border
- `.glow-word`: blue highlighted word with glow (reduced glow intensity on small screens)
- `.animate-blink`: caret blinking for testimonial hover typewriter effect

## 4) Page Structure (Current Rendered Sections)

### A. Sticky Header

Behavior:
- Sticky top header with blur + border
- Left: logo only (text label "MoVlogs" was removed)
- Center/right: desktop nav links (`Community`, `Success Stories`, `About`)
- Desktop CTA button: `See if I'm a fit`
- Mobile CTA is moved to sticky bottom bar (header CTA hidden on mobile)

Notes:
- Header height: `76px`
- CTA uses `ShimmerButton`
- Clicking logo and CTAs uses tracking hooks (`trackClick`)

### B. Hero (Above the Fold)

Purpose:
- Main positioning + VSL embed + immediate CTA

Current hero headline:
- Line 1: `Build a brand.` (word `brand` glows blue)
- Line 2: `Turn views into millions.` (word `millions` glows blue)

Top badge:
- `30M+ Followers • 10+ Years Online`

Subheadline:
- `Watch the video below to see how we grow personal brands, scale audiences, and monetize online.`

Hero CTA:
- `See if I'm a fit`
- Microcopy: `No pressure. If we're not a fit, I'll tell you.`

Hero background / effects:
- Full-width hero background (fixed previous max-width clipping issue on ultra-wide screens)
- Multiple radial blue glow layers around the hero and VSL area
- Animated `HeroGeometric` abstract floating shapes visible on desktop (`md+`)
- Mobile readability optimized:
  - animated shapes hidden on small screens
  - extra dark-blue scrim behind text
  - lower glow intensity on mobile

VSL (YouTube embed):
- Embedded video iframe (placeholder VSL)
- URL: `https://www.youtube.com/embed/NMH3Hck--rE`
- Rounded frame + border + shadow
- Additional blue glow specifically layered behind the video container

### C. Post-Video Info/CTA Panel (Anas-style adaptation)

Immediately below the VSL is a dark info panel designed to resemble the Anas page CTA/info style.

Contents:
- Stat row with icons:
  - `30M+ Followers`
  - `10+ Years Online`
  - `Millions of Views`
- Trust line:
  - `Official Creator Growth Program`
  - supporting line about avoiding fake links
- CTA button:
  - `See if I'm a fit`
- Scarcity line:
  - `Private spots fill fast: Join the next intake window.`
- Qualification note box:
  - `Priority is given to creators ready to execute consistently for the next 90 days.`

Styling note:
- This panel was made less transparent / more solid to preserve readability against the stronger hero background effects.

### D. Community / Offer Includes (`#community`)

Section title:
- `Inside The Program`
- `What you get when you join.`

4 card grid (`includes` array):
- Viral Content Direction
- Audience Growth Blueprint
- Monetization Playbook
- Direct Creator Mentorship

Each card includes short explanatory text and uses `.surface-card` styling.

### E. Custom Graphic Section (`graph-1.png`)

A standalone full-width graphic section (not boxed).

Asset:
- `/public/graph-1.png`
- Rendered via `next/image` with `unoptimized` and a cache-busting query (`?v=20260220-1944`) to avoid stale optimization cache issues

Purpose:
- Visual proof/infographic-style graphic between offer/process sections

### F. Process Section ("Your Path")

Section title:
- `Your Path`
- `Simple steps. Clear direction.`

3-step cards (`process` array):
- Apply
- Creator Strategy Call
- 1:1 Execution

Each card has brief supportive text.

### G. Lifestyle / Reputation Section ("At The Top")

Section title:
- `At The Top`
- `The brand, the lifestyle, the reputation.`

Current state:
- Placeholder 4-card grid for future lifestyle/reputation images
- Cards currently contain placeholder text (`Lifestyle Photo Placeholder 1...4`)

### H. Success Stories (`#success`)

Section title:
- `Success Stories`
- `What creators say after joining.`

Primary testimonial UI:
- Uses custom `typewriter-testimonial` component
- Displays circular influencer avatars
- Hover on avatar reveals speech-bubble tooltip card with:
  - typewriter animated text
  - creator name
  - role/job title
- Audio support exists in component but current data uses empty audio strings (`audio: ""`), so no audio plays

Testimonial dataset currently uses Unsplash placeholder headshots + synthetic names/copy.

Case Snapshot card below testimonials:
- Headline: `From random posting to a known personal brand`
- Short narrative paragraph describing positioning/content/monetization improvements over ~12 weeks

### I. About MoVlogs (`#about`)

Layout:
- 2-column section on large screens (image left, text right)
- Compact, quote-focused version (reduced text density)

Contents:
- Label: `About MoVlogs`
- Heading: `Built on reputation at scale.`
- Stat tags:
  - `30M+ Total Followers`
  - `11M+ Main YouTube`
  - `10M+ Arabic YouTube`
- Big quote (key focus):
  - `"I thought getting 10 million subscribers on YouTube was luck, so I did it again and again and again."`

Image asset:
- `/public/movlogs-quote-photo.jpeg`

### J. Final CTA / Apply (`#apply`)

This replaced the prior "Final Steps" section and is now styled closer to the Anas-style ending CTA pattern.

Contents:
- Label: `Ready To Start?`
- Heading: `Start your creator growth journey.`
- Supporting text about joining private coaching
- 3 trust/benefit pills:
  - Private Access
  - Fast Setup
  - No Hidden Fees
- Main CTA button:
  - `See if I'm a fit`
- Security warning lines:
  - beware fake pages / impersonators
  - use only official links on the page

### K. Sticky Mobile Bottom CTA

Visible on mobile only (`md:hidden`):
- Fixed bar at bottom with `See if I'm a fit` CTA button
- Uses `ShimmerButton`
- Click tracked via `trackClick("cta_mobile_sticky")`

## 5) Components Used (Behavior Summary)

### `components/ui/shimmer-button.tsx`

Purpose:
- Premium CTA button with animated shimmer/spark effect

Key behavior:
- CSS variable-driven shimmer color, speed, radius, background
- Uses custom Tailwind keyframes (`animate-shimmer-slide`, `animate-spin-around`)
- Used for all primary CTAs (header desktop, hero, post-video, final CTA, mobile sticky)

### `components/ui/shape-landing-hero.tsx` (`HeroGeometric`)

Purpose:
- Abstract animated background with floating blurred capsule shapes

Current usage in page:
- Used as background-only layer (`showContent={false}`)
- Vignette disabled (`showVignette={false}`) so it doesn’t darken the hero too much
- Visible on desktop only (`md+`) to avoid mobile text interference

Customizations made in this project:
- Color palette shifted to blue/cyan/indigo (from more mixed palette)
- Added `showVignette` prop to optionally disable dark overlay

### `components/ui/typewriter-testimonial.tsx`

Purpose:
- Testimonial interaction UI using avatar hovers and speech-bubble cards

Current behavior:
- Hover avatar -> tooltip appears with animated typewriter text
- Tracks hovered state + remembers previously hovered avatars (border color changes)
- Optional audio playback per testimonial is supported, but no audio files currently used

## 6) Tracking / Analytics Hooks

File:
- `/Users/alexandersimonk/Documents/New project/movlogs-coaching/lib/tracking.ts`

Current implementation:
- `trackClick(eventName, payload?)`
- `trackFormSubmit(eventName, payload?)`

Behavior:
- Logs events to console (`[tracking] ...`)
- Pushes to `window.dataLayer` if available

Current tracked CTA interactions include examples like:
- `cta_header_desktop`
- `cta_hero_secondary`
- `cta_post_video`
- `cta_final_apply`
- `cta_mobile_sticky`
- `nav_logo`

## 7) Assets / Files Currently Referenced

Local assets in use:
- `/public/mo-vlogs-logo.png` (header logo)
- `/public/movlogs-quote-photo.jpeg` (About section portrait)
- `/public/graph-1.png` (custom infographic graphic)

External assets in use:
- YouTube embed for VSL (`NMH3Hck--rE`)
- Unsplash headshots for testimonial avatars (placeholder)

## 8) Responsive Behavior (Current)

Desktop:
- Full hero background effects with animated shapes
- Header desktop CTA shown
- Nav visible
- Hero content + VSL centered within max widths

Mobile:
- Header nav hidden
- Sticky bottom CTA shown
- Animated background shapes hidden to improve readability
- Hero glow intensity reduced + mobile scrim added behind text
- Highlight glow reduced on `.glow-word`

## 9) Archived / Removed (Still in Codebase)

Removed from page rendering (but preserved in project):
- Bar chart stats section (`"We don't just talk. We build attention at scale."`)
- File still exists: `/Users/alexandersimonk/Documents/New project/movlogs-coaching/components/ui/statistics-card.tsx`

Reason removed:
- User requested temporary removal while keeping it available for later reuse.

## 10) Current Content Placeholders / Likely Improvement Targets

These are still placeholder-ish and likely candidates for future improvement:
- Lifestyle/reputation image grid (currently placeholder cards)
- Testimonial avatars/copy (currently synthetic + Unsplash placeholders)
- Some offer copy and trust statements are interim and may need brand-specific tightening
- CTA links currently scroll to `#apply`; final calendly/tally links are not embedded yet
- About section could later include stronger proof links / channel references

## 11) Practical Notes for Another AI Reviewing This

Important context:
- The page is intentionally modeled after `anasali.school` structure/theme (dark, centered hero, VSL-first, social proof/CTA stack), but customized for MoVlogs and blue accents.
- The user prefers an influencer/reputation-driven landing page feel (less corporate "agency" tone).
- The user likes premium visuals, animation, and glow effects but is sensitive to text readability, especially on mobile.
- The final direction prioritizes visual hierarchy, credibility, and quick VSL/CTA access above dense copy.

## 12) Optional Improvement Checklist (for AI critique)

If another AI is asked to improve the page, ask it to focus on:
- Hero readability vs visual effects balance (desktop + mobile)
- Better real proof placements (logos/screenshots/results without clutter)
- Stronger lifestyle/reputation section visuals
- Tighter copy polish for high-ticket 1:1 coaching conversion
- Calendly/Tally integration structure without making the page feel "form-heavy"
- Performance considerations for animated/blurred layers on lower-end devices

