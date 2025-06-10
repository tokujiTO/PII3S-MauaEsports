import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { Section } from '../api/sections';

interface SectionsContextType {
  sections: Section[];
  setSections: Dispatch<SetStateAction<Section[]>>;
}

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
