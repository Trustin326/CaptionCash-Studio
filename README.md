# CaptionCash Studio

A GitHub‑Pages + Stripe‑ready micro‑SaaS you can start selling today.

## What this is
- **Landing page:** `index.html`
- **Web app:** `app.html` (caption pack generator)
- **Stripe redirects:** `success.html` + `cancel.html`
- **Config:** `assets/js/config.js` (paste your Stripe Payment Links + optional access keys)

> Note: This is a static site (no backend). The “unlock key” is client‑side gating, which is **not secure paywalling**.
> It works well for “sell today” setups where you deliver a key after purchase. For strict subscription enforcement later,
> add a small backend + Stripe webhooks.

---

## Step‑by‑step: Upload to GitHub Pages (5 minutes)

1. Create a new GitHub repo (example: `captioncash-studio`)
2. Upload **all files** from this ZIP to the repo root (keep the folder structure)
3. In GitHub, go to:
   - **Settings → Pages**
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` and **/(root)**
4. Save — your site will be at:
   - `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/`

---

## Add your Stripe links

1. In Stripe, create **Payment Links** for your plans (Starter / Pro / Lifetime).
2. For each Payment Link, set:
   - **Success URL:** `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/success.html`
   - **Cancel URL:**  `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/cancel.html`
3. Open `assets/js/config.js` and replace:

```js
stripeLinks: {
  starter: "https://buy.stripe.com/REPLACE_STARTER_LINK",
  pro: "https://buy.stripe.com/REPLACE_PRO_LINK",
  lifetime: "https://buy.stripe.com/REPLACE_LIFETIME_LINK"
}
```

---

## Optional: Add access keys (manual delivery)

In `assets/js/config.js`, put keys like:

```js
unlockKeys: {
  pro: ["PRO-CCS-2025-ABCD"],
  lifetime: ["LIFE-CCS-2025-XYZ1"]
}
```

After purchase, email the customer a key. They paste it on:
- `success.html` or via **Unlock** button in the app.

---

## Customize branding
- Change the name in `assets/js/config.js` → `brandName`
- Update pricing text in `index.html`
- Replace images in `assets/img/` (SVGs are included and lightweight)

---

## Local preview
Just open `index.html` in your browser.

---

© 2025 CaptionCash Studio
