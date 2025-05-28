import { ArrowSquareOut, Trash } from '@phosphor-icons/react';
import { Events } from '../../hooks/useEvents';

interface EventCardProps {
  event: Events;
}

export default function EventCard({ event }: EventCardProps) {
  const date = new Date(Number(event.date)).toLocaleDateString('pt-BR');

  return (
    <div className="w-full">
      <div className="bg-darkBlue border-2 border-cyan-300 flex w-full items-center justify-between rounded-2xl p-4 text-4xl font-bold text-white">
        <h1 className="">{event.name}</h1>
        <div className="flex items-center justify-between gap-8">
          <h1>{date}</h1>
          <div className="flex gap-4">
            <div
              className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-blue-200"
              onClick={() => {
                window.open(event.link, '_blank');
              }}
            >
              <ArrowSquareOut size={32} />
            </div>
            <div className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-red-500">
              <Trash size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
