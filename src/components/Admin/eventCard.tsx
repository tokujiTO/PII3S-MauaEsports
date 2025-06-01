import { ArrowSquareOut, Trash } from '@phosphor-icons/react';
import { Event } from '../../context/eventsContext';
import { deleteEvent } from '../../api/events';

interface EventCardProps {
  event: Event;
  onDelete: () => void;
}

export default function EventCard({ event, onDelete }: EventCardProps) {
  const date = new Date(Number(event.data)).toLocaleDateString('pt-BR');

  const handleDelete = async () => {
    await deleteEvent(event._id);
    onDelete();
  };

  return (
    <div className="w-full">
      <div className="bg-darkBlue flex w-full items-center justify-between rounded-2xl border-2 border-cyan-300 p-4 text-4xl font-bold text-white">
        <h1 className="">{event.titulo}</h1>
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
            <button
              onClick={handleDelete}
              className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-red-500"
            >
              <Trash size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
