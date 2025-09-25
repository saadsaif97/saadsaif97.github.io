---
title: Add infinity scroll on shopify collection page
author: Saad Saif
pubDatetime: 2025-09-24T05:17:19Z
slug: add-infinity-scroll-shopify-collection-page
draft: false
featured: true
ogImage: ../../assets/images/Add infinity scroll to shopify collection page.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: Add Infinity scroll in any theme (code snippet given).
---

# Add infinity scroll on shopify collection page

In this example, we will add infinity scrolling to Shopify DAWN theme, but you can add it any Shopify theme

---

## Steps

1. **In the assets folder, create a file namded as:** `infinite-scroll.js`
   - Paste the following code in that file:

```javascript
class InfiniteScroll extends HTMLElement {
  constructor() {
    super();
    this.anchor = this.querySelector("a");
    if (!this.anchor) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadNextPage();
        }
      });
    });

    this.observer.observe(this);
  }

  async loadNextPage() {
    this.observer.disconnect();

    this.anchor.style.display = "flex";
    this.anchor.innerText = "Loading...";

    const url = this.anchor.getAttribute("href");
    if (!url) return;

    try {
      const response = await fetch(url);
      const text = await response.text();
      const html = new DOMParser().parseFromString(text, "text/html");

      // Grab the product grid from the next page
      const newGrid = html.querySelector("[data-product-grid]");
      const grid = document.querySelector("[data-product-grid]");

      if (newGrid && grid) {
        Array.from(newGrid.children).forEach((child) => {
          grid.appendChild(child);
        });
      }

      // Handle next infinite scroll
      const newInfinite = html.querySelector("infinite-scroll");
      if (newInfinite) {
        this.replaceWith(newInfinite);
      } else {
        this.remove();
      }
    } catch (err) {
      console.error("InfiniteScroll error:", err);
    }

    this.anchor.style.display = "none";
    this.anchor.innerText = "";
  }
}

customElements.define("infinite-scroll", InfiniteScroll);
```

2. **Then go to** `main-collection-product-grid.liquid` and locate product grid, add the following attribute to the product grid
```html
data-product-grid
```
3. **Then under the product grid, add the following code:**
```liquid
<infinite-scroll style="display: flex; justify-content: center;">
  {%- if paginate.next -%}
    <a style="color: currentColor; text-decoration: none; pointer-events: none;" href="{{ paginate.next.url }}&section_id={{ section.id }}"></a>
  {%- endif -%}
</infinite-scroll>
```

4. **Then comment out the original pagination by adding comment tags at the start and end like this:**
```liquid
{% comment %}
  {%- if paginate.pages > 1 -%}
    {% render 'pagination', paginate: paginate, anchor: '' %}
  {%- endif -%}
{% endcomment %}
```

5. **Then at the end of head tag in** `theme.liquid`, add this line to attach the asset the we created:
```liquid
<script src="{{ 'infinite-scroll.js' | asset_url }}" defer="defer"></script>
```

---

## Video Tutorial

Watch the step-by-step video tutorial here:

[![Add infinity scroll on shopify collection page](https://img.youtube.com/vi/ojao6BS8KPk/maxresdefault.jpg)](https://www.youtube.com/watch?v=ojao6BS8KPk)
