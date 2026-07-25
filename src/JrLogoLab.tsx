import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/SpaceMono";

const { fontFamily: display } = loadDisplay();
const { fontFamily: mono } = loadMono();

const C = {
  violet: "#7C5CFC",
  blue: "#3B82F6",
  cyan: "#22D3EE",
  green: "#2FB344",
  teal: "#0EA5A5",
  ink: "#0E1B2E",
  ink2: "#1E293B",
  slate: "#6B7A90",
  slateLight: "#9FB3CE",
  white: "#FFFFFF",
};

const Spark: React.FC<{ size: number; color?: string; glow?: boolean }> = ({ size, color = C.cyan, glow = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ filter: glow ? `drop-shadow(0 0 ${size * 0.3}px ${color})` : "none" }}>
    <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z" fill={color} />
  </svg>
);

// Reusable rounded-square tile with configurable gradient/monogram content.
const Tile: React.FC<{ size: number; grad: string; children: React.ReactNode; radiusRatio?: number; shadow?: boolean; hi?: boolean }> = ({ size, grad, children, radiusRatio = 0.235, shadow = true, hi = true }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: size * radiusRatio, background: grad, boxShadow: shadow ? `0 ${size * 0.05}px ${size * 0.14}px rgba(30,41,80,0.28)` : "none", overflow: "hidden" }}>
      {hi && <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 22% 12%, rgba(255,255,255,0.28), transparent 55%)" }} />}
    </div>
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>{children}</div>
  </div>
);

const VB = `linear-gradient(145deg, ${C.violet}, ${C.blue})`;
const GT = `linear-gradient(145deg, ${C.green}, ${C.teal})`;

// ---- 8 concepts -----------------------------------------------------------

// A — Stacked tile: JR over media (violet→blue)
const ConceptA: React.FC = () => (
  <Tile size={168} grad={VB}>
    <div style={{ fontFamily: display, fontWeight: 700, color: C.white, fontSize: 70, lineHeight: 0.9, letterSpacing: -2 }}>JR</div>
    <div style={{ fontFamily: display, fontWeight: 500, color: "rgba(255,255,255,0.9)", fontSize: 22, letterSpacing: 5, marginTop: 4 }}>MEDIA</div>
    <div style={{ position: "absolute", top: 20, right: 22 }}><Spark size={24} /></div>
  </Tile>
);

// B — Circle badge + wordmark
const ConceptB: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
    <div style={{ position: "relative" }}>
      <Tile size={130} grad={VB} radiusRatio={0.5}>
        <div style={{ fontFamily: display, fontWeight: 700, color: C.white, fontSize: 58, letterSpacing: -2 }}>JR</div>
      </Tile>
      <div style={{ position: "absolute", top: 8, right: 6 }}><Spark size={22} /></div>
    </div>
    <div style={{ fontFamily: display, fontSize: 58, fontWeight: 700, letterSpacing: -2 }}>
      <span style={{ color: C.ink }}>JR</span><span style={{ color: C.slate, fontWeight: 500 }}>media</span>
    </div>
  </div>
);

// C — Wordmark only, spark accent (no tile)
const ConceptC: React.FC = () => (
  <div style={{ position: "relative", fontFamily: display, fontSize: 82, fontWeight: 700, letterSpacing: -3, display: "flex", alignItems: "flex-start" }}>
    <span style={{ color: C.ink }}>JR</span>
    <span style={{ color: C.blue, fontWeight: 500 }}>media</span>
    <span style={{ marginLeft: 6, marginTop: 6 }}><Spark size={26} /></span>
  </div>
);

// D — Green/teal family stacked tile
const ConceptD: React.FC = () => (
  <Tile size={168} grad={GT}>
    <div style={{ fontFamily: display, fontWeight: 700, color: C.white, fontSize: 70, lineHeight: 0.9, letterSpacing: -2 }}>JR</div>
    <div style={{ fontFamily: display, fontWeight: 500, color: "rgba(255,255,255,0.92)", fontSize: 22, letterSpacing: 5, marginTop: 4 }}>MEDIA</div>
    <div style={{ position: "absolute", top: 20, right: 22 }}><Spark size={24} color="#EAFBEF" glow={false} /></div>
  </Tile>
);

// E — Mono / tech: dark tile with cursor, mono wordmark
const ConceptE: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
    <Tile size={130} grad={`linear-gradient(145deg, ${C.ink2}, ${C.ink})`} radiusRatio={0.28}>
      <div style={{ display: "flex", alignItems: "baseline", fontFamily: mono, fontWeight: 700, color: C.white, fontSize: 50 }}>
        JR<span style={{ color: C.cyan, marginLeft: 3 }}>_</span>
      </div>
    </Tile>
    <div style={{ fontFamily: mono, fontSize: 46, fontWeight: 700 }}>
      <span style={{ color: C.ink }}>JR</span><span style={{ color: C.cyan }}>media</span>
    </div>
  </div>
);

// F — Pill "media"
const ConceptF: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: display }}>
    <span style={{ fontSize: 74, fontWeight: 700, color: C.ink, letterSpacing: -3 }}>JR</span>
    <span style={{ fontSize: 40, fontWeight: 600, color: C.white, background: VB, padding: "8px 22px", borderRadius: 999, letterSpacing: -0.5 }}>media</span>
  </div>
);

// G — Dark minimal stacked tile
const ConceptG: React.FC = () => (
  <Tile size={168} grad={`linear-gradient(160deg, #101B30, ${C.ink})`} hi={false}>
    <div style={{ fontFamily: display, fontWeight: 700, fontSize: 70, lineHeight: 0.9, letterSpacing: -2 }}>
      <span style={{ color: "#A78BFA" }}>J</span><span style={{ color: C.white }}>R</span>
    </div>
    <div style={{ fontFamily: display, fontWeight: 500, color: C.slateLight, fontSize: 22, letterSpacing: 5, marginTop: 4 }}>MEDIA</div>
    <div style={{ position: "absolute", top: 20, right: 22 }}><Spark size={22} color="#A78BFA" /></div>
  </Tile>
);

// H — Divider stacked (rule between JR and media)
const ConceptH: React.FC = () => (
  <Tile size={168} grad={VB}>
    <div style={{ fontFamily: display, fontWeight: 700, color: C.white, fontSize: 68, lineHeight: 1, letterSpacing: -2 }}>JR</div>
    <div style={{ width: 78, height: 2, background: "rgba(255,255,255,0.5)", margin: "8px 0" }} />
    <div style={{ fontFamily: display, fontWeight: 500, color: C.white, fontSize: 20, letterSpacing: 4 }}>media</div>
    <div style={{ position: "absolute", top: 18, right: 20 }}><Spark size={20} /></div>
  </Tile>
);

const CONCEPTS = [
  { id: "A", name: "Stacked · Violett→Blau", dark: false, el: <ConceptA /> },
  { id: "B", name: "Kreis-Badge + Wortmarke", dark: false, el: <ConceptB /> },
  { id: "C", name: "Nur Wortmarke + Spark", dark: false, el: <ConceptC /> },
  { id: "D", name: "Grün/Teal (PriceCalc-Familie)", dark: false, el: <ConceptD /> },
  { id: "E", name: "Mono / Tech", dark: false, el: <ConceptE /> },
  { id: "F", name: "media-Pill", dark: false, el: <ConceptF /> },
  { id: "G", name: "Dunkel · minimal", dark: true, el: <ConceptG /> },
  { id: "H", name: "Stacked mit Trennlinie", dark: false, el: <ConceptH /> },
];

export const JrLogoLab: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#EEF3FA", fontFamily: display, padding: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 30 }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: C.ink }}>JRmedia — Logo-Konzepte</div>
        <div style={{ fontSize: 22, color: C.slate }}>8 Richtungen · wähle eine, dann verfeinere ich sie</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26 }}>
        {CONCEPTS.map((c) => (
          <div key={c.id} style={{ position: "relative", height: 300, borderRadius: 20, background: c.dark ? C.ink : C.white, border: `1px solid ${c.dark ? "#243350" : "#DCE6F3"}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(16,34,60,0.06)" }}>
            <div style={{ position: "absolute", top: 16, left: 20, fontFamily: mono, fontSize: 15, fontWeight: 700, color: c.dark ? C.slateLight : C.slate }}>
              {c.id} · {c.name}
            </div>
            {c.el}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
