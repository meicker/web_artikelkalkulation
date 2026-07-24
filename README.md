# PriceCalc Pro — Website

Marketing- und Informations-Website für die Shopify-App **PriceCalc Pro**
(entwickelt & vertrieben von **JRMedia** / Janine Fabienne Eicker).

Die Seite ist statisch (HTML/CSS/JS, keine Build-Abhängigkeiten) und wird über
**GitHub Pages** aus dem Ordner [`/docs`](./docs) ausgeliefert. Die Promo-Animation
im Hero wird mit **Remotion** gerendert.

## Struktur

```
docs/                     ← die veröffentlichte Website (GitHub Pages Root)
  index.html              ← Startseite (Hero, Funktionen, Kalkulation, Preise, FAQ)
  impressum.html          ← Impressum (JRMedia)
  datenschutz.html        ← Datenschutzerklärung der Website
  app-datenschutz.html    ← Datenschutzerklärung der App
  haftungsausschluss.html ← Haftungsausschluss der App
  assets/
    css/style.css         ← Design-System
    js/main.js            ← Navigation & kleine Interaktionen
    img/                  ← Logo, Screenshots, OG-Bild, Hero-Poster
    media/                ← Remotion-Videos (hero-chain.mp4 / .webm)
src/                      ← Remotion-Quellen für die Promo-Videos
  theme.ts, HeroChain.tsx, OgCard.tsx, Root.tsx
```

## Videos neu rendern (Remotion)

```bash
npm install
npm run dev                                   # Remotion Studio (Vorschau)

# Hero-Animation + Poster + OG-Bild
npx remotion render HeroChain docs/assets/media/hero-chain.mp4 --codec=h264 --crf=20
npx remotion render HeroChain docs/assets/media/hero-chain.webm --codec=vp8
npx remotion still  HeroChain docs/assets/img/hero-poster.jpg --frame=215 --image-format=jpeg --jpeg-quality=88
npx remotion still  OgCard    docs/assets/img/og.png
```

## Lokale Vorschau der Website

```bash
cd docs && python3 -m http.server 8099
# → http://localhost:8099
```

## Deployment (GitHub Pages)

Settings → Pages → Source: **Deploy from a branch** → Branch: `main`, Folder: `/docs`.

## Vor dem Go-Live anpassen

Zwei Platzhalter sind zentral zu ersetzen:

1. **Domain** — überall `https://pricecalcpro.de` (Canonical-URLs, Open-Graph,
   `sitemap.xml`, `robots.txt`). Bei eigener Domain zusätzlich eine `CNAME`-Datei in `docs/` anlegen.
2. **Shopify-App-Store-Link** — die Buttons „In Shopify installieren“ zeigen aktuell auf
   `https://apps.shopify.com/`. Sobald das App-Listing live ist, die echte Listing-URL eintragen
   (`index.html`, mehrere Stellen).

---

PriceCalc Pro ist eine unabhängige Shopify-App und steht in keiner offiziellen Verbindung zu Shopify Inc.
