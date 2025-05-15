import axios from 'axios';
import { Member } from '../hooks/useMembers';

interface Events {
  _id: string;
  StartTimestamp: number;
  ScheduledStart: string;
  EndTimestamp: number;
  AttendedPlayers: Player[];
  modalityId: string;
  Status: string;
}

interface Player {
  PlayerId: string;
  EntranceTimestamp: number;
  ExitTimestamp: number;
}

const API_URL = 'http://localhost:3000/players';
const apiMauaE = import.meta.env.VITE_API_MAUAE;
// Removed the top-level useMembers call as it violates React Hook rules.

export const fetchMembers = async (setMembers: (members: Member[]) => void) => {
  try {
    const response = await axios.get(API_URL);
    setMembers(response.data); // Use setMembers here
    return response.data;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
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
    return response.data;
  } catch (error) {
    console.error('Error adding member:', error);
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
  // estamos procurando o membro por RA, logo não podemos alterar o RA
  // para alterar o ra precisamos procurar o membro pelo _id
  // para pegar o id temos que fazer um /get palyer pelo RA antigo que retorna o _id
  // enviamos o _id ao backend e poderemos alterar o RA

  try {
    const { ra, nome, cargo, raAntigo } = member;
    const response = await axios.get(`/player`, { params: { raAntigo } });
    const _id = response.data._id;

    const response2 = await axios.put(`/player`, { _id, ra, nome, cargo });
    return response2.data;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await axios.get(
      `${apiMauaE}/trains/all?StartTimestamp=1704092400`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
      }
    );

    const events: Events[] = response.data;
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getPlayerHours = async (playerId: string) => {
  try {
    const response = await axios.get(`/api/trains/all`, {
      params: { StartTimestamp: 1704092400 },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    });

    const events: Events[] = response.data;
    console.log('PlayerId:', playerId);
    let totalMilliseconds = 0;

    // Calcula o tempo total em milissegundos
    events.forEach((event: Events) => {
      event.AttendedPlayers?.forEach((player: Player) => {
        if (player.PlayerId === playerId) {
          totalMilliseconds += player.ExitTimestamp - player.EntranceTimestamp;
        }
      });
    });

    // Converte para horas
    const totalHours = totalMilliseconds / (1000 * 60 * 60);

    return totalHours.toFixed(2); // Retorna as horas com 2 casas decimais
  } catch (error) {
    console.error('Error fetching player hours:', error);
    throw error;
  }
};

export const deleteMember = async (_id: string) => {
  try {
    const response = await axios.delete(`/player`, { data: { _id } });
    return response.data;
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};
