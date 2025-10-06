---
title: Add custom badges on Shopify products without app
author: Saad Saif
pubDatetime: 2025-10-06T05:17:19Z
slug: add-custom-badges-on-shopify-products-without-app
draft: false
featured: true
ogImage: ../../assets/images/Add custom badges on Shopify products without app.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: Add custom badges on Shopify products, without app (code snippet given).
---

# Create Custom Product Labels and Badges in Shopify Without Any App

We will create custom product badges in Shopify without any app using metafield and few lines of code.
I have implemented this solution on the Shopify DAWN theme, but this solution can be implemented on any theme, we can also modify the design according to the need. If you need help, you can message me anytime on my whatsapp.

---

## Steps

1. **Go to store settings → Metafields and metaobjects**
2. **Add Products Metafield definition** named as `Badges`
   - Select the type as **Single line text** and **List of values**
3. **Create a snippet** named as: `badges.liquid`
   - Use the following snippet:

```liquid
{%- assign custom_badges = product.metafields.custom.badges.value -%}
<div style="display: flex; flex-direction: column; gap: 10px; position: absolute; right: 10px; top: 10px;z-index:10;">
    {%- for custom_badge in custom_badges -%}
        {%- assign custom_badge_parts = custom_badge | split: '|' -%}
        {%- assign custom_badge_text = custom_badge_parts[0] -%}
        {%- assign custom_badge_bg = custom_badge_parts[1] -%}
        {%- assign custom_badge_color = custom_badge_parts[2] -%}
        <span style="background-color: {{ custom_badge_bg }}; color: {{ custom_badge_color }}; border-color: {{ custom_badge_color }}" class="custom-badge">{{ custom_badge_text }}</span>
    {%- endfor -%}
</div>
```
4. Then go to `base.css` and paste the following code at the end:
```css
/* custom badge start */
.product-card-wrapper,
.product__media-wrapper {
  position: relative;
}
.custom-badge {
  border: 1px solid transparent;
  border-radius: 10px;
  display: inline-block;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  line-height: 1;
  padding: 0.5rem 1.3rem 0.6rem 1.3rem;
  text-align: center;
  word-break: break-word;
}
/* custom badge end */
```

5. Then go to `card-product.liquid` and search for this line `<div class="card-wrapper product-card-wrapper underline-links-hover">` and paste the following snippet under that:
```liquid
{%- render 'badges', product: card_product -%}
```
6. Then go to `main-product.liquid` and search for this line `<div class="grid__item product__media-wrapper">` and paste the following snippet under that:
```liquid
{%- render 'badges', product: product -%}
```


## Video Tutorial

Watch the step-by-step video tutorial here:

[![Custom Product Labels and Badges in Shopify](https://img.youtube.com/vi/o9HAaSd5VE0/maxresdefault.jpg)](https://www.youtube.com/watch?v=o9HAaSd5VE0)
