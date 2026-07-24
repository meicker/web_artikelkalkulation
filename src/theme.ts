// Shared design tokens for PriceCalc Pro promo videos.
// Kept in sync with the website's CSS custom properties.
export const COLORS = {
  ink: "#0E1B2E", // deep navy base
  ink2: "#12233d",
  ink3: "#1A3A70",
  blue: "#2563EB", // primary (matches the app)
  blueLight: "#5B8DEF",
  green: "#2FB344", // "ledger" green — the margin / result accent (from the logo)
  greenSoft: "#3BD65F",
  paper: "#F5F8FC",
  mist: "#9FB3CE",
  line: "rgba(159,179,206,0.18)",
  white: "#FFFFFF",
};

export const FONT_DISPLAY = "Space Grotesk";
export const FONT_MONO = "Space Mono";

export type Lang = "de" | "en";

export type Stage = {
  key: string;
  label: string;
  sub: string;
  value: number; // in euro
  op: string | null; // operation reaching this stage
  highlight?: boolean;
};

// The calculation chain shown in the app (real values from the product).
const CHAIN_DE: Stage[] = [
  { key: "ek", label: "EK", sub: "Einkaufspreis", value: 15.94, op: null },
  { key: "einstand", label: "Einstand", sub: "Bezugskosten", value: 15.97, op: "+ 0,2 %" },
  { key: "bar", label: "Barpreis", sub: "Handlung + Gewinn", value: 18.12, op: "+ 6 % · + 7 %" },
  { key: "netto", label: "Nettopreis", sub: "Puffer / Skonto", value: 19.48, op: "+ 7 %" },
  { key: "brutto", label: "Bruttopreis", sub: "inkl. MwSt", value: 23.2, op: "+ 19 %", highlight: true },
];

const CHAIN_EN: Stage[] = [
  { key: "ek", label: "Cost", sub: "Purchase price", value: 15.94, op: null },
  { key: "einstand", label: "Landed", sub: "Freight", value: 15.97, op: "+ 0.2%" },
  { key: "bar", label: "Base", sub: "Handling + Margin", value: 18.12, op: "+ 6% · + 7%" },
  { key: "netto", label: "Net", sub: "Buffer / discount", value: 19.48, op: "+ 7%" },
  { key: "brutto", label: "Gross", sub: "incl. VAT", value: 23.2, op: "+ 19%", highlight: true },
];

export const fmtEuro = (n: number, lang: Lang = "de") =>
  lang === "de"
    ? n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"
    : "€" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const CONTENT = {
  de: {
    chain: CHAIN_DE,
    tagline: "Kalkulation, die in Shopify rechnet",
    headA: "Vom Einkauf zum ",
    headAccent: "richtigen Preis",
    sub: "5-stufige Kalkulation — direkt in Shopify, verständlich Schritt für Schritt.",
    badge: "Marge sichtbar",
    from: "EK 15,94 €",
    to: "VK 23,20 €",
    ogHeadA: "Preiskalkulation, die in ",
    ogHeadAccent: "Shopify",
    ogHeadB: " rechnet.",
    ogSub: "Einkaufspreise, Kalkulationsfaktoren & 5-stufige Verkaufspreis-Kalkulation — mit vollständiger Datensicherung.",
  },
  en: {
    chain: CHAIN_EN,
    tagline: "Pricing that calculates inside Shopify",
    headA: "From cost to the ",
    headAccent: "right price",
    sub: "A 5-step calculation — right inside Shopify, clear at every step.",
    badge: "Margin, visible",
    from: "Cost €15.94",
    to: "Sale €23.20",
    ogHeadA: "Pricing that calculates inside ",
    ogHeadAccent: "Shopify",
    ogHeadB: ".",
    ogSub: "Purchase prices, calculation factors & a 5-step sell-price calculation — with full data backup.",
  },
} as const;

// Backwards-compatible default (German chain).
export const CHAIN = CHAIN_DE;
