# Web Development

## Astro / Landing Pages
- Prefers landing pages to follow the site's existing design language (Astro + Tailwind, using `accent`/`muted`/`border`/`background` CSS variables that switch between light/dark), rather than introducing new ad-hoc styling. Confidence: 0.9
- Prefers conversion-focused landing page structure: hero with offer + price + CTA, benefits ("why"), curriculum breakdown, pricing/enrollment steps, testimonials, FAQ, and a final CTA with urgency (e.g. "price may go up"). Confidence: 0.9
- Prefers including structured data (JSON-LD `Course` + `FAQPage` schema) for SEO on course/landing pages. Confidence: 0.8
- Prefers reusing existing site content and components (testimonials, existing promo components, Header/Footer/Hr/Layout) rather than writing new content or duplicating patterns. Confidence: 0.8
- Prefers new pages to use a dedicated URL path (e.g. `/shopify-ai-training`) and to be linked from the header nav and existing courses/related pages. Confidence: 0.7
- Wants landing pages to include embedded video (e.g. a Loom intro) using responsive 16:9 iframes placed high on the page (near the hero) to support conversion. Confidence: 0.6
- Prefers no em dashes (—) in written page copy; replace them with commas or light rewording. Confidence: 0.9

## SEO / Social
- Wants each promo/landing page to have its own custom OG/social share image (not the site default), generated via the site's existing satori SVG→PNG endpoint pattern and wired through the `ogImage` prop. Confidence: 0.8
- When creating satori-based OG images, the `loadGoogleFonts(text)` call must include every character rendered in the template (letters, digits, and punctuation like `&`, `,`, `.`, `# Web Development

## Astro / Landing Pages
- Prefers landing pages to follow the site's existing design language (Astro + Tailwind, using `accent`/`muted`/`border`/`background` CSS variables that switch between light/dark), rather than introducing new ad-hoc styling. Confidence: 0.9
- Prefers conversion-focused landing page structure: hero with offer + price + CTA, benefits ("why"), curriculum breakdown, pricing/enrollment steps, testimonials, FAQ, and a final CTA with urgency (e.g. "price may go up"). Confidence: 0.9
- Prefers including structured data (JSON-LD `Course` + `FAQPage` schema) for SEO on course/landing pages. Confidence: 0.8
- Prefers reusing existing site content and components (testimonials, existing promo components, Header/Footer/Hr/Layout) rather than writing new content or duplicating patterns. Confidence: 0.8
- Prefers new pages to use a dedicated URL path (e.g. `/shopify-ai-training`) and to be linked from the header nav and existing courses/related pages. Confidence: 0.7
- Wants landing pages to include embedded video (e.g. a Loom intro) using responsive 16:9 iframes placed high on the page (near the hero) to support conversion. Confidence: 0.6
- Prefers no em dashes (—) in written page copy; replace them with commas or light rewording. Confidence: 0.9

## SEO / Social
, `'`) — otherwise those glyphs aren't embedded and the image renders with missing characters. Confidence: 0.8

## E-commerce / Course Enrollment
- Testimonials on landing pages should be presented as polished, trust-building cards: include a photo avatar (falling back to an initials circle when no photo is provided) plus a visible star-rating (e.g. 5 accent-colored stars). Confidence: 0.7
- Payment/enrollment details should be embedded directly in the landing page (Payoneer email for international, local bank transfer details with IBAN for Pakistani customers, plus WhatsApp screenshot confirmation flow). Confidence: 0.9
- Wants a dedicated WhatsApp community join CTA section on training/landing pages, placed between the testimonials and the FAQ, with a green WhatsApp icon badge and a button linking to the community chat (external link, opens in new tab). Confidence: 0.8
- Builds promo/course landing pages as established site pattern (site already has EasyWishPromo, Page2FigmaPromo, StickyOfferCard). Confidence: 0.8