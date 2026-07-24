import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/SpaceMono";
import { COLORS } from "./theme";

const { fontFamily: display } = loadDisplay();
const { fontFamily: mono } = loadMono();

// Static Open-Graph / social preview card (1200 x 630).
export const OgCard: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 130% at 15% 0%, ${COLORS.ink3} 0%, ${COLORS.ink} 55%)`,
        fontFamily: display,
        padding: 72,
        justifyContent: "space-between",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 90% 90% at 70% 40%, #000 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 70% 40%, #000 20%, transparent 70%)",
          opacity: 0.6,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative" }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 15,
            background: `linear-gradient(150deg, ${COLORS.green}, #1f7d34)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            boxShadow: "0 8px 24px rgba(47,179,68,0.4)",
          }}
        >
          🧮
        </div>
        <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.white, letterSpacing: -0.5 }}>
          PriceCalc <span style={{ color: COLORS.greenSoft }}>Pro</span>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            fontSize: 74,
            fontWeight: 700,
            color: COLORS.white,
            letterSpacing: -2,
            lineHeight: 1.03,
            maxWidth: 900,
          }}
        >
          Preiskalkulation, die in{" "}
          <span style={{ color: COLORS.blueLight }}>Shopify</span> rechnet.
        </div>
        <div style={{ fontSize: 30, color: COLORS.mist, marginTop: 22, maxWidth: 820 }}>
          Einkaufspreise, Kalkulationsfaktoren & 5-stufige Verkaufspreis-Kalkulation — mit
          vollständiger Datensicherung.
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative" }}>
        <div
          style={{
            fontFamily: mono,
            fontSize: 26,
            color: COLORS.white,
            padding: "12px 24px",
            borderRadius: 999,
            border: "1.5px solid rgba(159,179,206,0.25)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <span style={{ color: COLORS.mist }}>EK 15,94 €</span>{" "}
          <span style={{ color: COLORS.blueLight }}>→</span>{" "}
          <span style={{ color: COLORS.greenSoft, fontWeight: 700 }}>VK 23,20 €</span>
        </div>
        <div style={{ fontSize: 22, color: COLORS.mist }}>jrmedia.software</div>
      </div>
    </AbsoluteFill>
  );
};
