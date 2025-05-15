import { useState } from 'react';

export interface Member {
  image?: string;
  cargo: string;
  nome: string;
  nickname: string;
  ra: string;
  area: string;
  horas: number;
  // role: string;
}

// const mockMembers: Member[] = Array.from({ length: 38 }, (_, index) => ({
//   nome: `Member ${index + 1}`,
//   ra: `00.${String(index + 1).padStart(5, '0')}-0`,
//   hours: Math.floor(Math.random() * 100), // Random hours between 0 and 99
//   cargo: `Role ${(index % 5) + 1}`, // Assigning roles cyclically (e.g., Role 1 to Role 5)
// }));

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>();

  return { members, setMembers };
};
