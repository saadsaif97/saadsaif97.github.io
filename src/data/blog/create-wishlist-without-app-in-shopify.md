---
title: Create Wishlist in Shopify without using APP
author: Saad Saif
pubDatetime: 2026-03-29T01:17:19Z
slug: create-wishlist-without-app-in-shopify
draft: false
featured: true
ogImage: ../../assets/images/Create Wishlist in Shopify without using APP.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: Add custom badges on Shopify products, without app (code snippet given).
---

# Create Wishlist in Shopify without using APP


---

## Steps

1. Create section `easy-wish.liquid` and add following code there:
```liquid
{% comment %}
  EasyWish — Section Rendering API templates
  ==========================================
  This section is NOT placed on pages via {% section %}.
  It is fetched exclusively via the Section Rendering API:

    /products/{handle}?sections=easy-wish  → drawer item card
    /search?q=&sections=easy-wish          → empty state HTML

  All HTML structures are here so the snippet contains zero HTML strings.
{% endcomment %}

{%- if product -%}

  {%- comment -%} ============================================================
    STRUCTURE 1 — DRAWER ITEM CARD
    Rendered when a product handle is known. Fetched per-product when the
    wishlist drawer opens. Uses Shopify Liquid for correct money formatting,
    image URLs (CDN + srcset), translation strings, and live availability.
  ============================================================ {%- endcomment -%}

  {%- liquid
    assign first_variant = product.first_available_variant | default: product.variants.first
    assign on_sale       = false
    if product.compare_at_price > product.price
      assign on_sale = true
    endif
  -%}

  <div class="ew-item" data-key="{{ product.handle }}">

    <button
      class="ew-remove-item-btn"
      type="button"
      data-key="{{ product.handle }}"
      aria-label="{{ 'wishlist.remove_item' | t | default: 'Remove from wishlist' }}"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>

    <div class="ew-item-image-wrap">
      {%- if product.featured_image -%}
        <a href="{{ product.url }}" tabindex="-1" aria-hidden="true">
          {{- product.featured_image
            | image_url: width: 160
            | image_tag:
                loading: 'lazy',
                widths: '80, 160',
                width: 80,
                height: 80,
                alt: product.featured_image.alt | default: product.title | escape
          -}}
        </a>
      {%- else -%}
        <div class="ew-item-image-placeholder" aria-hidden="true">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="m3 16 5-5 4 4 3-3 6 6"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
          </svg>
        </div>
      {%- endif -%}
    </div>

    <div class="ew-item-body">

      <p class="ew-item-title">
        <a href="{{ product.url }}">{{ product.title | escape }}</a>
      </p>

      {%- unless first_variant.title == 'Default Title' -%}
        <p class="ew-item-variant">{{ first_variant.title | escape }}</p>
      {%- endunless -%}

      <div class="ew-item-price-row">
        <span class="ew-item-price">{{ product.price | money }}</span>
        {%- if on_sale -%}
          <s class="ew-item-compare-price">{{ product.compare_at_price | money }}</s>
          <span class="ew-item-badge-sale">{{ 'products.product.on_sale' | t | default: 'Sale' }}</span>
        {%- endif -%}
      </div>

      <div class="ew-item-actions">
        {%- if first_variant.available -%}
          <button
            class="ew-atc-btn"
            type="button"
            data-variant-id="{{ first_variant.id }}"
          >
            {{- 'products.product.add_to_cart' | t | default: 'Add to cart' -}}
          </button>
        {%- else -%}
          <button class="ew-atc-btn" type="button" disabled>
            {{- 'products.product.sold_out' | t | default: 'Sold out' -}}
          </button>
        {%- endif -%}
        <a class="ew-view-btn" href="{{ product.url }}">
          {{- 'wishlist.view_product' | t | default: 'View' -}}
        </a>
      </div>

    </div>
  </div>

{%- elsif request.path == '/search' or request.path == '/' -%}

  {%- comment -%} ============================================================
    STRUCTURE 2 — EMPTY STATE
    Fetched via /?sections=easy-wish when wishlist has no items.
    Kept in Liquid so copy/icon can be themed or translated.
  ============================================================ {%- endcomment -%}

  <div class="ew-empty-state">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
    <p>{{ 'wishlist.empty' | t | default: 'Your wishlist is empty.' }}</p>
  </div>

{%- endif -%}

{% schema %}
{
  "name": "EasyWish",
  "tag": "div",
  "class": "ew-section-render"
}
{% endschema %}
```
2. Create snippet `easy-wish.liquid` and add following code there:
```liquid
{% comment %}
  EasyWish — Wishlist for Shopify 1.0 & 2.0
  ==========================================
  Usage: Add {% render 'easy-wish' %} just before </body> in theme.liquid

  Assets:
    assets/easy-wish.css  — all styles
    assets/easy-wish.js   — web components + injection logic
    sections/easy-wish.liquid — HTML templates (Section Rendering API)

  Theme settings: see the "EasyWish" group in config/settings_schema.json
{% endcomment %}

{{ 'easy-wish.css' | asset_url | stylesheet_tag }}

{%- comment -%}
  Inline config — Liquid renders theme settings into a plain JS object.
  This runs before easy-wish.js (which is deferred) so EasyWishConfig
  is always defined when the script initialises.
{%- endcomment -%}
<script>
  window.EasyWishConfig = {
    headerEnabled:  {% if settings.easywish_header_enabled  == false %}false{% else %}true{% endif %},
    headerPosition: {{ settings.easywish_header_position  | default: 'before_cart' | json }},
    cardEnabled:    {% if settings.easywish_card_enabled    == false %}false{% else %}true{% endif %},
    cardPosition:   {{ settings.easywish_card_position     | default: 'top-right'  | json }},
    pdpEnabled:     {% if settings.easywish_pdp_enabled     == false %}false{% else %}true{% endif %},
    pdpPosition:    {{ settings.easywish_pdp_position      | default: 'after'      | json }},
  };
</script>

{%- comment -%}
  Override CSS custom properties with values from theme settings.
  Only emitted when settings exist so the CSS file defaults are used otherwise.
{%- endcomment -%}
{%- if settings.easywish_color_active or settings.easywish_color_icon -%}
  <style>
    :root {
      {%- if settings.easywish_color_active -%}--ew-color-active: {{ settings.easywish_color_active }};{%- endif -%}
      {%- if settings.easywish_color_icon   -%}--ew-color-icon:   {{ settings.easywish_color_icon   }};{%- endif -%}
    }
  </style>
{%- endif -%}

<script src="{{ 'easy-wish.js' | asset_url }}" defer></script>

{%- comment -%}
  Drawer shell — server-rendered so the panel exists in the DOM immediately
  (no layout shift). The <easy-wish-drawer> web component wires event
  listeners in connectedCallback. Product cards inside are loaded on demand
  via the Section Rendering API (sections/easy-wish.liquid).
{%- endcomment -%}
<easy-wish-drawer>
  <div class="ew-overlay" aria-hidden="true"></div>
  <div class="ew-drawer" role="dialog" aria-modal="true" aria-label="{{ 'wishlist.title' | t | default: 'Wishlist' }}">
    <div class="ew-drawer-header">
      <h2 class="ew-drawer-title">{{ 'wishlist.title' | t | default: 'Wishlist' }}</h2>
      <div class="ew-drawer-header-actions">
        <button class="ew-close-btn" type="button" aria-label="{{ 'wishlist.close' | t | default: 'Close wishlist' }}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="ew-drawer-body">
      <div class="ew-items-list"></div>
    </div>
    <div class="ew-drawer-footer">
      <button class="ew-share-btn" type="button" aria-label="{{ 'wishlist.share' | t | default: 'Share wishlist' }}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
        <span class="ew-share-label">{{ 'wishlist.share' | t | default: 'Share' }}</span>
      </button>
    </div>
  </div>
</easy-wish-drawer>
```
3. Create asset `easy-wish.js` and add following code there:
```javascript
(function () {
  'use strict';

  // Config is set inline by snippets/easy-wish.liquid before this file loads
  var EW = window.EasyWishConfig;
  if (!EW) return;

  /* ================================================================
     STORAGE
     Persists an array of product objects in localStorage.
     Each item's unique key is the product handle.
  ================================================================ */
  var STORAGE_KEY = 'easywish_v1';

  var EasyWishStorage = {
    _items: null,

    _load: function () {
      if (this._items) return;
      try {
        this._items = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      } catch (e) {
        this._items = [];
      }
    },

    _save: function () {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items)); } catch (e) {}
    },

    _notify: function () {
      window.dispatchEvent(new CustomEvent('easywish:change', { detail: { items: this._items } }));
    },

    getAll: function () { this._load(); return this._items.slice(); },

    has: function (key) {
      this._load();
      return this._items.some(function (p) { return p.key === key; });
    },

    add: function (product) {
      this._load();
      if (this.has(product.key)) return false;
      product.addedAt = Date.now();
      this._items.unshift(product);
      this._save();
      this._notify();
      return true;
    },

    remove: function (key) {
      this._load();
      var before = this._items.length;
      this._items = this._items.filter(function (p) { return p.key !== key; });
      if (this._items.length === before) return false;
      this._save();
      this._notify();
      return true;
    },

    toggle: function (product) {
      return this.has(product.key) ? this.remove(product.key) : this.add(product);
    },

    count: function () { this._load(); return this._items.length; },
  };

  /* ================================================================
     HELPERS
  ================================================================ */
  function heartSVG() {
    return '<svg class="ew-heart-icon" viewBox="0 0 24 24" aria-hidden="true">'
      + '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'
      + '</svg>';
  }

  /* ================================================================
     WEB COMPONENT: <easy-wish-button>
     Attributes:
       product-key          — unique key (handle preferred)
       product-id           — numeric Shopify product ID
       product-handle       — product handle
       product-title        — product title
       product-image        — featured image URL
       product-price        — price in cents
       product-compare-price — compare-at price in cents
       product-url          — /products/handle
       variant-id           — default variant ID
       variant-title        — default variant title
       pdp                  — "true" for PDP full-width style
  ================================================================ */
  class EasyWishButton extends HTMLElement {
    connectedCallback() {
      this._key = this.getAttribute('product-key')
        || this.getAttribute('product-handle')
        || this.getAttribute('product-id');
      this._render();
      this._btn = this.querySelector('.ew-btn');
      this._update();
      this._btn.addEventListener('click', this._toggle.bind(this));
      window.addEventListener('easywish:change', this._update.bind(this));
    }

    disconnectedCallback() {
      window.removeEventListener('easywish:change', this._update.bind(this));
    }

    _render() {
      var isPdp = this.getAttribute('pdp') === 'true';
      var label = EasyWishStorage.has(this._key) ? 'Remove from wishlist' : 'Add to wishlist';
      this.innerHTML = '<button class="ew-btn" type="button" aria-label="' + label + '">'
        + heartSVG()
        + (isPdp ? '<span class="ew-pdp-btn-label">' + label + '</span>' : '')
        + '</button>';
      if (isPdp) this.classList.add('ew-pdp-btn');
    }

    _update() {
      var active = EasyWishStorage.has(this._key);
      this.classList.toggle('ew-active', active);
      var label = active ? 'Remove from wishlist' : 'Add to wishlist';
      if (this._btn) this._btn.setAttribute('aria-label', label);
      var span = this.querySelector('.ew-pdp-btn-label');
      if (span) span.textContent = label;
    }

    _toggle(e) {
      e.preventDefault();
      e.stopPropagation();
      EasyWishStorage.toggle(this._productData());
      this._update();
    }

    _productData() {
      return {
        key:          this._key,
        id:           this.getAttribute('product-id') || '',
        handle:       this.getAttribute('product-handle') || '',
        title:        this.getAttribute('product-title') || '',
        image:        this.getAttribute('product-image') || '',
        price:        parseInt(this.getAttribute('product-price') || '0', 10),
        comparePrice: parseInt(this.getAttribute('product-compare-price') || '0', 10) || 0,
        url:          this.getAttribute('product-url') || '',
        variantId:    this.getAttribute('variant-id') || '',
        variantTitle: this.getAttribute('variant-title') || '',
      };
    }
  }

  /* ================================================================
     WEB COMPONENT: <easy-wish-count>
     Renders a badge with the current wishlist count.
  ================================================================ */
  class EasyWishCount extends HTMLElement {
    connectedCallback() {
      this._update();
      window.addEventListener('easywish:change', this._update.bind(this));
    }
    disconnectedCallback() {
      window.removeEventListener('easywish:change', this._update.bind(this));
    }
    _update() {
      var n = EasyWishStorage.count();
      this.innerHTML = n > 0
        ? '<span class="ew-count-badge" aria-label="' + n + ' items in wishlist">' + n + '</span>'
        : '';
    }
  }

  /* ================================================================
     WEB COMPONENT: <easy-wish-trigger>
     Header heart icon button that opens the drawer.
  ================================================================ */
  class EasyWishTrigger extends HTMLElement {
    connectedCallback() {
      this.innerHTML = '<button class="ew-trigger-btn" type="button" aria-label="Open wishlist" aria-haspopup="dialog">'
        + heartSVG()
        + '<easy-wish-count></easy-wish-count>'
        + '</button>';
      this.querySelector('.ew-trigger-btn').addEventListener('click', function () {
        window.dispatchEvent(new CustomEvent('easywish:open'));
      });
    }
  }

  /* ================================================================
     WEB COMPONENT: <easy-wish-drawer>
     Slide-out panel. Shell HTML is Liquid-rendered by the snippet.
     Product item cards are fetched via Section Rendering API
     (/products/{handle}?sections=easy-wish) — all formatting,
     images, prices, and translations come from Shopify Liquid.
  ================================================================ */
  class EasyWishDrawer extends HTMLElement {
    connectedCallback() {
      // HTML is already server-rendered — just cache the list and wire events
      this._list = this.querySelector('.ew-items-list');
      this._shareBtn = this.querySelector('.ew-share-btn');
      this.querySelector('.ew-overlay').addEventListener('click', this._close.bind(this));
      this.querySelector('.ew-close-btn').addEventListener('click', this._close.bind(this));
      if (this._shareBtn) this._shareBtn.addEventListener('click', this._share.bind(this));
      window.addEventListener('easywish:open',   this._open.bind(this));
      window.addEventListener('easywish:change', this._onchange.bind(this));
      document.addEventListener('keydown',       this._onkey.bind(this));
      // One delegated listener covers all item interactions regardless of re-renders
      this._delegateListEvents();
      this._updateShareBtn();
    }

    disconnectedCallback() {
      window.removeEventListener('easywish:open',   this._open.bind(this));
      window.removeEventListener('easywish:change', this._onchange.bind(this));
      document.removeEventListener('keydown',       this._onkey.bind(this));
    }

    _delegateListEvents() {
      var self = this;
      this._list.addEventListener('click', function (e) {
        var rem = e.target.closest('.ew-remove-item-btn');
        if (rem) { EasyWishStorage.remove(rem.dataset.key); return; }
        var atc = e.target.closest('.ew-atc-btn[data-variant-id]');
        if (atc && !atc.disabled) self._addToCart(atc.dataset.variantId, atc);
      });
    }

    _open() {
      this.classList.add('ew-open');
      document.body.classList.add('ew-locked');
      this._renderItems();
      this._updateShareBtn();
      var closeBtn = this.querySelector('.ew-close-btn');
      if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 50);
    }

    _close() {
      this.classList.remove('ew-open');
      document.body.classList.remove('ew-locked');
    }

    _onkey(e) {
      if (e.key === 'Escape' && this.classList.contains('ew-open')) this._close();
    }

    _updateShareBtn() {
      if (!this._shareBtn) return;
      var hasItems = EasyWishStorage.count() > 0;
      this._shareBtn.style.display = hasItems ? '' : 'none';
    }

    _share() {
      var items = EasyWishStorage.getAll();
      if (!items.length) return;
      var handles = items.map(function (p) { return p.handle || p.key; }).filter(Boolean);
      var url = window.location.origin + '/?easywish=' + handles.join(',');

      var self = this;
      if (navigator.share) {
        navigator.share({ title: 'My Wishlist', url: url }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () { self._shareFeedback(); }).catch(function () {
          self._shareFallbackCopy(url);
        });
      } else {
        self._shareFallbackCopy(url);
      }
    }

    _shareFallbackCopy(url) {
      var input = document.createElement('input');
      input.style.cssText = 'position:fixed;top:-9999px;opacity:0';
      input.value = url;
      document.body.appendChild(input);
      input.select();
      try { document.execCommand('copy'); this._shareFeedback(); } catch (e) {}
      document.body.removeChild(input);
    }

    _shareFeedback() {
      if (!this._shareBtn) return;
      var label = this._shareBtn.querySelector('.ew-share-label');
      if (label) {
        var orig = label.textContent;
        label.textContent = 'Copied!';
        this._shareBtn.classList.add('ew-share-copied');
        setTimeout(function () {
          label.textContent = orig;
          this._shareBtn && this._shareBtn.classList.remove('ew-share-copied');
        }.bind(this), 2000);
      }
    }

    // Smart diff: removes deleted items instantly; fetches API only for new ones
    _onchange() {
      if (!this.classList.contains('ew-open')) return;
      this._updateShareBtn();

      var current    = EasyWishStorage.getAll();
      var currentKeys = new Set(current.map(function (p) { return p.handle || p.key; }));

      // Drop removed items without touching the network
      this._list.querySelectorAll('.ew-item[data-key]').forEach(function (el) {
        if (!currentKeys.has(el.dataset.key)) el.remove();
      });

      // Check for newly added items that have no rendered node yet
      var renderedKeys = new Set(
        Array.from(this._list.querySelectorAll('.ew-item[data-key]'))
          .map(function (el) { return el.dataset.key; })
      );
      var needsFetch = current.some(function (p) { return !renderedKeys.has(p.handle || p.key); });

      if (needsFetch) {
        this._renderItems(); // in-memory cache makes re-fetches cheap
      } else if (!this._list.querySelector('.ew-item')) {
        this._list.innerHTML = EasyWishDrawer._emptyHTML();
      }
    }

    // Fetch all item cards in parallel from sections/easy-wish.liquid
    async _renderItems() {
      var items = EasyWishStorage.getAll();
      if (!this._list) return;

      if (items.length === 0) {
        this._list.innerHTML = EasyWishDrawer._emptyHTML();
        return;
      }

      this._list.innerHTML = '<div class="ew-loading"><div class="ew-spinner"></div>Loading&hellip;</div>';

      var self  = this;
      var nodes = await Promise.all(
        items.map(function (p) { return self._fetchItem(p.handle || p.key); })
      );

      this._list.innerHTML = '';
      nodes.forEach(function (node) { if (node) self._list.appendChild(node); });

      if (!this._list.querySelector('.ew-item')) {
        this._list.innerHTML = EasyWishDrawer._emptyHTML();
      }
    }

    // Fetch one product card via Section Rendering API, cache the parsed node
    async _fetchItem(handle) {
      if (!handle) return null;
      var cache = EasyWishDrawer._cache;
      if (cache[handle]) return cache[handle].cloneNode(true);

      try {
        var res = await fetch(
          '/products/' + encodeURIComponent(handle) + '?sections=easy-wish'
        );
        if (!res.ok) return null;

        var data = await res.json();
        if (!data['easy-wish']) return null;

        // DOMParser is safe — <script> tags in section responses never execute
        var doc  = new DOMParser().parseFromString(data['easy-wish'], 'text/html');
        var node = doc.querySelector('.ew-item');
        if (node) { cache[handle] = node; return node.cloneNode(true); }
      } catch (e) {}
      return null;
    }

    static _emptyHTML() {
      return '<div class="ew-empty-state">'
        + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">'
        +   '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'
        + '</svg>'
        + '<p>Your wishlist is empty.</p></div>';
    }

    async _addToCart(variantId, btn) {
      var orig = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Adding\u2026';
      try {
        var res = await fetch('/cart/add.js', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body:    JSON.stringify({ id: Number(variantId), quantity: 1 }),
        });
        if (res.ok) {
          btn.textContent = 'Added!';
          btn.classList.add('ew-atc-success');
          document.dispatchEvent(new CustomEvent('cart:refresh'));
          fetch('/cart.js').then(function (r) { return r.json(); }).then(function (cart) {
            document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart, bubbles: true }));
            var bubble = document.querySelector(
              '.cart-count-bubble, .site-header__cart-bubble, #cart-icon-bubble .cart-count-bubble'
            );
            if (bubble) {
              var span = bubble.querySelector('span:not([aria-hidden])') || bubble;
              if (span) span.textContent = cart.item_count;
            }
          });
        } else {
          btn.textContent = 'Error';
        }
      } catch (e) {
        btn.textContent = 'Error';
      }
      setTimeout(function () {
        btn.textContent = orig;
        btn.disabled = false;
        btn.classList.remove('ew-atc-success');
      }, 2500);
    }
  }

  // In-memory cache shared across all drawer instances
  EasyWishDrawer._cache = {};

  /* ================================================================
     REGISTER CUSTOM ELEMENTS
  ================================================================ */
  if (!customElements.get('easy-wish-button'))  customElements.define('easy-wish-button',  EasyWishButton);
  if (!customElements.get('easy-wish-count'))   customElements.define('easy-wish-count',   EasyWishCount);
  if (!customElements.get('easy-wish-trigger')) customElements.define('easy-wish-trigger', EasyWishTrigger);
  if (!customElements.get('easy-wish-drawer'))  customElements.define('easy-wish-drawer',  EasyWishDrawer);

  /* ================================================================
     AUTO-INJECTION
     Injects wishlist buttons into the header, product cards, and PDP.
     Runs on DOMContentLoaded + Shopify section:load events + MutationObserver.
  ================================================================ */

  function injectHeader() {
    if (!EW.headerEnabled) return;
    if (document.querySelector('easy-wish-trigger')) return;

    var selectors = [
      '.header__icons',                 // Dawn
      '.site-header__icons',            // Debut
      '.header-wrapper .header__icons',
      'header .nav-bar__icons',         // Brooklyn
      '.site-nav--icons',
      '.header__actions',
    ];

    var container = null;
    for (var i = 0; i < selectors.length; i++) {
      container = document.querySelector(selectors[i]);
      if (container) break;
    }
    if (!container) return;

    var trigger = document.createElement('easy-wish-trigger');
    var pos = EW.headerPosition;

    if (pos === 'before_cart') {
      var cartEl = container.querySelector('[href*="/cart"], #cart-icon-bubble, .header__icon--cart');
      container.insertBefore(trigger, cartEl ? (cartEl.closest('a') || cartEl) : container.firstChild);

    } else if (pos === 'after_cart') {
      var cartEl2 = container.querySelector('[href*="/cart"], #cart-icon-bubble, .header__icon--cart');
      var ref = cartEl2
        ? (cartEl2.parentNode === container ? cartEl2.nextSibling : cartEl2.closest('a')?.nextSibling)
        : null;
      container.insertBefore(trigger, ref || null);

    } else if (pos === 'before_account') {
      var accEl = container.querySelector('[href*="/account"], .header__icon--account');
      container.insertBefore(trigger, accEl ? (accEl.closest('a') || accEl) : container.firstChild);

    } else {
      container.insertBefore(trigger, container.firstChild);
    }
  }

  function injectCards() {
    if (!EW.cardEnabled) return;

    var cardSelectors = [
      '[data-product-card]',  // Dawn
      '.product-card',
      '.card-wrapper',
      '.product-item',
      '.grid-product',
      '[data-product-id]',
    ];

    document.querySelectorAll(cardSelectors.join(',')).forEach(function (card) {
      if (card.querySelector('easy-wish-button')) return;

      var productId = card.dataset.productCard || card.dataset.productId || '';

      var link   = card.querySelector('a[href*="/products/"]');
      var handle = '';
      if (link) {
        var m = link.getAttribute('href').match(/\/products\/([^/?#]+)/);
        handle = m ? m[1] : '';
      }
      handle = handle || card.dataset.productHandle || '';

      var key = handle || productId;
      if (!key) return;

      var titleEl = card.querySelector(
        '.card__heading a, .card__heading, .product-card__title, .grid-product__title, h2 a, h3 a, h4 a'
      );
      var imgEl = card.querySelector('img');
      var image = imgEl
        ? (imgEl.src || imgEl.dataset.src || imgEl.getAttribute('srcset')?.split(' ')?.[0] || '').split('?')[0]
        : '';

      var btn = document.createElement('easy-wish-button');
      btn.setAttribute('product-key',    key);
      btn.setAttribute('product-id',     productId);
      btn.setAttribute('product-handle', handle);
      btn.setAttribute('product-title',  titleEl ? titleEl.textContent.trim() : '');
      btn.setAttribute('product-image',  image);
      btn.setAttribute('product-url',    link ? link.getAttribute('href') : (handle ? '/products/' + handle : ''));
      btn.classList.add('ew-card-' + EW.cardPosition);

      if (window.getComputedStyle(card).position === 'static') card.style.position = 'relative';
      card.appendChild(btn);
    });
  }

  function injectPDP() {
    if (!EW.pdpEnabled) return;
    if (document.querySelector('.ew-pdp-injected')) return;

    // Resolve product data — try multiple sources for 1.0 + 2.0 compatibility
    var productData = null;

    if (window.ShopifyAnalytics?.meta?.product) {
      productData = window.ShopifyAnalytics.meta.product;
    }
    if (!productData) {
      var jsonScript = document.querySelector('script[id^="ProductJSON-"]');
      if (jsonScript) {
        try { productData = JSON.parse(jsonScript.textContent); } catch (e) {}
      }
    }
    if (!productData && window.__st?.p) {
      productData = window.__st.p;
    }

    var btnSelectors = [
      '.product-form__buttons',         // Dawn
      '.product-form__submit',
      '.product-single__add-to-cart',   // Debut
      '[data-add-to-cart]',
      'form[action*="/cart/add"] .btn',
    ];

    var target = null;
    for (var j = 0; j < btnSelectors.length; j++) {
      target = document.querySelector(btnSelectors[j]);
      if (target) break;
    }
    if (!target) return;

    var btn = document.createElement('easy-wish-button');
    btn.setAttribute('pdp', 'true');
    btn.classList.add('ew-pdp-injected');

    if (productData) {
      var handle  = productData.handle || '';
      var id      = String(productData.id || '');
      var variant = productData.variants?.[0] || {};
      var featImg = productData.featured_image || productData.images?.[0] || '';
      if (featImg && typeof featImg === 'object') featImg = featImg.src || '';

      btn.setAttribute('product-key',           handle || id);
      btn.setAttribute('product-id',            id);
      btn.setAttribute('product-handle',        handle);
      btn.setAttribute('product-title',         productData.title || '');
      btn.setAttribute('product-url',           handle ? '/products/' + handle : '');
      btn.setAttribute('variant-id',            String(variant.id || ''));
      btn.setAttribute('variant-title',         variant.title || '');
      btn.setAttribute('product-price',         String(variant.price || 0));
      btn.setAttribute('product-compare-price', String(variant.compare_at_price || 0));
      btn.setAttribute('product-image',         String(featImg).split('?')[0]);
    } else {
      var form = document.querySelector('form[action*="/cart/add"]');
      var vid  = form?.querySelector('[name="id"]');
      if (vid) btn.setAttribute('variant-id', vid.value);
    }

    if (EW.pdpPosition === 'before') {
      target.parentNode.insertBefore(btn, target);
    } else {
      target.parentNode.insertBefore(btn, target.nextSibling);
    }
  }

  /* ================================================================
     SHARED WISHLIST IMPORT
     On page load, check for ?easywish=handle1,handle2 in the URL.
     Fetches each product via /products/{handle}.js, adds to storage,
     then opens the drawer. Cleans the param from the URL afterward.
  ================================================================ */
  async function importSharedWishlist() {
    var params = new URLSearchParams(window.location.search);
    var shared = params.get('easywish');
    if (!shared) return;

    // Remove the param from the URL before doing anything else
    params.delete('easywish');
    var newSearch = params.toString();
    history.replaceState(null, '',
      window.location.pathname + (newSearch ? '?' + newSearch : '') + window.location.hash
    );

    var handles = shared.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    if (!handles.length) return;

    await Promise.all(handles.map(async function (handle) {
      if (EasyWishStorage.has(handle)) return;
      try {
        var res = await fetch('/products/' + encodeURIComponent(handle) + '.js');
        if (!res.ok) return;
        var p = await res.json();
        var variant = (p.variants && p.variants[0]) || {};
        var featImg = p.featured_image || '';
        if (featImg && typeof featImg === 'object') featImg = featImg.src || '';
        EasyWishStorage.add({
          key:          p.handle || String(p.id),
          id:           String(p.id),
          handle:       p.handle || '',
          title:        p.title || '',
          image:        String(featImg).split('?')[0],
          price:        variant.price || 0,
          comparePrice: variant.compare_at_price || 0,
          url:          '/products/' + p.handle,
          variantId:    String(variant.id || ''),
          variantTitle: variant.title || '',
        });
      } catch (e) {}
    }));

    window.dispatchEvent(new CustomEvent('easywish:open'));
  }

  function init() {
    injectHeader();
    injectCards();
    injectPDP();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); importSharedWishlist(); });
  } else {
    init();
    importSharedWishlist();
  }

  // Re-inject after Shopify OS 2.0 section editor changes
  document.addEventListener('shopify:section:load', function () {
    setTimeout(init, 100);
  });

  // Re-inject on dynamically added cards (infinite scroll, quick-view, etc.)
  var _injectTimer;
  new MutationObserver(function (mutations) {
    var relevant = mutations.some(function (m) {
      return Array.from(m.addedNodes).some(function (n) {
        return n.nodeType === 1 && (
          n.matches('[data-product-card],[data-product-id],.product-card,.card-wrapper')
          || n.querySelector('[data-product-card],[data-product-id],.product-card,.card-wrapper')
        );
      });
    });
    if (relevant) {
      clearTimeout(_injectTimer);
      _injectTimer = setTimeout(injectCards, 150);
    }
  }).observe(document.body, { childList: true, subtree: true });

})();
```
4. Create asset `easy-wish.css` and add following code there:
```css
/* ===== EasyWish — Core Variables ===== */
:root {
  --ew-color-active:  #e53e3e;
  --ew-color-icon:    #121212;
  --ew-radius:        8px;
  --ew-drawer-width:  420px;
  --ew-z:             9999;
  --ew-speed:         0.28s;
}

/* ===== Wishlist Button (heart toggle) ===== */
easy-wish-button {
  display:  inline-flex;
  position: absolute;
  z-index:  10;
}
easy-wish-button.ew-card-top-left     { top: 10px; left:  10px; }
easy-wish-button.ew-card-top-right    { top: 10px; right: 10px; }
easy-wish-button.ew-card-bottom-left  { bottom: 10px; left:  10px; }
easy-wish-button.ew-card-bottom-right { bottom: 10px; right: 10px; }
easy-wish-button.ew-pdp-btn           { position: static; display: block; width: 100%; margin: 20px 0; }

.ew-btn {
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  width:           36px;
  height:          36px;
  padding:         0;
  border:          none;
  border-radius:   50%;
  background:      rgba(255,255,255,0.92);
  cursor:          pointer;
  transition:      transform var(--ew-speed), background var(--ew-speed);
  box-shadow:      0 1px 4px rgba(0,0,0,0.15);
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}
.ew-btn:hover   { transform: scale(1.12); }
.ew-btn:focus-visible { outline: 2px solid var(--ew-color-active); outline-offset: 2px; }

.ew-btn .ew-heart-icon {
  width:  18px;
  height: 18px;
  fill:   none;
  stroke: var(--ew-color-icon);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: fill var(--ew-speed), stroke var(--ew-speed);
}

/* Active / in-wishlist state */
easy-wish-button.ew-active .ew-btn,
.ew-btn.ew-active {
  background: rgba(255,255,255,1);
}
easy-wish-button.ew-active .ew-heart-icon,
.ew-btn.ew-active .ew-heart-icon {
  fill:   var(--ew-color-active);
  stroke: var(--ew-color-active);
}

/* PDP full-width button style */
.ew-pdp-btn .ew-btn {
  width:       100%;
  height:      auto;
  padding:     12px 20px;
  gap:         8px;
  font-size:   15px;
  font-family: inherit;
  color:       var(--ew-color-icon);
  background:  transparent;
  border:      1px solid currentColor;
  box-shadow:  none;
  border-radius: 0;
}
.ew-pdp-btn .ew-btn:hover { background: rgba(0,0,0,0.04); transform: none; }
.ew-pdp-btn .ew-heart-icon { width: 20px; height: 20px; }
.ew-pdp-btn-label { font-size: 14px; }

/* ===== Header Trigger ===== */
easy-wish-trigger {
  display:     inline-flex;
  align-items: center;
}
.ew-trigger-btn {
  position:        relative;
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  width:           44px;
  height:          44px;
  padding:         0;
  border:          none;
  background:      transparent;
  cursor:          pointer;
  color:           var(--ew-color-icon);
}
.ew-trigger-btn:focus-visible { outline: 2px solid var(--ew-color-active); outline-offset: 2px; }
.ew-trigger-btn .ew-heart-icon { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.8; }

/* ===== Count Badge ===== */
easy-wish-count { display: contents; }
.ew-count-badge {
  position:      absolute;
  top:           4px;
  right:         4px;
  min-width:     18px;
  height:        18px;
  padding:       0 5px;
  border-radius: 9px;
  background:    var(--ew-color-active);
  color:         #fff;
  font-size:     10px;
  font-weight:   700;
  line-height:   18px;
  text-align:    center;
  pointer-events: none;
}

/* ===== Overlay ===== */
.ew-overlay {
  position:   fixed;
  inset:      0;
  background: rgba(0,0,0,0.45);
  z-index:    calc(var(--ew-z) - 1);
  opacity:    0;
  pointer-events: none;
  transition: opacity var(--ew-speed);
}
easy-wish-drawer.ew-open .ew-overlay {
  opacity:        1;
  pointer-events: all;
  display: block;
}

/* ===== Drawer Panel ===== */
.ew-drawer {
  position:       fixed;
  top:            0;
  right:          0;
  bottom:         0;
  width:          min(var(--ew-drawer-width), 100vw);
  background:     #fff;
  z-index:        var(--ew-z);
  display:        flex;
  flex-direction: column;
  transform:      translateX(100%);
  transition:     transform var(--ew-speed) cubic-bezier(0.4,0,0.2,1);
  box-shadow:     -4px 0 24px rgba(0,0,0,0.12);
}
easy-wish-drawer.ew-open .ew-drawer { transform: translateX(0); }

.ew-drawer-header {
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  padding:         20px 24px;
  border-bottom:   1px solid #eee;
  flex-shrink:     0;
}
.ew-drawer-title {
  margin:      0;
  font-size:   18px;
  font-weight: 600;
  font-family: inherit;
}
.ew-drawer-header-actions {
  display:     flex;
  align-items: center;
  gap:         4px;
  flex-shrink: 0;
}

.ew-share-btn {
  display:         inline-flex;
  align-items:     center;
  gap:             6px;
  padding:         6px 12px;
  border:          1px solid #ddd;
  border-radius:   var(--ew-radius);
  background:      transparent;
  color:           inherit;
  font-size:       13px;
  font-family:     inherit;
  font-weight:     500;
  cursor:          pointer;
  transition:      background var(--ew-speed), border-color var(--ew-speed), color var(--ew-speed);
  white-space:     nowrap;
}
.ew-share-btn svg      { width: 15px; height: 15px; flex-shrink: 0; }
.ew-share-btn:hover    { background: #f5f5f5; border-color: #bbb; }
.ew-share-btn:focus-visible { outline: 2px solid var(--ew-color-active); outline-offset: 2px; }
.ew-share-btn.ew-share-copied {
  background:   #f0fdf4;
  border-color: #86efac;
  color:        #16a34a;
}

.ew-close-btn {
  display:         inline-flex;
  align-items:     center;
  justify-content: center;
  width:           36px;
  height:          36px;
  border:          none;
  background:      transparent;
  cursor:          pointer;
  border-radius:   50%;
  color:           inherit;
  transition:      background var(--ew-speed);
}
.ew-close-btn:hover { background: #f0f0f0; }
.ew-close-btn svg { width: 18px; height: 18px; }

.ew-drawer-body {
  flex:       1;
  overflow-y: auto;
  padding:    20px 24px;
}

.ew-drawer-footer {
  display:         flex;
  align-items:     center;
  justify-content: center;
  padding:         16px 24px;
  border-top:      1px solid #eee;
  flex-shrink:     0;
}
.ew-drawer-footer .ew-share-btn {
  width: 100%;
  justify-content: center;
}

/* ===== Drawer States ===== */
.ew-empty-state {
  display:         flex;
  flex-direction:  column;
  align-items:     center;
  justify-content: center;
  height:          100%;
  gap:             12px;
  color:           #888;
  text-align:      center;
}
.ew-empty-state svg { width: 48px; height: 48px; opacity: 0.3; }
.ew-empty-state p   { margin: 0; font-size: 15px; }

.ew-loading {
  display:     flex;
  align-items: center;
  gap:         10px;
  color:       #888;
  font-size:   14px;
  padding:     20px 0;
}
.ew-spinner {
  width:  20px;
  height: 20px;
  border: 2px solid #ddd;
  border-top-color: var(--ew-color-active);
  border-radius: 50%;
  animation: ew-spin 0.7s linear infinite;
}
@keyframes ew-spin { to { transform: rotate(360deg); } }

/* ===== Wishlist Item Cards (drawer) ===== */
.ew-items-list { display: flex; flex-direction: column; gap: 16px; }

.ew-item {
  display:               grid;
  grid-template-columns: 80px 1fr;
  gap:                   14px;
  padding-bottom:        16px;
  border-bottom:         1px solid #f0f0f0;
  position:              relative;
}
.ew-item:last-child { border-bottom: none; }

.ew-item-image-wrap {
  width:         80px;
  height:        80px;
  border-radius: calc(var(--ew-radius) - 2px);
  overflow:      hidden;
  background:    #f5f5f5;
  flex-shrink:   0;
}
.ew-item-image-wrap img {
  width:      100%;
  height:     100%;
  object-fit: cover;
  display:    block;
}
.ew-item-image-placeholder {
  width:           100%;
  height:          100%;
  display:         flex;
  align-items:     center;
  justify-content: center;
  color:           #ccc;
}

.ew-item-body      { display: flex; flex-direction: column; gap: 4px; }
.ew-item-title     { font-size: 14px; font-weight: 600; margin: 0; line-height: 1.3; }
.ew-item-title a   { color: inherit; text-decoration: none; }
.ew-item-title a:hover { text-decoration: underline; }
.ew-item-variant   { font-size: 13px; color: #888; margin: 0; }

.ew-item-price-row    { display: flex; align-items: center; gap: 8px; margin-top: 2px; }
.ew-item-price        { font-size: 14px; font-weight: 600; }
.ew-item-compare-price { font-size: 13px; color: #999; text-decoration: line-through; }
.ew-item-badge-sale {
  font-size:     11px;
  padding:       2px 6px;
  border-radius: 3px;
  background:    var(--ew-color-active);
  color:         #fff;
  font-weight:   700;
}

.ew-item-actions { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
.ew-atc-btn {
  flex:        1;
  min-width:   0;
  padding:     8px 12px;
  border:      none;
  border-radius: var(--ew-radius);
  background:  #121212;
  color:       #fff;
  font-size:   13px;
  font-family: inherit;
  font-weight: 600;
  cursor:      pointer;
  transition:  background var(--ew-speed), opacity var(--ew-speed);
  white-space: nowrap;
}
.ew-atc-btn:hover:not(:disabled) { background: #333; }
.ew-atc-btn:disabled              { opacity: 0.55; cursor: default; }
.ew-atc-btn.ew-atc-success        { background: #2d8a4e; }

.ew-view-btn {
  padding:         8px 12px;
  border:          1px solid #ddd;
  border-radius:   var(--ew-radius);
  background:      transparent;
  color:           inherit;
  font-size:       13px;
  font-family:     inherit;
  cursor:          pointer;
  text-decoration: none;
  display:         inline-flex;
  align-items:     center;
  white-space:     nowrap;
  transition:      background var(--ew-speed);
}
.ew-view-btn:hover { background: #f5f5f5; }

.ew-remove-item-btn {
  position:        absolute;
  top:             0;
  right:           0;
  width:           28px;
  height:          28px;
  border:          none;
  background:      transparent;
  cursor:          pointer;
  color:           #aaa;
  display:         flex;
  align-items:     center;
  justify-content: center;
  border-radius:   50%;
  transition:      color var(--ew-speed), background var(--ew-speed);
  padding:         0;
}
.ew-remove-item-btn svg { width: 14px; height: 14px; }
.ew-remove-item-btn:hover { color: var(--ew-color-active); background: #fef2f2; }

/* ===== Body lock when drawer open ===== */
body.ew-locked { overflow: hidden; }

/* ===== Responsive ===== */
@media (max-width: 500px) {
  .ew-drawer { width: 100vw; }
}
```
5. Then go to `en.default.json` in locales folder and right after the initail opening curly bracket, att the following translations, you can update these translations to modify the content of the wishlist title and share button.
```json
"wishlist": {
  "title": "Your wishlist",
  "close": "Close Wishlist",
  "view_product": "View product",
  "share": "Share your wishlist with your loved one"
},
```
6. Then go to `theme.liquid` in layout folder and search for closing body tag `</body>` and add this snippet there:
```liquid
{% render 'easy-wish' %}
```
