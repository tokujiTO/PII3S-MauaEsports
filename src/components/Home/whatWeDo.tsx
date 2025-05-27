import AnimatedElement from '../animatedElement';

export default function WhatWeDo() {
  return (
    <div className="bg-darkBlue z-20 flex min-h-screen flex-col items-center justify-evenly overflow-x-hidden xl:pt-20 font-sans text-white xl:flex-row-reverse">
      <div className="flex w-full flex-col items-center justify-center p-4 xl:pr-20 xl:w-1/2 2xl:pr-36">
        <AnimatedElement
          duration={400}
          delay={500}
          direction="top"
          className="bg-coolBlack neon-box-duo text-coolWhite font-futurist neon-shadow-duo mb-10 w-full rounded-lg p-6 text-center text-2xl font-bold tracking-tight uppercase xl:text-7xl"
        >
          O Que Fazemos
        </AnimatedElement>
        <AnimatedElement
          duration={200}
          delay={200}
          direction="right"
          className="font-futurist px-8 text-justify text-lg leading-relaxed text-white xl:px-0 xl:text-xl 2xl:text-3xl"
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
        className="hidden w-full items-center justify-center p-4 xl:flex xl:w-1/2"
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
