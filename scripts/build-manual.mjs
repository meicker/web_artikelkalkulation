// Erzeugt die oeffentliche Bedienungsanleitung (docs/anleitung.html +
// docs/en/anleitung.html) aus der EINEN Quelle im App-Projekt:
// <app>/web/locales/<sprache>.json, Zweig "manual". Dieselben Texte zeigt die
// App unter web/routes/_app.manual.tsx.
//
// Frueher lag hier eine Handkopie unter content/manual.<sprache>.json. Sie war
// zuletzt 115 Schluessel hinter der App - der gesamte Preislisten-Import, die
// Kalkulationsfaktor-Vorlagen und der Lieferanten-Tab fehlten auf der Webseite.
// Darum: keine Kopie mehr, und am Ende des Laufs eine Abdeckungspruefung, die
// jeden Text meldet, den dieser Erzeuger nicht ausgibt. Wer in der App einen
// Abschnitt ergaenzt, sieht hier sofort, dass die Webseite nachzuziehen ist.
//
// Lauf: node scripts/build-manual.mjs
// Liegt das App-Projekt woanders: PRICECALC_APP=/pfad/zur/app node scripts/build-manual.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.pricecalcpro.de";
const app = process.env.PRICECALC_APP
  ? resolve(process.env.PRICECALC_APP)
  : resolve(root, "..", "artikelkalkulation");

function load(lang) {
  const file = resolve(app, `web/locales/${lang}.json`);
  if (!existsSync(file)) {
    console.error(`✗ Quelle nicht gefunden: ${file}`);
    console.error(`  Das App-Projekt wird unter ${app} erwartet.`);
    console.error(`  Anderer Ort? PRICECALC_APP=/pfad/zur/app node scripts/build-manual.mjs`);
    process.exit(1);
  }
  const manual = JSON.parse(readFileSync(file, "utf8")).manual;
  if (!manual) {
    console.error(`✗ In ${file} fehlt der Zweig "manual".`);
    process.exit(1);
  }
  return manual;
}

// Nur in der App sinnvoll, darum auf der Webseite bewusst ungenutzt.
const NUR_APP = new Set(["back"]);

// ---- Abdeckungspruefung ---------------------------------------------------
// Ein Proxy merkt sich jeden Text, den der Erzeuger tatsaechlich anfasst.
// Was danach uebrig bleibt, steht in der App, aber nicht auf der Webseite.
function tracked(obj, seen, prefix = "") {
  return new Proxy(obj, {
    get(target, key) {
      if (typeof key !== "string") return target[key];
      const value = target[key];
      const path = prefix + key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return tracked(value, seen, path + ".");
      }
      seen.add(path);
      return value;
    },
  });
}

function alleSchluessel(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" && !Array.isArray(v)
      ? alleSchluessel(v, prefix + k + ".")
      : [prefix + k]
  );
}

// ---- Bausteine ------------------------------------------------------------
const p = (s) => (s ? `<p>${s}</p>` : "");
const sub = (s) => `<h4 class="m-sub">${s}</h4>`;
const tip = (s) => `<div class="m-tip">${s}</div>`;
const warn = (s) => `<div class="m-warn">${s}</div>`;
const ul = (items) => `<ul>${items.filter(Boolean).map((i) => `<li>${i}</li>`).join("")}</ul>`;
const ol = (items) => `<ol>${items.filter(Boolean).map((i) => `<li>${i}</li>`).join("")}</ol>`;
const table = (head, rows) =>
  `<table><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead>` +
  `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
// Die Nachschlagetabellen im Import-Kapitel haben keine Kopfzeile: links das
// Stichwort, rechts die Erklaerung.
const defTable = (rows) =>
  `<table class="m-def"><tbody>${rows
    .map(([label, desc]) => `<tr><td><strong>${label}</strong></td><td>${desc}</td></tr>`)
    .join("")}</tbody></table>`;
const badge = (color, label) => `<span class="m-badge ${color}">${label}</span>`;

// Die Handlungsanleitung des Imports: nummerierte Schritte mit fetter Ueberschrift.
const stepList = (steps) =>
  `<ol class="m-steps">${steps
    .map(([titel, text]) => `<li><strong>${titel}</strong><div>${text}</div></li>`)
    .join("")}</ol>`;

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

// Reihenfolge und Abschnittskennungen spiegeln web/routes/_app.manual.tsx.
const TOC_IDS = ["ueberblick", "ek", "preislisten-import", "kalkulationsfaktoren", "lieferanten", "artikelkalkulation", "sicherung", "einstellungen", "abonnement", "kontakt", "tipps"];

function renderManual(m) {
  const O = [];

  // Ueberblick
  const o = m.overview;
  O.push(`<h2 id="${TOC_IDS[0]}">🧮 ${o.title}</h2>`);
  O.push(p(o.desc));
  O.push(table(o.tableHead, o.tableRows));
  O.push(warn(`⚠ ${o.warn}`));
  O.push(sub(o.onboardingTitle), p(o.onboardingDesc));

  // Einkaufspreise
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
  O.push(sessionBlock(m.session));
  O.push(sub(ek.excelTitle), p(ek.excelDesc), p(ek.excelImportDesc), tip(`💡 ${ek.excelImportNote}`), tip(`🔒 ${ek.excelPlan}`), tip(`📥 ${ek.plPointer}`));

  // Preislisten-Import - eigener Abschnitt wie in der App.
  O.push(`<h2 id="${TOC_IDS[2]}">📥 ${m.toc[2]}</h2>`);
  O.push(p(ek.plDesc));
  O.push(warn(`<strong>${ek.plNoGuaranteeTitle}</strong> ${ek.plNoGuarantee}`));
  O.push(sub(ek.plHowTitle), p(ek.plHowIntro), stepList(ek.plHowSteps));
  O.push(warn(`<strong>${ek.plHowPitfallTitle}</strong>${defTable(ek.plHowPitfalls)}`));
  O.push(sub(ek.plMatchTitle), p(ek.plMatchDesc), defTable(ek.plMatchRows));
  O.push(sub(ek.plBlocksTitle), p(ek.plBlocksDesc), tip(`💡 ${ek.plBlocksTip}`));
  O.push(sub(ek.plColTitle), p(ek.plColDesc));
  O.push(sub(ek.plLimitTitle), p(ek.plLimitDesc), defTable(ek.plLimitRows), tip(`💡 ${ek.plLimitTip}`));
  O.push(sub(ek.plChangeTitle), p(ek.plChangeDesc));
  O.push(sub(ek.plPriceRelTitle), p(ek.plPriceRelDesc), warn(`⚠️ ${ek.plPriceRelConflict}`));
  O.push(sub(ek.plEanTitle), p(ek.plEanDesc));
  O.push(sub(ek.plDraftTitle), p(ek.plDraftDesc));
  O.push(sub(ek.plPatternTitle), p(ek.plPatternDesc), tip(`💡 <strong>${ek.plPatternTipTitle}</strong> ${ek.plPatternTip}`));
  O.push(sub(ek.plEanTitle2), p(ek.plEanDesc2));
  O.push(sub(ek.plSameTitle), p(ek.plSameDesc));
  O.push(sub(ek.plCheckTitle), p(ek.plCheckDesc), p(ek.plCheckStreak), warn(`⚠️ ${ek.plCheckWarn}`));
  O.push(sub(ek.plRunTitle), p(ek.plRunDesc));
  O.push(sub(ek.plRunProposeTitle), p(ek.plRunProposeDesc), tip(`💡 ${ek.plRunProposeNote}`));
  O.push(sub(ek.plRunOptionsTitle), p(ek.plRunOptionsDesc));
  O.push(sub(ek.plNewVendorTitle), p(ek.plNewVendorDesc));
  O.push(sub(ek.plExtTitle), p(ek.plExtDesc), warn(`⚠️ <strong>${ek.plExtWarnTitle}</strong> ${ek.plExtWarn}`));
  O.push(sub(ek.plRestrTitle), p(ek.plRestrDesc));
  O.push(tip(`💾 <strong>${ek.plSnapTitle}</strong> ${ek.plSnapDesc}`));
  O.push(sub(ek.plManualTitle), p(ek.plManualDesc));
  O.push(sub(ek.plPrefillTitle), p(ek.plPrefillDesc));
  O.push(sub(ek.plSessionTitle), p(ek.plSessionDesc), tip(`💡 ${ek.plSessionTip}`), warn(`⚠️ ${ek.plSessionWarn}`));
  O.push(sub(ek.plQuotaTitle), p(ek.plQuotaDesc));

  // Kalkulationsfaktoren (Vorlagen)
  const pr = m.presets;
  O.push(`<h2 id="${TOC_IDS[3]}">🧮 ${pr.title}</h2>`);
  O.push(p(pr.desc));
  O.push(sub(pr.presetTitle), p(pr.presetDesc), tip(`💡 ${pr.presetNote}`));
  O.push(sub(pr.modeTitle), p(pr.modeDesc), defTable(pr.modeRows), p(pr.modeBadgeDesc), p(pr.modeCollDesc), tip(`💡 ${pr.modeManualTip}`));
  O.push(sub(pr.bulkModeTitle), p(pr.bulkModeDesc));
  O.push(sub(pr.impactTitle), p(pr.impactDesc), defTable(pr.impactRows), warn(`⚠️ ${pr.impactWarn}`));
  O.push(sub(pr.filterTitle), p(pr.filterDesc));
  O.push(sub(pr.brokenTitle), p(pr.brokenDesc));
  O.push(sub(pr.quotaTitle), p(pr.quotaDesc));

  // Lieferanten
  const v = m.vendors;
  O.push(`<h2 id="${TOC_IDS[4]}">🏭 ${v.title}</h2>`);
  O.push(p(v.desc));
  O.push(sub(v.listTitle), p(v.listDesc), tip(`💡 ${v.listNote}`));
  O.push(sub(v.prefixTitle), p(v.prefixDesc), p(v.prefixMulti));
  O.push(sub(v.prefixFromStock), p(v.prefixFromStockDesc), tip(`💡 ${v.prefixFromStockNote}`));
  O.push(sub(v.sampleTitle), p(v.sampleDesc));
  O.push(sub(v.patternTitle), p(v.patternDesc));
  O.push(sub(v.splitTitle), p(v.splitDesc));
  O.push(sub(v.priceRelTitle), p(v.priceRelDesc));
  O.push(sub(v.saveTitle), p(v.saveDesc), tip(`💡 ${v.migrateNote}`));

  // Artikelkalkulation
  const a = m.artikelkalk;
  O.push(`<h2 id="${TOC_IDS[5]}">🏷 ${a.title}</h2>`);
  O.push(p(a.desc));
  O.push(warn(`⚠ ${a.disclaimerNote}`));
  O.push(sub(a.factorInputTitle), ul([a.factorInput1, a.factorInput2]));
  O.push(sub(a.derivedTitle), p(a.derivedDesc));
  O.push(sub(a.ekChangeTitle), tip(`💡 ${a.ekChangeTip}`));
  O.push(sub(a.calcTitle), p(a.calcDesc));
  O.push(sub(a.statusTitle), defTable(a.statusRows.map(([c, l, d]) => [badge(c, l), d])));
  O.push(sub(a.filterTitle), p(a.filterDesc), defTable(a.filterRows), p(a.collFilterDesc), p(a.expandDesc));
  O.push(sub(a.paginationTitle), p(a.paginationDesc));
  O.push(sub(a.sortTitle), p(a.sortDesc));
  O.push(sub(a.factorInlineTitle), p(a.factorInlineDesc));
  O.push(sub(a.advTitle), p(a.advDesc));
  O.push(sessionBlock(m.session));
  O.push(sub(a.saveTitle), p(a.saveDesc));
  O.push(sub(a.bulkTitle), p(a.bulkDesc));
  O.push(sub(a.saveAllTitle), p(a.saveAllDesc));
  O.push(sub(a.autosaveTitle), p(a.autosaveDesc), tip(`🔒 ${a.autosavePlan}`));
  O.push(sub(a.outlierTitle), p(a.outlierDesc), defTable(a.outlierRows));
  O.push(sub(a.badEanTitle), p(a.badEanDesc));
  O.push(tip(`💡 ${a.outlierNote}`), warn(`⚠️ ${a.outlierScope}`));
  O.push(sub(a.statusbarTitle), p(a.statusbarDesc));

  // Sicherung
  const b = m.sicherung;
  O.push(`<h2 id="${TOC_IDS[6]}">💾 ${b.title}</h2>`);
  O.push(p(b.desc));
  O.push(sub(b.exportTitle), p(b.exportIntro), ul([b.export1, b.export2, b.export3, b.export4]), tip(`💡 ${b.exportTip}`), p(b.exportPlan));
  O.push(sub(b.restoreTitle), ol([b.restore1, b.restore2, b.restore3, b.restore4, b.restore5]), warn(`⚠ ${b.restoreWarn}`), p(b.restorePlan));
  O.push(sub(b.setTitle), p(b.setDesc), ul([b.setBlock1, b.setBlock2, b.setBlock3]),
    ol([b.setStep1, b.setStep2, b.setStep3, b.setStep4]),
    tip(`🔁 ${b.setMerge}`), warn(`⚠ ${b.setNote}`), p(b.setPlan));

  // Einstellungen
  const e = m.einstellungen;
  O.push(`<h2 id="${TOC_IDS[7]}">⚙ ${e.title}</h2>`);
  O.push(p(e.desc));
  O.push(sub(e.autosaveTitle), p(e.autosaveDesc), tip(`🔒 ${e.autosavePlan}`));
  O.push(sub(e.autoBackupTitle), p(e.autoBackupDesc));
  O.push(sub(e.mwstTitle), p(e.mwstDesc));
  O.push(sub(e.roundingTitle), p(e.roundingDesc), p(e.roundingNote), tip(`🔒 ${e.roundingPlan}`));
  O.push(sub(e.productPageSizeTitle), p(e.productPageSizeDesc));
  O.push(sub(e.langTitle), p(e.langDesc));
  O.push(sub(e.removeTitle), p(e.removeDesc), warn(e.removeWarn));

  // Abonnement
  const ab = m.abo;
  const t = m.tips;
  O.push(`<h2 id="${TOC_IDS[8]}">💳 ${ab.title}</h2>`);
  O.push(p(ab.desc));
  O.push(sub(ab.selectTitle), p(ab.selectDesc));
  O.push(sub(ab.usageTitle), p(ab.usageDesc));
  O.push(sub(ab.cancelTitle), p(ab.cancelDesc), tip(`💡 ${t.planNote}`));

  // Feedback & Kontakt
  const k = m.kontakt;
  O.push(`<h2 id="${TOC_IDS[9]}">💬 ${k.title}</h2>`);
  O.push(p(k.desc));
  O.push(sub(k.formTitle), p(k.formDesc), p(`<span style="font-size:.85rem;color:var(--muted)">${k.formNote}</span>`));
  O.push(sub(k.bubbleTitle), p(k.bubbleDesc));
  O.push(sub(k.supportTitle), p(k.supportDesc), tip(`💡 ${k.tip}`));

  // Tipps
  O.push(`<h2 id="${TOC_IDS[10]}">💡 ${t.title}</h2>`);
  O.push(sub(t.workflowTitle), ol([t.workflow1, t.workflow2, t.workflow3, t.workflow4, t.workflow5]));
  O.push(`<hr class="m-div" />`);
  O.push(sub(t.planTitle), p(t.planDesc), table(t.planTableHead, t.planRows), p(`<span style="font-size:.85rem;color:var(--muted)">${t.planNote}</span>`));
  O.push(`<hr class="m-div" />`);
  O.push(sub(t.faqTitle));
  O.push(t.faq.map(([q, an]) => `<div class="m-faq"><div class="q">${q}</div><div class="a">${an}</div></div>`).join(""));
  O.push(`<hr class="m-div" />`);
  O.push(`<p class="m-foot">${t.footer}</p>`);

  return O.join("\n");
}

// ---- Seitenhuelle ---------------------------------------------------------
const UI = {
  de: {
    lang: "de", asset: "assets", home: "index.html", homeCrumb: "‹ Startseite", homeBtn: "← Zur Startseite",
    skip: "Zum Inhalt springen", other: "en/anleitung.html",
    canonical: `${ORIGIN}/anleitung.html`,
    metaDesc: "Vollständige Bedienungsanleitung für PriceCalc Pro: Einkaufspreise, Preislisten-Import, Kalkulationsfaktoren, Lieferanten, Artikelkalkulation, Datensicherung, Einstellungen und Abonnement.",
    tocLabel: "Inhalt",
  },
  en: {
    lang: "en", asset: "../assets", home: "index.html", homeCrumb: "‹ Home", homeBtn: "← Home",
    skip: "Skip to content", other: "../anleitung.html",
    canonical: `${ORIGIN}/en/anleitung.html`,
    metaDesc: "Complete user guide for PriceCalc Pro: purchase prices, price-list import, calculation factors, vendors, product calculation, data backup, settings and subscription.",
    tocLabel: "Contents",
  },
};

function page(lang, m) {
  const u = UI[lang];
  const toc = m.toc.map((label, i) => `<a href="#${TOC_IDS[i]}">${label}</a>`).join("");
  const langLi =
    lang === "de"
      ? `<span class="active" aria-current="true">DE</span><a href="${u.other}" hreflang="en">EN</a>`
      : `<a href="${u.other}" hreflang="de">DE</a><span class="active" aria-current="true">EN</span>`;
  const altDe = lang === "de" ? u.canonical : `${ORIGIN}/anleitung.html`;
  const altEn = lang === "de" ? `${ORIGIN}/en/anleitung.html` : u.canonical;

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
  <link rel="alternate" hreflang="x-default" href="${altDe}" />
  <meta name="robots" content="index, follow" />
  <meta name="theme-color" content="#0E1B2E" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
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

let luecken = 0;
for (const lang of ["de", "en"]) {
  const m = load(lang);
  const seen = new Set();
  const out = lang === "de" ? "docs/anleitung.html" : "docs/en/anleitung.html";
  writeFileSync(resolve(root, out), page(lang, tracked(m, seen)));

  const fehlend = alleSchluessel(m).filter((k) => !seen.has(k) && !NUR_APP.has(k));
  console.log(`✓ ${out}  (${seen.size} von ${alleSchluessel(m).length} Texten ausgegeben)`);
  if (fehlend.length) {
    luecken += fehlend.length;
    console.error(`  ⚠ ${fehlend.length} Text(e) stehen in der App, aber nicht auf der Webseite:`);
    fehlend.forEach((k) => console.error(`      manual.${k}`));
  }
}

if (luecken) {
  console.error(`\n✗ ${luecken} Luecke(n). Entweder renderManual() ergaenzen oder den Schluessel`);
  console.error(`  in NUR_APP eintragen, wenn er auf der Webseite bewusst fehlen soll.`);
  process.exit(1);
}
