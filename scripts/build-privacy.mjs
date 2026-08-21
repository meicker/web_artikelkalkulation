// Erzeugt die oeffentliche App-Datenschutzerklaerung (docs/app-datenschutz.html
// + docs/en/app-datenschutz.html) aus der EINEN Quelle im App-Projekt:
// <app>/web/content/privacy.<sprache>.json. Dieselbe Datei rendert die App
// selbst - eine Zweitschrift, die auseinanderlaufen koennte, gibt es nicht mehr.
//
// Lauf: node scripts/build-privacy.mjs
// Liegt das App-Projekt woanders: PRICECALC_APP=/pfad/zur/app node scripts/build-privacy.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.pricecalcpro.de";
const app = process.env.PRICECALC_APP
  ? resolve(process.env.PRICECALC_APP)
  : resolve(root, "..", "artikelkalkulation");

function load(lang) {
  const file = resolve(app, `web/content/privacy.${lang}.json`);
  if (!existsSync(file)) {
    // Lieber laut abbrechen als eine halbe Erklaerung veroeffentlichen.
    console.error(`✗ Quelle nicht gefunden: ${file}`);
    console.error(`  Das App-Projekt wird unter ${app} erwartet.`);
    console.error(`  Anderer Ort? PRICECALC_APP=/pfad/zur/app node scripts/build-privacy.mjs`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(file, "utf8"));
}

// ---- Seitenhuelle ---------------------------------------------------------
// Alles hier drin ist Webseiten-Beiwerk (Navigation, Fusszeile, Hinweis auf die
// getrennte Website-Erklaerung) - es gehoert bewusst NICHT in die Quelle, weil
// es in der App keine Entsprechung hat.
const UI = {
  de: {
    lang: "de", asset: "assets", home: "index.html", homeCrumb: "‹ Startseite", homeBtn: "← Zur Startseite",
    skip: "Zum Inhalt springen", nav: "Hauptnavigation", other: "en/app-datenschutz.html",
    out: "docs/app-datenschutz.html",
    canonical: `${ORIGIN}/app-datenschutz.html`,
    pageTitle: "App-Datenschutzerklärung – PriceCalc Pro",
    h1: "🔒 Datenschutzerklärung der App",
    metaDesc: "Datenschutzerklärung der Shopify-App PriceCalc Pro: verarbeitete Daten, Rechtsgrundlagen, Auftragsverarbeiter, Drittlandtransfers und Betroffenenrechte.",
    note: `Diese Datenschutzerklärung betrifft die <strong>Shopify-App PriceCalc Pro</strong>. Für die
          Informations-Website gilt die separate <a href="datenschutz.html">Website-Datenschutzerklärung</a>.`,
    footer: `<a href="impressum.html">Impressum</a> · <a href="datenschutz.html">Website-Datenschutz</a> · <a href="haftungsausschluss.html">Haftungsausschluss</a>`,
  },
  en: {
    lang: "en", asset: "../assets", home: "index.html", homeCrumb: "‹ Home", homeBtn: "← Home",
    skip: "Skip to content", nav: "Main navigation", other: "../app-datenschutz.html",
    out: "docs/en/app-datenschutz.html",
    canonical: `${ORIGIN}/en/app-datenschutz.html`,
    pageTitle: "App Privacy Policy – PriceCalc Pro",
    h1: "🔒 App Privacy Policy",
    metaDesc: "Privacy policy of the Shopify app PriceCalc Pro: data processed, legal bases, processors, third-country transfers and data subject rights.",
    note: `This privacy policy concerns the <strong>Shopify app PriceCalc Pro</strong>. For the information
          website, the separate <a href="datenschutz.html">website privacy policy</a> applies.`,
    footer: `<a href="impressum.html">Legal notice</a> · <a href="datenschutz.html">Website Privacy</a> · <a href="haftungsausschluss.html">Disclaimer</a>`,
  },
};

const ALT_DE = `${ORIGIN}/app-datenschutz.html`;
const ALT_EN = `${ORIGIN}/en/app-datenschutz.html`;

function page(lang, doc) {
  const u = UI[lang];
  const langLi =
    lang === "de"
      ? `<span class="active" aria-current="true">DE</span><a href="${u.other}" hreflang="en">EN</a>`
      : `<a href="${u.other}" hreflang="de">DE</a><span class="active" aria-current="true">EN</span>`;
  const body = doc.sections
    .map((s) => `          <h2 id="${s.id}">${s.title}</h2>\n          ${s.html}`)
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
          <p style="color:var(--muted);font-size:.92rem;margin-bottom:20px">${doc.intro}</p>

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
