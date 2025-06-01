import axios from 'axios';
import { Event } from '../context/eventsContext';
import { toast } from 'react-toastify';

export const getEvents = async (setEvents: (Events: Event[]) => void) => {
  try {
    const response = await fetch('http://localhost:3000/eventos');

    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }

    const events = await response.json();
    setEvents(events);
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const addEvent = async (event: {
  titulo: string;
  data: string;
  link?: string;
}) => {
  try {
    const response = await axios.post('http://localhost:3000/evento', {
      titulo: event.titulo,
      data: event.data,
      link: event.link || '',
    });
    toast.success('Evento adicionado com sucesso!');
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar evento:', error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/evento`, {
      params: { id },
    });
    toast.success('Evento excluído com sucesso!');
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir evento:', error);
    throw error;
  }
};
