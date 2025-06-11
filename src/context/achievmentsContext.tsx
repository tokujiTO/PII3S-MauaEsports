import React, { useState, useEffect, createContext } from 'react';
import { getAchievments, Achievment } from '../api/achievments';

interface AchievementsContextType {
  achievements: Achievment[];
  setAchievements: (achievments: Achievment[]) => void;
}

export const achievementsContext = createContext<
  AchievementsContextType | undefined
>(undefined);

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [achievements, setAchievements] = useState<Achievment[]>([]);

  useEffect(() => {
    getAchievments(setAchievements);
  }, []);

  return (
    <achievementsContext.Provider value={{ achievements, setAchievements }}>
      {children}
    </achievementsContext.Provider>
  );
};
