# pricecalcpro.de — Produktseite

Die Website zur Shopify-App **PriceCalc Pro**. Das ist die Seite, die zählt:
Hier wird die App erklärt, hier liegen die Rechtstexte, hier steht der Ratgeber.
Statisch, zweisprachig, ausgeliefert über GitHub Pages aus `docs/`.

## Grenze — das Wichtigste

**Diese Seite folgt dem Programm, nicht umgekehrt.** Ändert sich etwas an der
App — eine Funktion, ein Plan, ein Preis, eine Datenschutzangabe — dann ist es
Aufgabe des Programm-Projekts (`../artikelkalkulation`), diese Seite
nachzuziehen. Eine Änderung hier, die es im Programm nicht gibt, ist ein Fehler.

**Zwei Seiten werden erzeugt, nicht geschrieben:** `anleitung.html` und
`app-datenschutz.html` (je auch unter `en/`). Ihr Text steht ebenso in der App
und muss übereinstimmen. Es gibt hier bewusst keine Zweitschrift — die Erzeuger
lesen direkt aus dem App-Projekt. Wer diese Dateien von Hand bearbeitet, bricht
genau das. Siehe README, Abschnitt „Aus der App erzeugte Seiten".

Was hier lebt und was nicht:

| Gehört hierher | Gehört nicht hierher |
|---|---|
| App-Datenschutz, AVV, Nutzungsbedingungen, Haftungsausschluss | Firmenimpressum als Zweitschrift |
| Bedienungsanleitung, Funktionen, Pläne und Preise | Vorstellung anderer JRMedia-Apps |
| Ratgeber-Artikel rund um Kalkulation | |

## Nachbarprojekte

| Projekt | Rolle |
|---|---|
| `../artikelkalkulation` | das Programm; pflegt Anleitung, App-Datenschutz, Rechtstexte und stößt Aktualisierungen hier an |
| `../web_jrmedia.software` | Firmenseite; verlinkt hierher, hält selbst keine App-Texte |
| `../artikelkalkulation-video` | Videoproduktion; liefert Assets für `docs/assets/media/` |

## Corporate Identity

Das Fundament ist mit den anderen JRMedia-Seiten identisch und wird nicht
einseitig verändert:

- Schriften: Space Grotesk (Display), Inter (Text), Space Mono (Daten)
- Grundton: `--ink: #0e1b2e`, `--text: #1b2740`, `--muted: #55647e`, `--mist: #9fb3ce`
- Maße: `--wrap: 1120px`, `--radius: 16px`, dieselben drei Schattenstufen

Eigen ist dieser Seite der **Produktakzent**: Blau `#2563eb` und das Grün
`#2fb344` aus dem App-Icon, das die Marge markiert. Die Firmenfarben Violett und
Cyan gehören auf jrmedia.software — hier treten sie nur dort auf, wo die Firma
selbst spricht.

Das App-Symbol bleibt in jedem Fall das App-Symbol. Es wird nicht an die
Firmenpalette angeglichen.

## Videos

Die Hero-Animation entsteht mit Remotion aus `src/` (`HeroChain.tsx`,
sprachabhängig über `defaultProps lang`). Videos aus
`../artikelkalkulation-video` dürfen hier eingebunden werden — sie sind in
derselben Markenwelt gebaut. Dass die Seite sich dadurch verändert, ist gewollt.
