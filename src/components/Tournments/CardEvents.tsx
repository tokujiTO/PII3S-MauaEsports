import EventsList from './EventsList';

const eventsMock = [
  {
    nome: 'CAMPEONATO CSGO',
    data: '1716422400',
    link: 'https://www.twitch.tv/valorantbrasil',
  },
  {
    nome: 'CAMPEONATO VALORANT / CAMPEONATO RAINBOW SIX SIEGE',
    data: '1714089600',
    link: 'https://www.twitch.tv/rainbowsixbrasil',
  },
  {
    nome: 'CAMPEONATO VALORANT / CAMPEONATO RAINBOW SIX SIEGE',
    data: '1717372800',
    link: 'https://www.twitch.tv/valorantbrasil',
  },
  {
    nome: 'CAMPEONATO VALORANT / CAMPEONATO RAINBOW SIX SIEGE',
    data: '1765497600',
    link: 'https://www.twitch.tv/rainbowsixbrasil',
  },
];

export default function CardEvents() {
  return (
    <section className="relative mt-10 flex flex-col items-center">
      <h3 className="bg-darkBlue/90 neon-box-yellow text-coolWhite font-futurist relative z-20 flex w-7/8 flex-col items-center justify-center rounded-3xl rounded-t-lg px-6 py-5 text-4xl backdrop-blur-xl lg:text-8xl">
        EVENTOS
      </h3>
      <div className="bg-coolWhite neon-box-duo text-darkBlue relative z-10  sm:-mt-21 mb-50 flex w-2/3 flex-col gap-15 rounded-3xl rounded-b-lg px-6 pt-20 sm:pt-50 pb-12">
        <EventsList Event={eventsMock} />
      </div>
    </section>
  );
}
