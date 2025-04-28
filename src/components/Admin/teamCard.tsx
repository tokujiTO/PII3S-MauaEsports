import { Trash } from '@phosphor-icons/react';
import { Member } from '../../hooks/useMembers';

export default function TeamCard({
  team,
}: {
  team: { name: string; members: Member[] };
}) {
  return (
    <div className="bg-deepBlue flex w-full items-center justify-between rounded-2xl p-4 text-2xl text-white">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">{team.name}</h1>
      </div>
      <div className="flex w-2/5 flex-col gap-2">
        <p>total de membros: {team.members.length}</p>
      </div>
      <div className="flex flex-col gap-2 duration-300 hover:cursor-pointer hover:text-red-500">
        <Trash size={32} />
      </div>
    </div>
  );
}
