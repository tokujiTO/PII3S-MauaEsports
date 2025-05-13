import Footer from "../components/footer";
import InfoSection from "../components/Home/infosection";
import AnimatedElement from "../components/animatedElement";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans pt-20">
      <Navbar />

    <InfoSection title="Quem Somos" description="A Mauá eSports é mais do que um grupo de jogadores. Somos uma comunidade apaixonada por games, tecnologia e competição saudável dentro do Instituto Mauá de Tecnologia. Nascemos da iniciativa de alunos que enxergam nos eSports uma ponte entre diversão, amizade e crescimento pessoal. Aqui, todo mundo tem espaço: dos casuais aos tryhards, do bronze ao challenger." />

    <InfoSection title="O Que Fazemos" description="Criamos experiências. Organizamos torneios internos que viram clássicos, treinamentos que desafiam o meta e eventos que conectam mentes criativas. Também representamos a Mauá em campeonatos universitários, sempre com garra, respeito e aquele hype que só a gente sabe fazer. Tudo 100% digital, inclusivo e acessível." logoSrc="./src/assets/logoBW.png" altText="logo_maua_esports" 
    reverse={true}/>

      <Footer />
    </div>
  )
}
