import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/SpaceMono";
import { COLORS, CONTENT, fmtEuro, Stage, Lang } from "./theme";

const { fontFamily: display } = loadDisplay();
const { fontFamily: mono } = loadMono();

const Grid: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundImage: `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)`,
      backgroundSize: "80px 80px",
      maskImage: "radial-gradient(ellipse 70% 55% at 50% 45%, #000 30%, transparent 78%)",
      WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 45%, #000 30%, transparent 78%)",
      opacity: 0.6,
    }}
  />
);

const Row: React.FC<{ stage: Stage; index: number; lang: Lang }> = ({ stage, index, lang }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 60 + index * 20;
  const appear = spring({ frame: frame - delay, fps, config: { damping: 15, mass: 0.7 } });
  const x = interpolate(appear, [0, 1], [-60, 0]);
  const opacity = interpolate(appear, [0, 1], [0, 1]);

  const countStart = delay + 3;
  const prog = interpolate(frame, [countStart, countStart + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shown = stage.value * prog;
  const hl = stage.highlight;
  const glow = hl ? interpolate(Math.sin((frame - delay) / 12), [-1, 1], [0.3, 0.65]) : 0;

  return (
    <div
      style={{
        transform: `translateX(${x}px)`,
        opacity,
        width: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "26px 40px",
        borderRadius: 26,
        background: hl
          ? "linear-gradient(120deg, rgba(47,179,68,0.20), rgba(47,179,68,0.05))"
          : "linear-gradient(120deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
        border: `2px solid ${hl ? "rgba(59,214,95,0.55)" : "rgba(159,179,206,0.22)"}`,
        boxShadow: hl ? `0 0 ${70 + glow * 50}px rgba(47,179,68,${glow})` : "0 16px 36px rgba(0,0,0,0.32)",
      }}
    >
      <div>
        <div style={{ fontFamily: mono, fontSize: 26, letterSpacing: 2, textTransform: "uppercase", color: hl ? COLORS.greenSoft : COLORS.mist, fontWeight: 700 }}>
          {stage.label}
        </div>
        <div style={{ fontFamily: display, fontSize: 26, color: hl ? "rgba(234,251,239,0.75)" : "rgba(159,179,206,0.8)", marginTop: 4 }}>
          {stage.sub}
        </div>
      </div>
      <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 64, color: hl ? "#EAFBEF" : COLORS.white, fontVariantNumeric: "tabular-nums", letterSpacing: -1 }}>
        {fmtEuro(shown, lang)}
      </div>
    </div>
  );
};

const Arrow: React.FC<{ op: string; index: number }> = ({ op, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delay = 60 + index * 20 - 6;
  const a = spring({ frame: frame - delay, fps, config: { damping: 18 } });
  return (
    <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "center", gap: 16, opacity: a }}>
      <span style={{ fontFamily: mono, fontSize: 26, fontWeight: 700, color: COLORS.blueLight }}>{op}</span>
      <span style={{ color: COLORS.blue, fontSize: 34, transform: "rotate(90deg)", display: "inline-block" }}>→</span>
    </div>
  );
};

export const PromoVertical: React.FC<{ lang?: Lang }> = ({ lang = "de" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const c = CONTENT[lang];

  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 14, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const head = spring({ frame: frame - 6, fps, config: { damping: 18 } });
  const ctaDelay = 60 + c.chain.length * 20 + 16;
  const cta = spring({ frame: frame - ctaDelay, fps, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ background: `radial-gradient(130% 90% at 50% 0%, ${COLORS.ink2} 0%, ${COLORS.ink} 62%)`, opacity, fontFamily: display }}>
      <Grid />

      {/* Brand */}
      <div style={{ position: "absolute", top: 90, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 20, opacity: interpolate(head, [0, 1], [0, 1]) }}>
        <div style={{ width: 66, height: 66, borderRadius: 17, background: `linear-gradient(150deg, ${COLORS.green}, #1f7d34)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, boxShadow: "0 8px 24px rgba(47,179,68,0.4)" }}>🧮</div>
        <div style={{ fontSize: 44, fontWeight: 700, color: COLORS.white, letterSpacing: -0.5 }}>PriceCalc <span style={{ color: COLORS.greenSoft }}>Pro</span></div>
      </div>

      {/* Hook headline */}
      <div style={{ position: "absolute", top: 200, left: 0, right: 0, textAlign: "center", padding: "0 70px", transform: `translateY(${interpolate(head, [0, 1], [24, 0])}px)`, opacity: interpolate(head, [0, 1], [0, 1]) }}>
        <div style={{ fontSize: 46, color: COLORS.mist, marginBottom: 14 }}>{c.promoHook}</div>
        <div style={{ fontSize: 76, fontWeight: 700, color: COLORS.white, letterSpacing: -2, lineHeight: 1.05 }}>
          {c.headA}<span style={{ color: COLORS.blueLight }}>{c.headAccent}</span>
        </div>
      </div>

      {/* Vertical chain */}
      <div style={{ position: "absolute", top: 470, bottom: 380, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {c.chain.map((s, i) => (
          <React.Fragment key={s.key}>
            {s.op && <Arrow op={s.op} index={i} />}
            <Row stage={s} index={i} lang={lang} />
          </React.Fragment>
        ))}
      </div>

      {/* CTA */}
      <div style={{ position: "absolute", bottom: 150, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 26, opacity: interpolate(cta, [0, 1], [0, 1]), transform: `translateY(${interpolate(cta, [0, 1], [26, 0])}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: mono, fontSize: 34, color: COLORS.white }}>
          <span style={{ color: COLORS.mist }}>{c.from}</span>
          <span style={{ color: COLORS.blueLight, fontSize: 40 }}>→</span>
          <span style={{ color: COLORS.greenSoft, fontWeight: 700 }}>{c.to}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "26px 48px", borderRadius: 999, background: `linear-gradient(150deg, ${COLORS.greenSoft}, #1f7d34)`, color: "#06210d", fontSize: 40, fontWeight: 700, boxShadow: "0 16px 44px rgba(47,179,68,0.4)" }}>
          {c.cta} <span style={{ fontSize: 40 }}>→</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
