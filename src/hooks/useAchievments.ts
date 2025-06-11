import { useContext } from 'react';
import { achievementsContext } from '../context/achievmentsContext';

export const useAchievments = () => {
  const context = useContext(achievementsContext);
  if (!context) {
    throw new Error(
      'useAchievments must be used within an AchievmentsProvider'
    );
  }
  return context;
};
