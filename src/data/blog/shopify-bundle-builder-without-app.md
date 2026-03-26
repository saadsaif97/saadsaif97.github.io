---
title: Shopify Bundle Builder without APP
author: Saad Saif
pubDatetime: 2026-03-26T05:17:19Z
slug: shopify-bundle-builder-without-app
draft: false
featured: true
ogImage: ../../assets/images/Shopify Bundle Builder without APP.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: Create Bundle Builder without app in Shopify (code snippet given).
---

# Shopify Bundle Builder without APP

We will create Bundle Builder in Shopify without APP using metafield and metaobject with a few lines of code.

<figure>
  <img
    src="https://ecomwonk.com/Shopify Bundle Builder without APP.png"
    alt="Shopify Bundle Builder without APP"
  />
</figure>

---

## Steps

1. Create the `bundle_offer` Metaobject Type. Go to: **Settings → Custom Data → Metaobjects → Add definition**

## Fields

| Field Label     | Handle         | Type                  | Notes                          |
|----------------|---------------|-----------------------|--------------------------------|
| Title          | `title`        | Single line text      | e.g. "Buy 3, Save 30%"         |
| Original Price | `original_price` | Decimal number     | e.g. 21.00                     |
| Final Price    | `final_price`  | Decimal number        | e.g. 14.70                     |
| Quantity       | `quantity`     | Integer               | Number of slots: 3, 5, 7       |
| Collection     | `collection`   | Collection reference  | Products users pick from       |
| Badge Text     | `badge_text`   | Single line text      | e.g. "Save 30%"                |
| Badge Color    | `badge_color`  | Color                 | Hex color for badge background |

2. Create a file in assets folder `bundle-builder.css` and paste following content there:
```css
/* ============================================================
   Bundle Builder — bundle-builder.css
   ============================================================ */

/* ── Variables ───────────────────────────────────────────── */
/* ── Updated Variables to Match Image ────────────────────── */
:root {
  --bb-cream:         #ffffff; /* Changed to white for a cleaner look */
  --bb-cream-dark:    #f4f4f4;
  --bb-yellow:        #1a1a1a; /* Main button color (Dark) */
  --bb-yellow-hover:  #333333; /* Slightly lighter on hover */
  --bb-purple:        #1a1a1a; /* Active tabs/badges (Dark) */
  --bb-purple-mid:    #1a1a1a; /* Borders and accents */
  --bb-purple-light:  #f4f4f4; /* Disabled/Background states */
  --bb-orange:        #1a1a1a; /* Summary CTA color */
  --bb-orange-hover:  #333333;
  --bb-dark:          #1a1a1a;
  --bb-gray:          #888;
  --bb-border:        #e5e5e5; /* Lighter border matching the cart divider */
}

/* ── Wrapper ──────────────────────────────────────────────── */
.bundle-builder {
  padding: 48px 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

/* ── Header ──────────────────────────────────────────────── */
.bb-header {
  text-align: center;
  margin-bottom: 40px;
}

.bb-header__title {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 14px;
  line-height: 1.2;
}

.bb-header__sub {
  font-size: 15px;
  color: #555;
  max-width: 540px;
  margin: 0 auto 20px;
  line-height: 1.65;
}

.bb-header__rule {
  border: none;
  border-top: 1px solid #e0e0e0;
  max-width: 700px;
  margin: 0 auto;
}

/* ── Two-Column Layout ───────────────────────────────────── */
.bb-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  align-items: start;
  margin-top: 36px;
}

@media (max-width: 900px) {
  .bb-layout {
    grid-template-columns: 1fr;
  }
  .bb-summary {
    display: none;
  }
  .bb-picker {
    padding-bottom: 150px;
  }
}

/* ── Filter Tabs ─────────────────────────────────────────── */
.bb-filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.bb-filter-tab {
  padding: 7px 18px;
  border: 2px solid #ddd;
  border-radius: 50px;
  background: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.bb-filter-tab:hover {
  border-color: var(--bb-purple-mid);
  color: var(--bb-purple-mid);
}

.bb-filter-tab--active {
  background: var(--bb-purple);
  color: #fff;
  border-color: var(--bb-purple);
}

/* ── Product Grid ─────────────────────────────────────────── */
.bb-product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 900px) {
  .bb-product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ── Product Card ─────────────────────────────────────────── */
.bb-pcard {
  background: var(--bb-cream);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.05);
}

.bb-pcard:hover {
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.bb-pcard__image {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: var(--bb-cream);
  overflow: hidden;
}

.bb-pcard__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s;
}

.bb-pcard:hover .bb-pcard__image img {
  transform: scale(1.05);
}

.bb-pcard__info {
  padding: 8px 12px 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.bb-pcard__name {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
  line-height: 1.3;
}

.bb-pcard__divider {
  border: none;
  border-top: 1px solid rgba(0,0,0,0.10);
  margin: 0 0 8px;
}

.bb-pcard__details {
  font-size: 11px;
  color: var(--bb-dark);
  text-decoration: underline;
  margin: 0 0 10px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  display: inline;
}

.bb-pcard__add-wrap {
  margin-top: auto;
  position: relative;
}

.bb-pcard__add-btn {
  width: 100%;
  padding: 11px 12px;
  background: var(--bb-yellow);
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
  letter-spacing: 0.02em;
}

.bb-pcard__add-btn:hover:not(:disabled):not(.bb-pcard__add-btn--full) {
  background: var(--bb-yellow-hover);
}

.bb-pcard__add-btn--full {
  background: var(--bb-cream-dark);
  color: #999;
  cursor: default;
}

.bb-pcard__add-btn--soldout {
  background: #eee;
  color: #aaa;
  cursor: not-allowed;
  text-decoration: line-through;
}

.bb-pcard__count {
  position: absolute;
  top: -9px;
  right: -4px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--bb-purple);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}

/* ── Summary Panel (right desktop) ──────────────────────── */
.bb-summary {
  position: sticky;
  top: 24px;
  background: #fff;
  border: 1.5px solid var(--bb-border);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ── Deal Picker ─────────────────────────────────────────── */
.bb-deal-picker {
  padding: 18px 18px 14px;
  border-bottom: 1px solid var(--bb-border);
  background-color: #dedede;
}

.bb-deal-headline {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 14px;
}

.bb-deal-headline__title {
  font-size: 22px;
  font-weight: 800;
  color: var(--bb-orange);
  line-height: 1;
}

.bb-deal-headline__per {
  font-size: 13px;
  color: var(--bb-dark);
  font-weight: 400;
}

.bb-deal-btns {
  display: flex;
  gap: 6px;
}

.bb-deal-btn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  flex: 1;
  min-width: 0;
  position: relative;
}

.bb-deal-badge {
  display: inline-block;
  background: var(--bb-yellow);
  color: var(--bb-dark);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .04em;
  padding: 2px 8px;
  border-radius: 20px;
  text-transform: uppercase;
  white-space: nowrap;
  line-height: 1.5;
  position: absolute;
  top: 0px;
  transform: translateY(-50%);
}

.bb-deal-badge--ghost {
  visibility: hidden;
}

.bb-deal-btn {
  width: 100%;
  padding: 10px 4px;
  border: 2px solid var(--bb-border);
  border-radius: 8px;
  background: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  color: var(--bb-dark);
  letter-spacing: 0.03em;
  white-space: nowrap;
}

.bb-deal-btn:hover:not(.bb-deal-btn--active) {
  border-color: var(--bb-purple-mid);
  color: var(--bb-purple-mid);
}

.bb-deal-btn--active {
  background: var(--bb-purple);
  border-color: var(--bb-purple);
  color: #fff;
}

.bb-deal-shipping {
  margin: 12px 0 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--bb-purple);
  text-align: center;
  letter-spacing: 0.01em;
}

/* ── Slots List ──────────────────────────────────────────── */
.bb-slots {
  flex: 1;
  max-height: 340px;
  overflow-y: auto;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  scrollbar-width: thin;
  scrollbar-color: var(--bb-border) transparent;
}

.bb-slots::-webkit-scrollbar { width: 4px; }
.bb-slots::-webkit-scrollbar-thumb { background: var(--bb-border); border-radius: 2px; }

.bb-slot {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border: 2px dashed var(--bb-purple-mid);
  border-radius: 10px;
  min-height: 52px;
  transition: background 0.15s, border-color 0.15s;
}

.bb-slot--empty {
  justify-content: center;
}

.bb-slot--filled {
  border-style: solid;
  border-color: #d4ccea;
  background: #faf8ff;
}

.bb-slot__placeholder {
  font-size: 13px;
  font-weight: 600;
  color: var(--bb-purple-mid);
  font-style: italic;
}

.bb-slot__thumb {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--bb-cream);
}

.bb-slot__info {
  flex: 1;
  min-width: 0;
}

.bb-slot__name {
  font-size: 12px;
  font-weight: 700;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bb-slot__variant {
  font-size: 10px;
  color: var(--bb-gray);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bb-slot__remove {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #e0e0e0;
  border: none;
  color: #666;
  font-size: 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, color 0.15s;
  line-height: 1;
}

.bb-slot__remove:hover {
  background: #ff3b30;
  color: #fff;
}

/* ── Summary CTA ─────────────────────────────────────────── */
.bb-summary__footer {
  padding: 12px 14px 16px;
  border-top: 1px solid var(--bb-border);
  background-color: #dedede;
}

.bb-summary__add-btn {
  display: block;
  width: 100%;
  padding: 15px;
  background: var(--bb-orange);
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
}

.bb-summary__add-btn:hover:not(:disabled) {
  background: var(--bb-orange-hover);
}

.bb-summary__add-btn:disabled {
  background: var(--bb-purple-light);
  color: var(--bb-purple-mid);
  cursor: not-allowed;
}

/* ── Mobile Sticky Footer ────────────────────────────────── */
.bb-mobile-footer {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #e5e5e5;
  z-index: 200;
  padding-bottom: max(0px, env(safe-area-inset-bottom, 0px));
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.10);
}

.bb-mobile-footer--visible {
  display: block;
}

@media (min-width: 901px) {
  .bb-mobile-footer--visible {
    display: none !important;
  }
}

.bb-mobile-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  color: var(--bb-dark);
  letter-spacing: 0.01em;
}

.bb-mobile-toggle-chevron {
  font-size: 16px;
  transition: transform 0.25s;
  color: var(--bb-dark);
}

.bb-mobile-toggle-chevron--open {
  transform: rotate(180deg);
}

.bb-mobile-bundle {
  max-height: 40vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #fafafa;
}

.bb-mobile-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid #efefef;
  background: #fff;
}

.bb-mobile-item__thumb {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
  background: var(--bb-cream);
  flex-shrink: 0;
}

.bb-mobile-item__label {
  flex: 1;
  min-width: 0;
}

.bb-mobile-item__name {
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bb-mobile-item__variant {
  font-size: 11px;
  color: var(--bb-gray);
}

.bb-mobile-stepper {
  display: flex;
  align-items: center;
  border: 1.5px solid var(--bb-purple-mid);
  border-radius: 50px;
  overflow: hidden;
}

.bb-mobile-stepper__btn {
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bb-purple-mid);
  transition: background 0.15s;
  line-height: 1;
}

.bb-mobile-stepper__btn:hover {
  background: var(--bb-purple-light);
}

.bb-mobile-stepper__qty {
  min-width: 28px;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
  color: var(--bb-purple);
}

.bb-mobile-add-btn {
  display: block;
  width: calc(100% - 32px);
  margin: 10px 16px 14px;
  padding: 16px;
  background: var(--bb-orange);
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.15s;
}

.bb-mobile-add-btn:hover:not(:disabled) {
  background: var(--bb-orange-hover);
}

.bb-mobile-add-btn:disabled {
  background: var(--bb-purple-light);
  color: var(--bb-purple-mid);
  cursor: not-allowed;
}

/* ── Overlay ──────────────────────────────────────────────── */
.bb-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.50);
  z-index: 900;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.bb-overlay--open {
  opacity: 1;
  pointer-events: all;
}

/* ── Variant / Size Drawer ────────────────────────────────── */
.bb-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 20px 20px 0 0;
  z-index: 901;
  transform: translateY(102%);
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.bb-drawer--open {
  transform: translateY(0);
}

.bb-drawer__handle {
  width: 40px;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  margin: 12px auto 0;
  flex-shrink: 0;
}

.bb-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid #eee;
  flex-shrink: 0;
}

.bb-drawer__title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
}

.bb-drawer__close {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
  padding: 4px;
  line-height: 1;
  border-radius: 4px;
  transition: color 0.15s;
}

.bb-drawer__close:hover {
  color: #000;
}

.bb-drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  -webkit-overflow-scrolling: touch;
}

/* Drawer product header */
.bb-vdrawer__product {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.bb-vdrawer__img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  background: var(--bb-cream);
}

.bb-vdrawer__name {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.3;
}

.bb-vdrawer__variants {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.bb-vdrawer__btn {
  padding: 11px 22px;
  border: 2px solid var(--bb-border);
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.15s;
  color: var(--bb-dark);
}

.bb-vdrawer__btn:hover:not(.bb-vdrawer__btn--soldout) {
  border-color: var(--bb-purple);
  background: var(--bb-purple);
  color: #fff;
}

.bb-vdrawer__btn--soldout {
  color: #ccc;
  border-color: #eee;
  cursor: not-allowed;
  text-decoration: line-through;
}

/* Desktop: center and cap drawer */
@media (min-width: 1024px) {
  .bb-drawer {
    left: 50%;
    right: auto;
    width: 100%;
    max-width: 520px;
    transform: translate(-50%, 102%);
  }
  .bb-drawer--open {
    transform: translate(-50%, 0);
  }
}

/* ── Loading ──────────────────────────────────────────────── */
.bb-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
}

.bb-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #eee;
  border-top-color: var(--bb-purple-mid);
  border-radius: 50%;
  animation: bb-spin 0.7s linear infinite;
}

@keyframes bb-spin {
  to { transform: rotate(360deg); }
}

.bb-error {
  text-align: center;
  padding: 40px 20px;
  color: #999;
  font-size: 14px;
}

/* ── Drawer scrollbar ────────────────────────────────────── */
.bb-drawer__body::-webkit-scrollbar { width: 4px; }
.bb-drawer__body::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }

```
3. Create a file in assets folder `bundle-builder.js` and paste following content there:
```javascript
/* ============================================================
   Bundle Builder — bundle-builder.js
   ============================================================ */

class BundleBuilder {
  constructor() {
    this.state = {
      deals:        [],   // parsed from DOM
      activeDeal:   null, // { qty, collection, originalPrice, finalPrice, title, savedPct, el }
      slots:        [],   // array of slot objects | null  (length = activeDeal.qty)
      products:     [],
      activeFilter: 'all'
    };
    this.cache = {};

    this._initDeals();
    this._bindUI();
  }

  /* ── Init ─────────────────────────────────────────────── */

  _initDeals() {
    const buttons = [...document.querySelectorAll('.bb-deal-btn')];
    this.state.deals = buttons.map(btn => ({
      el:            btn,
      qty:           parseInt(btn.dataset.quantity)      || 0,
      collection:    btn.dataset.collection,
      originalPrice: parseFloat(btn.dataset.originalPrice) || 0,
      finalPrice:    parseFloat(btn.dataset.finalPrice)    || 0,
      title:         btn.dataset.title,
      savedPct:      parseInt(btn.dataset.savedPct)      || 0
    }));

    if (!this.state.deals.length) return;

    // Auto-select the last deal (best value) by default
    this._selectDeal(this.state.deals[this.state.deals.length - 1]);

    // Always show the mobile footer
    document.getElementById('bb-mobile-footer')?.classList.add('bb-mobile-footer--visible');
  }

  /* ── Deal Selection ───────────────────────────────────── */

  _selectDeal(deal) {
    const prev = this.state.activeDeal;
    this.state.activeDeal = deal;

    // Preserve filled slots when shrinking, expand with nulls when growing
    const prevSlots = this.state.slots;
    this.state.slots = Array.from({ length: deal.qty }, (_, i) => prevSlots[i] || null);

    // Update headline
    const titleEl   = document.getElementById('bb-deal-title');
    const perUnitEl = document.getElementById('bb-deal-per-unit');
    if (titleEl)   titleEl.textContent   = `${deal.qty} pack for $${deal.finalPrice.toFixed(2)}`;
    if (perUnitEl) perUnitEl.textContent = deal.qty > 0 ? `$${(deal.finalPrice / deal.qty).toFixed(2)} / shirt` : '';

    // Highlight active button
    document.querySelectorAll('.bb-deal-btn').forEach(b =>
      b.classList.toggle('bb-deal-btn--active', b === deal.el)
    );

    // Fetch products (only if collection changed or first load)
    if (!prev || prev.collection !== deal.collection) {
      this._fetchProducts(deal.collection);
    } else {
      this._renderGrid();
    }

    this._renderSlots();
    this._refreshBuyBtns();
  }

  /* ── Products ─────────────────────────────────────────── */

  async _fetchProducts(handle) {
    const list = document.getElementById('bb-product-list');
    if (!handle) return;

    if (this.cache[handle]) {
      this._onLoaded(this.cache[handle]);
      return;
    }

    list.innerHTML = '<div class="bb-loading"><div class="bb-spinner"></div></div>';

    try {
      const res  = await fetch(`/collections/${handle}/products.json?limit=50`);
      const data = await res.json();
      this.cache[handle] = data.products || [];
      this._onLoaded(this.cache[handle]);
    } catch {
      list.innerHTML = '<p class="bb-error">Could not load products. Please refresh the page.</p>';
    }
  }

  _onLoaded(products) {
    this.state.products = products;
    this.state.activeFilter = 'all';
    this._renderFilters();
    this._renderGrid();
  }

  /* ── Filter Tabs ──────────────────────────────────────── */

  _renderFilters() {
    const nav = document.getElementById('bb-filter-tabs');
    if (!nav) return;

    const types = ['all', ...new Set(
      this.state.products.map(p => p.product_type).filter(Boolean)
    )];

    // Only render tabs if there are multiple types
    if (types.length <= 2) {
      nav.innerHTML = '';
      return;
    }

    nav.innerHTML = types.map(t => `
      <button
        class="bb-filter-tab ${this.state.activeFilter === t ? 'bb-filter-tab--active' : ''}"
        data-filter="${this._esc(t)}"
      >${t === 'all' ? 'All' : this._esc(t)}</button>
    `).join('');

    nav.querySelectorAll('.bb-filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.activeFilter = btn.dataset.filter;
        this._renderFilters();
        this._renderGrid();
      });
    });
  }

  /* ── Product Grid ─────────────────────────────────────── */

  _renderGrid() {
    const list = document.getElementById('bb-product-list');
    if (!list) return;

    const isFull = this.state.slots.every(Boolean);
    const filtered = this.state.activeFilter === 'all'
      ? this.state.products
      : this.state.products.filter(p => p.product_type === this.state.activeFilter);

    if (!filtered.length) {
      list.innerHTML = '<p class="bb-error">No products found.</p>';
      return;
    }

    list.innerHTML = `<div class="bb-product-grid">${filtered.map(p => this._cardHTML(p, isFull)).join('')}</div>`;

    list.querySelectorAll('.bb-pcard__add-btn[data-pid]').forEach(btn => {
      btn.addEventListener('click', () => {
        const product = this.state.products.find(p => String(p.id) === btn.dataset.pid);
        if (product) this._handleAdd(product);
      });
    });

    list.querySelectorAll('.bb-pcard__details[data-handle]').forEach(btn => {
      btn.addEventListener('click', () => {
        window.open(`/products/${btn.dataset.handle}`, '_blank', 'noopener');
      });
    });
  }

  _cardHTML(p, isFull) {
    const count    = this.state.slots.filter(s => s?.productTitle === p.title).length;
    const img      = p.images?.[0]?.src || '';
    const allSoldOut = p.variants.every(v => !v.available);
    const disabled = (isFull && count === 0) || allSoldOut;

    let btnLabel = 'Add';
    let btnClass = 'bb-pcard__add-btn';
    if (allSoldOut)         { btnLabel = 'Sold Out'; btnClass += ' bb-pcard__add-btn--soldout'; }
    else if (isFull)        { btnLabel = 'Pack Full'; btnClass += ' bb-pcard__add-btn--full'; }

    return `
      <div class="bb-pcard" data-product-id="${p.id}">
        <div class="bb-pcard__image">
          ${img ? `<img src="${img}" alt="${this._esc(p.title)}" loading="lazy">` : ''}
        </div>
        <div class="bb-pcard__info">
          <p class="bb-pcard__name">${this._esc(p.title)}</p>
          <hr class="bb-pcard__divider">
          <button class="bb-pcard__details" data-handle="${p.handle}" type="button">See Details</button>
          <div class="bb-pcard__add-wrap">
            <button
              class="${btnClass}"
              type="button"
              data-pid="${p.id}"
              ${disabled ? 'disabled' : ''}
            >${btnLabel}</button>
            ${count > 0 ? `<span class="bb-pcard__count">${count}</span>` : ''}
          </div>
        </div>
      </div>`;
  }

  /* ── Add / Remove Logic ───────────────────────────────── */

  _handleAdd(product) {
    if (this.state.slots.every(Boolean)) return;

    const availableVariants = product.variants.filter(v => v.available);
    if (!availableVariants.length) return;

    if (availableVariants.length === 1 && product.variants.length === 1) {
      // Single variant — add directly
      const v = availableVariants[0];
      this._addToSlot({
        variantId:    v.id,
        productTitle: product.title,
        variantTitle: v.title !== 'Default Title' ? v.title : '',
        image:        product.images?.[0]?.src || '',
        handle:       product.handle
      });
    } else {
      // Multiple variants → open size drawer
      this._openVariantDrawer(product);
    }
  }

  _addToSlot(item) {
    const idx = this.state.slots.indexOf(null);
    if (idx === -1) return;
    this.state.slots[idx] = item;
    this._refreshUI();
  }

  _removeFromSlot(index) {
    if (index < 0 || index >= this.state.slots.length) return;
    this.state.slots[index] = null;
    this._refreshUI();
  }

  _removeLastOfVariant(variantId) {
    for (let i = this.state.slots.length - 1; i >= 0; i--) {
      if (this.state.slots[i]?.variantId === variantId) {
        this.state.slots[i] = null;
        this._refreshUI();
        return;
      }
    }
  }

  /* ── Refresh All UI ───────────────────────────────────── */

  _refreshUI() {
    this._renderSlots();
    this._renderGrid();
    this._renderMobileItems();
    this._refreshBuyBtns();
  }

  /* ── Desktop Slots ────────────────────────────────────── */

  _renderSlots() {
    const el = document.getElementById('bb-slots');
    if (!el) return;

    el.innerHTML = this.state.slots.map((slot, i) => {
      if (!slot) {
        return `<div class="bb-slot bb-slot--empty">
          <span class="bb-slot__placeholder">Shirt goes here!</span>
        </div>`;
      }
      return `<div class="bb-slot bb-slot--filled">
        ${slot.image
          ? `<img class="bb-slot__thumb" src="${this._esc(slot.image)}" alt="${this._esc(slot.productTitle)}">`
          : '<div class="bb-slot__thumb"></div>'}
        <div class="bb-slot__info">
          <div class="bb-slot__name">${this._esc(slot.productTitle)}</div>
          ${slot.variantTitle ? `<div class="bb-slot__variant">${this._esc(slot.variantTitle)}</div>` : ''}
        </div>
        <button class="bb-slot__remove" type="button" data-idx="${i}" aria-label="Remove">&#10005;</button>
      </div>`;
    }).join('');

    el.querySelectorAll('.bb-slot__remove').forEach(btn => {
      btn.addEventListener('click', () => this._removeFromSlot(parseInt(btn.dataset.idx)));
    });
  }

  /* ── Mobile Bundle List ───────────────────────────────── */

  _renderMobileItems() {
    const el = document.getElementById('bb-mobile-items');
    if (!el) return;

    // Group slots by variantId
    const grouped = new Map();
    this.state.slots.forEach(slot => {
      if (!slot) return;
      const key = slot.variantId;
      const g   = grouped.get(key);
      if (g) {
        g.count++;
      } else {
        grouped.set(key, { slot, count: 1 });
      }
    });

    if (!grouped.size) {
      el.innerHTML = '<p style="text-align:center;padding:16px;color:#999;font-size:13px">No items added yet</p>';
      return;
    }

    el.innerHTML = [...grouped.entries()].map(([vid, { slot, count }]) => `
      <div class="bb-mobile-item">
        ${slot.image
          ? `<img class="bb-mobile-item__thumb" src="${this._esc(slot.image)}" alt="${this._esc(slot.productTitle)}">`
          : '<div class="bb-mobile-item__thumb"></div>'}
        <div class="bb-mobile-item__label">
          <div class="bb-mobile-item__name">${this._esc(slot.productTitle)}</div>
          ${slot.variantTitle ? `<div class="bb-mobile-item__variant">${this._esc(slot.variantTitle)}</div>` : ''}
        </div>
        <div class="bb-mobile-stepper">
          <button class="bb-mobile-stepper__btn" data-vid="${vid}" data-action="dec" type="button">&#8722;</button>
          <span class="bb-mobile-stepper__qty">${count}</span>
          <button class="bb-mobile-stepper__btn" data-vid="${vid}" data-action="inc" type="button">+</button>
        </div>
      </div>
    `).join('');

    el.querySelectorAll('.bb-mobile-stepper__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const vid = parseInt(btn.dataset.vid);
        if (btn.dataset.action === 'dec') {
          this._removeLastOfVariant(vid);
        } else {
          if (!this.state.slots.every(Boolean)) {
            const existing = this.state.slots.find(s => s?.variantId === vid);
            if (existing) this._addToSlot({ ...existing });
          }
        }
      });
    });
  }

  /* ── Buy Buttons ──────────────────────────────────────── */

  _refreshBuyBtns() {
    const deal   = this.state.activeDeal;
    const filled = this.state.slots.filter(Boolean).length;
    const total  = deal?.qty || 0;
    const isDone = filled === total && total > 0;
    const remain = total - filled;

    const label     = isDone ? 'Add to Cart' : `Add ${remain} more`;
    const mobileLabel = isDone ? 'Add To Cart' : `Add ${remain} more`;

    const desktopBtn = document.getElementById('bb-add-to-cart-btn');
    if (desktopBtn) {
      desktopBtn.textContent = label;
      desktopBtn.disabled    = !isDone;
    }

    const mobileBtn = document.getElementById('bb-mobile-add-btn');
    if (mobileBtn) {
      mobileBtn.textContent = mobileLabel;
      mobileBtn.disabled    = !isDone;
    }

    const toggleText = document.getElementById('bb-mobile-toggle-text');
    if (toggleText) {
      toggleText.textContent = `View Your (${total} pack)`;
    }
  }

  /* ── Variant Drawer ───────────────────────────────────── */

  _openVariantDrawer(product) {
    const title = document.getElementById('bb-drawer-title');
    const body  = document.getElementById('bb-drawer-body');
    if (!body) return;

    if (title) title.textContent = 'Select a Size';

    body.innerHTML = `
      <div class="bb-vdrawer__product">
        ${product.images?.[0]?.src
          ? `<img class="bb-vdrawer__img" src="${this._esc(product.images[0].src)}" alt="${this._esc(product.title)}">`
          : ''}
        <p class="bb-vdrawer__name">${this._esc(product.title)}</p>
      </div>
      <div class="bb-vdrawer__variants">
        ${product.variants.map(v => `
          <button
            class="bb-vdrawer__btn ${!v.available ? 'bb-vdrawer__btn--soldout' : ''}"
            type="button"
            data-vid="${v.id}"
            data-vname="${this._esc(v.title)}"
            ${!v.available ? 'disabled' : ''}
          >${this._esc(v.title)}</button>
        `).join('')}
      </div>`;

    body.querySelectorAll('.bb-vdrawer__btn:not(.bb-vdrawer__btn--soldout)').forEach(btn => {
      btn.addEventListener('click', () => {
        const variantTitle = btn.dataset.vname !== 'Default Title' ? btn.dataset.vname : '';
        this._addToSlot({
          variantId:    parseInt(btn.dataset.vid),
          productTitle: product.title,
          variantTitle,
          image:        product.images?.[0]?.src || '',
          handle:       product.handle
        });
        this._toggleDrawer(false);
      });
    });

    this._toggleDrawer(true);
  }

  _toggleDrawer(open) {
    document.getElementById('bb-drawer')?.classList.toggle('bb-drawer--open', open);
    document.getElementById('bb-overlay')?.classList.toggle('bb-overlay--open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  /* ── Add to Cart ──────────────────────────────────────── */

  async _addToCart() {
    const desktopBtn = document.getElementById('bb-add-to-cart-btn');
    const mobileBtn  = document.getElementById('bb-mobile-add-btn');

    [desktopBtn, mobileBtn].forEach(b => {
      if (b) { b.textContent = 'Adding\u2026'; b.disabled = true; }
    });

    const items = this.state.slots
      .filter(Boolean)
      .map(s => ({
        id:         s.variantId,
        quantity:   1,
        properties: { _bundle: this.state.activeDeal?.title || 'Bundle' }
      }));

    try {
      const res = await fetch('/cart/add.js', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ items })
      });
      if (!res.ok) throw new Error('Cart error');
      window.location.href = window.bbBundleData?.cartUrl || '/cart';
    } catch {
      alert('Sorry, something went wrong. Please try again.');
      this._refreshBuyBtns();
    }
  }

  /* ── UI Bindings ──────────────────────────────────────── */

  _bindUI() {
    // Deal picker clicks
    document.getElementById('bb-deal-btns')?.addEventListener('click', e => {
      const btn  = e.target.closest('.bb-deal-btn');
      if (!btn) return;
      const deal = this.state.deals.find(d => d.el === btn);
      if (deal) this._selectDeal(deal);
    });

    // Close drawer
    document.getElementById('bb-drawer-close')?.addEventListener('click', () => this._toggleDrawer(false));
    document.getElementById('bb-overlay')?.addEventListener('click',       () => this._toggleDrawer(false));

    // Add to cart
    ['bb-add-to-cart-btn', 'bb-mobile-add-btn'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => this._addToCart());
    });

    // Mobile bundle toggle
    document.getElementById('bb-mobile-toggle')?.addEventListener('click', () => {
      const bundle  = document.getElementById('bb-mobile-bundle');
      const chevron = document.getElementById('bb-mobile-toggle-chevron');
      const toggle  = document.getElementById('bb-mobile-toggle');
      if (!bundle) return;

      const isOpen = !bundle.hidden;
      bundle.hidden = isOpen;
      chevron?.classList.toggle('bb-mobile-toggle-chevron--open', !isOpen);
      toggle?.setAttribute('aria-expanded', String(!isOpen));

      if (!isOpen) this._renderMobileItems();
    });
  }

  /* ── Helpers ──────────────────────────────────────────── */

  _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

/* ── Boot ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('bundle-builder')) {
    window.bb = new BundleBuilder();
  }
});

```
4. Create the section named as `bundle-builder.liquid` and paste the following code there:
```liquid
{%- liquid
  assign bundle_offers = shop.metaobjects['bundle_offer'].values
-%}

<link rel="stylesheet" href="{{ 'bundle-builder.css' | asset_url }}">

<div class="bundle-builder page-width" id="bundle-builder">

  <div class="bb-header">
    <h2 class="bb-header__title">{{ section.settings.heading }}</h2>
    <p class="bb-header__sub">{{ section.settings.subheading }}</p>
    <hr class="bb-header__rule">
  </div>

  <div class="bb-layout">

    <!-- LEFT: Product Picker -->
    <div class="bb-picker">
      <nav class="bb-filter-tabs" id="bb-filter-tabs" aria-label="Product categories"></nav>
      <div class="bb-product-list" id="bb-product-list">
        <div class="bb-loading" id="bb-product-loading">
          <div class="bb-spinner"></div>
        </div>
      </div>
    </div>

    <!-- RIGHT: Sticky Summary Panel -->
    <aside class="bb-summary" id="bb-summary">

      <!-- Deal Picker -->
      <div class="bb-deal-picker">
        <div class="bb-deal-headline">
          <span class="bb-deal-headline__title" id="bb-deal-title">-</span>
          <span class="bb-deal-headline__per" id="bb-deal-per-unit"></span>
        </div>

        <div class="bb-deal-btns" id="bb-deal-btns">
          {%- for offer in bundle_offers -%}
            {%- assign orig  = offer.original_price.value | plus: 0.0 -%}
            {%- assign final = offer.final_price.value    | plus: 0.0 -%}
            {%- assign qty   = offer.quantity.value       | plus: 0 -%}
            {%- assign badge_color = offer.badge_color -%}
            {%- if orig > 0 -%}
              {%- assign saved_pct = orig | minus: final | divided_by: orig | times: 100 | round -%}
            {%- else -%}
              {%- assign saved_pct = 0 -%}
            {%- endif -%}
            <div class="bb-deal-btn-wrap">
              {%- if offer.badge_text.value != blank -%}
                <span class="bb-deal-badge" style="background-color: {{ badge_color }};">{{ offer.badge_text.value }}</span>
              {%- elsif saved_pct > 0 -%}
                <span class="bb-deal-badge" style="background-color: {{ badge_color }};">{{ saved_pct }}% OFF</span>
              {%- else -%}
                <span class="bb-deal-badge bb-deal-badge--ghost"></span>
              {%- endif -%}
              <button class="bb-deal-btn"
                      type="button"
                      data-quantity="{{ qty }}"
                      data-collection="{{ offer.collection.value.handle }}"
                      data-original-price="{{ orig }}"
                      data-final-price="{{ final }}"
                      data-title="{{ offer.title.value | escape }}"
                      data-saved-pct="{{ saved_pct }}">
                {{ qty }} pack
              </button>
            </div>
          {%- else -%}
            <p style="color:#999;font-size:13px">No bundle offers found. Add <strong>bundle_offer</strong> metaobjects in Shopify admin.</p>
          {%- endfor -%}
        </div>

        {%- if section.settings.note_text != blank -%}
          <p class="bb-deal-shipping">{{ section.settings.note_text }}</p>
        {%- endif -%}
      </div>

      <!-- Slots -->
      <div class="bb-slots" id="bb-slots"></div>

      <!-- Add to Cart CTA -->
      <div class="bb-summary__footer">
        <button class="bb-summary__add-btn" id="bb-add-to-cart-btn" type="button" disabled>
          Add to Cart
        </button>
      </div>

    </aside>

  </div>

</div>

<!-- Mobile Sticky Footer -->
<div class="bb-mobile-footer" id="bb-mobile-footer">
  <button class="bb-mobile-toggle" id="bb-mobile-toggle" type="button" aria-expanded="false">
    <span id="bb-mobile-toggle-text">View Your Bundle</span>
    <span class="bb-mobile-toggle-chevron" id="bb-mobile-toggle-chevron">&#8743;</span>
  </button>
  <div class="bb-mobile-bundle" id="bb-mobile-bundle" hidden>
    <div class="bb-mobile-items" id="bb-mobile-items"></div>
  </div>
  <button class="bb-mobile-add-btn" id="bb-mobile-add-btn" type="button" disabled>
    Add To Cart
  </button>
</div>

<!-- Variant / Size Drawer -->
<div class="bb-overlay" id="bb-overlay" aria-hidden="true"></div>
<div class="bb-drawer" id="bb-drawer" role="dialog" aria-modal="true">
  <div class="bb-drawer__handle"></div>
  <div class="bb-drawer__header">
    <h3 class="bb-drawer__title" id="bb-drawer-title">Select a Size</h3>
    <button class="bb-drawer__close" id="bb-drawer-close" type="button" aria-label="Close">&#10005;</button>
  </div>
  <div class="bb-drawer__body" id="bb-drawer-body"></div>
</div>

<script>
  window.bbBundleData = {
    cartUrl:     '{{ routes.cart_url }}',
    moneyFormat: {{ shop.money_format | json }}
  };
</script>
<script src="{{ 'bundle-builder.js' | asset_url }}" defer></script>

{% schema %}
{
  "name": "Bundle Builder",
  "tag": "section",
  "settings": [
    { "type": "text",     "id": "heading",           "label": "Heading",           "default": "Build Your Pack" },
    { "type": "textarea", "id": "subheading",         "label": "Subheading",        "default": "Create a custom bundle from our collection." },
    { "type": "text",     "id": "note_text", "label": "Note","default": "Free shipping with 5 or 10 pack!" }
  ],
  "presets": [{ "name": "Bundle Builder" }]
}
{% endschema %}

```
5. Go to the Shopify theme editor, in the pages create a new template and name it as `bundle-builder` and then create a new page from Shopify admin panel -> Sales channels -> Online Store -> Pages and name it as bundle builder and assign the newly created template to it.

6. Then go to Content Metaobjects -> Bundle Offer and setup the offers accordingly as shown in the image

7. Then Setup the automatic discounts as shown in the image

8. Then setup the automatic discounts for each bundle and collection accordingly

> [!NOTE]
> Make sure that each item in the collection has the same price.

---

## Video Tutorial

Watch the step-by-step video tutorial here:

[![Shopify Bundle Builder without APP](https://img.youtube.com/vi/vm5PouhM9T0/maxresdefault.jpg)](https://www.youtube.com/watch?v=vm5PouhM9T0)
