import AnimatedElement from '../animatedElement';

export default function CardEvents() {
    return (
      <section className="mt-10 flex flex-col items-center relative">
  {/* Logo em background */}
  <img
    src="src/assets/logoBW.png"
    alt="Logo Mascote"
    className="absolute top-20 left-1/2 transform -translate-x-1/2 opacity-10 h-[1300px] z-[-1]"
  />

<h3 className="bg-darkBlue/80 text-coolWhite rounded-3xl font-futurist px-6 py-5 rounded-t-lg z-20 text-[10rem] relative -mt-20 w-[1150px] flex items-center justify-center mt-150 flex flex-col items-center relative">EVENTOS</h3>

<div className="mb-50 rounded-3xl bg-coolWhite text-darkBlue w-2/3 px-6 pt-50 pb-12 rounded-b-lg z-10 relative flex flex-col gap-15 -mt-21">

  <div className="bg-darkBlue text-coolWhite px-4 py-2 rounded-3xl w-[110%] ml-[-5%] flex justify-between items-center">
    <span className="text-[2.5rem] font-body">CAMPEONATO CSGO2</span>
    <span className="text-[2.5rem] bg-gray-200 text-darkBlue font-futurist px-40 py-12 mr-[-2.5%] rounded-3xl">23 DE MAIO</span>
  </div>

  <div className="bg-darkBlue text-coolWhite px-4 py-2 rounded-3xl w-[110%] ml-[-5%] flex justify-between items-center">
    <span className="text-[2.5rem] font-body">
      CAMPEONATO VALORANT<br />CAMPEONATO RAINBOW SIX SIEGE
    </span>
    <span className="text-[2.5rem] bg-gray-200 text-darkBlue font-futurist px-40 py-12 mr-[-2.5%] rounded-3xl">26 DE ABRIL</span>
  </div>

  <div className="bg-darkBlue text-coolWhite px-4 py-2 rounded-3xl w-[110%] mggl-[-5%] flex justify-between items-center">
    <span className="text-[2.5rem] font-body">
      CAMPEONATO VALORANT<br />CAMPEONATO RAINBOW SIX SIEGE
    </span>
    <span className="text-[2.5rem] bg-gray-200 text-darkBlue font-futurist px-40 py-12 mr-[-2.5%] rounded-3xl">3 DE JUNHO</span>
  </div>

  <div className="bg-darkBlue text-coolWhite px-4 py-2 rounded-3xl w-[110%] ml-[-5%] flex justify-between items-center">
    <span className="text-[2.5rem] font-body ">
      CAMPEONATO VALORANT<br />CAMPEONATO RAINBOW SIX SIEGE
    </span>
    <span className="text-[2.5rem] bg-gray-200 text-darkBlue font-futurist px-40 py-12 mr-[-2.5%] rounded-3xl ">12 DE DEZEMBRO</span>
  </div>
</div>
</section>

    );
  }