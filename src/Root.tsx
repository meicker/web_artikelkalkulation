import { Composition, Still } from "remotion";
import { HeroChain } from "./HeroChain";
import { OgCard } from "./OgCard";
import { PromoVertical } from "./PromoVertical";
import { BrandProfile, BrandLockupLight, BrandLockupDark, SocialBanner, BrandVertical, BrandReveal } from "./JrBrand";
import { FactorGraphic, MarginGraphic, StepGraphic, VatGraphic, RoundingGraphic, SkontoGraphic } from "./GuideGraphics";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ---- JRMedia brand (concept M1) ---- */}
      <Still id="JrProfile" component={BrandProfile} width={1080} height={1080} />
      <Still id="JrLockupLight" component={BrandLockupLight} width={1600} height={440} />
      <Still id="JrLockupDark" component={BrandLockupDark} width={1600} height={440} />
      <Still id="JrBannerYouTube" component={SocialBanner} width={2560} height={1440} defaultProps={{ safeH: 423 }} />
      <Still id="JrBannerFacebook" component={SocialBanner} width={1640} height={856} defaultProps={{ safeH: 720 }} />
      <Still id="JrBannerX" component={SocialBanner} width={1500} height={500} defaultProps={{ safeH: 380 }} />
      <Still id="JrVertical" component={BrandVertical} width={1080} height={1920} />
      <Composition id="JrReveal" component={BrandReveal} durationInFrames={130} fps={30} width={1080} height={1080} />

      {/* ---- Ratgeber-Grafiken ---- */}
      <Still id="FactorGraphicDE" component={FactorGraphic} width={1600} height={900} defaultProps={{ lang: "de" as const }} />
      <Still id="FactorGraphicEN" component={FactorGraphic} width={1600} height={900} defaultProps={{ lang: "en" as const }} />
      <Still id="MarginGraphicDE" component={MarginGraphic} width={1600} height={900} defaultProps={{ lang: "de" as const }} />
      <Still id="MarginGraphicEN" component={MarginGraphic} width={1600} height={900} defaultProps={{ lang: "en" as const }} />
      <Still id="StepGraphicDE" component={StepGraphic} width={1600} height={760} defaultProps={{ lang: "de" as const }} />
      <Still id="StepGraphicEN" component={StepGraphic} width={1600} height={760} defaultProps={{ lang: "en" as const }} />
      <Still id="VatGraphicDE" component={VatGraphic} width={1600} height={800} defaultProps={{ lang: "de" as const }} />
      <Still id="VatGraphicEN" component={VatGraphic} width={1600} height={800} defaultProps={{ lang: "en" as const }} />
      <Still id="RoundingGraphicDE" component={RoundingGraphic} width={1600} height={760} defaultProps={{ lang: "de" as const }} />
      <Still id="RoundingGraphicEN" component={RoundingGraphic} width={1600} height={760} defaultProps={{ lang: "en" as const }} />
      <Still id="SkontoGraphicDE" component={SkontoGraphic} width={1600} height={760} defaultProps={{ lang: "de" as const }} />
      <Still id="SkontoGraphicEN" component={SkontoGraphic} width={1600} height={760} defaultProps={{ lang: "en" as const }} />

      {/* ---- Website (PriceCalc Pro) ---- */}
      <Composition id="HeroChain" component={HeroChain} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{ lang: "de" as const }} />
      <Composition id="HeroChainEN" component={HeroChain} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{ lang: "en" as const }} />
      <Composition id="PromoVertical" component={PromoVertical} durationInFrames={400} fps={30} width={1080} height={1920} defaultProps={{ lang: "de" as const }} />
      <Composition id="PromoVerticalEN" component={PromoVertical} durationInFrames={400} fps={30} width={1080} height={1920} defaultProps={{ lang: "en" as const }} />
      <Still id="OgCard" component={OgCard} width={1200} height={630} defaultProps={{ lang: "de" as const }} />
      <Still id="OgCardEN" component={OgCard} width={1200} height={630} defaultProps={{ lang: "en" as const }} />
    </>
  );
};
