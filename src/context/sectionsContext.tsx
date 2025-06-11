import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { Section } from '../api/sections';

interface SectionsContextType {
  sections: Section[];
  setSections: Dispatch<SetStateAction<Section[]>>;
}

const mockSections: Section[] = [
  {
    _id: '1',
    sectionNumber: 1,
    title: 'Introduction to React',
    content:
      'Learn the basics of React, a JavaScript library for building user interfaces.',
    image: 'https://example.com/react-intro.jpg',
  },
  {
    _id: '2',
    sectionNumber: 2,
    title: 'State Management with Redux',
    content:
      'Understand how to manage state in React applications using Redux.',
    image: 'https://example.com/redux-state-management.jpg',
  },
  {
    _id: '3',
    sectionNumber: 3,
    title: 'Routing with React Router',
    content:
      'Explore how to implement routing in React applications using React Router.',
    image: 'https://example.com/react-router.jpg',
  },
];

export const sectionsContext = createContext<SectionsContextType | null>(null);

export const SectionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sections, setSections] = useState<Section[]>(mockSections);

  return (
    <sectionsContext.Provider value={{ sections, setSections }}>
      {children}
    </sectionsContext.Provider>
  );
};
