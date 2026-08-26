// Erzeugt die oeffentlichen Nutzungsbedingungen (docs/nutzungsbedingungen.html
// + docs/en/terms.html) aus der EINEN Quelle im App-Projekt:
// <app>/web/content/terms.<sprache>.json. Dieselbe Datei rendert die App selbst
// unter /terms - eine Zweitschrift, die auseinanderlaufen koennte, gibt es nicht.
//
// Aufbau bewusst identisch zu build-privacy.mjs. Wer dort etwas an der Huelle
// aendert, sollte hier nachziehen.
//
// Lauf: node scripts/build-terms.mjs
// Liegt das App-Projekt woanders: PRICECALC_APP=/pfad/zur/app node scripts/build-terms.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.pricecalcpro.de";
const app = process.env.PRICECALC_APP
  ? resolve(process.env.PRICECALC_APP)
  : resolve(root, "..", "artikelkalkulation");

function load(lang) {
  const file = resolve(app, `web/content/terms.${lang}.json`);
  if (!existsSync(file)) {
    // Lieber laut abbrechen als eine halbe Erklaerung veroeffentlichen.
    console.error(`✗ Quelle nicht gefunden: ${file}`);
    console.error(`  Das App-Projekt wird unter ${app} erwartet.`);
    console.error(`  Anderer Ort? PRICECALC_APP=/pfad/zur/app node scripts/build-terms.mjs`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(file, "utf8"));
}

// ---- Seitenhuelle ---------------------------------------------------------
// Alles hier drin ist Webseiten-Beiwerk (Navigation, Fusszeile, Hinweis auf die
// begleitenden Rechtstexte) - es gehoert bewusst NICHT in die Quelle, weil es in
// der App keine Entsprechung hat.
const UI = {
  de: {
    lang: "de", asset: "assets", home: "index.html", homeCrumb: "‹ Startseite", homeBtn: "← Zur Startseite",
    skip: "Zum Inhalt springen", nav: "Hauptnavigation", other: "en/terms.html",
    out: "docs/nutzungsbedingungen.html",
    canonical: `${ORIGIN}/nutzungsbedingungen.html`,
    pageTitle: "Nutzungsbedingungen – PriceCalc Pro",
    h1: "📘 Nutzungsbedingungen",
    metaDesc: "Nutzungsbedingungen der Shopify-App PriceCalc Pro: Vertragsgegenstand, Pläne und Abrechnung über Shopify, Laufzeit, Pflichten des Nutzers, Haftung und Gerichtsstand.",
    note: `Diese Nutzungsbedingungen gelten für die <strong>Shopify-App PriceCalc Pro</strong> und richten sich
          ausschließlich an Unternehmer. Ergänzend gelten der <a href="haftungsausschluss.html">Haftungsausschluss</a>
          und die <a href="app-datenschutz.html">App-Datenschutzerklärung</a>.`,
    footer: `<a href="impressum.html">Impressum</a> · <a href="datenschutz.html">Website-Datenschutz</a> · <a href="app-datenschutz.html">App-Datenschutz</a> · <a href="avv.html">AVV</a> · <a href="haftungsausschluss.html">Haftungsausschluss</a>`,
  },
  en: {
    lang: "en", asset: "../assets", home: "index.html", homeCrumb: "‹ Home", homeBtn: "← Home",
    skip: "Skip to content", nav: "Main navigation", other: "../nutzungsbedingungen.html",
    out: "docs/en/terms.html",
    canonical: `${ORIGIN}/en/terms.html`,
    pageTitle: "Terms of Use – PriceCalc Pro",
    h1: "📘 Terms of Use",
    metaDesc: "Terms of use for the Shopify app PriceCalc Pro: subject matter, plans and billing through Shopify, term, user obligations, liability and jurisdiction.",
    note: `These terms of use apply to the <strong>Shopify app PriceCalc Pro</strong> and are directed exclusively
          at businesses. The <a href="haftungsausschluss.html">Disclaimer</a> and the
          <a href="app-datenschutz.html">App Privacy Policy</a> apply in addition.`,
    footer: `<a href="impressum.html">Legal notice</a> · <a href="datenschutz.html">Website Privacy</a> · <a href="app-datenschutz.html">App Privacy</a> · <a href="dpa.html">DPA</a> · <a href="haftungsausschluss.html">Disclaimer</a>`,
  },
};

const ALT_DE = `${ORIGIN}/nutzungsbedingungen.html`;
const ALT_EN = `${ORIGIN}/en/terms.html`;

// Die Quelle wird von der App gerendert und verlinkt deshalb App-Routen
// (/privacy, /disclaimer). Auf der Webseite gibt es diese Pfade nicht - dort
// heissen dieselben Texte anders. Statt die Quelle zu verbiegen, wird beim
// Erzeugen umgeschrieben; ein nicht abgebildeter App-Pfad bricht laut ab, damit
// kein toter Link auf pricecalcpro.de landet.
const ROUTEN = {
  "/privacy": "app-datenschutz.html",
  "/disclaimer": "haftungsausschluss.html",
  "/terms": "nutzungsbedingungen.html",
};

function appPfadeUmschreiben(html, lang) {
  return html.replace(/href="(\/[a-z-]+)"/g, (treffer, pfad) => {
    const ziel = ROUTEN[pfad];
    if (!ziel) {
      console.error(`\u2717 Unbekannter App-Pfad im Rechtstext: ${pfad}`);
      console.error(`  In ROUTEN in scripts/build-terms.mjs aufnehmen.`);
      process.exit(1);
    }
    // Im englischen Verzeichnis liegen die Entsprechungen unter denselben
    // Dateinamen - ausser den Nutzungsbedingungen, die dort "terms" heissen.
    const datei = lang === "en" && ziel === "nutzungsbedingungen.html" ? "terms.html" : ziel;
    return `href="${datei}"`;
  });
}

function page(lang, doc) {
  const u = UI[lang];
  const langLi =
    lang === "de"
      ? `<span class="active" aria-current="true">DE</span><a href="${u.other}" hreflang="en">EN</a>`
      : `<a href="${u.other}" hreflang="de">DE</a><span class="active" aria-current="true">EN</span>`;
  const body = doc.sections
    .map((s) => `          <h2 id="${s.id}">${s.title}</h2>\n          ${appPfadeUmschreiben(s.html, lang)}`)
    .join("\n\n");

  return `<!DOCTYPE html>
<html lang="${u.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${u.pageTitle}</title>
  <meta name="description" content="${u.metaDesc}" />
  <link rel="canonical" href="${u.canonical}" />
  <link rel="alternate" hreflang="de" href="${ALT_DE}" />
  <link rel="alternate" hreflang="en" href="${ALT_EN}" />
  <link rel="alternate" hreflang="x-default" href="${ALT_DE}" />
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
      <nav class="nav" aria-label="${u.nav}">
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
          <h1>${u.h1}</h1>
          <p class="stand">PriceCalc Pro – Shopify App · ${doc.updated}</p>
        </div>

        <div class="legal-note">
          ${u.note}
        </div>

        <div class="legal-card">
          <p style="color:var(--muted);font-size:.92rem;margin-bottom:20px">${appPfadeUmschreiben(doc.intro, lang)}</p>

${body}
        </div>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-bottom" style="border:none;padding-top:0">
        <span>© <span data-year>2026</span> JRMedia · Janine Fabienne Eicker</span>
        <span>${u.footer}</span>
      </div>
    </div>
  </footer>
  <script src="${u.asset}/js/main.js" defer></script>
</body>
</html>
`;
}

for (const lang of ["de", "en"]) {
  const doc = load(lang);
  writeFileSync(resolve(root, UI[lang].out), page(lang, doc));
  console.log(`✓ ${UI[lang].out}  (${doc.sections.length} Abschnitte, ${doc.updated})`);
}
