import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/SpaceMono";
import { CONTENT, fmtEuro } from "./theme";

const { fontFamily: display } = loadDisplay();
const { fontFamily: mono } = loadMono();

export type Lang = "de" | "en";
const C = {
  ink: "#0E1B2E",
  ink2: "#16305c",
  blue: "#5B8DEF",
  blueDeep: "#2563EB",
  green: "#3BD65F",
  greenDeep: "#2FB344",
  mist: "#9FB3CE",
  line: "rgba(159,179,206,0.16)",
  white: "#FFFFFF",
  card: "rgba(255,255,255,0.05)",
  cardBorder: "rgba(159,179,206,0.22)",
};

const eur = (n: number, lang: Lang) =>
  lang === "de"
    ? n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €"
    : "€" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fac = (n: number, lang: Lang) => (lang === "de" ? n.toLocaleString("de-DE", { minimumFractionDigits: 2 }) : n.toFixed(2));

const Grid: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
      backgroundSize: "64px 64px",
      maskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, #000 40%, transparent 78%)",
      WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, #000 40%, transparent 78%)",
      opacity: 0.6,
    }}
  />
);

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: `radial-gradient(120% 130% at 50% 0%, ${C.ink2} 0%, ${C.ink} 62%)`, fontFamily: display, padding: 90, justifyContent: "center" }}>
    <Grid />
    <div style={{ position: "relative" }}>{children}</div>
  </AbsoluteFill>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: mono, fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: C.blue, fontWeight: 700, marginBottom: 18 }}>{children}</div>
);

const Box: React.FC<{ children: React.ReactNode; tone?: "n" | "green"; label?: string }> = ({ children, tone = "n", label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
    {label && <div style={{ fontFamily: display, fontSize: 22, color: C.mist }}>{label}</div>}
    <div
      style={{
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 52,
        color: tone === "green" ? "#EAFBEF" : C.white,
        padding: "20px 30px",
        borderRadius: 18,
        background: tone === "green" ? "linear-gradient(160deg, rgba(47,179,68,0.22), rgba(47,179,68,0.06))" : C.card,
        border: `1.5px solid ${tone === "green" ? "rgba(59,214,95,0.5)" : C.cardBorder}`,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  </div>
);
const Op: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: mono, fontSize: 46, color: C.blue, fontWeight: 700, padding: "0 4px", alignSelf: "flex-end", marginBottom: 22 }}>{children}</div>
);

// ---- Graphic 1: calculation factor ----------------------------------------
export const FactorGraphic: React.FC<{ lang?: Lang }> = ({ lang = "de" }) => {
  const t =
    lang === "de"
      ? { eye: "So findest du deinen Faktor", a: "Faktor aus bestehenden Preisen ableiten", b: "…oder Verkaufspreis aus dem Faktor berechnen", vk: "VK", ek: "EK", f: "Faktor" }
      : { eye: "How to find your factor", a: "Derive the factor from existing prices", b: "…or calculate the sell price from the factor", vk: "Sale", ek: "Cost", f: "Factor" };
  const EK = 15.94, F = 2.3, VK = 36.66;
  return (
    <Shell>
      <Eyebrow>{t.eye}</Eyebrow>
      <div style={{ display: "flex", flexDirection: "column", gap: 46 }}>
        <div>
          <div style={{ fontSize: 26, color: C.white, fontWeight: 600, marginBottom: 16 }}>{t.a}</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 22 }}>
            <Box label={t.vk}>{eur(VK, lang)}</Box><Op>÷</Op><Box label={t.ek}>{eur(EK, lang)}</Box><Op>=</Op><Box tone="green" label={t.f}>×{fac(F, lang)}</Box>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 26, color: C.white, fontWeight: 600, marginBottom: 16 }}>{t.b}</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 22 }}>
            <Box label={t.ek}>{eur(EK, lang)}</Box><Op>×</Op><Box label={t.f}>{fac(F, lang)}</Box><Op>=</Op><Box tone="green" label={t.vk}>{eur(VK, lang)}</Box>
          </div>
        </div>
      </div>
    </Shell>
  );
};

// ---- Graphic 2: markup vs. margin -----------------------------------------
export const MarginGraphic: React.FC<{ lang?: Lang }> = ({ lang = "de" }) => {
  const t =
    lang === "de"
      ? { eye: "Aufschlag ≠ Handelsspanne", ek: "EK", vk: "VK", profit: "Gewinn", mTitle: "Aufschlag", mSub: "bezogen auf den Einkaufspreis", sTitle: "Handelsspanne", sSub: "bezogen auf den Verkaufspreis", note: "Gleicher Gewinn (15 €) — unterschiedliche Prozentbasis." }
      : { eye: "Markup ≠ Margin", ek: "Cost", vk: "Sale", profit: "Profit", mTitle: "Markup", mSub: "based on the cost price", sTitle: "Margin", sSub: "based on the sell price", note: "Same profit (€15) — different percentage base." };
  const EK = 10, VK = 25;
  const card = (title: string, sub: string, formula: string, val: string, tone: "blue" | "green") => (
    <div style={{ flex: 1, background: C.card, border: `1.5px solid ${tone === "green" ? "rgba(59,214,95,0.5)" : "rgba(91,141,239,0.5)"}`, borderRadius: 22, padding: "34px 36px" }}>
      <div style={{ fontFamily: mono, fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: tone === "green" ? C.green : C.blue, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 23, color: C.mist, marginTop: 6 }}>{sub}</div>
      <div style={{ fontFamily: mono, fontSize: 30, color: C.white, marginTop: 26 }}>{formula}</div>
      <div style={{ fontFamily: display, fontWeight: 700, fontSize: 92, color: tone === "green" ? "#EAFBEF" : "#EAF1FF", marginTop: 8 }}>{val}</div>
    </div>
  );
  return (
    <Shell>
      <Eyebrow>{t.eye}</Eyebrow>
      <div style={{ display: "flex", alignItems: "center", gap: 22, fontFamily: mono, fontSize: 34, color: C.white, marginBottom: 30 }}>
        <span style={{ color: C.mist }}>{t.ek} {eur(EK, lang)}</span>
        <span style={{ color: C.blue }}>→</span>
        <span>{t.vk} {eur(VK, lang)}</span>
        <span style={{ color: C.greenDeep, fontSize: 26, background: "rgba(47,179,68,0.16)", color: C.green, padding: "6px 16px", borderRadius: 999 }}>{t.profit} {eur(VK - EK, lang)}</span>
      </div>
      <div style={{ display: "flex", gap: 26 }}>
        {card(t.mTitle, t.mSub, "(" + t.vk + " − " + t.ek + ") ÷ " + t.ek, lang === "de" ? "150 %" : "150%", "blue")}
        {card(t.sTitle, t.sSub, "(" + t.vk + " − " + t.ek + ") ÷ " + t.vk, lang === "de" ? "60 %" : "60%", "green")}
      </div>
      <div style={{ fontSize: 24, color: C.mist, marginTop: 28, textAlign: "center" }}>{t.note}</div>
    </Shell>
  );
};

// ---- Graphic 3: 5-step chain (pillar) -------------------------------------
export const StepGraphic: React.FC<{ lang?: Lang }> = ({ lang = "de" }) => {
  const chain = CONTENT[lang].chain;
  return (
    <Shell>
      <Eyebrow>{lang === "de" ? "5-stufige Kalkulation" : "5-step calculation"}</Eyebrow>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 10 }}>
        {chain.map((s, i) => (
          <React.Fragment key={s.key}>
            {s.op && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 92 }}>
                <div style={{ fontFamily: mono, fontSize: 20, color: C.blue, fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>{s.op}</div>
                <div style={{ color: C.blue, fontSize: 30 }}>→</div>
              </div>
            )}
            <div
              style={{
                width: 216,
                padding: "22px 18px",
                borderRadius: 18,
                textAlign: "center",
                background: s.highlight ? "linear-gradient(160deg, rgba(47,179,68,0.22), rgba(47,179,68,0.06))" : C.card,
                border: `1.5px solid ${s.highlight ? "rgba(59,214,95,0.5)" : C.cardBorder}`,
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 18, letterSpacing: 1.5, textTransform: "uppercase", color: s.highlight ? C.green : C.mist, fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontFamily: mono, fontSize: 38, fontWeight: 700, color: s.highlight ? "#EAFBEF" : C.white, margin: "8px 0 4px" }}>{fmtEuro(s.value, lang)}</div>
              <div style={{ fontSize: 17, color: C.mist }}>{s.sub}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ fontSize: 24, color: C.mist, marginTop: 34, textAlign: "center" }}>
        {lang === "de" ? "Vom Einkaufspreis zum Bruttopreis — jede Stufe sichtbar." : "From cost price to gross price — every step visible."}
      </div>
    </Shell>
  );
};

// ---- Graphic 4: VAT (net → gross) -----------------------------------------
export const VatGraphic: React.FC<{ lang?: Lang }> = ({ lang = "de" }) => {
  const t =
    lang === "de"
      ? { eye: "Netto → Brutto", net: "Nettopreis", gross: "Bruttopreis", normal: "Normalsatz 19 %", reduced: "Ermäßigt 7 %", note: "Netto × (1 + Steuersatz) = Brutto" }
      : { eye: "Net → Gross", net: "Net price", gross: "Gross price", normal: "Standard 19%", reduced: "Reduced 7%", note: "Net × (1 + tax rate) = Gross" };
  const NET = 19.48;
  const row = (label: string, mult: string, gross: number, tone: "blue" | "green") => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
      <Box label={t.net}>{eur(NET, lang)}</Box>
      <Op>×</Op>
      <Box label={label}>{mult}</Box>
      <Op>=</Op>
      <Box tone={tone === "green" ? "green" : "n"} label={t.gross}>{eur(gross, lang)}</Box>
    </div>
  );
  return (
    <Shell>
      <Eyebrow>{t.eye}</Eyebrow>
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {row(t.normal, "1,19", 23.2, "green")}
        {row(t.reduced, "1,07", 20.84, "blue")}
      </div>
      <div style={{ fontFamily: mono, fontSize: 24, color: C.mist, marginTop: 30, textAlign: "center" }}>{t.note}</div>
    </Shell>
  );
};

// ---- Graphic 5: rounding --------------------------------------------------
export const RoundingGraphic: React.FC<{ lang?: Lang }> = ({ lang = "de" }) => {
  const t =
    lang === "de"
      ? { eye: "Preise sauber runden", raw: "Berechnet", note: "Immer nach der MwSt runden." }
      : { eye: "Round prices cleanly", raw: "Calculated", note: "Always round after VAT." };
  const chip = (v: string, label: string, hot?: boolean) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 46, color: hot ? "#EAFBEF" : C.white, padding: "16px 24px", borderRadius: 16, background: hot ? "linear-gradient(160deg, rgba(47,179,68,0.22), rgba(47,179,68,0.06))" : C.card, border: `1.5px solid ${hot ? "rgba(59,214,95,0.5)" : C.cardBorder}` }}>{v}</div>
      <div style={{ fontSize: 20, color: C.mist }}>{label}</div>
    </div>
  );
  return (
    <Shell>
      <Eyebrow>{t.eye}</Eyebrow>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        {chip(eur(23.17, lang), t.raw)}
        <div style={{ color: C.blue, fontSize: 40 }}>→</div>
        {chip(eur(23.2, lang), "0,05 €", true)}
        {chip(eur(23, lang), "1,00 €")}
        {chip(lang === "de" ? "22,99 €" : "€22.99", "x,99")}
      </div>
      <div style={{ fontSize: 24, color: C.mist, marginTop: 32, textAlign: "center" }}>{t.note}</div>
    </Shell>
  );
};

// ---- Graphic 6: cash discount (Skonto) buffer -----------------------------
export const SkontoGraphic: React.FC<{ lang?: Lang }> = ({ lang = "de" }) => {
  const t =
    lang === "de"
      ? { eye: "Skonto einkalkulieren", base: "Zielpreis", buf: "Puffer", price: "Listenpreis", after: "nach 3 % Skonto", note: "Zielpreis ÷ (1 − Skonto %) = Listenpreis. So bleibt die Marge auch nach Nachlass." }
      : { eye: "Factor in cash discount", base: "Target", buf: "Buffer", price: "List price", after: "after 3% discount", note: "Target ÷ (1 − discount %) = list price. The margin holds even after the discount." };
  return (
    <Shell>
      <Eyebrow>{t.eye}</Eyebrow>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
        <Box label={t.base}>{eur(100, lang)}</Box>
        <Op>÷</Op>
        <Box label={t.buf}>(1 − 3 %)</Box>
        <Op>=</Op>
        <Box tone="green" label={t.price}>{eur(103.09, lang)}</Box>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 26, fontFamily: mono, fontSize: 26, color: C.mist }}>
        <span>{eur(103.09, lang)}</span>
        <span style={{ color: C.blue }}>− 3 % =</span>
        <span style={{ color: C.green }}>{eur(100, lang)} <span style={{ color: C.mist, fontSize: 22 }}>({t.after})</span></span>
      </div>
      <div style={{ fontSize: 23, color: C.mist, marginTop: 30, maxWidth: 1100 }}>{t.note}</div>
    </Shell>
  );
};
