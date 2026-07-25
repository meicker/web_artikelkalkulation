import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";

const { fontFamily: display } = loadDisplay();

const C = { violet: "#7C5CFC", blue: "#3B82F6", cyan: "#22D3EE", ink: "#0E1B2E", slate: "#6B7A90", white: "#FFFFFF" };
const VB = `linear-gradient(145deg, ${C.violet}, ${C.blue})`;

const Spark: React.FC<{ size: number; color?: string }> = ({ size, color = C.cyan }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 ${size * 0.3}px ${color})` }}>
    <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z" fill={color} />
  </svg>
);

const Badge: React.FC<{ size: number; spark?: boolean; dark?: boolean }> = ({ size, spark = true }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: VB, boxShadow: `0 ${size * 0.05}px ${size * 0.14}px rgba(30,41,80,0.3)`, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 26% 16%, rgba(255,255,255,0.30), transparent 55%)" }} />
    </div>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontWeight: 700, color: C.white, fontSize: size * 0.44, letterSpacing: -size * 0.03 }}>JR</div>
    {spark && <div style={{ position: "absolute", top: size * 0.04, right: size * 0.0 }}><Spark size={size * 0.2} /></div>}
  </div>
);

const media = (size: number, color: string, weight = 500) => (
  <span style={{ fontFamily: display, fontWeight: weight, fontSize: size, letterSpacing: -size * 0.02, color }}>media</span>
);

// M1 — Badge (JR+Spark) + "media" in Electric-Blue, dicht dran
export const Mix1: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <Badge size={128} />
    {media(66, dark ? "#7CA8F7" : C.blue)}
  </div>
);

// M2 — Badge (JR, ohne Spark) + "media" (ink/weiß), Spark hinter media (C-Stil)
export const Mix2: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <Badge size={128} spark={false} />
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {media(66, dark ? C.white : C.ink)}
      <span style={{ marginLeft: 6, marginTop: 6 }}><Spark size={22} /></span>
    </div>
  </div>
);

// M3 — integriert: Badge ersetzt "JR", "media" schließt direkt an
export const Mix3: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
    <Badge size={104} />
    {media(74, dark ? "#7CA8F7" : C.blue, 600)}
  </div>
);

const MIX: Record<string, { name: string; el: (dark: boolean) => React.ReactNode }> = {
  M1: { name: "Badge + media (blau), dicht", el: (d) => <Mix1 dark={d} /> },
  M2: { name: "Badge + media + Spark hinten", el: (d) => <Mix2 dark={d} /> },
  M3: { name: "Integriert: Badge = JR, media direkt an", el: (d) => <Mix3 dark={d} /> },
};

// Comparison sheet: each mix on light + dark.
export const JrMixLab: React.FC = () => (
  <AbsoluteFill style={{ background: "#EEF3FA", fontFamily: display, padding: 48 }}>
    <div style={{ fontSize: 38, fontWeight: 700, color: C.ink, marginBottom: 6 }}>JRmedia — B + C Mischungen</div>
    <div style={{ fontSize: 22, color: C.slate, marginBottom: 28 }}>Badge (aus B) + Wortmarke/Farbe (aus C) · jeweils hell &amp; dunkel</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {Object.entries(MIX).map(([id, m]) => (
        <div key={id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div style={{ position: "relative", height: 250, borderRadius: 20, background: C.white, border: "1px solid #DCE6F3", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", top: 16, left: 20, fontFamily: display, fontSize: 16, fontWeight: 600, color: C.slate }}>{id} · {m.name}</div>
            {m.el(false)}
          </div>
          <div style={{ position: "relative", height: 250, borderRadius: 20, background: C.ink, border: "1px solid #243350", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", top: 16, left: 20, fontFamily: display, fontSize: 16, fontWeight: 600, color: C.slate }}>auf dunkel</div>
            {m.el(true)}
          </div>
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

export const MIX_IDS = Object.keys(MIX);
export const MixSolo: React.FC<{ id?: string; dark?: boolean }> = ({ id = "M1", dark = false }) => (
  <AbsoluteFill style={{ background: dark ? C.ink : "transparent", alignItems: "center", justifyContent: "center" }}>
    {MIX[id].el(dark)}
  </AbsoluteFill>
);
