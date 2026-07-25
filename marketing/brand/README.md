# JRMedia — Brand / Logo

Logo-Assets für JRMedia (Social Media, Web, Print). Entworfen und gerendert mit Remotion
(`src/JrLogo.tsx`).

## Dateien

| Datei | Verwendung |
|---|---|
| `jrmedia-icon-1024.png` / `-512.png` / `-256.png` | Profilbild / App-Icon (quadratisch, transparent) |
| `jrmedia-icon.svg` | Skalierbares Icon (vektor; benötigt Font „Space Grotesk", sonst System-Fallback) |
| `jrmedia-logo-light.png` | Horizontale Wortmarke für **helle** Hintergründe (transparent) |
| `jrmedia-logo-dark.png` | Horizontale Wortmarke für **dunkle** Hintergründe (transparent) |
| `jrmedia-banner.png` | Social-Banner 1584×396 (z. B. LinkedIn-Titelbild) |
| `jrmedia-reveal.mp4` | Animiertes Logo-Reveal 1080×1080 (Intro/Social) |

## Farben

| Rolle | Hex |
|---|---|
| Verlauf Violett | `#7C5CFC` |
| Verlauf Blau | `#3B82F6` |
| Akzent Cyan (Spark) | `#22D3EE` |
| Wortmarke „JR" (hell) | `#0E1B2E` |
| Wortmarke „media" (hell) | `#6B7A90` |
| Wortmarke (dunkel) | `#FFFFFF` / `#9FB3CE` |

## Schrift
**Space Grotesk** (700 für „JR", 500 für „media"). Gleiche Display-Schrift wie PriceCalc Pro –
so bleibt die Marken-Familie konsistent.

## Neu rendern / andere Größen

```bash
npx remotion still JrIcon        marketing/brand/jrmedia-icon-1024.png
npx remotion still JrLockupLight marketing/brand/jrmedia-logo-light.png
npx remotion still JrLockupDark  marketing/brand/jrmedia-logo-dark.png
npx remotion still JrBanner      marketing/brand/jrmedia-banner.png
npx remotion render JrReveal     marketing/brand/jrmedia-reveal.mp4 --codec=h264 --crf=20
```

## Nutzungshinweise
- Genug Freiraum um das Logo lassen (mind. Höhe des Monogramms).
- Icon nicht verzerren; auf farbigen Flächen die Kachel-Version (mit eigenem Verlauf) nutzen.
- Wortmarke je nach Hintergrund hell/dunkel wählen.
