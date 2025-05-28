import { useEffect, useState } from 'react';
import { getMyTeam } from '../../api/teams';
import { UseUser } from '../../hooks/useUser';
import MemberCard from './memberCard';
import { Member } from '../../hooks/useMembers';
import { useTrains } from '../../hooks/useTrains';

interface Team {
  _id: string;
  nome: string;
  membros: Member[];
  cap: string;
  image: string;
  color: string;
}

export default function Captain() {
  const { user } = UseUser();
  const { fetchEvents } = useTrains();
  const [team, setTeam] = useState<Team | null>(null);

  const fetchTeam = async () => {
    if (!user?.ra) return;
    const response = await getMyTeam(user.ra);
    setTeam(response);
  };

  useEffect(() => {
    fetchEvents();
    fetchTeam();
    // eslint-disable-next-line
  }, [user?.ra]);

  return (
    <div className="bg-deepBlue neon-box-duo z-50 flex min-h-[50vh] w-full flex-col gap-8 rounded-t-4xl p-10 pt-20">
      <div className="bg-darkBlue neon-box-duo flex h-28 w-full items-end justify-between rounded-2xl border-2 border-cyan-300 p-4 text-6xl font-bold text-white">
        <h1 className="b">{team ? team.nome : 'Time'}</h1>
      </div>
      <div className="bg-deepBlue flex w-full flex-col items-center justify-center gap-4 rounded-2xl p-4 text-6xl font-bold text-white">
        {team && team.membros && team.membros.length > 0 ? (
          team.membros.map((member) => (
            <MemberCard key={member._id || member.ra} member={member} />
          ))
        ) : (
          <span className="text-2xl text-gray-300">
            Nenhum membro encontrado
          </span>
        )}
      </div>
    </div>
  );
}
