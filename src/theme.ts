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

// The calculation chain shown in the app (real values from the product).
export type Stage = {
  key: string;
  label: string;
  sub: string;
  value: number; // in euro
  op: string | null; // operation reaching this stage
  highlight?: boolean;
};

export const CHAIN: Stage[] = [
  { key: "ek", label: "EK", sub: "Einkaufspreis", value: 15.94, op: null },
  { key: "einstand", label: "Einstand", sub: "Bezugskosten", value: 15.97, op: "+ 0,2 %" },
  { key: "bar", label: "Barpreis", sub: "Handlung + Gewinn", value: 18.12, op: "+ 6 % · + 7 %" },
  { key: "netto", label: "Nettopreis", sub: "Puffer / Skonto", value: 19.48, op: "+ 7 %" },
  { key: "brutto", label: "Bruttopreis", sub: "inkl. MwSt", value: 23.2, op: "+ 19 %", highlight: true },
];

export const fmtEuro = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
