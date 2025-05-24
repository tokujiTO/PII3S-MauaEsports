import Footer from "../components/footer";
import InfoSection from "../components/Home/infoSection"; 
import Navbar from "../components/navbar";
import HomeBanner from "../components/Home/homeBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-blue-900 text-white font-sans pt-20">
      <Navbar />

      <div className="text-white"> 
        <HomeBanner 
          title="NA MAUÁ, O JOGO NUNCA PARA!" 
        />

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
        />
      </div>

      <Footer />
    </div>
  );
}