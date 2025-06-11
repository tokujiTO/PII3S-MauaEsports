import axios from 'axios';
import { toast } from 'react-toastify';

export interface Achievment {
  _id: string;
  year: string;
  achivements: string[];
}

export const getAchievments = async (
  setAchievments: (achievments: Achievment[]) => void
) => {
  try {
    const response = await axios.get('http://localhost:3000/achivements');
    setAchievments(response.data);
    return response.data;
  } catch (error) {
    toast.error('Erro ao buscar conquistas');
    throw error;
  }
};

export const addAchievment = async (achievment: {
  year: string;
  achivements: string[];
}) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/achiviment',
      achievment
    );
    toast.success('Conquista adicionada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error('Erro ao adicionar conquista');
    throw error;
  }
};

export const updateAchievment = async (
  id: string,
  achievment: { year: string; achivements: string[] }
) => {
  try {
    const response = await axios.put(
      'http://localhost:3000/achiviment',
      achievment,
      { params: { id } }
    );
    toast.success('Conquista atualizada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error('Erro ao atualizar conquista');
    throw error;
  }
};

export const deleteAchievment = async (id: string) => {
  try {
    const response = await axios.delete('http://localhost:3000/achiviment', {
      params: { id },
    });
    toast.success('Conquista deletada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error('Erro ao deletar conquista');
    throw error;
  }
};
