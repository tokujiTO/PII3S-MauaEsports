import { Trash } from '@phosphor-icons/react';
import { Member } from '../../hooks/useMembers';
import { deleteTeam } from '../../api/teams';
import { useTeams } from '../../hooks/useTeams';
import { toast } from 'react-toastify';

export default function TeamCard({
  team,
}: {
  team: { nome: string; membros: Member[]; _id?: string };
}) {
  const { fetchTeams } = useTeams();
  const handleDelete = async (id: string) => {
    await deleteTeam(id);
    fetchTeams();
  };
  return (
    <div className="bg-darkBlue flex w-full items-center justify-between rounded-2xl border-2 border-cyan-300 p-4 text-2xl text-white">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">{team.nome}</h1>
      </div>
      <div className="flex w-2/5 flex-col gap-2">
        <p>total de membros: {team.membros.length}</p>
      </div>
      <div
        className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-red-500"
        onClick={() => {
          if (typeof team._id === 'string') {
            handleDelete(team._id);
          } else {
            toast.error('ID do time não encontrado');
          }
        }}
      >
        <Trash size={32} />
      </div>
    </div>
  );
}
