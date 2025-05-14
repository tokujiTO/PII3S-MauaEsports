import axios from 'axios';
import { Member } from '../hooks/useMembers';

const API_URL = 'http://localhost:3000/players';

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
    const response = await axios.get(`/player`, {params: {raAntigo}});
    const _id = response.data._id;

    const response2 = await axios.put(`/player`, {_id, ra, nome, cargo });
    return response2.data;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

export const deleteMember = async (ra: string) => {
  const response = await axios.get(`/player`, {params: {ra}});
  const _id = response.data._id;
  console.log("aqui foi" + _id);
  try {
    const response = await axios.delete(`/player`, {data: {_id}});
    return response.data;
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};
