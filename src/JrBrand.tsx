import React from "react";
import { AbsoluteFill, useVideoConfig, useCurrentFrame, spring, interpolate } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";

const { fontFamily: display } = loadDisplay();

// ---- FINAL JRMedia brand (concept M1) -------------------------------------
const C = {
  violet: "#7C5CFC",
  blue: "#3B82F6",
  blueSoft: "#7CA8F7",
  cyan: "#22D3EE",
  ink: "#0E1B2E",
  ink2: "#16305c",
  slateLight: "#9FB3CE",
  white: "#FFFFFF",
};
const VB = `linear-gradient(145deg, ${C.violet}, ${C.blue})`;
const TAGLINE = "Software & Apps für den Onlinehandel";
const URL = "jrmedia.software";

const Spark: React.FC<{ size: number; color?: string }> = ({ size, color = C.cyan }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ filter: `drop-shadow(0 0 ${size * 0.32}px ${color})` }}>
    <path d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z" fill={color} />
  </svg>
);

// Round badge mark (JR + larger spark).
const Badge: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ position: "relative", width: size, height: size }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: VB, boxShadow: `0 ${size * 0.05}px ${size * 0.14}px rgba(30,41,80,0.3)`, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 26% 16%, rgba(255,255,255,0.30), transparent 55%)" }} />
    </div>
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: display, fontWeight: 700, color: C.white, fontSize: size * 0.44, letterSpacing: -size * 0.03 }}>JR</div>
    <div style={{ position: "absolute", top: -size * 0.03, right: -size * 0.03 }}><Spark size={size * 0.29} /></div>
  </div>
);

const MediaWord: React.FC<{ size: number; dark?: boolean }> = ({ size, dark }) => (
  <span style={{ fontFamily: display, fontWeight: 500, fontSize: size, letterSpacing: -size * 0.02, color: dark ? C.blueSoft : C.blue }}>media</span>
);

// Horizontal lockup: badge + media.
export const Lockup: React.FC<{ h: number; dark?: boolean }> = ({ h, dark }) => (
  <div style={{ display: "flex", alignItems: "center", gap: h * 0.14 }}>
    <Badge size={h} />
    <MediaWord size={h * 0.52} dark={dark} />
  </div>
);

const Grid: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundImage: "linear-gradient(rgba(159,179,206,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(159,179,206,0.13) 1px, transparent 1px)",
      backgroundSize: "clamp(40px, 4vw, 64px) clamp(40px, 4vw, 64px)",
      maskImage: "radial-gradient(ellipse 75% 90% at 70% 40%, #000, transparent 72%)",
      WebkitMaskImage: "radial-gradient(ellipse 75% 90% at 70% 40%, #000, transparent 72%)",
      opacity: 0.7,
    }}
  />
);

// Square profile / app icon — full-bleed gradient (safe for circle or square crop).
export const BrandProfile: React.FC = () => {
  const { width } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: VB }}>
      <AbsoluteFill style={{ background: "radial-gradient(120% 90% at 26% 16%, rgba(255,255,255,0.28), transparent 55%)" }} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: display, fontWeight: 700, color: C.white, fontSize: width * 0.4, letterSpacing: -width * 0.02 }}>JR</div>
      </AbsoluteFill>
      <div style={{ position: "absolute", top: width * 0.17, right: width * 0.15 }}><Spark size={width * 0.19} /></div>
    </AbsoluteFill>
  );
};

// Transparent lockup for use as a logo.
export const BrandLockupLight: React.FC = () => {
  const { height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "transparent", alignItems: "center", justifyContent: "center" }}>
      <Lockup h={height * 0.5} />
    </AbsoluteFill>
  );
};
export const BrandLockupDark: React.FC = () => {
  const { height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "transparent", alignItems: "center", justifyContent: "center" }}>
      <Lockup h={height * 0.5} dark />
    </AbsoluteFill>
  );
};

// Horizontal social banner (YouTube / Facebook / X). safeH keeps content inside crop-safe zones.
export const SocialBanner: React.FC<{ safeH?: number }> = ({ safeH }) => {
  const { height } = useVideoConfig();
  const u = safeH ?? height; // design unit
  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 150% at 15% 0%, ${C.ink2} 0%, ${C.ink} 60%)`, alignItems: "center", justifyContent: "center", fontFamily: display }}>
      <Grid />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: u * 0.07 }}>
        <Lockup h={u * 0.46} dark />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: u * 0.11, color: C.slateLight }}>{TAGLINE}</div>
          <div style={{ fontSize: u * 0.09, color: C.cyan, marginTop: u * 0.02 }}>{URL}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Vertical brand frame (Instagram story / TikTok).
export const BrandVertical: React.FC = () => {
  const { width } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 90% at 50% 8%, ${C.ink2} 0%, ${C.ink} 60%)`, alignItems: "center", justifyContent: "center", fontFamily: display }}>
      <Grid />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: width * 0.06 }}>
        <Badge size={width * 0.44} />
        <MediaWord size={width * 0.2} dark />
        <div style={{ textAlign: "center", marginTop: width * 0.02 }}>
          <div style={{ fontSize: width * 0.055, color: C.slateLight }}>Software &amp; Apps<br />für den Onlinehandel</div>
          <div style={{ fontSize: width * 0.045, color: C.cyan, marginTop: width * 0.03 }}>{URL}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Animated reveal (1080×1080) for social.
export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const badgeIn = spring({ frame: frame - 6, fps, config: { damping: 13, mass: 0.8 } });
  const mediaIn = spring({ frame: frame - 30, fps, config: { damping: 16 } });
  const fade = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp" });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 120% at 50% 0%, ${C.ink2} 0%, ${C.ink} 62%)`, alignItems: "center", justifyContent: "center", opacity: fade }}>
      <Grid />
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 42 }}>
        <div style={{ transform: `scale(${interpolate(badgeIn, [0, 1], [0.5, 1])}) rotate(${interpolate(badgeIn, [0, 1], [-14, 0])}deg)`, opacity: interpolate(badgeIn, [0, 1], [0, 1]) }}>
          <Badge size={300} />
        </div>
        <div style={{ transform: `translateX(${interpolate(mediaIn, [0, 1], [-30, 0])}px)`, opacity: interpolate(mediaIn, [0, 1], [0, 1]) }}>
          <MediaWord size={156} dark />
        </div>
      </div>
    </AbsoluteFill>
  );
};
