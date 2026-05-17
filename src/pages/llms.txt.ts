import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export const GET: APIRoute = async () => {
  const posts = await getCollection("blog");
  const sorted = getSortedPosts(posts).filter(p => !p.data.draft);

  const postLines = sorted
    .map(p => `- [${p.data.title}](${SITE.website}${getPath(p.id, p.filePath)}): ${p.data.description}`)
    .join("\n");

  const content = `# EcomWonk

> Freelance Shopify developer specialising in conversion rate optimisation, AOV features, and custom code that replaces expensive apps.

Saad Saif is a Shopify theme developer with 4+ years of experience across 100+ stores, including 20+ Shopify Plus projects. He builds custom revenue-boosting features — bundle builders, wishlists, frequently bought together, product badges, infinite scroll, and more — without relying on third-party apps. This keeps stores fast, reduces monthly subscription costs, and gives merchants full control over their code.

## Services

- [Shopify Development Services](${SITE.website}/services): Conversion rate optimisation, AOV-boosting features (bundles, upsells, free gifts), app replacement development, Shopify Plus (checkout UI extensions, Shopify Functions), and store speed improvements.
- [Free Shopify Revenue Audit](${SITE.website}/#free-audit): A free personal review of any Shopify store identifying conversion bottlenecks, missed upsell opportunities, speed issues, and app replacement opportunities — delivered as a Loom video audit.

## Blog Posts — Shopify Development Tutorials

${postLines}

## About

- [About Saad Saif](${SITE.website}/about): Background, 4+ years of Shopify experience, 100+ stores, 20+ Shopify Plus projects, YouTube channel with 1600+ subscribers, and course creator.
- [Portfolio](${SITE.website}/portfolio): Real project examples including bundle builders, infinite scroll, engraving personalisation, review migrations, and SKU-based product grouping automation.
- [Courses](${SITE.website}/courses): Shopify theme development courses in Urdu and English covering Liquid, JavaScript, web components, and the Cart API.

## Contact

- WhatsApp: https://wa.me/+923314002075
- Book a call: https://calendly.com/saadgfx97/shopify-theme-development
- LinkedIn: https://www.linkedin.com/in/saadsaif97
- GitHub: https://github.com/saadsaif97
- YouTube: https://www.youtube.com/@saadsaif97
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
