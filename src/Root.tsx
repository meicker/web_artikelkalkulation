import { Composition, Still } from "remotion";
import { HeroChain } from "./HeroChain";
import { OgCard } from "./OgCard";
import { PromoVertical } from "./PromoVertical";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="HeroChain" component={HeroChain} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{ lang: "de" as const }} />
      <Composition id="HeroChainEN" component={HeroChain} durationInFrames={330} fps={30} width={1920} height={1080} defaultProps={{ lang: "en" as const }} />
      <Composition id="PromoVertical" component={PromoVertical} durationInFrames={400} fps={30} width={1080} height={1920} defaultProps={{ lang: "de" as const }} />
      <Composition id="PromoVerticalEN" component={PromoVertical} durationInFrames={400} fps={30} width={1080} height={1920} defaultProps={{ lang: "en" as const }} />
      <Still id="OgCard" component={OgCard} width={1200} height={630} defaultProps={{ lang: "de" as const }} />
      <Still id="OgCardEN" component={OgCard} width={1200} height={630} defaultProps={{ lang: "en" as const }} />
    </>
  );
};
