import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import InfoSection from '../components/Home/infoSection';
import Navbar from '../components/navbar';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../auth/auth-config';

export default function Home() {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const auth = useIsAuthenticated();

  const fetchAccessToken = async () => {
    const accounts = instance.getAllAccounts();
    const accessToken = (
      await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
    ).accessToken;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  };

  if (auth) {
    console.log('User is authenticated');
    navigate('/pi-home');
    fetchAccessToken();
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20 font-sans text-white">
      <Navbar />

      <InfoSection
        title="Quem Somos"
        description="A Mauá eSports é mais do que um grupo de jogadores. Somos uma comunidade apaixonada por games, tecnologia e competição saudável dentro do Instituto Mauá de Tecnologia. Nascemos da iniciativa de alunos que enxergam nos eSports uma ponte entre diversão, amizade e crescimento pessoal. Aqui, todo mundo tem espaço: dos casuais aos tryhards, do bronze ao challenger."
      />

      <InfoSection
        title="O Que Fazemos"
        description="Criamos experiências. Organizamos torneios internos que viram clássicos, treinamentos que desafiam o meta e eventos que conectam mentes criativas. Também representamos a Mauá em campeonatos universitários, sempre com garra, respeito e aquele hype que só a gente sabe fazer. Tudo 100% digital, inclusivo e acessível."
        logoSrc="./src/assets/logoBW.png"
        altText="logo_maua_esports"
        reverse={true}
      />

      <Footer />
    </div>
  );
}
