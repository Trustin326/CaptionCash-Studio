/**
 * CaptionCash Studio — Config
 * Replace the Stripe links below with YOUR Stripe Payment Links (Checkout URLs).
 * You can also set your support email and optional access keys.
 */
window.APP_CONFIG = {
  brandName: "CaptionCash Studio",
  supportEmail: "support@yourdomain.com",

  // 1) Create Stripe Payment Links for each plan
  // 2) Set success URL to: https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/success.html
  // 3) Set cancel URL to:   https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/cancel.html
  // 4) Paste the Payment Link URLs here:
  stripeLinks: {
    starter: "https://buy.stripe.com/REPLACE_STARTER_LINK",
    pro: "https://buy.stripe.com/REPLACE_PRO_LINK",
    lifetime: "https://buy.stripe.com/REPLACE_LIFETIME_LINK"
  },

  // Optional: manual access keys (simple client-side gating, not "secure" protection)
  // Tip: after a purchase, you can email the customer one of these keys.
  unlockKeys: {
    starter: ["STARTER-CCS-2025-AAAA"],
    pro: ["PRO-CCS-2025-BBBB"],
    lifetime: ["LIFE-CCS-2025-CCCC"]
  }
};
