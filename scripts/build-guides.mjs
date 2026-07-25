// Generates all cluster guide pages (DE + EN) from content/guides.mjs.
// Run: node scripts/build-guides.mjs
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { GUIDES, PILLAR, APP } from "../content/guides.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://pricecalcpro.de";

const slugOf = (key, lang) => GUIDES.find((x) => x.key === key)[lang].slug;
const labelOf = (key, lang) => GUIDES.find((x) => x.key === key)[lang].label;

const UI = {
  de: { skip: "Zum Inhalt springen", home: "index.html", crumb: "Start", back: "← Zur Startseite", nav: "Hauptnavigation", more: "Alle Ratgeber", ctaBtn: "PriceCalc Pro ansehen →", pillarNote: "Grundlagen" },
  en: { skip: "Skip to content", home: "index.html", crumb: "Home", back: "← Home", nav: "Main navigation", more: "All guides", ctaBtn: "See PriceCalc Pro →", pillarNote: "Basics" },
};

const EMOJI = { faktor: "🔢", aufschlag: "⚖️", mwst: "🧾", runden: "🎯", skonto: "🏷️", einkaufspreise: "💶", excel: "📊", anpassen: "🔄", backup: "💾" };
const PILLAR_META = {
  de: { title: "Handelskalkulation: vom Einkaufs- zum Verkaufspreis", teaser: "Die 5-stufige Kalkulation Schritt für Schritt – die Grundlage für alle weiteren Ratgeber." },
  en: { title: "Retail pricing: from cost to sell price", teaser: "The 5-step calculation step by step — the basis for all other guides." },
};
const HUB = {
  de: { slug: "ratgeber.html", title: "Ratgeber: Preiskalkulation für Shopify", desc: "Alle Ratgeber rund um Preiskalkulation im Onlinehandel: Handelskalkulation, Kalkulationsfaktor, Marge, Mehrwertsteuer, Rundung, Skonto, Einkaufspreise und mehr.", eyebrow: "Ratgeber", intro: "Praxiswissen zur Preiskalkulation im Onlinehandel – von den Grundlagen bis zu Shopify-spezifischen Themen. Jeder Ratgeber ist in wenigen Minuten gelesen.", more: "Lesen →", ctaTitle: "Sauber kalkulieren – automatisch in Shopify", ctaText: "PriceCalc Pro setzt genau dieses Wissen um: Einkaufspreise verwalten, Verkaufspreise berechnen und direkt in Shopify speichern – mit Datensicherung.", ctaBtn: "PriceCalc Pro ansehen →", crumb: "Start" },
  en: { slug: "guides.html", title: "Guides: pricing for Shopify", desc: "All guides on pricing for e-commerce: retail calculation, calculation factor, margin, VAT, rounding, cash discount, cost prices and more.", eyebrow: "Guides", intro: "Practical knowledge on pricing for e-commerce — from the basics to Shopify-specific topics. Each guide is a few minutes' read.", more: "Read →", ctaTitle: "Price cleanly — automatically in Shopify", ctaText: "PriceCalc Pro puts this knowledge into practice: manage cost prices, calculate sell prices and save them straight to Shopify — with data backup.", ctaBtn: "See PriceCalc Pro →", crumb: "Home" },
};

function hub(lang) {
  const h = HUB[lang];
  const base = lang === "de" ? "" : "../";
  const canonical = `${ORIGIN}/${lang === "de" ? h.slug : "en/" + h.slug}`;
  const homeUrl = `${ORIGIN}/${lang === "de" ? "" : "en/"}`;
  const cards = [{ key: "__pillar__", slug: PILLAR[lang].slug, title: PILLAR_META[lang].title, teaser: PILLAR_META[lang].teaser, emoji: "🧮", pillar: true }]
    .concat(GUIDES.map((g) => ({ key: g.key, slug: g[lang].slug, title: g[lang].label, teaser: g[lang].desc, emoji: EMOJI[g.key] || "📄", pillar: false })));

  const cardHtml = cards.map((c) => `          <a class="guide-hub-card${c.pillar ? " pillar" : ""}" href="${c.slug}">
            <div class="ghc-icon">${c.emoji}</div>
            <h3>${c.title}</h3>
            <p>${c.teaser}</p>
            <span class="ghc-more">${h.more}</span>
          </a>`).join("\n");

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: h.title, description: h.desc, inLanguage: lang, url: canonical },
      { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: h.crumb, item: homeUrl }, { "@type": "ListItem", position: 2, name: h.eyebrow, item: canonical } ] },
      { "@type": "ItemList", itemListElement: cards.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${ORIGIN}/${lang === "de" ? "" : "en/"}${c.slug}`, name: c.title })) },
    ],
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${h.title} | PriceCalc Pro</title>
  <meta name="description" content="${h.desc}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="de" href="${ORIGIN}/${HUB.de.slug}" />
  <link rel="alternate" hreflang="en" href="${ORIGIN}/en/${HUB.en.slug}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0E1B2E" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${h.title}" />
  <meta property="og:description" content="${h.desc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ORIGIN}/assets/img/${lang === "de" ? "og.png" : "og-en.png"}" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="stylesheet" href="${base}assets/css/style.css" />
  <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
  </script>
</head>
<body>
  <a class="skip-link" href="#main">${UI[lang].skip}</a>
  <header class="site-header">
    <div class="wrap">
      <nav class="nav" aria-label="${UI[lang].nav}">
        <a class="brand" href="${UI[lang].home}">
          <img src="${base}assets/img/logo.png" alt="" width="34" height="34" />
          <span>PriceCalc <span class="pro">Pro</span></span>
        </a>
        <ul class="nav-links" id="nav-links" style="display:flex">
          <li class="lang-switch">${lang === "de" ? `<span class="active" aria-current="true">DE</span><a href="en/${HUB.en.slug}" hreflang="en">EN</a>` : `<a href="../${HUB.de.slug}" hreflang="de">DE</a><span class="active" aria-current="true">EN</span>`}</li>
          <li class="nav-cta"><a class="btn btn-ghost" href="${UI[lang].home}">${UI[lang].back}</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main">
    <section class="section" style="background:var(--paper)">
      <div class="wrap">
        <p class="crumb" style="margin-bottom:14px"><a href="${UI[lang].home}">${h.crumb}</a> › ${h.eyebrow}</p>
        <div class="section-head">
          <p class="eyebrow">${h.eyebrow}</p>
          <h1 style="font-size:clamp(1.9rem,4vw,2.7rem)">${h.title}</h1>
          <p>${h.intro}</p>
        </div>
        <div class="guide-hub-grid">
${cardHtml}
        </div>
        <div class="guide-cta" style="margin-top:36px">
          <h3>${h.ctaTitle}</h3>
          <p>${h.ctaText}</p>
          <a class="btn btn-green" href="${UI[lang].home}">${h.ctaBtn}</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-bottom" style="border:none;padding-top:0">
        <span>© <span data-year>2026</span> JRMedia · Janine Fabienne Eicker</span>
        <span><a href="${UI[lang].home}">${lang === "de" ? "Startseite" : "Home"}</a> · <a href="${PILLAR[lang].slug}">${PILLAR[lang].label}</a> · <a href="${lang === "de" ? "impressum.html" : "impressum.html"}">${lang === "de" ? "Impressum" : "Legal notice"}</a></span>
      </div>
    </div>
  </footer>
  <script src="${base}assets/js/main.js" defer></script>
</body>
</html>
`;
}

function page(guide, lang) {
  const g = guide[lang];
  const u = UI[lang];
  const base = lang === "de" ? "" : "../";
  const de = guide.de, en = guide.en;
  const canonical = `${ORIGIN}/${lang === "de" ? de.slug : "en/" + en.slug}`;
  const altDe = `${ORIGIN}/${de.slug}`;
  const altEn = `${ORIGIN}/en/${en.slug}`;
  const homeUrl = `${ORIGIN}/${lang === "de" ? "" : "en/"}`;

  // figure
  let figure = "";
  let ogImage = `${ORIGIN}/assets/img/${lang === "de" ? "og.png" : "og-en.png"}`;
  if (guide.graphic) {
    const src = `${base}assets/img/${guide.graphic}${lang}.png`;
    ogImage = `${ORIGIN}/assets/img/${guide.graphic}${lang}.png`;
    figure = `\n          <figure class="guide-fig"><img src="${src}" alt="${g.galt}" loading="lazy" /></figure>`;
  } else if (guide.screenshot) {
    const src = `${base}${guide.screenshot}`;
    figure = `\n          <figure class="guide-fig"><img src="${src}" alt="${g.galt}" loading="lazy" /></figure>`;
  }

  const langSwitch =
    lang === "de"
      ? `<span class="active" aria-current="true">DE</span><a href="en/${en.slug}" hreflang="en">EN</a>`
      : `<a href="../${de.slug}" hreflang="de">DE</a><span class="active" aria-current="true">EN</span>`;

  const sections = g.sections.map((s) => `          <h2>${s.h}</h2>\n${s.html.split("\n").map((l) => "          " + l).join("\n")}`).join("\n");

  const faqHtml = g.faq.map(([q, a]) => `          <div class="m-faq"><div class="q">${q}</div><div class="a">${a}</div></div>`).join("\n");

  // related: full list of all guides, current one highlighted (easy click-through)
  const ALL = [{ key: "__pillar__", slug: PILLAR[lang].slug, label: PILLAR[lang].label }]
    .concat(GUIDES.map((x) => ({ key: x.key, slug: x[lang].slug, label: x[lang].label })));
  const relItems = ALL.map((it) =>
    it.key === guide.key
      ? `<li><span class="active" aria-current="page">${it.label}</span></li>`
      : `<li><a href="${it.slug}">${it.label}</a></li>`
  ).join("\n              ");

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: g.title, description: g.desc, inLanguage: lang, image: ogImage, author: { "@type": "Organization", name: "JRMedia" }, publisher: { "@type": "Organization", name: "JRMedia", url: "https://jrmedia.software" }, mainEntityOfPage: canonical },
      { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: u.crumb, item: homeUrl }, { "@type": "ListItem", position: 2, name: g.label, item: canonical } ] },
      { "@type": "FAQPage", mainEntity: g.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${g.title} | PriceCalc Pro</title>
  <meta name="description" content="${g.desc}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="de" href="${altDe}" />
  <link rel="alternate" hreflang="en" href="${altEn}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0E1B2E" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${g.title}" />
  <meta property="og:description" content="${g.desc}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ogImage}" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="stylesheet" href="${base}assets/css/style.css" />
  <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
  </script>
</head>
<body>
  <a class="skip-link" href="#main">${u.skip}</a>
  <header class="site-header">
    <div class="wrap">
      <nav class="nav" aria-label="${u.nav}">
        <a class="brand" href="${u.home}">
          <img src="${base}assets/img/logo.png" alt="" width="34" height="34" />
          <span>PriceCalc <span class="pro">Pro</span></span>
        </a>
        <ul class="nav-links" id="nav-links" style="display:flex">
          <li class="lang-switch">${langSwitch}</li>
          <li class="nav-cta"><a class="btn btn-ghost" href="${u.home}">${u.back}</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main" class="legal">
    <div class="wrap">
      <div class="legal-wrap">
        <div class="legal-head">
          <p class="crumb"><a href="${u.home}">${u.crumb}</a> › ${u.pillarNote === "Basics" ? "Guide" : "Ratgeber"}</p>
          <h1>${g.title}</h1>
          <p class="stand">${g.read}</p>
        </div>

        <article class="legal-card">
          <p class="lead">${g.lead}</p>${figure}
${sections}

          <div class="guide-cta">
            <h3>${g.cta.title}</h3>
            <p>${g.cta.text}</p>
            <a class="btn btn-green" href="${u.home}">${u.ctaBtn}</a>
          </div>

          <h2>${lang === "de" ? "Häufige Fragen" : "Frequently asked questions"}</h2>
${faqHtml}

          <nav class="guide-related" aria-label="${u.more}">
            <h3><a href="${lang === "de" ? "ratgeber.html" : "guides.html"}">${u.more}</a></h3>
            <ul>${relItems}</ul>
          </nav>
        </article>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-bottom" style="border:none;padding-top:0">
        <span>© <span data-year>2026</span> JRMedia · Janine Fabienne Eicker</span>
        <span><a href="${u.home}">${lang === "de" ? "Startseite" : "Home"}</a> · <a href="${PILLAR[lang].slug}">${PILLAR[lang].label}</a> · <a href="${base}${lang === "de" ? "impressum.html" : "impressum.html"}">${lang === "de" ? "Impressum" : "Legal notice"}</a></span>
      </div>
    </div>
  </footer>
  <script src="${base}assets/js/main.js" defer></script>
</body>
</html>
`;
}

let n = 0;
for (const guide of GUIDES) {
  writeFileSync(resolve(root, "docs", guide.de.slug), page(guide, "de"));
  writeFileSync(resolve(root, "docs/en", guide.en.slug), page(guide, "en"));
  n += 2;
}
writeFileSync(resolve(root, "docs", HUB.de.slug), hub("de"));
writeFileSync(resolve(root, "docs/en", HUB.en.slug), hub("en"));
console.log(`✓ generated ${n} guide pages + 2 hub pages (${GUIDES.length} guides × 2 languages)`);
