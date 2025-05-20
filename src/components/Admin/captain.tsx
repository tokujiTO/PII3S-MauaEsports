import MemberCard from './memberCard';

export default function Captain() {
  const team = [
    {
      nome: 'Matheus',
      cargo: 'Support',
      horas: 30,
      ra: '123456',
      nickname: 'matheuzin',
    },
    {
      nome: 'Lucas',
      cargo: 'Jungle',
      horas: 25,
      ra: '234567',
      nickname: 'lucao',
    },
    {
      nome: 'Pedro',
      cargo: 'Mid',
      horas: 20,
      ra: '345678',
      nickname: 'pedrinho',
    },
    {
      nome: 'Gustavo',
      cargo: 'ADC',
      horas: 15,
      ra: '456789',
      nickname: 'gust',
    },
    {
      nome: 'Felipe',
      cargo: 'Top',
      horas: 10,
      ra: '567890',
      nickname: 'felipera',
    },
  ];

  return (
    <div className="z-50 flex w-full flex-col gap-8 rounded-t-4xl bg-white p-10 pt-20">
      <div className="bg-deepBlue flex h-28 w-full items-end justify-between rounded-2xl p-4 text-6xl font-bold text-white">
        <h1 className="b">Time</h1>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-4 text-6xl font-bold text-white">
        {team.map((member) => (
          <MemberCard member={member} />
        ))}
      </div>
    </div>
  );
}
