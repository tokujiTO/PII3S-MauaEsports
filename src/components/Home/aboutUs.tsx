import AnimatedElement from '../animatedElement';

export default function AboutUs() {
  return (
    <div className="bg-darkBlue neon-box-duo z-20 flex min-h-screen items-center justify-evenly overflow-x-hidden rounded-t-[10rem] pt-20 font-sans text-white">
      <div className="p-4 pl-20 flex w-1/2 flex-col items-center justify-center 2xl:pl-36">
        <AnimatedElement
          duration={400}
          delay={500}
          direction="top"
          className="bg-coolBlack neon-box-duo text-coolWhite font-futurist neon-shadow-duo mb-10 w-full rounded-lg p-6 text-center text-7xl font-bold tracking-tight uppercase"
        >
          Quem Somos
        </AnimatedElement>
        <AnimatedElement
          duration={200}
          delay={200}
          className="font-futurist text-justify text-xl leading-relaxed text-white 2xl:text-3xl"
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
