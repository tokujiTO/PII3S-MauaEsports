import MemberCard from './memberCard';

export default function Captain() {
  const team = [
    { name: 'Matheus', role: 'Support', hours: 30 },
    { name: 'Lucas', role: 'Jungle', hours: 25 },
    { name: 'Pedro', role: 'Mid', hours: 20 },
    { name: 'Gustavo', role: 'ADC', hours: 15 },
    { name: 'Felipe', role: 'Top', hours: 10 },
  ];

  return (
    <div className="z-50 flex w-full flex-col gap-8 rounded-t-4xl bg-white p-10 pt-20">
      <div className="bg-deepBlue flex h-28 w-full items-end justify-between rounded-2xl p-4 text-6xl font-bold text-white">
        <h1 className="b">Time</h1>
      </div>
      <div className='flex w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-4 text-6xl font-bold text-white'>
        {team.map((member) => (
          <MemberCard member={member} />
        ))}
      </div>
    </div>
  );
}
