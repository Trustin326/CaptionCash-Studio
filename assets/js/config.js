/**
 * CaptionCash Studio — Config
 * Replace the Stripe links below with YOUR Stripe Payment Links (Checkout URLs).
 * You can also set your support email and optional access keys.
 */
window.APP_CONFIG = {
  brandName: "CaptionCash Studio",
  supportEmail: "lovelacedpr@gmail.com",

  // 1) Create Stripe Payment Links for each plan
  // 2) Set success URL to: https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/success.html
  // 3) Set cancel URL to:   https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO/cancel.html
  // 4) Paste the Payment Link URLs here:
  stripeLinks: {
    starter: "https://buy.stripe.com/3cIbJ179E2gxaMTcAn4Ja05",
    pro: "https://buy.stripe.com/28EcN5ctY2gx3krgQD4Ja06",
    lifetime: "https://buy.stripe.com/eVq28r3Xs8EV8EL7g34Ja04"
  },

  // Optional: manual access keys (simple client-side gating, not "secure" protection)
  // Tip: after a purchase, you can email the customer one of these keys.
  unlockKeys: {
    starter: ["STARTER-CCS-2025-AAAA"],
    pro: ["PRO-CCS-2025-BBBB"],
    lifetime: ["LIFE-CCS-2025-CCCC"]
  }
};
