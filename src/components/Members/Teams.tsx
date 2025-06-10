import { Team } from '../../hooks/useTeams';
import TeamCarousel from './TeamCarousel';

interface TeamsProps {
  teams: Team[];
}

export default function Teams({ teams }: TeamsProps) {
  return (
    <div className="font-body relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-r from-cyan-300 to-blue-600 py-8">
      <div className="bg-darkBlue absolute top-0 left-0 z-0 h-2/3 w-full rounded-b-[10rem]" />
      <h1 className="neon-shadow-duo z-10 text-center text-7xl font-bold text-white">
        Nossas Equipes
      </h1>
      <TeamCarousel
        data={teams.map((team) => ({
          ...team,
          membros: team.membros.map((member: any) =>
            typeof member === 'string' ? member : member.name
          ),
        }))}
      />
    </div>
  );
}
