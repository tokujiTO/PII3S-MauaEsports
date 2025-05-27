import { useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
<<<<<<< HEAD
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../auth/auth-config';
=======
import HomeBanner from '../components/Home/homeBanner';
import AboutUs from '../components/Home/aboutUs';
import WhatWeDo from '../components/Home/whatWeDo';
import OurMission from '../components/Home/ourMission';
import Shirts from '../components/Home/shirts';
>>>>>>> dev

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
    <div className="bg-deepBlue min-h-screen overflow-x-hidden pt-20 text-white">
      <Navbar />
      <HomeBanner />
      <AboutUs />
      <div className="h-1 w-full rounded-full bg-gradient-to-l from-yellow-300 to-orange-500 shadow-[0_0_20px_2px_rgba(253,224,71,0.7)]" />
      <WhatWeDo />
      <div className="h-1 w-full rounded-full bg-gradient-to-r from-yellow-300 to-orange-500 shadow-[0_0_20px_2px_rgba(251,146,60,0.7)]" />
      <Shirts />
      <div className="h-1 w-full rounded-full bg-gradient-to-l from-yellow-300 to-orange-500 shadow-[0_0_20px_2px_rgba(253,224,71,0.7)]" />
      <OurMission />
      <div className="h-1 w-full rounded-full bg-gradient-to-r from-yellow-300 to-orange-500 shadow-[0_0_20px_2px_rgba(251,146,60,0.7)]" />
      <Footer />
    </div>
  );
}

{
  /* 
  <InfoSection
    title="Quem Somos"
    description="A Mauá eSports é mais do que um grupo de jogadores. Somos uma comunidade apaixonada por games, tecnologia e competição saudável dentro do Instituto Mauá de Tecnologia. Nascemos da iniciativa de alunos que enxergam nos eSports uma ponte entre diversão, amizade e crescimento pessoal. Aqui, todo mundo tem espaço: dos casuais aos tryhards, do bronze ao challenger."
  />

  <InfoSection
    title="O Que Fazemos"
    description="Criamos experiências. Organizamos torneios internos que viram clássicos, treinamentos que desafiam o meta e eventos que conectam mentes criativas. Também representamos a Mauá em campeonatos universitários, sempre com garra, respeito e aquele hype que só a gente sabe fazer. Tudo 100% digital, inclusivo e acessível."
    reverse={true}
  />

  <InfoSection
    title="Nossa Missão"
    description="Transformar paixão em propósito. Usamos os eSports como uma ferramenta de evolução: técnica, tática e social. Queremos desenvolver líderes, analistas, estrategistas e, claro, bons companheiros de equipe. O nosso jogo é coletivo. Juntos, fortalecemos uma comunidade que leva o nome Mauá com orgulho para o mundo."
  /> */
}
