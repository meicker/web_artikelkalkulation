import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/SpaceMono";
import { COLORS, CONTENT, fmtEuro, Stage, Lang } from "./theme";

const { fontFamily: display } = loadDisplay();
const { fontFamily: mono } = loadMono();

const Grid: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundImage:
        `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)`,
      backgroundSize: "64px 64px",
      maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 75%)",
      WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 75%)",
      opacity: 0.7,
    }}
  />
);

const Node: React.FC<{ stage: Stage; index: number; lang: Lang }> = ({ stage, index, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 18 + index * 20;

  const appear = spring({ frame: frame - delay, fps, config: { damping: 16, mass: 0.7 } });
  const y = interpolate(appear, [0, 1], [40, 0]);
  const opacity = interpolate(appear, [0, 1], [0, 1]);

  const countStart = delay + 4;
  const countProg = interpolate(frame, [countStart, countStart + 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shown = stage.value * countProg;

  const hl = stage.highlight;
  const glow = hl ? interpolate(Math.sin((frame - delay) / 12), [-1, 1], [0.35, 0.7]) : 0;

  return (
    <div
      style={{
        transform: `translateY(${y}px)`,
        opacity,
        width: 286,
        borderRadius: 22,
        padding: "26px 26px 24px",
        background: hl
          ? `linear-gradient(160deg, rgba(47,179,68,0.20), rgba(47,179,68,0.06))`
          : "linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
        border: `1.5px solid ${hl ? "rgba(59,214,95,0.55)" : "rgba(159,179,206,0.22)"}`,
        boxShadow: hl ? `0 0 ${60 + glow * 40}px rgba(47,179,68,${glow})` : "0 18px 40px rgba(0,0,0,0.35)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 15, letterSpacing: 2, textTransform: "uppercase", color: hl ? COLORS.greenSoft : COLORS.mist, fontWeight: 700 }}>
        {stage.label}
      </div>
      <div style={{ fontFamily: mono, fontSize: 46, fontWeight: 700, color: hl ? "#EAFBEF" : COLORS.white, marginTop: 10, fontVariantNumeric: "tabular-nums", letterSpacing: -1 }}>
        {fmtEuro(shown, lang)}
      </div>
      <div style={{ fontFamily: display, fontSize: 16, color: hl ? "rgba(234,251,239,0.7)" : "rgba(159,179,206,0.75)", marginTop: 6 }}>
        {stage.sub}
      </div>
    </div>
  );
};

const Connector: React.FC<{ op: string; index: number }> = ({ op, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 18 + index * 20 - 6;
  const appear = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  const dash = interpolate(appear, [0, 1], [0, 1]);

  return (
    <div style={{ width: 112, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: dash }}>
      <div style={{ fontFamily: mono, fontSize: 14, lineHeight: 1.2, color: COLORS.blueLight, fontWeight: 700, textAlign: "center" }}>
        {op}
      </div>
      <svg width="96" height="14" viewBox="0 0 96 14">
        <line x1="4" y1="7" x2={4 + 76 * dash} y2="7" stroke={COLORS.blue} strokeWidth="2.5" strokeDasharray="2 6" strokeLinecap="round" />
        <path d={`M ${80 * dash} 2 L ${88 * dash} 7 L ${80 * dash} 12`} fill="none" stroke={COLORS.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

export const HeroChain: React.FC<{ lang?: Lang }> = ({ lang = "de" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const c = CONTENT[lang];

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 14, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp" });
  const globalOpacity = Math.min(fadeIn, fadeOut);

  const headline = spring({ frame: frame - 4, fps, config: { damping: 18 } });

  const badgeDelay = 18 + c.chain.length * 20 + 10;
  const badge = spring({ frame: frame - badgeDelay, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 120% at 50% 0%, ${COLORS.ink2} 0%, ${COLORS.ink} 60%)`,
        opacity: globalOpacity,
        fontFamily: display,
      }}
    >
      <Grid />

      {/* Brand row */}
      <div style={{ position: "absolute", top: 64, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 16, opacity: interpolate(headline, [0, 1], [0, 1]), transform: `translateY(${interpolate(headline, [0, 1], [-16, 0])}px)` }}>
        <div style={{ width: 46, height: 46, borderRadius: 12, background: `linear-gradient(150deg, ${COLORS.green}, #1f7d34)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 8px 24px rgba(47,179,68,0.4)" }}>
          🧮
        </div>
        <div style={{ fontFamily: display, fontSize: 30, fontWeight: 700, color: COLORS.white, letterSpacing: -0.5 }}>
          PriceCalc <span style={{ color: COLORS.greenSoft }}>Pro</span>
        </div>
      </div>

      {/* Headline */}
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", opacity: interpolate(headline, [0, 1], [0, 1]) }}>
        <div style={{ fontFamily: display, fontSize: 60, fontWeight: 700, color: COLORS.white, letterSpacing: -1.5, lineHeight: 1.05 }}>
          {c.headA}<span style={{ color: COLORS.blueLight }}>{c.headAccent}</span>
        </div>
        <div style={{ fontFamily: display, fontSize: 24, color: COLORS.mist, marginTop: 16 }}>
          {c.sub}
        </div>
      </div>

      {/* Calculation chain */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", marginTop: 60 }}>
          {c.chain.map((s, i) => (
            <React.Fragment key={s.key}>
              {s.op && <Connector op={s.op} index={i} />}
              <Node stage={s} index={i} lang={lang} />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Margin badge */}
      <div style={{ position: "absolute", bottom: 96, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: interpolate(badge, [0, 1], [0, 1]), transform: `translateY(${interpolate(badge, [0, 1], [24, 0])}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 30px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(159,179,206,0.22)", fontFamily: mono, fontSize: 22, color: COLORS.white }}>
          <span style={{ color: COLORS.mist }}>{c.from}</span>
          <span style={{ color: COLORS.blueLight, fontSize: 26 }}>→</span>
          <span style={{ color: COLORS.greenSoft, fontWeight: 700 }}>{c.to}</span>
          <span style={{ marginLeft: 6, padding: "4px 12px", borderRadius: 999, background: "rgba(47,179,68,0.18)", color: COLORS.greenSoft, fontSize: 17, fontWeight: 700 }}>
            {c.badge}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
