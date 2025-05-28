import { useState, useEffect } from 'react';
import { Events, Player } from '../../api/user';
import { useTrains } from '../../hooks/useTrains';
import { UseUser } from '../../hooks/useUser';

export default function HourCard() {
  const [horas, setHoras] = useState<number | null>(null);
  const { user } = UseUser();
  const { events } = useTrains();

  const fetchHours = async () => {
    let totalMilliseconds = 0;

    events.forEach((event: Events) => {
      event.AttendedPlayers?.forEach((player: Player) => {
        if (player.PlayerId === user?.nickname) {
          totalMilliseconds += player.ExitTimestamp - player.EntranceTimestamp;
        }
      });
    });

    // Converte para horas
    const totalHours = totalMilliseconds / (1000 * 60 * 60);
    setHoras(parseFloat(totalHours.toFixed(2)));
  };

  useEffect(() => {
    if (user) {
      fetchHours();
    }
  }, []);

  return (
    <div className="bg-deepBlue flex h-[200px] w-[360px] flex-col items-center justify-between rounded-lg p-4 text-4xl text-white">
      <h1 className="mt-auto mb-auto flex">Você tem:</h1>
      <div className="flex h-2/3 w-full items-center justify-center rounded-lg bg-white text-7xl text-black">
        <div className="flex items-end gap-2 text-black">
          <p>
            {horas} <span className="text-4xl">horas</span>
          </p>
        </div>
      </div>
    </div>
  );
}
