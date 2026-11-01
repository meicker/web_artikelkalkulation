// Rechtstexte der App auf pricecalcpro.de. Die Website ist eine reine
// Informationsseite; ihre eigenen Pflichttexte (impressum.html,
// datenschutz.html) sind von Hand gepflegt und gehoeren nicht hierher.
//
// 1. App-Datenschutzerklaerung -> docs/app-datenschutz.html + docs/en/app-datenschutz.html
//    Nur fuer das Shopify-Listing (Pflicht-URL zur Datenschutzerklaerung der
//    App): oeffentlich erreichbar, aber auf der Website nirgends verlinkt und
//    mit noindex (fehlt damit auch in der Sitemap). Quelle ist die EINE Fassung
//    im App-Projekt: <app>/web/content/eigene/texte.ts (erzeugt von
//    legal/rechtstexte/zusammensetzen.mjs) - derselbe Wortlaut, den der App-Admin
//    veroeffentlicht.
//
// 2. Fruehere Seiten der App-Vertragstexte (Nutzungsbedingungen/AGB,
//    Haftungsausschluss) -> Weiterleitung auf die Startseite. Die AGB werden in
//    der App angezeigt und dort vereinbart, nicht auf der Website. GitHub Pages
//    kann keinen 301 senden; die sofortige meta-Weiterleitung mit noindex und
//    canonical auf die Startseite werten Suchmaschinen wie eine dauerhafte.
//
// Lauf: node scripts/build-rechtstexte.mjs   (danach node scripts/build-sitemap.mjs)
// Liegt das App-Projekt woanders: PRICECALC_APP=/pfad/zur/app node scripts/build-rechtstexte.mjs
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.pricecalcpro.de";
const app = process.env.PRICECALC_APP
  ? resolve(process.env.PRICECALC_APP)
  : resolve(root, "..", "artikelkalkulation");

function laden() {
  const datei = resolve(app, "web/content/eigene/texte.ts");
  if (!existsSync(datei)) {
    // Lieber laut abbrechen als eine halbe Erklaerung veroeffentlichen.
    console.error(`✗ Quelle nicht gefunden: ${datei}`);
    console.error(`  Das App-Projekt wird unter ${app} erwartet.`);
    console.error(`  Anderer Ort? PRICECALC_APP=/pfad/zur/app node scripts/build-rechtstexte.mjs`);
    process.exit(1);
  }
  const ts = readFileSync(datei, "utf8");
  const stand = ts.match(/EIGENE_TEXTE_STAND = (".*?");/);
  const start = ts.indexOf("= {", ts.indexOf("EIGENE_TEXTE:"));
  if (!stand || start < 0) {
    console.error(`✗ ${datei} hat nicht den erwarteten Aufbau (EIGENE_TEXTE_STAND, EIGENE_TEXTE).`);
    process.exit(1);
  }
  return { stand: JSON.parse(stand[1]), texte: JSON.parse(ts.slice(start + 2).replace(/;\s*$/, "")) };
}

const UI = {
  de: {
    asset: "assets", skip: "Zum Inhalt springen", stand: "Stand",
    seitentitel: "Datenschutzerklärung der App – PriceCalc Pro",
    h1: "Datenschutzerklärung der App PriceCalc Pro",
    hinweis: `Diese Erklärung betrifft die <strong>Shopify-App PriceCalc Pro</strong>. Für den Besuch der Website
          pricecalcpro.de gilt deren eigene <a href="datenschutz.html">Datenschutzerklärung</a>.`,
    fuss: `<a href="impressum.html">Impressum</a>`,
  },
  en: {
    asset: "../assets", skip: "Skip to content", stand: "Last updated",
    seitentitel: "App Privacy Policy – PriceCalc Pro",
    h1: "Privacy Policy of the App PriceCalc Pro",
    hinweis: `This policy concerns the <strong>Shopify app PriceCalc Pro</strong>. Visits to the website
          pricecalcpro.de are governed by its own <a href="datenschutz.html">privacy policy</a>.`,
    fuss: `<a href="impressum.html">Legal notice</a>`,
  },
};

const slug = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Erste <h2> ist der Titel des Texts (wird zur h1), die uebrigen bekommen Anker; h2 danach = Modul-Teil. */
function inhalt(html) {
  const ohneTitel = html.trim().replace(/^<h2>[\s\S]*?<\/h2>\s*/, "");
  const vergeben = new Set();
  return ohneTitel.replace(/<(h[23])>([\s\S]*?)<\/\1>/g, (_, h, text) => {
    let id = slug(text) || h;
    for (let n = 2; vergeben.has(id); n++) id = `${slug(text)}-${n}`;
    vergeben.add(id);
    return `<${h} id="${id}"${h === "h2" ? ' class="teil"' : ""}>${text}</${h}>`;
  });
}

function datenschutzSeite(sprache, html, stand) {
  const u = UI[sprache];
  const koerper = inhalt(html).split("\n").map((z) => (z ? `          ${z}` : z)).join("\n");
  return `<!DOCTYPE html>
<html lang="${sprache}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${u.seitentitel}</title>
  <meta name="robots" content="noindex, follow" />
  <meta name="theme-color" content="#0E1B2E" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="${u.asset}/css/style.css" />
</head>
<body>
  <a class="skip-link" href="#main">${u.skip}</a>
  <header class="site-header">
    <div class="wrap">
      <nav class="nav">
        <a class="brand" href="index.html">
          <img src="${u.asset}/img/logo.png" alt="" width="34" height="34" />
          <span>PriceCalc <span class="pro">Pro</span></span>
        </a>
      </nav>
    </div>
  </header>

  <main id="main" class="legal">
    <div class="wrap">
      <div class="legal-wrap">
        <div class="legal-head">
          <h1>${u.h1}</h1>
          <p class="stand">PriceCalc Pro – Shopify App · ${u.stand}: ${stand}</p>
        </div>

        <div class="legal-note">
          ${u.hinweis}
        </div>

        <div class="legal-card">
${koerper}
        </div>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-bottom" style="border:none;padding-top:0">
        <span>© <span data-year>2026</span> JRMedia · Janine Fabienne Eicker</span>
        <span>${u.fuss}</span>
      </div>
    </div>
  </footer>
  <script src="${u.asset}/js/main.js" defer></script>
</body>
</html>
`;
}

function weiterleitung(sprache) {
  const ziel = sprache === "en" ? `${ORIGIN}/en/` : `${ORIGIN}/`;
  return `<!DOCTYPE html>
<html lang="${sprache}">
<head>
  <meta charset="UTF-8" />
  <title>PriceCalc Pro</title>
  <meta name="robots" content="noindex" />
  <link rel="canonical" href="${ziel}" />
  <meta http-equiv="refresh" content="0; url=${ziel}" />
  <script>location.replace(${JSON.stringify(ziel)});</script>
</head>
<body>
  <p><a href="${ziel}">PriceCalc Pro</a></p>
</body>
</html>
`;
}

const { stand, texte } = laden();
const geschrieben = [];
const schreibe = (pfad, html) => {
  writeFileSync(resolve(root, pfad), html);
  geschrieben.push(pfad);
};

for (const sprache of ["de", "en"]) {
  const html = texte.datenschutz?.[sprache];
  if (!html) {
    console.error(`✗ datenschutz (${sprache}) fehlt in texte.ts - nichts geschrieben.`);
    process.exit(1);
  }
  schreibe(`docs/${sprache === "en" ? "en/" : ""}app-datenschutz.html`, datenschutzSeite(sprache, html, stand));
}
for (const pfad of ["docs/nutzungsbedingungen.html", "docs/haftungsausschluss.html"]) schreibe(pfad, weiterleitung("de"));
for (const pfad of ["docs/en/terms.html", "docs/en/haftungsausschluss.html"]) schreibe(pfad, weiterleitung("en"));

for (const p of geschrieben) console.log(`✓ ${p}`);
console.log(`Stand ${stand}`);
