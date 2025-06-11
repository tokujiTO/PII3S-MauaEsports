import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { Section } from '../api/sections';

interface SectionsContextType {
  sections: Section[];
  setSections: Dispatch<SetStateAction<Section[]>>;
}

// const mockSections: Section[] = [
//   {
//     _id: '1',
//     sectionNumber: 1,
//     title: 'Quem Somos',
//     content:
//       'A Mauá eSports é mais do que um grupo de jogadores. Somos uma comunidade apaixonada por games, tecnologia e competição saudável dentro do Instituto Mauá de Tecnologia. Nascemos da iniciativa de alunos que enxergam nos eSports uma ponte entre diversão, amizade e crescimento pessoal. Aqui, todo mundo tem espaço: dos casuais aos tryhards, do bronze ao challenger.',
//     image: './src/assets/logoBW.png',
//   },
//   {
//     _id: '2',
//     sectionNumber: 2,
//     title: 'O Que Fazemos',
//     content:
//       'Criamos experiências. Organizamos torneios internos que viram clássicos, treinamentos que desafiam o meta e eventos que conectam mentes criativas. Também representamos a Mauá em campeonatos universitários, sempre com garra, respeito e aquele hype que só a gente sabe fazer. Tudo 100% digital, inclusivo e acessível.',
//     image: './src/assets/logoBW.png',
//   },
//   {
//     _id: '3',
//     sectionNumber: 3,
//     title: 'Nossa Missão',
//     content:
//       'Transformar paixão em propósito. Usamos os eSports como uma ferramenta de evolução: técnica, tática e social. Queremos desenvolver líderes, analistas, estrategistas e, claro, bons companheiros de equipe. O nosso jogo é coletivo. Juntos, fortalecemos uma comunidade que leva o nome Mauá com orgulho para o mundo.',
//     image: './src/assets/logoBW.png',
//   },
// ];

export const sectionsContext = createContext<SectionsContextType | null>(null);

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sections, setSections] = useState<Section[]>([]);

  return (
    <sectionsContext.Provider value={{ sections, setSections }}>
      {children}
    </sectionsContext.Provider>
  );
};
