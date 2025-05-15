import { useEffect } from 'react';
import { fetchMembers } from '../api/user';
import Footer from '../components/footer';
import Diretoria from '../components/Members/Diretoria';
import Marketing from '../components/Members/Marketing';
import Teams from '../components/Members/Teams';
import Navbar from '../components/navbar';
import { useMembers } from '../hooks/useMembers';

export default function Members() {
  const { members, setMembers } = useMembers();

  const fetchMembersData = async () => {
    const members = await fetchMembers(setMembers);
    return members;
  };

  const diretoria = members?.filter((member) => member.area === 'director');
  const marketing = members?.filter((member) => member.area === 'marketing');

  useEffect(() => {
    fetchMembersData();
  }, []);

  return (
    <div className="bg-deepBlue overflow-hidden pt-20">
      <Navbar />
      <Diretoria diretoria={diretoria} />
      <Marketing marketing={marketing} />
      <Teams />
      <Footer />
    </div>
  );
}
