import axios, { AxiosError } from 'axios';
import { Member } from '../hooks/useMembers';
import { toast } from 'react-toastify';

export interface Events {
  _id: string;
  StartTimestamp: number;
  ScheduledStart: string;
  EndTimestamp: number;
  AttendedPlayers: Player[];
  modalityId: string;
  Status: string;
}

export interface Player {
  PlayerId: string;
  EntranceTimestamp: number;
  ExitTimestamp: number;
}

const API_URL = 'http://localhost:3000/players';
// Removed the top-level useMembers call as it violates React Hook rules.

export const fetchMembers = async (setMembers: (members: Member[]) => void) => {
  try {
    const response = await axios.get(API_URL);
    setMembers(response.data); // Use setMembers here
    return response.data;
  } catch (error) {
    toast.error('Erro ao buscar membros.');
    throw error;
  }
};

export const fetchPublicMembers = async (
  setMembers: (members: Member[]) => void
) => {
  try {
    const response = await axios.get(`http://localhost:3000/player/allPublic`);
    setMembers(response.data); // Use setMembers here
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async (setUser: (User: any) => void) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post('http://localhost:3000/auth/check', {
      accessToken,
    });
    if (response.data.existe) {
      setUser(response.data.usuario);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
    }
  } catch (err) {
    toast.error('Erro ao verificar usuário.');
    console.error('Error fetching user:', err);
    return (err as AxiosError).response?.data;
  }
};

export const addMember = async (member: {
  nome: string;
  nickname: string;
  ra: string;
  area: string;
  cargo: string;
}) => {
  try {
    const response = await axios.post(`/player`, member);
    toast.success('Membro adicionado com sucesso!');
    return response.data;
  } catch (error) {
    toast.error('Erro ao adicionar membro');
    throw error;
  }
};

export const updateMember = async (member: {
  nome: string;
  nickname: string;
  ra: string;
  area: string;
  cargo: string;
  raAntigo: string;
}) => {
  try {
    const { ra, nome, cargo, area, raAntigo, nickname } = member;
    const response = await axios.get(`/player`, { params: { raAntigo } });
    const _id = response.data._id;

    const response2 = await axios.put(`/player`, {
      _id,
      area,
      ra,
      nickname,
      nome,
      cargo,
    });
    toast.success('Membro atualizado com sucesso!');
    return response2.data;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await axios.get(`/api/trains/all`, {
      params: { StartTimestamp: 1704092400 },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    });

    const events: Events[] = response.data;
    return events;
  } catch (error) {
    toast.error('Erro ao buscar eventos.');
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const deleteMember = async (_id: string) => {
  try {
    const response = await axios.delete(`/player`, { data: { _id } });
    toast.success('Membro deletado com sucesso!');
    return response.data;
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};

// export const getPlayerHours = async (playerId: string) => {
//   try {
//     const response = await axios.get(`/api/trains/all`, {
//       params: { StartTimestamp: 1704092400 },
//       headers: {
//         Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
//       },
//     });

//     const events: Events[] = response.data;
//     console.log('PlayerId:', playerId);
//     let totalMilliseconds = 0;

//     // Calcula o tempo total em milissegundos
//     events.forEach((event: Events) => {
//       event.AttendedPlayers?.forEach((player: Player) => {
//         if (player.PlayerId === playerId) {
//           totalMilliseconds += player.ExitTimestamp - player.EntranceTimestamp;
//         }
//       });
//     });

//     // Converte para horas
//     const totalHours = totalMilliseconds / (1000 * 60 * 60);

//     return totalHours.toFixed(2); // Retorna as horas com 2 casas decimais
//   } catch (error) {
//     console.error('Error fetching player hours:', error);
//     throw error;
//   }
// };
