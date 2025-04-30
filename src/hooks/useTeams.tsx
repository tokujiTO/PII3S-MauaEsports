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
      name: `Member ${index + 1}`,
      ra: `00.${String(index + 1).padStart(5, '0')}-0`,
      hours: Math.floor(Math.random() * 100), // Random hours between 0 and 99
      role: `Captão`, // Assigning roles cyclically (e.g., Role 1 to Role 5)
    },
    {
      name: `Member ${index + 2}`,
      ra: `00.${String(index + 2).padStart(5, '0')}-0`,
      hours: Math.floor(Math.random() * 100), // Random hours between 0 and 99
      role: `Role ${(index % 5) + 1}`, // Assigning roles cyclically (e.g., Role 1 to Role 5)
    },
    {
      name: `Member ${index + 3}`,
      ra: `00.${String(index + 3).padStart(5, '0')}-0`,
      hours: Math.floor(Math.random() * 100), // Random hours between 0 and 99
      role: `Role ${(index % 5) + 1}`, // Assigning roles cyclically (e.g., Role 1 to Role 5)
    },
    {
      name: `Member ${index + 4}`,
      ra: `00.${String(index + 4).padStart(5, '0')}-0`,
      hours: Math.floor(Math.random() * 100), // Random hours between 0 and 99
      role: `Role ${(index % 5) + 1}`, // Assigning roles cyclically (e.g., Role 1 to Role 5)
    },
    {
      name: `Member ${index + 5}`,
      ra: `00.${String(index + 5).padStart(5, '0')}-0`,
      hours: Math.floor(Math.random() * 100), // Random hours between 0 and 99
      role: `Role ${(index % 5) + 1}`, // Assigning roles cyclically (e.g., Role 1 to Role 5)
    },
  ],
}));

export const useTeams = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [teams, setTeams] = useState<Team[]>(mockTeams);

  return { teams };
};
