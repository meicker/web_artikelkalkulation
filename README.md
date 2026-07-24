# PriceCalc Pro — Website

Marketing- und Informations-Website für die Shopify-App **PriceCalc Pro**
(entwickelt & vertrieben von **JRMedia** / Janine Fabienne Eicker).

Die Seite ist statisch (HTML/CSS/JS, keine Build-Abhängigkeiten) und wird über
**GitHub Pages** aus dem Ordner [`/docs`](./docs) ausgeliefert. Sie ist zweisprachig
(Deutsch = Root, Englisch = `/docs/en`). Fonts sind **selbst gehostet** (kein Google-CDN).
Die Promo-Animation im Hero wird mit **Remotion** gerendert.

## Struktur

```
docs/                     ← die veröffentlichte Website (GitHub Pages Root)
  index.html              ← Startseite DE
  impressum.html · datenschutz.html · app-datenschutz.html · haftungsausschluss.html
  en/                     ← englische Version (gleiche Dateinamen)
    index.html · impressum.html · datenschutz.html · app-datenschutz.html · haftungsausschluss.html
  assets/
    css/style.css         ← Design-System
    css/fonts.css         ← @font-face (generiert, siehe scripts/fetch-fonts.mjs)
    js/main.js            ← Navigation & kleine Interaktionen
    fonts/                ← selbst gehostete woff2-Dateien
    img/                  ← Logo, Screenshots, OG-Bilder (de/en), Hero-Poster (de/en)
    media/                ← Remotion-Videos: hero-chain(.mp4/.webm) + hero-chain-en(.mp4/.webm)
  sitemap.xml · robots.txt · .nojekyll
src/                      ← Remotion-Quellen (sprachabhängig via defaultProps lang)
  theme.ts · HeroChain.tsx · OgCard.tsx · Root.tsx
scripts/fetch-fonts.mjs   ← lädt woff2 von Google & generiert docs/assets/css/fonts.css
```

## Fonts aktualisieren (Self-Hosting)

```bash
node scripts/fetch-fonts.mjs
```

Lädt die woff2-Dateien (Space Grotesk, Inter, Space Mono) nach `docs/assets/fonts/`
und schreibt `docs/assets/css/fonts.css`. Zur Laufzeit wird **kein** Google-Server kontaktiert.

## Videos & OG-Bilder rendern (Remotion)

```bash
npm install
npm run dev                         # Remotion Studio (Vorschau)

# Deutsch
npx remotion render HeroChain   docs/assets/media/hero-chain.mp4  --codec=h264 --crf=20
npx remotion render HeroChain   docs/assets/media/hero-chain.webm --codec=vp8
npx remotion still  HeroChain   docs/assets/img/hero-poster.jpg   --frame=215 --image-format=jpeg --jpeg-quality=88
npx remotion still  OgCard      docs/assets/img/og.png

# Englisch
npx remotion render HeroChainEN docs/assets/media/hero-chain-en.mp4  --codec=h264 --crf=20
npx remotion render HeroChainEN docs/assets/media/hero-chain-en.webm --codec=vp8
npx remotion still  HeroChainEN docs/assets/img/hero-poster-en.jpg   --frame=215 --image-format=jpeg --jpeg-quality=88
npx remotion still  OgCardEN    docs/assets/img/og-en.png
```

> Tipp: Befehle immer aus dem Projekt-Root ausführen (nicht aus `docs/`).

## Lokale Vorschau der Website

```bash
cd docs && python3 -m http.server 8099   # → http://localhost:8099
```

## Deployment (GitHub Pages)

Settings → Pages → Source: **Deploy from a branch** → Branch: `main`, Folder: `/docs`.
Live: https://meicker.github.io/web_artikelkalkulation/

## Vor dem Go-Live anpassen

Ein Platzhalter ist noch zentral zu ersetzen:

- **Domain** — überall `https://pricecalcpro.de` (Canonical-URLs, Open-Graph, `hreflang`,
  `sitemap.xml`, `robots.txt`). Bei eigener Domain zusätzlich eine `CNAME`-Datei in `docs/` anlegen.

Der Shopify-App-Store-Link ist bereits gesetzt: `https://apps.shopify.com/pricecalcpro`.

---

PriceCalc Pro ist eine unabhängige Shopify-App und steht in keiner offiziellen Verbindung zu Shopify Inc.
