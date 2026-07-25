# JRMedia — Branding

Das offizielle JRMedia-Logo: rundes **JR-Badge** (Verlauf Violett→Blau) mit **Cyan-Spark**
und der Wortmarke **JR·media** (Konzept M1). Erstellt & renderbar mit Remotion (`src/JrBrand.tsx`).

## Ordner

```
logo/                          ← das Logo in allen Grundformen
  jrmedia-icon.svg             skalierbares Icon (App-Icon/Favicon/Print)
  jrmedia-icon-1024/512/256.png Icon als PNG (Profilbild-Basis)
  jrmedia-lockup-light.png     horizontale Wortmarke für helle Hintergründe
  jrmedia-lockup-dark.png      horizontale Wortmarke für dunkle Hintergründe
  jrmedia-reveal.mp4           animiertes Logo-Reveal (1080×1080)

social/                        ← fertige Assets je Plattform (richtige Maße)
  youtube/    banner-2560x1440.png · profile-800x800.png
  facebook/   cover-1640x856.png   · profile-1080x1080.png
  instagram/  story-1080x1920.png  · profile-1080x1080.png
  x/          header-1500x500.png  · profile-1080x1080.png
  tiktok/     cover-1080x1920.png  · profile-1080x1080.png

Vorschläge/                    ← frühere Entwürfe & alle anderen Logo-Varianten (Archiv)
```

## Plattform-Maße (Referenz)

| Plattform | Banner/Cover | Profil |
|---|---|---|
| YouTube | 2560×1440 (Safe-Area zentriert) | 800×800 |
| Facebook | 1640×856 | 1080×1080 |
| Instagram | Story 1080×1920 | 1080×1080 |
| X | 1500×500 | 1080×1080 |
| TikTok | 1080×1920 (vertikal) | 1080×1080 |

## Farben

| Rolle | Hex |
|---|---|
| Verlauf Violett | `#7C5CFC` |
| Verlauf Blau | `#3B82F6` |
| „media" (hell / dunkel) | `#3B82F6` / `#7CA8F7` |
| Akzent Cyan (Spark) | `#22D3EE` |
| Hintergrund dunkel | `#0E1B2E` |

**Schrift:** Space Grotesk (700 für „JR", 500 für „media") — gleiche Familie wie PriceCalc Pro.

## Neu rendern / andere Größen

```bash
npx remotion still  JrProfile        marketing/brand/logo/jrmedia-icon-1080.png
npx remotion still  JrLockupLight    marketing/brand/logo/jrmedia-lockup-light.png
npx remotion still  JrLockupDark     marketing/brand/logo/jrmedia-lockup-dark.png
npx remotion still  JrBannerYouTube  marketing/brand/social/youtube/banner-2560x1440.png
npx remotion still  JrBannerFacebook marketing/brand/social/facebook/cover-1640x856.png
npx remotion still  JrBannerX        marketing/brand/social/x/header-1500x500.png
npx remotion still  JrVertical       marketing/brand/social/instagram/story-1080x1920.png
npx remotion render JrReveal         marketing/brand/logo/jrmedia-reveal.mp4 --codec=h264 --crf=20
```

## Nutzung
- Profilbild: `logo/jrmedia-icon-*.png` bzw. `social/<plattform>/profile-*.png` (wird rund beschnitten – passt).
- Freiraum um das Logo lassen (mind. Höhe des Badges). Nicht verzerren.
- Wortmarke je nach Hintergrund hell/dunkel wählen.
