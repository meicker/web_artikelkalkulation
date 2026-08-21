// Erzeugt docs/sitemap.xml aus den vorhandenen Seiten unter docs/.
// Lauf: node scripts/build-sitemap.mjs
//
// Frueher lag die Sitemap als Handschrift daneben. Sie fuehrte die
// Sprachzuordnung ein zweites Mal - und war dabei unvollstaendiger als das
// Markup. Die hreflang-Angaben stehen deshalb nur noch im HTML, und die Liste
// der Seiten kommt aus dem Verzeichnis statt aus dem Gedaechtnis.
//
// lastmod kommt aus der Versionsverwaltung: das Datum des letzten Commits, der
// die Datei angefasst hat. Wer eine Seite gerade bearbeitet und noch nicht
// eingecheckt hat, bekommt das heutige Datum - sonst stuende in der Sitemap ein
// aelterer Stand als der, der ausgeliefert wird.
//
// changefreq und priority gibt es bewusst nicht mehr: Google wertet beide seit
// Jahren nicht aus.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://www.pricecalcpro.de";
const docs = resolve(root, "docs");

// Seiten, die nicht in die Sitemap gehoeren.
const AUSGENOMMEN = new Set(["404.html"]);

function seiten(dir, pre = "") {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isDirectory()) return seiten(resolve(dir, e.name), `${pre}${e.name}/`);
    if (!e.name.endsWith(".html") || AUSGENOMMEN.has(e.name)) return [];
    return [{ datei: resolve(dir, e.name), pfad: pre + e.name }];
  });
}

const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();

// Ortszeit, nicht UTC: git meldet Commit-Daten in der lokalen Zone, und
// toISOString() wuerde oestlich von Greenwich bis zum Vormittag noch den
// Vortag liefern.
const heute = (() => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
})();

// Eine Datei mit uneingecheckten Aenderungen ist neuer als ihr letzter Commit.
// Bewusst zwei Befehle, die blanke Pfade ausgeben: "status --porcelain" stellt
// jeder Zeile einen zweistelligen Status voran, dessen erstes Zeichen ein
// Leerzeichen sein darf - beim Trimmen der Ausgabe verliert die erste Zeile es
// und der Pfad wird an der falschen Stelle abgeschnitten.
const geaendert = new Set([
  ...git(["diff", "--name-only", "HEAD", "--", "docs"]).split("\n"),
  ...git(["ls-files", "--others", "--exclude-standard", "--", "docs"]).split("\n"),
].filter(Boolean));

function lastmod(datei) {
  const rel = relative(root, datei);
  if (geaendert.has(rel)) return heute;
  const d = git(["log", "-1", "--format=%cs", "--", rel]);
  return d || heute;
}

// Eine Seite ohne <loc>-taugliche Adresse waere ein stiller Ausfall - lieber laut.
function urlVon(pfad) {
  if (pfad === "index.html") return `${ORIGIN}/`;
  if (pfad.endsWith("/index.html")) return `${ORIGIN}/${pfad.slice(0, -"index.html".length)}`;
  return `${ORIGIN}/${pfad}`;
}

const alle = seiten(docs).sort((a, b) => a.pfad.localeCompare(b.pfad));
if (!alle.length) {
  console.error("✗ Keine Seiten unter docs/ gefunden - die Sitemap bliebe leer.");
  process.exit(1);
}

// Das Canonical der Seite ist massgeblich: Weicht es von der errechneten
// Adresse ab, stuende in der Sitemap eine URL, die auf eine andere zeigt.
const eintraege = [];
const abweichend = [];
for (const { datei, pfad } of alle) {
  const html = readFileSync(datei, "utf8");
  const canonical = (html.match(/rel="canonical" href="([^"]+)"/) || [])[1];
  const url = urlVon(pfad);
  if (canonical && canonical !== url) { abweichend.push(`${pfad}: ${url} vs. ${canonical}`); continue; }
  eintraege.push({ url: canonical || url, lastmod: lastmod(datei) });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${eintraege.map((e) => `  <url>\n    <loc>${e.url}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;

writeFileSync(resolve(docs, "sitemap.xml"), xml);
console.log(`✓ docs/sitemap.xml  (${eintraege.length} Seiten)`);
if (abweichend.length) {
  console.log(`\n⚠ ${abweichend.length} Seite(n) uebersprungen - Adresse und Canonical gehen auseinander:`);
  abweichend.forEach((a) => console.log(`    ${a}`));
  console.log(`  Entweder das Canonical berichtigen oder die Seite hier bewusst ausnehmen.`);
  process.exit(1);
}
