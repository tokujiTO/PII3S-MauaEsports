import AnimatedElement from '../animatedElement';

export default function OurMission() {
  return (
    <div className="bg-darkBlue z-20 flex min-h-screen items-center justify-evenly overflow-x-hidden pt-20 font-sans text-white">
      <div className="flex w-1/2 flex-col items-center justify-center p-4 pl-36">
        <AnimatedElement
          duration={400}
          delay={500}
          direction="top"
          className="bg-coolBlack neon-box-duo text-coolWhite font-futurist neon-shadow-duo mb-10 w-full rounded-lg p-6 text-center text-7xl font-bold tracking-tight uppercase"
        >
          Nossa Missão
        </AnimatedElement>
        <AnimatedElement
          duration={200}
          delay={200}
          className="font-futurist text-justify text-3xl leading-relaxed text-white"
        >
          Transformar paixão em propósito. Usamos os eSports como uma ferramenta
          de evolução: técnica, tática e social. Queremos desenvolver líderes,
          analistas, estrategistas e, claro, bons companheiros de equipe. O
          nosso jogo é coletivo. Juntos, fortalecemos uma comunidade que leva o
          nome Mauá com orgulho para o mundo.
        </AnimatedElement>
      </div>
      <AnimatedElement
        duration={200}
        delay={100}
        className="flex w-1/2 items-center justify-center p-4"
        direction="right"
      >
        <img
          src="./src/assets/logoBW.png"
          alt="logo_maua_esports"
          className="h-auto max-h-[75vh] w-auto object-contain opacity-80"
        />
      </AnimatedElement>
    </div>
  );
}
