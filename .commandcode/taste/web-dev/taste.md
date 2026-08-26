# Web Development

## Astro / Landing Pages
- Prefers landing pages to follow the site's existing design language (Astro + Tailwind, using `accent`/`muted`/`border`/`background` CSS variables that switch between light/dark), rather than introducing new ad-hoc styling. Confidence: 0.9
- Prefers conversion-focused landing page structure: hero with offer + price + CTA, benefits ("why"), curriculum breakdown, pricing/enrollment steps, testimonials, FAQ, and a final CTA with urgency (e.g. "price may go up"). Confidence: 0.9
- Prefers including structured data (JSON-LD `Course` + `FAQPage` schema) for SEO on course/landing pages. Confidence: 0.8
- Prefers reusing existing site content and components (testimonials, existing promo components, Header/Footer/Hr/Layout) rather than writing new content or duplicating patterns. Confidence: 0.8
- Wants the AI-training landing page to be standalone: no global Header or Footer rendered on the page, so visitors focus purely on the offer (removed imports and usage entirely). Confidence: 0.6
- Prefers new pages to use a dedicated URL path (e.g. `/shopify-ai-training`) and to be linked from the header nav and existing courses/related pages. Confidence: 0.7
- Wants landing pages to include embedded video (e.g. a Loom intro) using responsive 16:9 iframes placed high on the page (near the hero) to support conversion. Confidence: 0.6
- Prefers no em dashes (—) in written page copy; replace them with commas or light rewording. Confidence: 0.9
- Prefers a unified, theme-consistent color scheme on pages: use theme tokens like `text-foreground/60` for secondary text instead of hardcoded Tailwind grays (`text-gray-400`), and give every card/panel the same treatment (`rounded-xl border border-border bg-muted/xx`) rather than mixing competing gray families and accent-tinted boxes (perceived as "messy colors"). Confidence: 0.8
- Wants headings to use a thick, bold display font (e.g. Inter at 600–900 weights) with a clear h1→h4 size scale, tight letter-spacing (tracking-tight), and heavy weights — explicit ask for "thick and bold" heading typography with proper hierarchy. Confidence: 0.9
- Prefers the accent color to be a single configurable theme token (CSS variable) so one hex value drives CTAs, section eyebrows, highlights, and step chips across light and dark themes; in dark mode uses a slightly brighter variant of the same hue so the accent still pops. Confidence: 0.8
- Cares about color contrast and a "refreshing" palette: foreground should be darkened enough on light backgrounds that body text and headings read clearly against vivid accent colors. Confidence: 0.7

## SEO / Social
- Wants each promo/landing page to have its own custom OG/social share image (not the site default), generated via the site's existing satori SVG→PNG endpoint pattern and wired through the `ogImage` prop. Confidence: 0.8
- When creating satori-based OG images, the `loadGoogleFonts(text)` call must include every character rendered in the template (letters, digits, and punctuation like `&`, `,`, `.`, `'`) — otherwise those glyphs aren't embedded and the image renders with missing characters. Confidence: 0.8

## E-commerce / Course Enrollment
- Testimonials on landing pages should be presented as polished, trust-building cards: include a photo avatar (falling back to an initials circle when no photo is provided) plus a visible star-rating (e.g. 5 accent-colored stars). Confidence: 0.7
- Payment/enrollment details should be embedded directly in the landing page (Payoneer email for international, local bank transfer details with IBAN for Pakistani customers, plus WhatsApp screenshot confirmation flow). Confidence: 0.9
- Wants a dedicated WhatsApp community join CTA section on training/landing pages, placed between the testimonials and the FAQ, with a green WhatsApp icon badge and a button linking to the community chat (external link, opens in new tab). Confidence: 0.8
- Builds promo/course landing pages as established site pattern (site already has EasyWishPromo, Page2FigmaPromo, StickyOfferCard). Confidence: 0.8
