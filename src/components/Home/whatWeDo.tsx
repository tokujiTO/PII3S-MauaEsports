import AnimatedElement from '../animatedElement';

export default function WhatWeDo() {
  return (
    <div className="bg-darkBlue z-20 flex min-h-screen flex-row-reverse items-center justify-evenly overflow-x-hidden pt-20 font-sans text-white">
      <div className="flex w-1/2 flex-col items-center justify-center p-4 pr-36">
        <AnimatedElement
          duration={400}
          delay={500}
          direction="top"
          className="bg-coolBlack neon-box-duo text-coolWhite font-futurist neon-shadow-duo mb-10 w-full rounded-lg p-6 text-center text-7xl font-bold tracking-tight uppercase"
        >
          O Que Fazemos
        </AnimatedElement>
        <AnimatedElement
          duration={200}
          delay={200}
          direction="right"
          className="font-futurist text-justify text-3xl leading-relaxed text-white"
        >
          Criamos experiências. Organizamos torneios internos que viram
          clássicos, treinamentos que desafiam o meta e eventos que conectam
          mentes criativas. Também representamos a Mauá em campeonatos
          universitários, sempre com garra, respeito e aquele hype que só a
          gente sabe fazer. Tudo 100% digital, inclusivo e acessível.
        </AnimatedElement>
      </div>
      <AnimatedElement
        duration={200}
        delay={100}
        className="flex w-1/2 items-center justify-center p-4"
        direction="left"
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
