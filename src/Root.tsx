import { Composition, Still } from "remotion";
import { HeroChain } from "./HeroChain";
import { OgCard } from "./OgCard";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroChain"
        component={HeroChain}
        durationInFrames={330}
        fps={30}
        width={1920}
        height={1080}
      />
      <Still id="OgCard" component={OgCard} width={1200} height={630} />
    </>
  );
};
