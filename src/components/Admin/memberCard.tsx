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
  onDelete?: () => void;
  isAdmin?: boolean;
  onEdit?: () => void;
}

export default function MemberCard({
  member,
  onDelete,
  isAdmin = false,
  onEdit,
}: MemberCardProps) {
  const [horas, setHoras] = useState<number | null>(null);
  const { events } = useTrains();

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
    <div className="bg-darkBlue flex h-24 w-full items-center justify-between rounded-lg border-2 border-cyan-300 p-2 text-xl text-white duration-150  md:p-4 md:text-4xl">
      <div className="flex w-1/3 flex-col items-center justify-between max-md:gap-2 md:w-2/3 md:flex-row">
        <h1 className="mt-auto mb-auto flex  md:w-1/5">
          {member.nome.split(' ')[0]}
        </h1>
        <h2 className="mt-auto mb-auto flex  md:w-1/5">
          {member.ra || 'sem RA cadastrado'}
        </h2>
        {isAdmin && (
          <h2 className="mt-auto mb-auto hidden  md:flex md:w-1/5">
            {member.cargo || 'sem cargo cadastrado'}
          </h2>
        )}
      </div>

      <div className="flex h-full w-3/4 items-center justify-between gap-2 md:w-1/5">
        {isAdmin && (
          <button
            onClick={onEdit}
            className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-orange-600"
          >
            <Pen size={32} />
          </button>
        )}
        {isAdmin && (
          <button
            onClick={onDelete}
            className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-red-500"
          >
            <Trash size={32} />
          </button>
        )}
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
