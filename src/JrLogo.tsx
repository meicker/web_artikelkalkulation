import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";

const { fontFamily: display } = loadDisplay();

const C = {
  violet: "#7C5CFC",
  blue: "#3B82F6",
  cyan: "#22D3EE",
  ink: "#0E1B2E",
  slate: "#6B7A90",
  slateLight: "#9FB3CE",
  white: "#FFFFFF",
};

// 4-point spark — the brand's signature accent.
const Spark: React.FC<{ size: number; color?: string; glow?: boolean }> = ({ size, color = C.cyan, glow = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ filter: glow ? `drop-shadow(0 0 ${size * 0.25}px ${color})` : "none" }}>
    <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z" fill={color} />
  </svg>
);

// The monogram tile.
export const Tile: React.FC<{ size: number; radius?: number; shadow?: boolean }> = ({ size, radius, shadow = true }) => {
  const r = radius ?? size * 0.235;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: r,
          background: `linear-gradient(145deg, ${C.violet} 0%, ${C.blue} 100%)`,
          boxShadow: shadow ? `0 ${size * 0.04}px ${size * 0.12}px rgba(59,80,180,0.35)` : "none",
          overflow: "hidden",
        }}
      >
        {/* soft top-left highlight for depth */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 20% 12%, rgba(255,255,255,0.28), transparent 55%)" }} />
      </div>
      {/* Monogram */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: display,
          fontWeight: 700,
          color: C.white,
          fontSize: size * 0.46,
          letterSpacing: -size * 0.02,
          paddingBottom: size * 0.02,
        }}
      >
        JR
      </div>
      {/* Signature spark, top-right */}
      <div style={{ position: "absolute", top: size * 0.14, right: size * 0.15 }}>
        <Spark size={size * 0.19} />
      </div>
    </div>
  );
};

// Wordmark: JR (bold) + media (lighter).
const Wordmark: React.FC<{ height: number; dark?: boolean }> = ({ height, dark }) => (
  <div style={{ fontFamily: display, fontWeight: 700, fontSize: height, letterSpacing: -height * 0.02, lineHeight: 1, whiteSpace: "nowrap" }}>
    <span style={{ color: dark ? C.white : C.ink }}>JR</span>
    <span style={{ color: dark ? C.slateLight : C.slate, fontWeight: 500 }}>media</span>
  </div>
);

// Horizontal lockup (tile + wordmark) on a transparent canvas.
export const JrLockup: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const tile = 300;
  return (
    <AbsoluteFill style={{ background: "transparent", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 54 }}>
        <Tile size={tile} />
        <Wordmark height={tile * 0.44} dark={dark} />
      </div>
    </AbsoluteFill>
  );
};

// Square app/profile icon — tile fills the frame (crops nicely to a circle).
export const JrIcon: React.FC = () => (
  <AbsoluteFill style={{ background: "transparent" }}>
    <Tile size={1024} radius={188} shadow={false} />
  </AbsoluteFill>
);

// Social banner (e.g. LinkedIn 1584×396).
export const JrBanner: React.FC = () => (
  <AbsoluteFill style={{ background: `radial-gradient(120% 160% at 12% 0%, #16305c 0%, ${C.ink} 60%)`, alignItems: "center", justifyContent: "center" }}>
    <AbsoluteFill
      style={{
        backgroundImage: "linear-gradient(rgba(159,179,206,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(159,179,206,0.14) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse 80% 120% at 75% 40%, #000, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 120% at 75% 40%, #000, transparent 70%)",
        opacity: 0.7,
      }}
    />
    <div style={{ display: "flex", alignItems: "center", gap: 40, position: "relative" }}>
      <Tile size={190} />
      <div>
        <Wordmark height={92} dark />
        <div style={{ fontFamily: display, fontSize: 30, color: C.slateLight, marginTop: 10 }}>
          Software &amp; Apps für den Onlinehandel
        </div>
        <div style={{ fontFamily: display, fontSize: 24, color: C.cyan, marginTop: 6 }}>jrmedia.software</div>
      </div>
    </div>
  </AbsoluteFill>
);

// Animated reveal (1080×1080) for social.
export const JrReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const tileIn = spring({ frame: frame - 6, fps, config: { damping: 14, mass: 0.8 } });
  const tileScale = interpolate(tileIn, [0, 1], [0.6, 1]);
  const tileRot = interpolate(tileIn, [0, 1], [-12, 0]);

  const sparkIn = spring({ frame: frame - 30, fps, config: { damping: 10 } });
  const wordIn = spring({ frame: frame - 40, fps, config: { damping: 16 } });
  const wordY = interpolate(wordIn, [0, 1], [40, 0]);

  const fadeOut = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 120% at 50% 0%, #16305c 0%, ${C.ink} 62%)`, alignItems: "center", justifyContent: "center", opacity: fadeOut }}>
      <AbsoluteFill
        style={{
          backgroundImage: "linear-gradient(rgba(159,179,206,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(159,179,206,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 45%, #000, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 45%, #000, transparent 72%)",
          opacity: 0.6,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 54, position: "relative" }}>
        <div style={{ transform: `scale(${tileScale}) rotate(${tileRot}deg)`, opacity: interpolate(tileIn, [0, 1], [0, 1]) }}>
          <div style={{ position: "relative" }}>
            <div style={{ opacity: interpolate(sparkIn, [0, 1], [0, 1]) }}>
              <Tile size={360} />
            </div>
          </div>
        </div>
        <div style={{ transform: `translateY(${wordY}px)`, opacity: interpolate(wordIn, [0, 1], [0, 1]) }}>
          <Wordmark height={104} dark />
        </div>
      </div>
    </AbsoluteFill>
  );
};
