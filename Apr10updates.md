# April 10 Updates Implementation Plan

## 1. Implement Branding Photos
*Requirement: Add at least 2 nicely fitted branding photos of Nicole per page once provided.*
- [x] **Home Page**: Add photo in the hero/intro area or as floating elements, and update the "About Nicole" section.
- [x] **About Page**: Enhance the top header with a branding photo, and add a secondary photo near the personal story section.
- [~] **Buying Page**: Replace the generic hero image with a branding photo, and add another photo in a new concluding section. *(Skipped per user request)*
- [~] **Selling Page**: Add a branding photo in the track record section, and another alongside the "Marketing Edge" pillars. *(Skipped per user request)*
- [x] **Properties Page**: Place one near the top portfolio intro and one at the bottom CTA banner.

## 2. Sold Listings on Buying & Selling Pages
*Requirement: Reflect "Sold" listings identically to the properties page (clickable, hover video), but with a distinct and neat layout.*

### Layout Suggestions for Sold Properties:
1. **Horizontal Scrolling Carousel/Slider**: A sleek, swipeable row of sold properties. This saves vertical space, feels highly interactive, and contrasts perfectly with the standard vertical grid on the properties page.
2. **Asymmetric 2-Column Masonry**: An elegant, staggered layout reminiscent of high-end editorial magazines, drawing focus to each property's photography.
3. **Expandable List View**: A minimalist list of addresses that expands on hover to reveal the full property card and video.

**🏆 My Recommendation: Horizontal Scrolling Carousel/Slider.**
I pick this one because it leverages the existing property card components seamlessly while offering a distinct, app-like horizontal interaction that feels very premium and modern. 

- [x] **Action**: Create a new `SoldPropertiesCarousel` component.
- [x] **Action**: Integrate this carousel into `buying/page.tsx` under a "Recent Buyer Successes" section.
- [x] **Action**: Integrate this carousel into `selling/page.tsx` under a "Recent Sales Portfolio" section.

## 3. Homepage Fixes

### A. Experience Stats Conflict
*Requirement: Keep only "14 Years" or "10+ Years", and fix the gap.*
The homepage currently shows: "14 Yrs Of Experience" and "10+ Yrs In Toronto Real Estate".
- **Recommendation**: Keep **"14 Yrs Of Experience"** (it's the stronger number).
- **Filling the Gap Options**:
  1. *Replace it with a new metric* such as **"$50M+"** (Label: "Sales Volume") or **"50+"** (Label: "Successful Transactions") or **"Top 5%"** (Label: "Toronto Agents").
  2. *Remove it entirely and adjust the grid*. We can easily change the layout from 4 columns to 3 perfectly centered columns. **This is my creatively preferred approach**, as it maintains perfect symmetry, reduces visual clutter, and keeps the design extremely clean without needing to fake a metric.

- [x] **Action**: Update the stats array in `src/app/page.tsx` to utilize the elegant 3-column layout (or swap the metric if you prefer).

### B. Location Prominence (Toronto Only)
*Requirement: Ensure it confidently says she ONLY worked in Toronto.*
- *Current State*: The site heavily uses the phrase "across Toronto and the GTA" in its SEO descriptions, page text, and headers throughout multiple files (`page.tsx`, `layout.tsx`, `properties/page.tsx`, `buying/page.tsx`).
- [x] **Action**: Conduct a global search and replace to remove "and the GTA" across the entire codebase. 
- [x] **Action**: Refine copy to prominently emphasize her exclusivity and focus solely on the **Toronto** market.
