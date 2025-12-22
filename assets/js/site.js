(function(){
  const cfg = window.APP_CONFIG || {};
  function setHref(sel, href){
    const el = document.querySelector(sel);
    if (!el) return;
    if (href && href.startsWith("https://")) el.setAttribute("href", href);
  }
  document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelectorAll("[data-brand]").forEach(el=> el.textContent = cfg.brandName || "CaptionCash Studio");
    setHref("[data-stripe-starter]", cfg.stripeLinks?.starter);
    setHref("[data-stripe-pro]", cfg.stripeLinks?.pro);
    setHref("[data-stripe-life]", cfg.stripeLinks?.lifetime);
    const email = cfg.supportEmail || "support@yourdomain.com";
    document.querySelectorAll("[data-support]").forEach(el=> el.textContent = email);
    document.querySelectorAll("[data-support-href]").forEach(el=> el.setAttribute("href", `mailto:${email}`));
  });
})();
