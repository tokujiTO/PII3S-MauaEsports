import { useState } from 'react';
import { Member } from './useMembers';

export interface Team {
  name: string;
  members: Member[];
}

const mockTeams: Team[] = Array.from({ length: 14 }, (_, index) => ({
  name: `Time ${index + 1}`,
  members: [
    {
      nickname: `nickname${index + 1}`,
      nome: `Member ${index + 1}`,
      ra: `00.${String(index + 1).padStart(5, '0')}-0`,
      horas: Math.floor(Math.random() * 100), // Random hours between 0 and 99
      area: `Area ${index + 1}`, // Assigning areas cyclically (e.g., Area 1 to Area 5)
      cargo: `Cargo ${index + 1}`, // Assigning cargos cyclically (e.g., Cargo 1 to Cargo 5)
    },
    {
      nickname: `nickname${index + 1}`,
      nome: `Member ${index + 2}`,
      ra: `00.${String(index + 2).padStart(5, '0')}-0`,
      horas: Math.floor(Math.random() * 100), // Random hours between 0 and 99)
      area: `Area ${index + 1}`, // Assigning areas cyclically (e.g., Area 1 to Area 5)
      cargo: `Cargo ${index + 1}`, // Assigning cargos cyclically (e.g., Cargo 1 to Cargo 5)
    },
    {
      nickname: `nickname${index + 1}`,
      nome: `Member ${index + 3}`,
      ra: `00.${String(index + 3).padStart(5, '0')}-0`,
      horas: Math.floor(Math.random() * 100), // Random hours between 0 and 99)
      area: `Area ${index + 1}`, // Assigning areas cyclically (e.g., Area 1 to Area 5)
      cargo: `Cargo ${index + 1}`, // Assigning cargos cyclically (e.g., Cargo 1 to Cargo 5)
    },
    {
      nickname: `nickname${index + 1}`,
      nome: `Member ${index + 4}`,
      ra: `00.${String(index + 4).padStart(5, '0')}-0`,
      horas: Math.floor(Math.random() * 100), // Random hours between 0 and 99)
      area: `Area ${index + 1}`, // Assigning areas cyclically (e.g., Area 1 to Area 5)
      cargo: `Cargo ${index + 1}`, // Assigning cargos cyclically (e.g., Cargo 1 to Cargo 5)
    },
    {
      nickname: `nickname${index + 1}`,
      nome: `Member ${index + 5}`,
      ra: `00.${String(index + 5).padStart(5, '0')}-0`,
      horas: Math.floor(Math.random() * 100), // Random hours between 0 and 99)
      area: `Area ${index + 1}`, // Assigning areas cyclically (e.g., Area 1 to Area 5)
      cargo: `Cargo ${index + 1}`, // Assigning cargos cyclically (e.g., Cargo 1 to Cargo 5)
    },
  ],
}));

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>();
  setTeams(mockTeams);

  return { teams };
};
