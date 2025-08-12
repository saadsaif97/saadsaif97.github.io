---
title: How to design custom product labels and badges in Shopify
author: Saad Saif
pubDatetime: 2024-11-17T05:17:19Z
slug: how-to-design-custom-product-labels-and-badges-shopify
draft: false
featured: true
tags:
  - How to
ogImage: ../../assets/images/Create custom product labels and badges in Shopify without any app.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: Create custom labels and badges without app in Shopify (code snippet given).
---

# Create Custom Product Labels and Badges in Shopify Without Any App

We will create custom product labels and badges in Shopify without any app using metafield and metaobject with a few lines of code.

---

## Steps

1. **Go to store settings → Custom Data**
2. **Add Metaobject definition** named as `Label`
   - Add **Single line text field** named as **Title** (should use one value)
   - Then add a **color field** named as **Color**
3. **Add Products Metafield definition** named as `Labels`
   - Select the type as **MetaObject** and reference as **Label metaobject**
   - Select list of entries
4. **Create a snippet** named as: `product-label.liquid`
   - Use the following snippet:

```liquid
{% assign labels = product.metafields.custom.labels.value %}

<div class="product-labels">
  {% for label in labels %}
    {% assign background_color = label.color %}
    {% assign color_string = "" | append: background_color %}
    {% assign text_color = color_string | color_lighten: 100 %}
    <small class="product-label" style="background-color: {{ background_color }}; color: {{ text_color }};">
      {{ label.title }}
    </small>
  {% endfor %}
</div>
```

---

## Video Tutorial

Watch the step-by-step video tutorial here:

[![Custom Product Labels and Badges in Shopify](https://img.youtube.com/vi/hSl7Y2t_aNM/maxresdefault.jpg)](https://www.youtube.com/watch?v=hSl7Y2t_aNM)
