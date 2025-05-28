import { useEffect, useState } from 'react';
import { getMyTeam, getModalities } from '../../api/teams';
import { UseUser } from '../../hooks/useUser';
import MemberCard from './memberCard';
import { Member } from '../../hooks/useMembers';
import { useTrains } from '../../hooks/useTrains';
import { Eye, Pen } from '@phosphor-icons/react';
import Schedule from './schedule';
import EditSchedule from './editSchedule';

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
  const [modalityName, setModalityName] = useState<string>('');
  const [scheduledTrainings, setScheduledTrainings] = useState<any[]>([]);
  const [viewSchedule, setViewSchedule] = useState(false);
  const [editSchedule, setEditSchedule] = useState(false);

  const fetchTeam = async () => {
    if (!user?.ra) return;
    const response = await getMyTeam(user.ra);
    setTeam(response);
    if (response && response.modality) {
      const modalities = await getModalities();
      const found = Object.values(modalities).find(
        (mod: any) => mod.Tag === response.modality
      );
      setModalityName(
        found && (found as any).Name ? (found as any).Name : response.modality
      );
      setScheduledTrainings(
        found && (found as any).ScheduledTrainings
          ? (found as any).ScheduledTrainings
          : []
      );
    } else {
      setModalityName('');
      setScheduledTrainings([]);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchTeam();
    // eslint-disable-next-line
  }, [user?.ra]);

  return (
    <div className="bg-deepBlue neon-box-duo z-50 flex min-h-[50vh] w-full flex-col gap-8 rounded-t-4xl p-10 pt-20">
      <EditSchedule
        scheduledTrainings={scheduledTrainings}
        isOpen={editSchedule}
        onClose={() => setEditSchedule(false)}
      />
      <Schedule
        scheduledTrainings={scheduledTrainings}
        isOpen={viewSchedule}
        onClose={() => setViewSchedule(false)}
      />
      <div className="bg-darkBlue neon-box-duo flex h-28 w-full items-end justify-between rounded-2xl border-2 border-cyan-300 p-4 text-6xl font-bold text-white">
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-5">
            <h1 className="b">{team ? team.nome : 'Time'}</h1>
            {modalityName && (
              <span className="text-2xl font-normal text-cyan-200">
                {modalityName}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-orange-600"
            onClick={() => setViewSchedule(true)}
          >
            <Eye size={32} />
          </button>
          <button
            className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-orange-600"
            onClick={() => setEditSchedule(true)}
          >
            <Pen size={32} />
          </button>
        </div>
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
