import { useState, useEffect } from 'react';
import { Events, Player } from '../../api/user';
import { useTrains } from '../../hooks/useTrains';
import { UseUser } from '../../hooks/useUser';

export default function HourCard() {
  const [horas, setHoras] = useState<number | null>(null);
  const { user } = UseUser();
  const { fetchEvents } = useTrains();
  const fetchHours = async () => {
    const events = await fetchEvents();
    let totalMilliseconds = 0;

    events?.forEach((event: Events) => {
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
    <div className="bg-darkBlue neon-box-duo min-w-[180px] min-h-[100px] flex flex-col items-center justify-between rounded-lg border-4 border-cyan-300 p-4 text-2xl text-white md:h-[200px] md:min-w-[360px] md:text-4xl">
      <h1 className="mt-auto mb-auto flex">Você tem:</h1>
      <div className="flex h-2/3 w-full items-center justify-center rounded-lg bg-white text-4xl text-black md:text-7xl">
        <div className="flex items-end gap-2 text-black">
          <p>
            {horas} <span className="text-2xl md:text-4xl">horas</span>
          </p>
        </div>
      </div>
    </div>
  );
}
