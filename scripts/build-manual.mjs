// Generates the public user-guide pages (docs/anleitung.html + docs/en/anleitung.html)
// from the app's manual content (content/manual.<lang>.json), mirroring the structure
// of the in-app manual route. Run: node scripts/build-manual.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const load = (l) => JSON.parse(readFileSync(resolve(root, `content/manual.${l}.json`), "utf8"));

const TOC_IDS = ["ueberblick", "ek", "kalkulation", "sicherung", "einstellungen", "abonnement", "tipps"];

// ---- render helpers -------------------------------------------------------
const p = (s) => (s ? `<p>${s}</p>` : "");
const sub = (s) => `<h4 class="m-sub">${s}</h4>`;
const tip = (s) => `<div class="m-tip">${s}</div>`;
const warn = (s) => `<div class="m-warn">${s}</div>`;
const ul = (items) => `<ul>${items.filter(Boolean).map((i) => `<li>${i}</li>`).join("")}</ul>`;
const ol = (items) => `<ol>${items.filter(Boolean).map((i) => `<li>${i}</li>`).join("")}</ol>`;
const table = (head, rows) =>
  `<table><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead>` +
  `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
const badge = (color, label) => `<span class="m-badge ${color}">${label}</span>`;

function sessionBlock(s) {
  return [
    sub(s.sectionTitle),
    p(s.sectionDesc),
    sub(s.howTitle),
    ol([s.how1, s.how2, s.how3, s.how4, s.how5]),
    p(s.multiDesc),
    sub(s.scopeTitle),
    p(s.scopeDesc),
    sub(s.scopeBannerTitle),
    p(s.scopeBannerDesc),
    tip(`🔒 ${s.planNote}`),
  ].join("\n");
}

function renderManual(m) {
  const s = m.session;
  const O = [];

  // Overview
  O.push(`<h2 id="${TOC_IDS[0]}">🧮 ${m.overview.title}</h2>`);
  O.push(p(m.overview.desc));
  O.push(table(m.overview.tableHead, m.overview.tableRows));
  O.push(warn(`⚠ ${m.overview.warn}`));
  O.push(sub(m.overview.onboardingTitle));
  O.push(p(m.overview.onboardingDesc));

  // Purchase prices
  const ek = m.ek;
  O.push(`<h2 id="${TOC_IDS[1]}">💶 ${ek.title}</h2>`);
  O.push(p(ek.desc));
  O.push(warn(`⚠ ${ek.disclaimerNote}`));
  O.push(sub(ek.loadTitle), p(ek.loadDesc));
  O.push(sub(ek.paginationTitle), p(ek.paginationDesc));
  O.push(sub(ek.sortTitle), p(ek.sortDesc));
  O.push(sub(ek.filterTitle), ul([ek.filter1, ek.filter2, ek.filter3, ek.filter4, ek.filter5]), p(ek.expandDesc));
  O.push(sub(ek.editTitle), p(ek.editDesc), tip(`💡 <strong>${ek.tipTitle}</strong> ${ek.tipDesc}`));
  O.push(sub(ek.badgeTitle), p(ek.badgeDesc), ul([ek.badgeNoPrice, ek.badgeChanged, ek.badgeHasPrice]));
  O.push(sub(ek.saveTitle), p(ek.saveDesc), warn(`⚠ ${ek.warnSave}`));
  O.push(sub(ek.zeroPriceWarnTitle), warn(`⚠ ${ek.zeroPriceWarnDesc}`));
  O.push(sub(ek.autosaveBackupTitle), p(ek.autosaveBackupDesc));
  O.push(sub(ek.autosaveTitle), p(ek.autosaveDesc), tip(`🔒 ${ek.autosavePlan}`));
  O.push(sub(ek.statusbarTitle), p(ek.statusbarDesc));
  O.push(sub(ek.factorHintTitle), p(ek.factorHintDesc));
  O.push(sessionBlock(s));
  O.push(sub(ek.excelTitle), p(ek.excelDesc), p(ek.excelImportDesc), tip(`💡 ${ek.excelImportNote}`), tip(`🔒 ${ek.excelPlan}`));

  // Article calculation
  const a = m.artikelkalk;
  O.push(`<h2 id="${TOC_IDS[2]}">🏷 ${a.title}</h2>`);
  O.push(p(a.desc));
  O.push(warn(`⚠ ${a.disclaimerNote}`));
  O.push(sub(a.factorInputTitle), ul([a.factorInput1, a.factorInput2]));
  O.push(sub(a.derivedTitle), p(a.derivedDesc));
  O.push(sub(a.ekChangeTitle), tip(`💡 ${a.ekChangeTip}`));
  O.push(sub(a.calcTitle), p(a.calcDesc));
  O.push(sub(a.statusTitle), table(["Status", ""], a.statusRows.map(([c, l, d]) => [badge(c, l), d])));
  O.push(sub(a.filterTitle), p(a.filterDesc), table(["Filter", ""], a.filterRows), p(a.collFilterDesc), p(a.expandDesc));
  O.push(sub(a.paginationTitle), p(a.paginationDesc));
  O.push(sub(a.sortTitle), p(a.sortDesc));
  O.push(sub(a.factorInlineTitle), p(a.factorInlineDesc));
  O.push(sub(a.advTitle), p(a.advDesc));
  O.push(sessionBlock(s));
  O.push(sub(a.saveTitle), p(a.saveDesc));
  O.push(sub(a.bulkTitle), p(a.bulkDesc));
  O.push(sub(a.saveAllTitle), p(a.saveAllDesc));
  O.push(sub(a.autosaveTitle), p(a.autosaveDesc), tip(`🔒 ${a.autosavePlan}`));
  O.push(sub(a.statusbarTitle), p(a.statusbarDesc));

  // Backup
  const b = m.sicherung;
  O.push(`<h2 id="${TOC_IDS[3]}">💾 ${b.title}</h2>`);
  O.push(p(b.desc));
  O.push(sub(b.exportTitle), p(b.exportIntro), ul([b.export1, b.export2, b.export3, b.export4]), tip(`💡 ${b.exportTip}`), p(b.exportPlan));
  O.push(sub(b.restoreTitle), ol([b.restore1, b.restore2, b.restore3, b.restore4, b.restore5]), warn(`⚠ ${b.restoreWarn}`), p(b.restorePlan));

  // Settings
  const e = m.einstellungen;
  O.push(`<h2 id="${TOC_IDS[4]}">⚙ ${e.title}</h2>`);
  O.push(p(e.desc));
  O.push(sub(e.autosaveTitle), p(e.autosaveDesc), tip(`🔒 ${e.autosavePlan}`));
  O.push(sub(e.autoBackupTitle), p(e.autoBackupDesc));
  O.push(sub(e.mwstTitle), p(e.mwstDesc));
  O.push(sub(e.roundingTitle), p(e.roundingDesc), p(e.roundingNote), tip(`🔒 ${e.roundingPlan}`));
  O.push(sub(e.productPageSizeTitle), p(e.productPageSizeDesc));
  O.push(sub(e.langTitle), p(e.langDesc));

  // Subscription
  const ab = m.abo;
  O.push(`<h2 id="${TOC_IDS[5]}">💳 ${ab.title}</h2>`);
  O.push(p(ab.desc));
  O.push(sub(ab.selectTitle), p(ab.selectDesc));
  O.push(sub(ab.usageTitle), p(ab.usageDesc));
  O.push(sub(ab.cancelTitle), p(ab.cancelDesc));

  // Tips
  const t = m.tips;
  O.push(`<h2 id="${TOC_IDS[6]}">💡 ${t.title}</h2>`);
  O.push(sub(t.workflowTitle), ol([t.workflow1, t.workflow2, t.workflow3, t.workflow4, t.workflow5]));
  O.push(`<hr class="m-div" />`);
  O.push(sub(t.planTitle), p(t.planDesc), table(t.planTableHead, t.planRows), p(`<span style="font-size:.85rem;color:var(--muted)">${t.planNote}</span>`));
  O.push(`<hr class="m-div" />`);
  O.push(sub(t.faqTitle));
  O.push(t.faq.map(([q, an]) => `<div class="m-faq"><div class="q">${q}</div><div class="a">${an}</div></div>`).join(""));

  return O.join("\n");
}

// ---- page shell -----------------------------------------------------------
const UI = {
  de: {
    lang: "de", asset: "assets", home: "index.html", homeCrumb: "‹ Startseite", homeBtn: "← Zur Startseite",
    skip: "Zum Inhalt springen", other: "en/anleitung.html", otherLang: "en",
    canonical: "https://pricecalcpro.de/anleitung.html",
    metaDesc: "Vollständige Bedienungsanleitung für PriceCalc Pro: Einkaufspreise, 5-stufige Artikelkalkulation, Datensicherung, Einstellungen, Abonnement und Tipps.",
    tocLabel: "Inhalt", langActive: "DE", langOther: "EN",
  },
  en: {
    lang: "en", asset: "../assets", home: "index.html", homeCrumb: "‹ Home", homeBtn: "← Home",
    skip: "Skip to content", other: "../anleitung.html", otherLang: "de",
    canonical: "https://pricecalcpro.de/en/anleitung.html",
    metaDesc: "Complete user guide for PriceCalc Pro: purchase prices, 5-step product calculation, data backup, settings, subscription and tips.",
    tocLabel: "Contents", langActive: "EN", langOther: "DE",
  },
};

function page(lang, m) {
  const u = UI[lang];
  const toc = m.toc.map((label, i) => `<a href="#${TOC_IDS[i]}">${label}</a>`).join("");
  const langLi =
    lang === "de"
      ? `<span class="active" aria-current="true">DE</span><a href="${u.other}" hreflang="en">EN</a>`
      : `<a href="${u.other}" hreflang="de">DE</a><span class="active" aria-current="true">EN</span>`;
  const altDe = lang === "de" ? u.canonical : "https://pricecalcpro.de/anleitung.html";
  const altEn = lang === "de" ? "https://pricecalcpro.de/en/anleitung.html" : u.canonical;

  return `<!DOCTYPE html>
<html lang="${u.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${m.title} – PriceCalc Pro</title>
  <meta name="description" content="${u.metaDesc}" />
  <link rel="canonical" href="${u.canonical}" />
  <link rel="alternate" hreflang="de" href="${altDe}" />
  <link rel="alternate" hreflang="en" href="${altEn}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0E1B2E" />
  <link rel="icon" href="${u.asset}/img/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="${u.asset}/css/style.css" />
</head>
<body>
  <a class="skip-link" href="#main">${u.skip}</a>
  <header class="site-header">
    <div class="wrap">
      <nav class="nav" aria-label="${lang === "de" ? "Hauptnavigation" : "Main navigation"}">
        <a class="brand" href="${u.home}">
          <img src="${u.asset}/img/logo.png" alt="" width="34" height="34" />
          <span>PriceCalc <span class="pro">Pro</span></span>
        </a>
        <ul class="nav-links" id="nav-links" style="display:flex">
          <li class="lang-switch">${langLi}</li>
          <li class="nav-cta"><a class="btn btn-ghost" href="${u.home}">${u.homeBtn}</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main" class="legal">
    <div class="wrap">
      <div class="legal-wrap">
        <div class="legal-head">
          <a class="back" href="${u.home}">${u.homeCrumb}</a>
          <h1>📖 ${m.title}</h1>
          <p class="stand">${m.updated}</p>
        </div>

        <nav class="legal-toc m-toc" aria-label="${u.tocLabel}">${toc}</nav>

        <div class="legal-card">
${renderManual(m)}
        </div>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-bottom" style="border:none;padding-top:0">
        <span>© <span data-year>2026</span> JRMedia · Janine Fabienne Eicker</span>
        <span><a href="${u.home}">${u.homeBtn.replace(/^←\s*/, "")}</a></span>
      </div>
    </div>
  </footer>
  <script src="${u.asset}/js/main.js" defer></script>
</body>
</html>
`;
}

for (const lang of ["de", "en"]) {
  const m = load(lang);
  const out = lang === "de" ? "docs/anleitung.html" : "docs/en/anleitung.html";
  writeFileSync(resolve(root, out), page(lang, m));
  console.log(`✓ wrote ${out}`);
}
