# Nicole Shlass Real Estate — Stitch Design Reference

**Project:** nicoleshlass-realestate
**Project ID:** `12085195423371389788`
**Device:** Desktop (1280px wide)
**Created:** 2026-03-25
**Design System:** Bespoke Vista

---

## Design System: Bespoke Vista

### Creative North Star: "The Digital Curator"

This system treats the screen as a high-end coffee table book. Whitespace is a luxury and every element is curated rather than placed. The "Editorial" philosophy uses intentional asymmetry, large-scale typography, and overlapping glass layers to break the template look. The "Cinematic" mood drives full-bleed imagery and tonal depth for an immersive environment.

---

## Colors

**Color Mode:** Dark
**Base:** Navy/Deep Dark anchored by Dusty Rose and Terracotta accents.

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#C1C5E5` | Soft lavender — primary interactive elements |
| `primary_container` | `#161B33` | Deep navy — hero/section backgrounds |
| `secondary` | `#F0B9B3` | Dusty rose — main CTAs, satin gradient start |
| `tertiary` | `#F2B9AB` | Muted terracotta — "Special Offer" / "Sold" badges |
| `surface` | `#121415` | Near-black base layer |
| `surface_dim` | `#121415` | Dimmest surface |
| `surface_bright` | `#38393A` | Brightest surface |
| `surface_container_lowest` | `#0D0E0F` | Deepest container |
| `surface_container_low` | `#1A1C1D` | Low-tier section backgrounds |
| `surface_container` | `#1E2021` | Standard container |
| `surface_container_high` | `#282A2B` | Elevated containers |
| `surface_container_highest` | `#333536` | Card tops / highest elevation |
| `on_surface` | `#E2E2E3` | Primary text (never pure `#000000`) |
| `on_surface_variant` | `#C7C5CE` | Secondary/subdued text |
| `outline` | `#919098` | Accessible borders |
| `outline_variant` | `#46464D` | Ghost borders at 15% opacity |
| `error` | `#FFB4AB` | Error states |

### The "No-Line" Rule
**Strict mandate:** 1px solid borders for sectioning are prohibited. Boundaries must be defined solely through background color shifts or tonal transitions. Use `surface_container_low` against `surface` to denote a new section.

### The "Glass & Gradient" Rule
- **Glassmorphism:** Semi-transparent `surface` colors with `backdrop-blur: 20px–40px` for floating elements (search bars, property cards, nav).
- **Signature Gradient:** Main CTAs use a subtle linear gradient from `secondary` (`#F0B9B3`) to `tertiary` (`#F2B9AB`) — "satin" finish feel.

---

## Typography

| Role | Typeface | Usage |
|---|---|---|
| Display & Headlines | **Noto Serif** | Property titles, hero statements, section titles |
| Body & Labels | **Manrope** | Property specs, descriptions, metadata |

### Type Scale
| Style | Size | Notes |
|---|---|---|
| `display-lg` | 3.5rem | Hero property names |
| `headline-md` | 1.75rem | Section titles |
| `body-lg` | 1rem | Standard reading text |
| `label-md` | 0.75rem | Metadata (e.g., "5 Beds \| 6 Baths") |
| `label-sm` | — | All-caps with `letter-spacing: 0.05em` for boutique feel |

---

## Elevation & Depth

**Layering Principle:** Depth via tonal layering, not drop shadows. Cards using `surface_container_highest` placed on `surface` create natural elevation.

- **Ambient Shadows (floating elements):** Blur 40–80px, opacity 4–8%, shadow color tinted with deep blue-black (not pure grey).
- **Ghost Border Fallback:** `outline_variant` at **15% opacity** — felt, not seen.

---

## Roundness & Spacing

- **Roundness:** `ROUND_EIGHT` — use `rounded.md` (0.75rem) or `rounded.xl` (1.5rem); no sharp 0px corners.
- **Spacing Scale:** 3 (generous). Use `spacing.24` (8.5rem) for major section breathing room. Luxury is defined by the space you *don't* fill.

---

## Components

### Buttons
| Type | Style |
|---|---|
| Primary | `secondary` fill, `on_secondary` text, generous padding, `rounded.full` |
| Secondary (Glass) | Semi-transparent `surface_bright` + backdrop blur + Ghost Border |

### Property Cards
- No dividers — use `spacing.6` to separate image from text.
- Hover: scale image 1.05×, shift background from `surface_container_low` → `surface_container_high`.
- Glass chip overlay for property labels (top-left of card).

### Input Fields (Search)
- Oversized, `rounded.full`, semi-transparent `surface_variant` fill.
- Label sits inside field in `body-sm`.
- Focus state: Ghost Border increases to 40% opacity (never thick solid color change).

### Navigation Header
- Full-width glassmorphism style.
- Active state: `secondary` color shift — never an underline.

---

## Do's and Don'ts

### Do
- Use asymmetric layouts — place property imagery off-center for visual interest.
- Use `spacing.24` (8.5rem) for major section breathing room.
- Use `tertiary` sparingly for "Special Offer" or "Sold" badges.
- Ensure all interactive elements have a minimum touch target of `spacing.12`.

### Don't
- Don't use `#000000` for text — use `on_surface` or `on_surface_variant`.
- Don't use traditional list dividers — use background shifts or increased vertical whitespace.
- Don't use sharp 0px corners — maintain `rounded.md` or `rounded.xl` throughout.
- Don't use standard grey drop shadows — they look default. Use ambient, tinted shadows only.

---

## Screens

### Active Screens
| Screen | ID | Dimensions |
|---|---|---|
| Nicole Shlass Luxury Homepage | `0b989202e4be48e0993a785d60d72970` | 1376×768 |
| Buying Page (Brand Cohesion) | `1d61b62350e342e484d757d59892364a` | 1280×4771 |
| Concierge Assistant | `946b08d0c3eb4e4fa93faa006f10a9fa` | 1280×1287 |
| Properties Listing (Color Refinement) | `9def8fef3b074ccab5a6aafa8b54e6b7` | 1280×4546 |
| Leasing Page (Brand Cohesion) | `857c21726998436783e148c5c7cac9a9` | 1280×1024 |
| Selling Page (Brand Cohesion) | `b68de0a63f7041879cfff2e07b9c21cf` | 1280×4717 |

### Hidden Screens (Variants / Drafts)
| Screen | ID |
|---|---|
| Properties Listing | `2f5ce8e0532f49cba95f0025bc88ce7a` |
| Buying Page | `c9a1402735e04835adaf4fd67c2674af` |
| Buying Page (Elevated) | `aa69a51a331f4f16a9130e78932acab7` |
| Selling Page | `4b1358f3b86b40cb913d8a7a5e9d59b4` |
| Leasing Page | `bb83ce507e0f49d79b7cf86dab01fdac` |
| Leasing Page (Elevated) | `8f63296b28724bd087cf5f625b4efc3c` |
| About Nicole Shlass | `312a18da5f994670bbaf96053f894c1d` |
