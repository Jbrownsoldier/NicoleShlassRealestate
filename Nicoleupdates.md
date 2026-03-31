# Nicole Shlass Website Updates Checklist
**New Site:** https://nicole-shlass-realestate.vercel.app
**Old Site:** https://nicoleshlassrealestate.ca
**Project:** `/Users/jamalbrown/Desktop/JBrown AI Solutions/Coding/Nicole Shlass RealEstate-Demo`

---

## PRIORITY 1: Branding Colours (What She Noticed First)

The new site uses a dark luxury theme (black backgrounds, lavender, coral, gold). Nicole's actual brand is completely different.

### Her Real Brand Colours
| Element | Hex Code | Description |
|---------|----------|-------------|
| Primary | `#161b33` | Navy blue — buttons, headers, nav |
| Background | `#FFFFFF` / `#F4F4F4` / `#dddde3` | White + light grays |
| Text | `#2e2f3d` | Dark charcoal |
| Hover Accent | `#ff0000` | Red on hover states |

### Her Fonts
| Type | Old Site | New Site (Wrong) |
|------|----------|-----------------|
| Sans-serif | Inter | Manrope |
| Serif | Cardo | Noto Serif |

### Colour Tasks
- [ ] Switch from dark theme to **light theme** (white/off-white backgrounds)
- [ ] Set **navy `#161b33`** as the primary brand colour (buttons, nav, headers)
- [ ] Replace lavender `#C1C5E5` accent — use navy or a navy-derived tone
- [ ] Replace coral/peach `#F0B9B3` / `#F2B9AB` — not in her branding
- [ ] Replace gold `#C9A96E` — not in her branding
- [ ] Update text colour to dark charcoal `#2e2f3d`
- [ ] Add red `#ff0000` hover accent where appropriate
- [ ] Swap fonts from Manrope/Noto Serif to **Inter/Cardo**
- [ ] Update all glass-morphism effects for light theme compatibility
- [ ] Update gradients and shadows for light backgrounds
- [ ] Verify colour contrast meets WCAG AA accessibility standards
- [ ] **File to edit:** `src/app/globals.css` (all colour variables live here)
- [ ] Ask Nicole if she has a brand guide with specific hex codes to confirm

---

## PRIORITY 2: Tone & Voice (Her Brand Personality Is Wrong)

The old site is warm and approachable. The new site reads ultra-luxury corporate. This changes how clients perceive her.

| Element | Old Site (Her Voice) | New Site (Wrong Tone) |
|---------|---------------------|----------------------|
| Hero headline | "Finding the perfect space means choosing one that fits your life right now" | "Your Home. Curated, Negotiated, Delivered." |
| Hero subhead | "I'm Here To Guide You HOME." | Tagline about responsiveness |
| Hero CTAs | "Let's have a call!" / "Feeling shy? Email me." | "View Listings" / "Private Consultation" |
| About tagline | People, relationships, life-changing transitions | "Precision. Discretion. Results." |
| Service tone | Helpful guide, partner-like | Elite, exclusive, commanding |

### Tone Tasks
- [ ] Update hero headline to her original or a blend of old + new
- [ ] Update hero subheading to "I'm Here To Guide You HOME" or similar
- [ ] Change hero CTAs to warmer language ("Let's have a call!", "Feeling shy? Email me.")
- [ ] Rewrite about section tagline — less corporate, more personal
- [ ] Soften service card descriptions to match her approachable style
- [ ] Review all CTA button text across site for warmth
- [ ] **Files to edit:** `src/components/sections/HeroSection.tsx`, `src/app/page.tsx`, `src/app/about/page.tsx`

---

## PRIORITY 3: Missing Content (Information Her Clients Expect)

### 3a. Sold/Purchased Properties (Social Proof)
Her old site shows 5 past transactions. This builds trust and shows track record.

- [ ] Add these 5 sold properties to `src/data/properties.ts`:
  - [ ] 1370 Davenport Rd — $996,000 (Sold May 2025)
  - [ ] 1107 St Clarens Ave — $1,480,018 (Purchased March 2025)
  - [ ] 176 Hastings Ave — $1,312,000 (Sold September 2024)
  - [ ] 10 Plymouth #5 — $1,480,000 (Sold December 2022)
  - [ ] 1 Lillooet Cres — $990,997 (Sold November 2021)
- [ ] Create a "Past Sales" or "Sold" section on the properties page
- [ ] Display sold properties with "SOLD" badge styling

### 3b. Personal Bio Details (What Makes Her Relatable)
The old about page has personal details that differentiate her. The new site stripped these out.

- [ ] Add: career started in 2011 with first-time condo buyers
- [ ] Add: evolved toward houses and families navigating life transitions
- [ ] Add: inspired by grandmother (interior designer) — attending client meetings
- [ ] Add: family-focused, cares for father (traumatic brain injury)
- [ ] Add: explores Toronto neighbourhoods, cottage by the lake
- [ ] Add: strong referral network built on long-term relationships
- [ ] **File to edit:** `src/app/about/page.tsx`

### 3c. Missing Contact Details
- [ ] Add office phone number: `416-583-1660`
- [ ] Ensure direct line `416-271-6316` is prominent
- [ ] **Files to edit:** `src/components/layout/Footer.tsx`, `src/components/layout/Nav.tsx`

### 3d. Fix Stats
- [ ] Update "14 Years of Experience" to **15 years** (started 2011, now 2026)
- [ ] **File to edit:** `src/app/page.tsx`

---

## PRIORITY 4: Missing Pages

### 4a. Blog Page (HIGH)
Old site has 5 blog posts. New site has no blog at all.

- [ ] Create blog index page at `src/app/blog/page.tsx`
- [ ] Add these 5 blog posts (at minimum as stubs):
  - [ ] "2026 Ontario Real Estate Trends: What Buyers & Sellers Need to Know" — Feb 10, 2026
  - [ ] "Selling Your Home Smarter" — Jan 16, 2025
  - [ ] "The Magic of Staging: Unlocking Your Home's Full Potential" — Nov 27, 2024
  - [ ] "Homebuyers Guide" — Nov 8, 2024
  - [ ] "Is It Time To Move?" — Aug 26, 2021
- [ ] Add "Blog" to navigation menu
- [ ] Add "Blog" link to footer
- [ ] **Files to edit:** New `src/app/blog/page.tsx`, `src/components/layout/Nav.tsx`, `src/components/layout/Footer.tsx`

### 4b. Contact Page (MEDIUM)
Old site has a standalone contact page. New site buries contact inside `/concierge`.

- [ ] Either create standalone `/contact` page or make `/concierge` more discoverable
- [ ] Add "Contact" to navigation or footer
- [ ] **Files to edit:** Possibly new `src/app/contact/page.tsx` or update nav

---

## PRIORITY 5: Missing Features

### 5a. Newsletter/Email Signup
Old site has a newsletter signup section. New site doesn't.

- [ ] Add newsletter signup section to homepage
- [ ] Include heading: "Updates, New Listings & Stay Connected"
- [ ] **File to edit:** `src/app/page.tsx`

### 5b. Testimonials
Data file exists (`src/data/testimonials.ts`) but contains LA/Beverly Hills placeholder data — wrong city entirely.

- [ ] Replace placeholder testimonials with real Toronto client quotes from Nicole
- [ ] Add testimonials section to homepage or about page
- [ ] **Files to edit:** `src/data/testimonials.ts`, `src/app/page.tsx`

---

## PRIORITY 6: Page Content Depth

### 6a. Buying Page
Old site has detailed 6-step buying process. New site may be thinner.

- [ ] Verify these 6 steps are present:
  - [ ] 1. Choosing Your Realtor
  - [ ] 2. Getting Pre-Approved
  - [ ] 3. Determining Your Needs
  - [ ] 4. Searching for Your Home
  - [ ] 5. Making an Offer & Negotiation
  - [ ] 6. Closing the Deal
- [ ] Include neighbourhood expertise content
- [ ] Add CTAs: "Download Our Buyer's Guide", contact form
- [ ] **File to edit:** `src/app/buying/page.tsx`

### 6b. Selling Page
Old site has 3-step process with specific details.

- [ ] Verify these 3 steps are present:
  - [ ] 1. Pricing with Precision — strategic market analysis
  - [ ] 2. Perfecting Presentation — staging, styling, lighting
  - [ ] 3. Marketing for Maximum Exposure — photography, video, virtual tours
- [ ] Add CTAs: "Get A Free Home Evaluation", "Download the Seller's Guide"
- [ ] **File to edit:** `src/app/selling/page.tsx`

### 6c. Leasing Page
Old site has extensive detail. Verify new site includes:

- [ ] Tenant services (free for tenants): early listing access, pricing clarity, negotiation, contracts
- [ ] Requirements to rent in Ontario (application, employment letter, references, credit check, ID)
- [ ] Tenant responsibilities (first + last, 60-day notice, utilities, insurance, key deposit)
- [ ] Landlord services (market analysis, MLS, background checks, lease prep, photography)
- [ ] Fee structure (one month's rent, split between agents)
- [ ] Legal references (Residential Tenancies Act, Landlord & Tenant Board)
- [ ] **File to edit:** `src/app/leasing/page.tsx`

---

## PRIORITY 7: Footer & Legal

- [ ] Add Privacy Policy link (old site has one)
- [ ] Verify brokerage disclaimer is present
- [ ] Add "Website by JBrown AI Solutions" credit (or similar)
- [ ] Verify all social media links are correct and working
- [ ] **File to edit:** `src/components/layout/Footer.tsx`

---

## Verification

- [ ] Run dev server and compare side-by-side with old site
- [ ] Check all nav links work
- [ ] Test on mobile
- [ ] Verify all contact info matches old site
- [ ] Deploy to Vercel preview
- [ ] Share with Nicole for review
