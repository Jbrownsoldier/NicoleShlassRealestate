# Metadata & Social Sharing Implementation Plan

## Current State

| Location | title | description | openGraph | twitter | image |
|---|---|---|---|---|---|
| `layout.tsx` (root) | ✅ | ✅ | Partial (no image) | Partial (no image) | ❌ |
| `page.tsx` (home) | ✅ | ✅ | ❌ | ❌ | ❌ |
| `about/page.tsx` | ❌ | ❌ | ❌ | ❌ | ❌ |
| `properties/page.tsx` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `properties/[id]/page.tsx` | ✅ (dynamic) | ✅ (dynamic) | ❌ | ❌ | ❌ |
| `buying/page.tsx` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `selling/page.tsx` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `leasing/page.tsx` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `concierge/page.tsx` | ❌ | ❌ | ❌ | ❌ | ❌ |

**No OG images, favicons, or social images exist anywhere in the project.**

---

## Goals

1. Generate a branded OG image that looks like a snapshot of the hero — dark background, gold accent, Nicole's name, Toronto Real Estate positioning — rendered at runtime using Next.js `ImageResponse` (no static PNG needed).
2. Per-property OG images that show the listing photo, price, address, and beds/baths.
3. Complete, consistent metadata across every page and the root layout.
4. Favicon set (browser tab, Apple touch icon, web manifest).
5. Full social coverage: Open Graph (Facebook, LinkedIn, iMessage link previews) and Twitter/X Cards.

---

## Implementation Steps

### Step 1 — Site-Wide OG Image (Hero Snapshot)
**File:** `src/app/opengraph-image.tsx`

Use Next.js `ImageResponse` from `next/og` to render a 1200×630 image at the `/opengraph-image` route. This is automatically picked up by the root `layout.tsx` as the default OG image for every page that doesn't override it.

**Design:**
- Black/near-black background (`#0c0a0f`) matching the site's dark theme
- Nicole's photo (`/nicole1.jpg`) as a right-side portrait, subtle vignette
- Left side: small gold rule line + "TORONTO REAL ESTATE" label in gold
- Large serif display text: "Nicole Shlass" in white
- Subtitle: "Sales Representative · Property.ca" in muted gray
- Bottom-left: thin gold horizontal rule with "nicoleshlass.ca"
- Consistent with the site's existing typography and color palette

**Also create:** `src/app/twitter-image.tsx` — identical layout, 1200×600, used for Twitter/X summary_large_image cards.

---

### Step 2 — Per-Property OG Image (Dynamic)
**File:** `src/app/properties/[id]/opengraph-image.tsx`

Dynamic `ImageResponse` that pulls from `properties.ts` by `id` param. Renders:
- Full-bleed property hero photo as background
- Dark gradient overlay (bottom 60%)
- Property title (serif, large, white)
- Address and neighborhood label
- Price in gold
- Beds / Baths chips
- "Nicole Shlass Real Estate" watermark bottom-right

This means when someone shares a property link on iMessage, WhatsApp, or LinkedIn, they see the actual listing photo with key details — not a generic site image.

---

### Step 3 — Root Layout Metadata Overhaul
**File:** `src/app/layout.tsx`

Replace the current partial `metadata` export with a complete object:

```
metadataBase: new URL("https://nicoleshlass.ca")   ← required for absolute OG image URLs
title.default / title.template
description
keywords (expanded Toronto-specific list)
authors, creator, publisher
openGraph:
  type, locale (en_CA), siteName, title, description
  images: [{ url: "/opengraph-image", width: 1200, height: 630, alt }]
twitter:
  card: "summary_large_image"
  title, description
  images: ["/twitter-image"]
  creator: "@nicoleshlass" (if applicable)
alternates:
  canonical: "https://nicoleshlass.ca"
robots: index, follow, googleBot full config
icons:
  icon: ["/favicon.ico", "/favicon-16x16.png", "/favicon-32x32.png"]
  apple: "/apple-touch-icon.png"
  shortcut: "/favicon.ico"
manifest: "/site.webmanifest"
verification: (Google Search Console / placeholder)
```

---

### Step 4 — Page-Level Metadata (All Pages)

Each page gets its own `metadata` export that **overrides** the root defaults for that route. The OG image will fall back to the root site image unless explicitly set.

| Page | title | description | OG image override |
|---|---|---|---|
| `/` (home) | "Nicole Shlass — Toronto Real Estate Agent" | Tailored buying/selling/leasing summary | No (inherits root hero image) |
| `/about` | "About Nicole Shlass — Toronto Sales Representative" | Personal brand + experience summary | No (inherits root) |
| `/properties` | "Properties — Toronto Listings by Nicole Shlass" | Listings description | No (inherits root) |
| `/properties/[id]` | Dynamic: property title + address | Property description (first 160 chars) | **Yes** — per-property dynamic image |
| `/buying` | "Buying a Home in Toronto — Nicole Shlass" | Buyer representation description | No |
| `/selling` | "Selling Your Home in Toronto — Nicole Shlass" | Seller representation description | No |
| `/leasing` | "Toronto Leasing — Tenant & Landlord Representation" | Leasing description | No |
| `/concierge` | "Private Concierge — Nicole Shlass Real Estate" | Concierge/consultation description | No |

Each page's metadata will include `openGraph` and `twitter` fields with page-specific title and description, not just the global ones.

---

### Step 5 — Favicon Set
**Location:** `public/`

Create/add the following files:
- `favicon.ico` — 32×32 multi-size ICO (replaces Next.js default)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png` — 180×180
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

**Design:** The "NS" monogram (already exists as `NSMonogram.tsx`) rendered in gold on the dark background — matching the site brand.

**Also create:** `public/site.webmanifest`
```json
{
  "name": "Nicole Shlass Real Estate",
  "short_name": "Nicole Shlass",
  "icons": [...],
  "theme_color": "#0c0a0f",
  "background_color": "#0c0a0f",
  "display": "standalone"
}
```

---

## File Checklist

```
src/app/
  opengraph-image.tsx          ← NEW: site-wide OG image (hero snapshot)
  twitter-image.tsx            ← NEW: Twitter card image
  layout.tsx                   ← UPDATE: complete metadata overhaul
  page.tsx                     ← UPDATE: add openGraph + twitter fields
  about/page.tsx               ← UPDATE: add full metadata export
  properties/page.tsx          ← UPDATE: add openGraph + twitter fields
  properties/[id]/
    opengraph-image.tsx        ← NEW: dynamic per-listing OG image
    page.tsx                   ← UPDATE: complete generateMetadata
  buying/page.tsx              ← UPDATE: add openGraph + twitter fields
  selling/page.tsx             ← UPDATE: add openGraph + twitter fields
  leasing/page.tsx             ← UPDATE: add openGraph + twitter fields
  concierge/page.tsx           ← UPDATE: add full metadata export

public/
  favicon.ico                  ← NEW
  favicon-16x16.png            ← NEW
  favicon-32x32.png            ← NEW
  apple-touch-icon.png         ← NEW
  android-chrome-192x192.png   ← NEW
  android-chrome-512x512.png   ← NEW
  site.webmanifest             ← NEW
```

---

## Notes & Decisions

- **`metadataBase`** must be set in `layout.tsx` for Next.js to resolve relative OG image URLs to absolute URLs. Without it, social crawlers get a relative path and show nothing.
- **`ImageResponse`** runs at request time but is cached by Next.js. No build-time PNG generation is needed.
- **Font in OG images:** `ImageResponse` requires fonts to be loaded as `ArrayBuffer`. We'll load the same Noto Serif and Manrope weights used on the site.
- **`concierge` and `about` pages** currently have no metadata at all — they will appear with the layout fallback title/description until Step 4 is done.
- **Twitter image** is separate from OG image because Twitter crops differently (1200×600 vs 1200×630) and has stricter file-size limits.
- Favicon PNGs can be generated from the `NSMonogram` SVG using a script or an online tool — this plan assumes manual creation or a generation script. If preferred, an `icon.tsx` file in `src/app/` can generate the favicon dynamically via `ImageResponse` as well (same approach as OG images).
