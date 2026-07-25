// Normalises favicon / icon / manifest links across every HTML page in docs/.
// Root-absolute paths work for both / and /en/ (custom domain serves at root).
// Run: node scripts/fix-icons.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const docs = resolve(root, "docs");

const BLOCK = [
  '  <link rel="icon" href="/favicon.ico" sizes="any" />',
  '  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />',
  '  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
  '  <link rel="manifest" href="/site.webmanifest" />',
].join("\n");

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return p.endsWith(".html") ? [p] : [];
  });
}

let changed = 0;
for (const file of htmlFiles(docs)) {
  let html = readFileSync(file, "utf8");
  // Drop any existing icon / apple-touch / manifest / mask-icon link lines.
  html = html.replace(/^[ \t]*<link[^>]*rel="(?:icon|apple-touch-icon|manifest|mask-icon)"[^>]*>\s*\n/gim, "");
  // Insert the canonical block right before the stylesheet link.
  if (!html.includes('rel="manifest" href="/site.webmanifest"')) {
    html = html.replace(/([ \t]*<link rel="stylesheet")/, `${BLOCK}\n$1`);
  }
  writeFileSync(file, html);
  changed++;
}
console.log(`✓ processed ${changed} HTML files`);
