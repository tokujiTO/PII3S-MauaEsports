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
    const response = await axios.post(API_URL, member);
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
}) => {
  try {
    const response = await axios.put(`${API_URL}/${member.ra}`, member);
    return response.data;
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

// export const deleteMember = async (ra: string) => {
//   try {
//     const response = await axios.delete(`${API_URL}/${ra}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error deleting member:', error);
//     throw error;
//   }
// };
