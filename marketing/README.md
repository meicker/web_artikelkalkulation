# Marketing-Assets — PriceCalc Pro

Material für die Bewerbung der App. Nicht Teil der Website (`/docs`).

## Inhalt

- **`app-store-listing.md`** — fertige Textbausteine (DE + EN) für das Shopify-App-Store-Listing:
  Name, Subtitle, Einleitung, Beschreibung, Key Benefits, Suchbegriffe.
- **`clips/promo-vertical-de.mp4`** / **`promo-vertical-en.mp4`** — 9:16-Promo-Clips (1080×1920, ~13 s)
  für Instagram/TikTok Reels, LinkedIn, YouTube Shorts.

## Weitere fertige Assets (in der Website)

- Hero-Videos 16:9: `docs/assets/media/hero-chain.mp4` (DE) / `hero-chain-en.mp4` (EN)
- OG-/Social-Bilder: `docs/assets/img/og.png` (DE) / `og-en.png` (EN)

## Clips neu rendern (Remotion)

```bash
npx remotion render PromoVertical   marketing/clips/promo-vertical-de.mp4 --codec=h264 --crf=20
npx remotion render PromoVerticalEN marketing/clips/promo-vertical-en.mp4 --codec=h264 --crf=20
```

## Kanäle & Vorgehen

Siehe die im Chat besprochene Prioritätenliste: 1) Shopify-App-Store-Listing (ASO) →
2) SEO/Content → 3) Communities (Shopify-DACH, r/shopify, Sellerforum) →
4) LinkedIn + Clips → 5) Agenturen → 6) Google Ads (optional).

Messen ohne Website-Tracking: Shopify Partner Dashboard (Installs) + eigene UTM-Links pro Kanal.
