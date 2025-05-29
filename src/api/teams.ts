import axios from 'axios';
import { Team } from '../hooks/useTeams';
import { toast } from 'react-toastify';

export const getTeams = async () => {
  try {
    const response = await axios.get('http://localhost:3000/equipes/all');

    const teams = response.data;
    return teams;
  } catch (error) {
    toast.error('Error fetching events');
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const getPublicTeams = async () => {
  try {
    const response = await axios.get('http://localhost:3000/equipes/allPublic');

    const teams = response.data;
    return teams;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

interface ScheduledTraining {
  Start: string;
  End: string;
}

export const editSchedule = async (data: {
  _id: string;
  ScheduledTrainings: ScheduledTraining[];
}) => {
  try {
    const response = await axios.patch(`/api/modality`, data, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    });
    toast.success('Schedule edited successfully!');
    return response.data;
  } catch (error) {
    toast.error('Error editing schedule');
    console.error('Error editing schedule:', error);
    throw error;
  }
};

export const getModalityByTag = async (tag: string) => {
  try {
    const response = await axios.get(`/api/modality/all?Tag=${tag}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    });
    const modality = response.data;
    return modality;
  } catch (error) {
    toast.error('Error fetching modality by tag');
    console.error('Error fetching modality by tag:', error);
    throw error;
  }
};

export const getModalities = async () => {
  try {
    const response = await axios.get(`/api/modality/all`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      },
    });

    const modalities = response.data;
    return modalities;
  } catch (error) {
    toast.error('Error fetching modalities');
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getMyTeam = async (ra: string) => {
  try {
    const response = await axios.get('http://localhost:3000/equipe', {
      params: { ra },
    });

    const team = response.data;
    return team;
  } catch (error) {
    toast.error('Error fetching my team');
    console.error('Error fetching my team:', error);
    throw error;
  }
};

export const fetchPublicTeams = async (setTeams: (teams: Team[]) => void) => {
  try {
    const response = await getPublicTeams();
    if (response) {
      setTeams(response);
    } else {
      setTeams([]);
    }
    return response;
  } catch (error) {
    console.error('Error fetching public teams:', error);
    throw error;
  }
};

export const fetchTeams = async (setTeams: (teams: Team[]) => void) => {
  try {
    const response = await getTeams();
    if (response) {
      setTeams(response);
    } else {
      setTeams([]);
    }
    return response;
  } catch (error) {
    toast.error('Error fetching teams');
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const editTeam = async (team: {
  _id: string;
  nome: string;
  cap: string;
  image: string;
  membros: string[];
  color?: string;
  modality?: string;
}) => {
  try {
    const response = await axios.put('http://localhost:3000/equipe', team);
    toast.success('Team edited successfully!');
    return response.data;
  } catch (error) {
    toast.error('Error editing team');
    console.error('Error editing team:', error);
    throw error;
  }
};

export const deleteTeam = async (teamId: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/equipe`, {
      params: { _id: teamId },
    });
    toast.success('Team deleted successfully!');
    return response.data;
  } catch (error) {
    toast.error('Error deleting team');
    console.error('Error deleting team:', error);
    throw error;
  }
};

export const addTeam = async (team: {
  nome: string;
  cap: string;
  image: string;
  membros: string[];
  color?: string;
  modality?: string;
}) => {
  try {
    const response = await axios.post('http://localhost:3000/equipe', team);
    toast.success('Team added successfully!');
    return response.data;
  } catch (error) {
    toast.error('Error adding team');
    console.error('Error adding team:', error);
    throw error;
  }
};
