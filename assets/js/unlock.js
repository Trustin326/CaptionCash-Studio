/**
 * Lightweight access overlay.
 * This is NOT secure paywalling (static sites can't enforce security without a backend),
 * but it works well for "sell today" setups where you deliver a key after purchase.
 */
(function(){
  const cfg = window.APP_CONFIG || {};
  const STORAGE_KEY = "ccs_plan";

  function getPlan(){
    return localStorage.getItem(STORAGE_KEY) || "free";
  }
  function setPlan(plan){
    localStorage.setItem(STORAGE_KEY, plan);
    document.documentElement.dataset.plan = plan;
  }

  function normalizeKey(k){
    return (k || "").trim().toUpperCase();
  }

  function planFromKey(key){
    const keys = (cfg.unlockKeys || {});
    if ((keys.lifetime || []).map(normalizeKey).includes(key)) return "lifetime";
    if ((keys.pro || []).map(normalizeKey).includes(key)) return "pro";
    if ((keys.starter || []).map(normalizeKey).includes(key)) return "starter";
    return null;
  }

  function showToast(msg){
    const t = document.querySelector(".toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(()=>t.classList.remove("show"), 1600);
  }

  function bindOverlay(){
    const overlay = document.querySelector("#lockOverlay");
    if (!overlay) return;

    const openBtn = document.querySelector("[data-open-lock]");
    const closeBtn = overlay.querySelector("[data-close-lock]");
    const keyInput = overlay.querySelector("#accessKey");
    const unlockBtn = overlay.querySelector("[data-unlock]");
    const planLabel = overlay.querySelector("#currentPlan");

    function open(){
      overlay.classList.add("show");
      if (planLabel) planLabel.textContent = getPlan();
      if (keyInput) keyInput.focus();
    }
    function close(){ overlay.classList.remove("show"); }

    if (openBtn) openBtn.addEventListener("click", (e)=>{ e.preventDefault(); open(); });
    if (closeBtn) closeBtn.addEventListener("click", (e)=>{ e.preventDefault(); close(); });

    if (unlockBtn){
      unlockBtn.addEventListener("click", ()=>{
        const key = normalizeKey(keyInput.value);
        const p = planFromKey(key);
        if (!p){
          showToast("Key not recognized.");
          return;
        }
        setPlan(p === "starter" ? "pro" : p); // treat starter as pro features in-app
        showToast("Unlocked! Reloading…");
        setTimeout(()=>location.reload(), 650);
      });
    }
  }

  window.CCS_AUTH = { getPlan, setPlan };
  document.addEventListener("DOMContentLoaded", ()=>{
    setPlan(getPlan());
    bindOverlay();
  });
})();

