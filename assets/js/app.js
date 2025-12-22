(function(){
  const cfg = window.APP_CONFIG || {};
  const PLAN = () => (window.CCS_AUTH?.getPlan?.() || "free");

  const BANK = {
    platforms: {
      tiktok: ["TikTok", "Link in bio", "Link in comments", "Follow for part 2"],
      instagram: ["Instagram", "Link in bio", "DM me “INFO”", "Save this post"],
      youtube: ["YouTube Shorts", "Link in description", "Comment “YES”", "Subscribe for more"],
      pinterest: ["Pinterest", "Link in bio", "Tap the pin", "Save to your board"]
    },
    tones: {
      bold: { emoji: "💥", vibes: ["bold", "confident", "high-energy"] },
      luxury: { emoji: "✨", vibes: ["luxury", "polished", "premium"] },
      friendly: { emoji: "😊", vibes: ["friendly", "helpful", "warm"] },
      funny: { emoji: "😂", vibes: ["funny", "playful", "relatable"] }
    },
    hooks: [
      "{emoji} Stop scrolling — if you’re trying to {goal}, this is your shortcut.",
      "{emoji} Real talk: the fastest way to {goal} is to fix THIS one thing.",
      "{emoji} If you have {thing}, you can start {goal} today.",
      "{emoji} I wish someone told me this before I tried to {goal}…",
      "{emoji} Here’s the {number}-step cheat code to {goal} (no fluff).",
      "{emoji} One tiny change that makes {offer} convert like crazy…",
      "{emoji} Don’t buy {thing} until you hear this.",
      "{emoji} The {toneVibe} way to {goal} (even if you’re brand new)."
    ],
    captions: [
      "{emoji} {hook}\n\n✅ What you get: {benefit}\n✅ Best for: {audience}\n\n{cta} {ctaLine}\n\n#{tags}",
      "{emoji} {hook}\n\nHere’s the plan:\n1) {step1}\n2) {step2}\n3) {step3}\n\n{ctaLine}\n\n#{tags}",
      "{emoji} {hook}\n\nIf you’re {pain}, this is for you.\n\n{benefit}\n\n{ctaLine}\n\n#{tags}",
      "{emoji} {hook}\n\nQuick reminder: consistency beats perfection.\n\n{cta} {ctaLine}\n\n#{tags}"
    ],
    scripts: [
      "HOOK: {hook}\n\nVALUE: Show 1 example using {offer}.\n- Before: {before}\n- After: {after}\n\nCTA: {ctaLine}",
      "HOOK: {hook}\n\nVALUE:\n- Tip 1: {tip1}\n- Tip 2: {tip2}\n- Tip 3: {tip3}\n\nCTA: {ctaLine}",
      "HOOK: {hook}\n\nSTORY:\n“I tried {pain}, until I switched to {offer}.”\n\nRESULT: {benefit}\n\nCTA: {ctaLine}"
    ],
    replies: [
      "{emoji} Yes! I can send details — what platform are you posting on?",
      "{emoji} Great question. What’s your niche? I’ll tailor a quick example.",
      "{emoji} 100% — the key is to {miniTip}. Want a sample caption?",
      "{emoji} I got you. Use this: “{miniCaption}”"
    ],
    baseTags: [
      "contentcreator","socialmediatips","digitalproducts","affiliatemarketing",
      "sidehustle","makemoneyonline","branding","smallbusiness","entrepreneur",
      "tiktokgrowth","instagramgrowth","youtubeshorts","pinterestmarketing"
    ]
  };

  function $(sel){ return document.querySelector(sel); }
  function val(id){ return ($(id)?.value || "").trim(); }

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function uniq(arr){ return [...new Set(arr)]; }
  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }
  function randInt(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

  function wordsFrom(text){
    return (text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(w => w && w.length > 2)
      .slice(0, 8);
  }

  function buildTags(product, niche){
    const w = uniq([ ...wordsFrom(product), ...wordsFrom(niche) ])
      .map(s => s.replace(/\s+/g,""))
      .filter(s => s.length >= 3)
      .slice(0, 10);
    const tags = uniq([ ...w, ...BANK.baseTags ]).slice(0, 25);
    return tags.join(" #");
  }

  function fill(tpl, ctx){
    return tpl.replace(/\{(\w+)\}/g, (_,k)=> (ctx[k] ?? ""));
  }

  function makeCtx(){
    const platformKey = val("#platform") || "tiktok";
    const toneKey = val("#tone") || "bold";
    const goal = val("#goal") || "make sales";
    const product = val("#product") || "your offer";
    const niche = val("#niche") || "your niche";
    const audience = val("#audience") || "busy creators";
    const cta = val("#cta") || "Link in bio";
    const offer = val("#offer") || product;

    const tone = BANK.tones[toneKey] || BANK.tones.bold;
    const emoji = tone.emoji;
    const toneVibe = pick(tone.vibes);

    const platformCTA = pick(BANK.platforms[platformKey] || BANK.platforms.tiktok);

    const ctaLine = (cta || platformCTA).trim();

    const benefit = val("#benefit") || "captions, hooks, and hashtags in seconds";
    const pain = val("#pain") || "stuck staring at a blank screen";
    const thing = val("#thing") || "a phone + 10 minutes";
    const number = randInt(3,7);

    const step1 = val("#step1") || "Pick a hook that stops the scroll";
    const step2 = val("#step2") || "Deliver one clear promise";
    const step3 = val("#step3") || "End with one simple CTA";

    const before = val("#before") || "random posting with no plan";
    const after = val("#after") || "clean captions that drive clicks";

    const tip1 = val("#tip1") || "Lead with one bold promise";
    const tip2 = val("#tip2") || "Use short lines + spacing";
    const tip3 = val("#tip3") || "Repeat your CTA twice";

    const miniTip = pick(["use a hook + CTA combo", "add 3 niche hashtags", "keep it 2–3 lines"]);
    const miniCaption = `Stop scrolling — ${goal} starts with one post. ${ctaLine}`;

    const tags = buildTags(product, niche);

    const hook = fill(pick(BANK.hooks), {emoji, goal, thing, number, offer, toneVibe});

    return {
      platformKey, toneKey, goal, product, niche, audience, cta, offer,
      emoji, toneVibe, ctaLine, benefit, pain, thing, number,
      step1, step2, step3, before, after, tip1, tip2, tip3,
      miniTip, miniCaption, tags, hook
    };
  }

  function generateAll(){
    const plan = PLAN();
    const isPro = (plan === "pro" || plan === "lifetime" || plan === "starter");

    const ctx = makeCtx();

    const hookCount = isPro ? 10 : 3;
    const capCount  = isPro ? 8 : 3;
    const scriptCount = isPro ? 3 : 1;
    const replyCount = isPro ? 6 : 2;
    const tagCount = isPro ? 25 : 12;

    const hooks = [];
    const captions = [];
    const scripts = [];
    const replies = [];

    for (let i=0;i<hookCount;i++){
      hooks.push(fill(pick(BANK.hooks), ctx));
    }
    for (let i=0;i<capCount;i++){
      captions.push(fill(pick(BANK.captions), {...ctx, hook: fill(pick(BANK.hooks), ctx) }));
    }
    for (let i=0;i<scriptCount;i++){
      scripts.push(fill(pick(BANK.scripts), {...ctx, hook: fill(pick(BANK.hooks), ctx) }));
    }
    for (let i=0;i<replyCount;i++){
      replies.push(fill(pick(BANK.replies), ctx));
    }

    // Tags: trim to tagCount
    const tagList = ("#" + ctx.tags).split(/\s+#/).map(s => s.replace(/^#/, "").trim()).filter(Boolean);
    const finalTags = tagList.slice(0, clamp(tagCount, 8, 30)).join(" #");

    return { ctx, hooks, captions, scripts, replies, tags: "#"+finalTags, isPro, plan };
  }

  function fmtList(arr){
    return arr.map((x,i)=> `${i+1}. ${x}`).join("\n\n");
  }

  function showBlock(id, title, meta, text){
    const el = document.querySelector(id);
    if (!el) return;
    el.querySelector("[data-title]").textContent = title;
    el.querySelector("[data-meta]").textContent = meta;
    el.querySelector("pre").textContent = text;
  }

  function copyText(text){
    navigator.clipboard.writeText(text).then(()=>{
      toast("Copied!");
    }).catch(()=>{
      toast("Copy blocked by browser.");
    });
  }

  function toast(msg){
    const t = document.querySelector(".toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(()=>t.classList.remove("show"), 1600);
  }

  function toCSV(rows){
    const esc = (s)=> `"${String(s).replace(/"/g,'""')}"`;
    const lines = rows.map(r => r.map(esc).join(","));
    return lines.join("\n");
  }

  function download(filename, text){
    const blob = new Blob([text], {type:"text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function bindButtons(state){
    const blocks = [
      { id:"#bHooks", label:"Hooks", value: fmtList(state.hooks) },
      { id:"#bCaptions", label:"Captions", value: fmtList(state.captions) },
      { id:"#bScripts", label:"Scripts", value: fmtList(state.scripts) },
      { id:"#bReplies", label:"Comment Replies", value: fmtList(state.replies) },
      { id:"#bTags", label:"Hashtags", value: state.tags }
    ];

    blocks.forEach(b=>{
      const root = document.querySelector(b.id);
      if (!root) return;
      root.querySelector("[data-copy]").onclick = ()=> copyText(b.value);
    });

    const exportBtn = document.querySelector("[data-export]");
    const exportCsvBtn = document.querySelector("[data-export-csv]");
    const plan = state.plan;

    const buyStarter = document.querySelector("[data-buy-starter]");
    const buyPro = document.querySelector("[data-buy-pro]");
    const buyLife = document.querySelector("[data-buy-life]");

    function setHref(el, href){
      if (!el) return;
      if (href && href.startsWith("https://")) el.setAttribute("href", href);
      else el.setAttribute("href", "index.html#pricing");
    }

    setHref(buyStarter, cfg.stripeLinks?.starter);
    setHref(buyPro, cfg.stripeLinks?.pro);
    setHref(buyLife, cfg.stripeLinks?.lifetime);

    if (exportBtn){
      exportBtn.onclick = ()=>{
        const txt = [
          `PLAN: ${plan}`,
          `PRODUCT: ${state.ctx.product}`,
          "",
          "HOOKS",
          fmtList(state.hooks),
          "",
          "CAPTIONS",
          fmtList(state.captions),
          "",
          "SCRIPTS",
          fmtList(state.scripts),
          "",
          "REPLIES",
          fmtList(state.replies),
          "",
          "HASHTAGS",
          state.tags
        ].join("\n\n");
        download("captioncash-pack.txt", txt);
        toast("Downloaded!");
      };
    }

    if (exportCsvBtn){
      exportCsvBtn.onclick = ()=>{
        if (!state.isPro){
          toast("CSV export is Pro.");
          return;
        }
        const rows = [
          ["Type","Text"],
          ...state.hooks.map(x=>["Hook", x]),
          ...state.captions.map(x=>["Caption", x]),
          ...state.scripts.map(x=>["Script", x]),
          ...state.replies.map(x=>["Reply", x]),
          ["Hashtags", state.tags]
        ];
        download("captioncash-pack.csv", toCSV(rows));
        toast("CSV exported!");
      };
    }
  }

  function render(state){
    showBlock("#bHooks", "Hooks", `${state.hooks.length} ideas`, fmtList(state.hooks));
    showBlock("#bCaptions", "Captions", `${state.captions.length} variations`, fmtList(state.captions));
    showBlock("#bScripts", "Short Scripts", `${state.scripts.length} outlines`, fmtList(state.scripts));
    showBlock("#bReplies", "Comment Replies", `${state.replies.length} responses`, fmtList(state.replies));
    showBlock("#bTags", "Hashtags", `Up to ${state.tags.split("#").length-1} tags`, state.tags);

    const planPill = document.querySelector("[data-plan-pill]");
    if (planPill){
      const p = state.plan;
      planPill.textContent = p === "free" ? "Free Demo" : (p === "lifetime" ? "Lifetime" : "Pro");
    }

    const proOnly = document.querySelectorAll("[data-pro-only]");
    proOnly.forEach(el=>{
      el.style.display = state.isPro ? "" : "none";
    });

    const proLock = document.querySelectorAll("[data-pro-lock]");
    proLock.forEach(el=>{
      el.style.display = state.isPro ? "none" : "";
    });

    bindButtons(state);
  }

  function bindGenerate(){
    const genBtn = document.querySelector("[data-generate]");
    const resetBtn = document.querySelector("[data-reset]");
    if (genBtn) genBtn.addEventListener("click", ()=>{
      const state = generateAll();
      render(state);
      toast("Generated!");
    });

    if (resetBtn) resetBtn.addEventListener("click", ()=>{
      document.querySelectorAll("input, textarea").forEach(el=> el.value = "");
      document.querySelectorAll("select").forEach(el=> el.selectedIndex = 0);
      const state = generateAll();
      render(state);
      toast("Reset.");
    });
  }

  function init(){
    const brand = cfg.brandName || "CaptionCash Studio";
    document.querySelectorAll("[data-brand]").forEach(el=> el.textContent = brand);
    // initial state
    const state = generateAll();
    render(state);
    bindGenerate();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
