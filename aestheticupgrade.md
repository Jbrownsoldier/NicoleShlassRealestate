# Nicole Shlass Real Estate — Aesthetic Upgrade Roadmap

**Goal:** Transform the site into a Luxury Presence-calibre experience —
cinematic, editorial, immersive. Every interaction should feel considered.

**Stack notes:**
- Framer Motion v12 is already installed — use it for all animation work
- Tailwind CSS v4 with inline theme (globals.css) — extend tokens there
- Next.js App Router — page transitions go in the root layout
- Mark each item `- [x]` when complete

---

## Phase 1 — Visual Foundation
> Make everything *look* premium before a single animation is added.
> This is the stage dressing. No motion yet — pure visual craft.

### 1.1 — Hero Section Overhaul
- [x] Darken the overlay gradient for more drama (push image contrast)
- [x] Add a thin horizontal rule above the eyebrow label ("TORONTO REAL ESTATE")
- [x] Increase hero headline size on desktop — push `text-display-lg` larger via clamp
- [x] Tighten headline letter-spacing (`tracking-tight` → custom `-0.03em`)
- [x] Add a subtle vertical text element on the right edge (e.g. "EST. 2011" rotated 90°)
- [x] Redesign the two CTA buttons: primary stays gradient pill, secondary becomes a ghost border button with a sharper radius
- [x] Add a thin animated scroll indicator at the bottom of the hero (a pulsing line or chevron)
- [x] Replace the hero Unsplash image with a darker, moodier Toronto architectural photo

### 1.2 — Typography & Spacing System
- [x] Increase base body font size from `0.9375rem` to `1rem` globally
- [x] Add `font-feature-settings: "liga", "kern"` to the serif font for better ligatures
- [x] Increase section vertical padding from `py-28` to `py-36` on key sections for more breathing room
- [x] Make all eyebrow labels (`text-label-lg text-secondary`) use `letter-spacing: 0.18em` (wider than current)
- [x] Add an editorial divider style: a `1px` horizontal rule with a gradient fade on both ends
- [x] Review all `text-on-surface-variant` body copy — increase opacity slightly for readability

### 1.3 — Property Card Redesign
- [x] Increase card image aspect ratio from `aspect-[4/3]` to `aspect-[3/2]` for wider, more cinematic feel
- [x] Redesign card info section: price on the left in a larger serif, beds/baths on the right in small caps
- [x] Add a thin top border accent in `secondary` color on card hover (slides in from left)
- [x] On hover: reveal a "View Property →" label that slides up from below the price
- [x] Make the status badge (New Listing, Featured) more refined — pill with a subtle glow
- [x] Add a subtle gradient overlay on the bottom third of every card image (always visible, not just on hover)
- [x] Increase the card shadow on hover for a more dramatic lift effect

### 1.4 — Navigation Polish
- [x] On scroll, transition the nav background from transparent to a deeper glass effect (more opacity)
- [x] Add a subtle bottom border to the scrolled nav state (`border-b border-secondary/20`)
- [x] Make the active nav link use a small underline dot beneath it instead of just color change
- [x] Increase the "Concierge" CTA button in the nav to have a subtle border glow on hover

### 1.5 — Section & Layout Improvements
- [x] Stats bar: Make each stat number use a larger serif, and add a thin vertical divider between items
- [x] Services cards: Redesign as taller, more portrait cards with the icon larger and centered at top
- [x] About section: Add a thin framed border treatment around Nicole's photo (inset offset frame)
- [ ] Testimonials (when re-added): Style as full-width editorial quotes with an oversized `"` mark
- [x] Footer: Add a thin top gradient line (secondary color) above the footer border
- [x] Add a globally consistent `<SectionDivider />` component — a centered diamond or thin line

### 1.6 — Color & Surface Refinements
- [x] Add a `--color-gold: #C9A96E` token to globals.css for an optional accent
- [x] Apply gold accent to: stat values, section eyebrow labels (as an alternative to coral)
- [x] Add a very subtle noise/grain texture to `bg-surface` sections using a CSS `background-image` SVG filter
- [x] Increase the contrast of `glass-card` borders slightly for more definition on dark backgrounds
- [x] Review all `shadow-ambient` usage — make sure it's applied consistently to all floating elements

---

## Phase 2 — Motion Layer
> Bring the site to life with Framer Motion. Every section entrance,
> every hover, every page load should feel choreographed.

### 2.1 — Page Transitions
- [ ] Create `src/components/layout/PageTransition.tsx` — a client component wrapping children in `motion.div`
- [ ] Variant: fade (opacity 0→1) + subtle upward slide (y: 20→0), duration 0.45s, ease "easeOut"
- [ ] Wrap the `<main>` in the root layout with `<AnimatePresence mode="wait">` + `<PageTransition>`
- [ ] Use `key={pathname}` (from `usePathname`) to trigger re-animation on route change
- [ ] Test on all 7 routes: home, about, buying, selling, leasing, properties, concierge

### 2.2 — Scroll Reveal System
- [ ] Create `src/components/ui/RevealOnScroll.tsx` — reusable wrapper using `whileInView` + `viewport={{ once: true }}`
- [ ] Default variant: `{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }`, duration 0.6s
- [ ] Create a `StaggerChildren` wrapper for grid sections that adds `0.08s` delay between children
- [ ] Apply `<RevealOnScroll>` to: all section headings, all stat items, all service cards
- [ ] Apply `<StaggerChildren>` to: property card grids, buying/selling step cards, leasing option cards
- [ ] Apply a horizontal slide variant (`x: -40 → 0`) to the About section text blocks
- [ ] Apply a fade-up to every footer column

### 2.3 — Hero Parallax
- [ ] In `page.tsx`, add `useScroll` + `useTransform` from framer-motion
- [ ] The hero background image moves at `0.4x` scroll speed (transforms `y: 0 → 120px` over hero scroll range)
- [ ] The hero text content moves at `0.15x` speed (subtle, opposite direction)
- [ ] Ensure parallax is disabled on mobile (`useReducedMotion` or breakpoint check)

### 2.4 — Property Card Micro-Animations
- [ ] Wrap `<PropertyCard>` root element as `motion.div` with `whileHover` variants
- [ ] On hover: `y: -6` (lift), shadow deepens via class swap, duration 0.3s spring
- [ ] Card image wrapper: `motion.div` with `scale: 1 → 1.07` on card hover, duration 0.6s ease
- [ ] "View Property →" label: `motion.span` that animates `y: 10 → 0, opacity: 0 → 1` on card hover
- [ ] Status badge: subtle `scale: 1 → 1.05` pulse on mount (one-time, 0.3s)

### 2.5 — Stats Counter Animation
- [ ] Create `src/components/ui/AnimatedStat.tsx` — animates a number from 0 to its value when in view
- [ ] Use framer-motion's `animate` with a custom output range and `useInView` trigger
- [ ] Apply to all numeric stats: home page stats bar, about page accolades, selling page track record
- [ ] Non-numeric stats (e.g. "416", "100%") get a simple fade-in instead of counting

### 2.6 — Navigation & Drawer Animations
- [ ] Mobile drawer links: stagger in with `0.05s` delay between each item on drawer open
- [ ] Nav logo: `opacity: 0 → 1, x: -10 → 0` on initial page load (once only)
- [ ] Desktop nav links: subtle `y: -3 → 0, opacity: 0 → 1` stagger on first render

### 2.7 — About & Concierge Page Animations
- [ ] About hero: photo `scale: 0.97 → 1, opacity: 0 → 1` on mount
- [ ] Bio paragraphs: staggered reveal, each paragraph 0.1s after the previous
- [ ] Concierge contact items: slide in from right, staggered 0.08s apart
- [ ] Contact form fields: stagger fade-up on page load, 0.05s between each field

---

## Phase 3 — Premium Interactions
> The details that separate a good site from a great one.
> Custom cursor, advanced effects, and final polish.

### 3.1 — Custom Cursor
- [ ] Create `src/components/ui/CustomCursor.tsx` — client component, rendered in root layout
- [ ] Dot: `4px` circle, `background: var(--color-secondary)`, follows mouse with `useSpring` (stiffness: 800, damping: 28)
- [ ] Ring: `36px` circle, `border: 1.5px solid secondary`, follows mouse with more lag (stiffness: 150, damping: 20)
- [ ] On hover over `<a>`, `<button>`, `[data-cursor="link"]`: ring scales to `60px`, dot hides
- [ ] On hover over images/cards: ring scales to `80px`, ring text changes to "VIEW" (small caps inside ring)
- [ ] Add `cursor: none` to `html` in globals.css
- [ ] Detect touch devices and skip rendering the cursor entirely
- [ ] Test across all interactive elements to ensure no cursor visibility gaps

### 3.2 — Magnetic CTA Buttons
- [ ] Create `src/components/ui/MagneticButton.tsx` — wraps children in a motion element
- [ ] On mouse proximity (within `80px` of button): button subtly pulls toward cursor (`x/y` transform, max `±12px`)
- [ ] Uses `onMouseMove` to calculate offset, `useSpring` to smooth the pull
- [ ] Apply to: hero CTA, concierge CTA button, all primary gradient buttons
- [ ] Ensure graceful fallback — no layout shift if JS is slow

### 3.3 — Scroll Progress Indicator
- [ ] Add a thin `3px` progress bar fixed at the top of the viewport
- [ ] Uses `useScroll` from framer-motion, `scaleX` transforms from `0 → 1` as page scrolls
- [ ] Color: `secondary` (warm coral/salmon) with a slight right-side glow
- [ ] Render in the root layout, only on pages that scroll (not a single-screen page)
- [ ] Animates out (opacity 0) when the user reaches the bottom of the page

### 3.4 — Image Tilt Effect on Property Cards
- [ ] On `mousemove` over a property card, apply a subtle 3D perspective tilt
- [ ] Max tilt: `±8deg` on X and Y axes using CSS `perspective(1000px) rotateX() rotateY()`
- [ ] Reset on `mouseleave` with a spring ease-out
- [ ] Ensure tilt does NOT cause layout shift on surrounding cards
- [ ] Disable on mobile and for users with `prefers-reduced-motion`

### 3.5 — Hero Scroll Indicator
- [ ] Animate the scroll chevron/line at the hero bottom: infinite bounce animation (y: 0 → 8 → 0), 1.8s loop
- [ ] On scroll past 60px: fade the indicator out (`opacity: 1 → 0`)
- [ ] Add a thin vertical line above the chevron that draws down (scaleY: 0 → 1) on page load

### 3.6 — Section Background Depth Effects
- [ ] Add a radial gradient "spotlight" to the About section background — subtle, centered behind Nicole's photo
- [ ] Add a very subtle animated grain texture to the hero overlay (CSS animation, no external assets)
- [ ] On `bg-primary-container` sections: add a faint `secondary/5` diagonal gradient for warmth
- [ ] Add depth to the properties page grid background — a soft vignette on the edges

### 3.7 — Final Polish Pass
- [ ] Audit all `transition-*` Tailwind classes — replace inconsistent durations with a standard set (200ms / 300ms / 500ms)
- [ ] Add `will-change: transform` to all elements that animate on scroll for GPU compositing
- [ ] Add `prefers-reduced-motion` media query handling — all animations respect it gracefully
- [ ] Test every page on mobile: ensure animations don't cause jank or overflow
- [ ] Test on Safari: check for any `backdrop-filter` or `transform` rendering bugs
- [ ] Lighthouse audit after all phases: target 90+ Performance score
- [ ] Final review: walk every page and compare to Luxury Presence reference — close any gaps

---

## Notes

- **Framer Motion v12** uses the updated API — use `motion.div` (not deprecated `motion()` wrapper for new usage)
- **Tailwind v4** — add any new tokens directly in `globals.css` under `@theme inline`
- **`"use client"`** is required on any component using Framer Motion hooks (`useScroll`, `useInView`, etc.)
- **AnimatePresence** must be in a client component — create a `<Providers>` or `<AnimationShell>` wrapper if needed
- Gold accent color (`#C9A96E`) should be used sparingly — stats, key labels, hover accents only
