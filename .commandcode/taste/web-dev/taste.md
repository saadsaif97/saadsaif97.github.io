# Web Development

## Astro / Landing Pages
- Prefers landing pages to follow the site's existing design language (Astro + Tailwind, using `accent`/`muted`/`border`/`background` CSS variables that switch between light/dark), rather than introducing new ad-hoc styling. Confidence: 0.9
- Prefers conversion-focused landing page structure: hero with offer + price + CTA, benefits ("why"), curriculum breakdown, pricing/enrollment steps, testimonials, FAQ, and a final CTA with urgency (e.g. "price may go up"). Confidence: 0.9
- Prefers including structured data (JSON-LD `Course` + `FAQPage` schema) for SEO on course/landing pages. Confidence: 0.8
- Prefers reusing existing site content and components (testimonials, existing promo components, Header/Footer/Hr/Layout) rather than writing new content or duplicating patterns. Confidence: 0.8
- Prefers new pages to use a dedicated URL path (e.g. `/shopify-ai-training`) and to be linked from the header nav and existing courses/related pages. Confidence: 0.7
- Wants landing pages to include embedded video (e.g. a Loom intro) using responsive 16:9 iframes placed high on the page (near the hero) to support conversion. Confidence: 0.6

## E-commerce / Course Enrollment
- Payment/enrollment details should be embedded directly in the landing page (Payoneer email for international, local bank transfer details with IBAN for Pakistani customers, plus WhatsApp screenshot confirmation flow). Confidence: 0.9
- Builds promo/course landing pages as established site pattern (site already has EasyWishPromo, Page2FigmaPromo, StickyOfferCard). Confidence: 0.8