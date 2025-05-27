import AnimatedElement from '../animatedElement';

export default function AboutUs() {
  return (
    <div className="bg-darkBlue neon-box-duo z-20 flex min-h-screen flex-col items-center justify-evenly overflow-x-hidden rounded-t-4xl pt-20 font-sans text-white xl:flex-row xl:rounded-t-[10rem]">
      <div className="flex w-full flex-col items-center justify-center p-4 xl:w-1/2 xl:pl-20 2xl:pl-36">
        <AnimatedElement
          duration={400}
          delay={500}
          direction="top"
          className="bg-coolBlack neon-box-duo text-coolWhite font-futurist neon-shadow-duo mb-10 w-full rounded-lg p-6 text-center text-2xl font-bold tracking-tight uppercase xl:text-7xl"
        >
          Quem Somos
        </AnimatedElement>
        <AnimatedElement
          duration={200}
          delay={200}
          className="font-futurist px-8 text-justify text-lg leading-relaxed text-white xl:px-0 xl:text-xl 2xl:text-3xl"
        >
          A Mauá eSports é mais do que um grupo de jogadores. Somos uma
          comunidade apaixonada por games, tecnologia e competição saudável
          dentro do Instituto Mauá de Tecnologia. Nascemos da iniciativa de
          alunos que enxergam nos eSports uma ponte entre diversão, amizade e
          crescimento pessoal. Aqui, todo mundo tem espaço: dos casuais aos
          tryhards, do bronze ao challenger.
        </AnimatedElement>
      </div>
      <AnimatedElement
        duration={200}
        delay={100}
        className="hidden w-full items-center justify-center p-4 xl:flex xl:w-1/2"
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
