import { useEffect } from 'react';
import { fetchPublicMembers } from '../api/user';
import Footer from '../components/footer';
import Diretoria from '../components/Members/Diretoria';
import Marketing from '../components/Members/Marketing';
import Teams from '../components/Members/Teams';
import Navbar from '../components/navbar';
import { useMembers } from '../hooks/useMembers';
import Event from '../components/Members/Event';
import { useTeams } from '../hooks/useTeams';
import { fetchPublicTeams } from '../api/teams';
import { Spinner } from '@phosphor-icons/react';

export default function Members() {
  const { members, setMembers } = useMembers();
  const { teams, setTeams } = useTeams();

  const fetchMembersData = async () => {
    const members = await fetchPublicMembers(setMembers);
    return members;
  };

  const fetchTeams = async () => {
    const teams = await fetchPublicTeams(setTeams);
    return teams;
  };

  const diretoria =
    members?.filter((member) => member.area === 'director') || [];
  const marketing =
    members?.filter((member) => member.area === 'marketing') || [];
  const event = members?.filter((member) => member.area === 'event') || [];
  const filteredTeams = teams.filter(
    (team) =>
      team.membros.length > 0 &&
      typeof team.cap !== 'undefined' &&
      team.membros.every(
        (member: any) => typeof member !== 'undefined' && member !== ''
      )
  );

  useEffect(() => {
    fetchMembersData();
    fetchTeams();
  }, []);

  if (!members || !teams) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size={48} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-deepBlue overflow-hidden pt-20">
      <Navbar />
      {diretoria?.length > 0 && <Diretoria diretoria={diretoria} />}
      {marketing?.length > 0 && <Marketing marketing={marketing} />}
      {event?.length > 0 && <Event event={event} />}
      {filteredTeams?.length > 0 && <Teams teams={filteredTeams} />}
      <Footer />
    </div>
  );
}
