import { Composition, Still } from "remotion";
import { HeroChain } from "./HeroChain";
import { OgCard } from "./OgCard";
import { PromoVertical } from "./PromoVertical";
import { JrIcon, JrLockup, JrBanner, JrReveal } from "./JrLogo";
import { JrLogoLab, Solo, SOLO_SIZES } from "./JrLogoLab";
import { JrMixLab, MixSolo } from "./JrMix";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* JRMedia brand */}
      <Still id="JrIcon" component={JrIcon} width={1024} height={1024} />
      <Still id="JrLockupLight" component={JrLockup} width={1500} height={480} defaultProps={{ dark: false }} />
      <Still id="JrLockupDark" component={JrLockup} width={1500} height={480} defaultProps={{ dark: true }} />
      <Still id="JrBanner" component={JrBanner} width={1584} height={396} />
      <Composition id="JrReveal" component={JrReveal} durationInFrames={130} fps={30} width={1080} height={1080} />
      <Still id="JrLogoLab" component={JrLogoLab} width={1400} height={1480} />
      {Object.entries(SOLO_SIZES).map(([id, [w, h]]) => (
        <Still key={id} id={`JrSolo${id}`} component={Solo} width={w} height={h} defaultProps={{ id }} />
      ))}
      <Still id="JrMixLab" component={JrMixLab} width={1200} height={1000} />
      <Still id="MixSoloLight" component={MixSolo} width={780} height={280} defaultProps={{ id: "M1", dark: false }} />
      <Still id="MixSoloDark" component={MixSolo} width={780} height={280} defaultProps={{ id: "M1", dark: true }} />
      <Composition id="HeroChain" component={HeroChain} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{ lang: "de" as const }} />
      <Composition id="HeroChainEN" component={HeroChain} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{ lang: "en" as const }} />
      <Composition id="PromoVertical" component={PromoVertical} durationInFrames={400} fps={30} width={1080} height={1920} defaultProps={{ lang: "de" as const }} />
      <Composition id="PromoVerticalEN" component={PromoVertical} durationInFrames={400} fps={30} width={1080} height={1920} defaultProps={{ lang: "en" as const }} />
      <Still id="OgCard" component={OgCard} width={1200} height={630} defaultProps={{ lang: "de" as const }} />
      <Still id="OgCardEN" component={OgCard} width={1200} height={630} defaultProps={{ lang: "en" as const }} />
    </>
  );
};
