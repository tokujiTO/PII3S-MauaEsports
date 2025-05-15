import { Pen, Trash } from '@phosphor-icons/react';
import { Events, Player } from '../../api/user';
import { useEffect, useState } from 'react';
import { useTrains } from '../../hooks/useTrains';

interface MemberCardProps {
  member: {
    nome: string;
    cargo: string;
    horas: number;
    ra: string;
    nickname: string;
  };
  onDelete: () => void;
  onEdit: () => void;
}

export default function MemberCard({
  member,
  onDelete,
  onEdit,
}: MemberCardProps) {
  const [horas, setHoras] = useState<number | null>(null);
  const { events } = useTrains();
  console.log('Events:', events);

  const fetchHours = async () => {
    let totalMilliseconds = 0;

    events.forEach((event: Events) => {
      event.AttendedPlayers?.forEach((player: Player) => {
        if (player.PlayerId === member.nickname) {
          totalMilliseconds += player.ExitTimestamp - player.EntranceTimestamp;
        }
      });
    });

    // Converte para horas
    const totalHours = totalMilliseconds / (1000 * 60 * 60);
    setHoras(parseFloat(totalHours.toFixed(2)));
  };

  useEffect(() => {
    if (events && events.length > 0) {
      fetchHours();
    }
  }, [events]);

  return (
    <div className="bg-deepBlue flex h-24 w-full items-center justify-between rounded-lg p-4 text-4xl text-white duration-150 hover:scale-105 hover:cursor-pointer">
      <h1 className="mt-auto mb-auto flex w-1/5">
        {member.nome.split(' ')[0]}
      </h1>
      <h2 className="mt-auto mb-auto flex w-1/5">
        {member.ra || 'sem RA cadastrado'}
      </h2>
      <h2 className="mt-auto mb-auto flex w-1/5">
        {member.cargo || 'sem cargo cadastrado'}
      </h2>

      <div className="flex h-full w-1/5 items-center justify-between gap-2">
        <button
          onClick={onEdit}
          className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-blue-500"
        >
          <Pen size={32} />
        </button>
        <button
          onClick={onDelete}
          className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-red-500"
        >
          <Trash size={32} />
        </button>
        <div className="flex h-full w-3/4 items-center justify-center rounded-lg bg-white text-4xl text-black">
          <div className="flex items-end gap-2 text-black">
            <p>
              {horas} <span className="text-xl">horas</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
