import CarouselTournments from './CarouselTournments';

type Achievement = {
  year: number;
  achievements: string[];
};

const achievementsData: Achievement[] = [
  {
    year: 2021,
    achievements: [
      'Campeão do Torneio Universitário',
      'Vice-campeão da Liga Estadual',
    ],
  },
  {
    year: 2022,
    achievements: ['Top 4 no Campeonato Nacional', 'Melhor equipe revelação'],
  },
  {
    year: 2023,
    achievements: ['Campeão da Copa Regional', 'Participação internacional'],
  },
];

export default function Achievments() {
  if (achievementsData.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-bold">Achievements</h1>
        <p className="text-lg text-gray-600">
          Achievements will be displayed here soon!
        </p>
      </div>
    );
  }
  return (
    <div className="flex h-[60vh]  sm:h-screen flex-col items-center justify-center">
      <h1 className="neon-shadow-duo mt-20 text-5xl sm:text-7xl font-bold text-white">
        Nossas Conquistas
      </h1>
      <CarouselTournments data={achievementsData} />
    </div>
  );
}
