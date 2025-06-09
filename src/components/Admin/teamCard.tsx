import { Pen, Trash } from '@phosphor-icons/react';
import { Member } from '../../hooks/useMembers';
import { deleteTeam, fetchTeams } from '../../api/teams';
import { useTeams } from '../../hooks/useTeams';

interface TeamCardProps {
  team: { nome: string; membros: Member[]; _id?: string };
  onEdit: () => void;
  onDelete: () => void;
}

export default function TeamCard({ team, onEdit, onDelete }: TeamCardProps) {
  const { setTeams } = useTeams();
  const handleDelete = async (id: string) => {
    await deleteTeam(id);
    fetchTeams(setTeams);
    onDelete();
  };

  const handleEdit = () => {
    onEdit();
  };

  return (
    <div className="bg-darkBlue flex w-full items-center justify-between rounded-2xl border-2 border-cyan-300 p-4 text-2xl text-white">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">{team.nome}</h1>
      </div>
      <div className="flex w-2/5 flex-col gap-2 max-md:hidden">
        <p>total de membros: {team.membros.length}</p>
      </div>
      <div className="flex w-1/5 items-center justify-end gap-4">
        <div
          className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-yellow-500"
          onClick={handleEdit}
        >
          <Pen size={32} />
        </div>
        <div
          className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-red-500"
          onClick={() => handleDelete(team._id || '')}
        >
          <Trash size={32} />
        </div>
      </div>
    </div>
  );
}
