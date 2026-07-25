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
            <h3>${u.more}</h3>
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
console.log(`✓ generated ${n} guide pages (${GUIDES.length} guides × 2 languages)`);
