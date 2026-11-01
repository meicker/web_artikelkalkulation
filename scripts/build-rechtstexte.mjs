// Erzeugt die oeffentlichen Rechtstexte der App aus der EINEN Quelle im
// App-Projekt: <app>/web/content/eigene/texte.ts (selbst erzeugt von
// legal/rechtstexte/zusammensetzen.mjs aus Kern-Texten + App-Modul). Genau
// diese Texte setzt der Admin der App per "Eigenen Text einsetzen" ein und
// veroeffentlicht sie - Website und App zeigen damit denselben Wortlaut.
//
//   AGB          -> docs/nutzungsbedingungen.html + docs/en/terms.html
//   Datenschutz  -> docs/app-datenschutz.html     + docs/en/app-datenschutz.html
//   Impressum    -> docs/impressum.html           + docs/en/impressum.html
//   Haftungsausschluss -> Hinweisseite (in den AGB aufgegangen, Ziffer 13/14)
//
// Die Dateinamen bleiben, weil Listing, App und alte Links auf sie zeigen.
// Ersetzt build-terms.mjs und build-privacy.mjs (lasen die alten JSON-Texte).
//
// Lauf: node scripts/build-rechtstexte.mjs
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
    // Lieber laut abbrechen als halbe Rechtstexte veroeffentlichen.
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

// ---- Seitenhuelle ---------------------------------------------------------
// Webseiten-Beiwerk (Navigation, Fusszeile, Hinweiskasten) - gehoert nicht in
// die Quelle, weil es in der App keine Entsprechung hat.
const FUSS = {
  de: `<a href="impressum.html">Impressum</a> · <a href="datenschutz.html">Website-Datenschutz</a> · <a href="app-datenschutz.html">App-Datenschutz</a> · <a href="nutzungsbedingungen.html">AGB</a> · <a href="avv.html">AVV</a>`,
  en: `<a href="impressum.html">Legal notice</a> · <a href="datenschutz.html">Website Privacy</a> · <a href="app-datenschutz.html">App Privacy</a> · <a href="terms.html">Terms of Service</a> · <a href="dpa.html">DPA</a>`,
};
const SPRACHE = {
  de: { asset: "assets", homeCrumb: "‹ Startseite", homeBtn: "← Zur Startseite", skip: "Zum Inhalt springen", nav: "Hauptnavigation", stand: "Stand" },
  en: { asset: "../assets", homeCrumb: "‹ Home", homeBtn: "← Home", skip: "Skip to content", nav: "Main navigation", stand: "Last updated" },
};

const SEITEN = {
  agb: {
    datei: { de: "nutzungsbedingungen.html", en: "terms.html" },
    titel: { de: "📘 Allgemeine Geschäftsbedingungen", en: "📘 Terms of Service" },
    seitentitel: { de: "AGB – PriceCalc Pro", en: "Terms of Service – PriceCalc Pro" },
    beschreibung: {
      de: "Allgemeine Geschäftsbedingungen der Shopify-App PriceCalc Pro: Leistungen, Pläne und Abrechnung über Shopify, Artikel-Kontingent, Laufzeit, Haftung und Gerichtsstand.",
      en: "Terms of Service of the Shopify app PriceCalc Pro: services, plans and billing through Shopify, item allowance, term, liability and jurisdiction.",
    },
    hinweis: {
      de: `Diese AGB gelten für die <strong>Shopify-App PriceCalc Pro</strong> und richten sich ausschließlich an Unternehmer.
          Sie bestehen aus den allgemeinen Bestimmungen und dem App-Modul (Teil A). Ergänzend gilt die
          <a href="app-datenschutz.html">App-Datenschutzerklärung</a>.`,
      en: `These Terms of Service apply to the <strong>Shopify app PriceCalc Pro</strong> and are directed exclusively at businesses.
          They consist of the general provisions and the App Module (Part A). The
          <a href="app-datenschutz.html">App Privacy Policy</a> applies in addition.`,
    },
  },
  datenschutz: {
    datei: { de: "app-datenschutz.html", en: "app-datenschutz.html" },
    titel: { de: "🔒 App-Datenschutzerklärung", en: "🔒 App Privacy Policy" },
    seitentitel: { de: "App-Datenschutzerklärung – PriceCalc Pro", en: "App Privacy Policy – PriceCalc Pro" },
    beschreibung: {
      de: "Datenschutzerklärung der Shopify-App PriceCalc Pro: verarbeitete Daten, Rechtsgrundlagen, Auftragsverarbeiter, Speicherdauer und Betroffenenrechte.",
      en: "Privacy policy of the Shopify app PriceCalc Pro: data processed, legal bases, processors, retention and data subject rights.",
    },
    hinweis: {
      de: `Diese Datenschutzerklärung betrifft die <strong>Shopify-App PriceCalc Pro</strong>. Für den Besuch dieser
          Website gilt die <a href="datenschutz.html">Website-Datenschutzerklärung</a>.`,
      en: `This privacy policy concerns the <strong>Shopify app PriceCalc Pro</strong>. For visits to this
          website, the <a href="datenschutz.html">website privacy policy</a> applies.`,
    },
  },
  impressum: {
    datei: { de: "impressum.html", en: "impressum.html" },
    titel: { de: "Impressum", en: "Legal Notice" },
    seitentitel: { de: "Impressum – PriceCalc Pro", en: "Legal Notice – PriceCalc Pro" },
    beschreibung: {
      de: "Impressum von PriceCalc Pro – Anbieterangaben nach § 5 DDG.",
      en: "Legal notice of PriceCalc Pro – provider information according to Section 5 DDG.",
    },
    hinweis: null,
  },
};

const slug = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Erste <h2> ist der Titel des Texts (wird zur h1), die uebrigen bekommen Anker. */
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

function seite({ sprache, datei, andere, titel, seitentitel, beschreibung, hinweis, stand, koerper }) {
  const u = SPRACHE[sprache];
  const url = (sp, d) => `${ORIGIN}/${sp === "en" ? "en/" : ""}${d}`;
  const de = url("de", andere.de), en = url("en", andere.en);
  const langLi =
    sprache === "de"
      ? `<span class="active" aria-current="true">DE</span><a href="en/${andere.en}" hreflang="en">EN</a>`
      : `<a href="../${andere.de}" hreflang="de">DE</a><span class="active" aria-current="true">EN</span>`;
  return `<!DOCTYPE html>
<html lang="${sprache}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${seitentitel}</title>
  <meta name="description" content="${beschreibung}" />
  <link rel="canonical" href="${url(sprache, datei)}" />
  <link rel="alternate" hreflang="de" href="${de}" />
  <link rel="alternate" hreflang="en" href="${en}" />
  <link rel="alternate" hreflang="x-default" href="${de}" />
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
        <a class="brand" href="index.html">
          <img src="${u.asset}/img/logo.png" alt="" width="34" height="34" />
          <span>PriceCalc <span class="pro">Pro</span></span>
        </a>
        <ul class="nav-links" id="nav-links" style="display:flex">
          <li class="lang-switch">${langLi}</li>
          <li class="nav-cta"><a class="btn btn-ghost" href="index.html">${u.homeBtn}</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="main" class="legal">
    <div class="wrap">
      <div class="legal-wrap">
        <div class="legal-head">
          <a class="back" href="index.html">${u.homeCrumb}</a>
          <h1>${titel}</h1>
          <p class="stand">PriceCalc Pro – Shopify App · ${u.stand}: ${stand}</p>
        </div>
${hinweis ? `
        <div class="legal-note">
          ${hinweis}
        </div>
` : ""}
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
        <span>${FUSS[sprache]}</span>
      </div>
    </div>
  </footer>
  <script src="${u.asset}/js/main.js" defer></script>
</body>
</html>
`;
}

// Der fruehere Haftungsausschluss ist in den AGB aufgegangen (Ziffern 13 und
// 14). Die Seite bleibt als Wegweiser, damit alte Links nicht ins Leere gehen.
const HAFTUNG = {
  de: {
    titel: "Haftungsausschluss", seitentitel: "Haftungsausschluss – PriceCalc Pro",
    beschreibung: "Der Haftungsausschluss der Shopify-App PriceCalc Pro ist in die AGB aufgegangen.",
    koerper: `          <p>Der frühere Haftungsausschluss zur App PriceCalc Pro ist in die
            <a href="nutzungsbedingungen.html">Allgemeinen Geschäftsbedingungen</a> aufgegangen –
            insbesondere <a href="nutzungsbedingungen.html#13-haftung">Ziffer 13 (Haftung)</a> und
            <a href="nutzungsbedingungen.html#14-keine-beratung">Ziffer 14 (Keine Beratung)</a>.</p>`,
  },
  en: {
    titel: "Disclaimer", seitentitel: "Disclaimer – PriceCalc Pro",
    beschreibung: "The disclaimer of the Shopify app PriceCalc Pro has been incorporated into the Terms of Service.",
    koerper: `          <p>The former disclaimer for the app PriceCalc Pro has been incorporated into the
            <a href="terms.html">Terms of Service</a> – in particular
            <a href="terms.html#13-liability">section 13 (Liability)</a> and
            <a href="terms.html#14-no-advice">section 14 (No advice)</a>.</p>`,
  },
};

const { stand, texte } = laden();
const geschrieben = [];
const schreibe = (sprache, datei, html) => {
  const pfad = `docs/${sprache === "en" ? "en/" : ""}${datei}`;
  writeFileSync(resolve(root, pfad), html);
  geschrieben.push(pfad);
};

for (const [typ, s] of Object.entries(SEITEN)) {
  for (const sprache of ["de", "en"]) {
    const html = texte[typ]?.[sprache];
    if (!html) {
      console.error(`✗ ${typ} (${sprache}) fehlt in texte.ts - nichts geschrieben.`);
      process.exit(1);
    }
    const koerper = inhalt(html).split("\n").map((z) => (z ? `          ${z}` : z)).join("\n");
    schreibe(sprache, s.datei[sprache], seite({
      sprache, datei: s.datei[sprache], andere: s.datei, titel: s.titel[sprache], seitentitel: s.seitentitel[sprache],
      beschreibung: s.beschreibung[sprache], hinweis: s.hinweis?.[sprache], stand, koerper,
    }));
  }
}
for (const sprache of ["de", "en"]) {
  const h = HAFTUNG[sprache];
  schreibe(sprache, "haftungsausschluss.html", seite({
    sprache, datei: "haftungsausschluss.html", andere: { de: "haftungsausschluss.html", en: "haftungsausschluss.html" },
    titel: h.titel, seitentitel: h.seitentitel, beschreibung: h.beschreibung, hinweis: null, stand, koerper: h.koerper,
  }));
}

// Die Wegweiser zeigen auf Anker in den AGB - fehlt einer, stimmt die Ziffer nicht mehr.
for (const [sprache, anker] of [["de", ["13-haftung", "14-keine-beratung"]], ["en", ["13-liability", "14-no-advice"]]]) {
  const agb = readFileSync(resolve(root, `docs/${sprache === "en" ? "en/terms" : "nutzungsbedingungen"}.html`), "utf8");
  for (const a of anker) {
    if (!agb.includes(`id="${a}"`)) {
      console.error(`✗ Anker #${a} fehlt in den AGB (${sprache}) - Wegweiser in HAFTUNG anpassen.`);
      process.exit(1);
    }
  }
}
for (const p of geschrieben) console.log(`✓ ${p}`);
console.log(`Stand ${stand}`);
