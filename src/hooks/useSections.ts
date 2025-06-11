import { useContext } from "react";
import { sectionsContext } from "../context/sectionsContext";

export const useSections = () => {
  const context = useContext(sectionsContext);
  if (!context) {
    throw new Error('useSections must be used within a SectionsProvider');
  }
  return context;
};
