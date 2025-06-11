import axios from 'axios';
import { toast } from 'react-toastify';

export interface Section {
  _id: string;
  sectionNumber: number;
  title: string;
  content: string;
  image: string;
}

export const getSections = async (
  setSections: (sections: Section[]) => void
) => {
  try {
    const response = await axios.get('http://localhost:3000/sections');
    setSections(response.data);
    return response.data;
  } catch (error) {
    toast.error('Erro ao buscar seções');
    throw error;
  }
};

export const editSection = async (section: Section) => {
  try {
    const response = await axios.put('http://localhost:3000/sections', section);
    toast.success('Seção atualizada com sucesso!');
    return response.data;
  } catch (error) {
    toast.error('Erro ao atualizar seção');
    throw error;
  }
};
