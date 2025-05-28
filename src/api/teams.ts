import axios from 'axios';
import { Team } from '../hooks/useTeams';

export const getTeams = async () => {
  try {
    const response = await axios.get('http://localhost:3000/equipes/all');

    const teams = response.data;
    return teams;
  } catch (error) {
    console.error('Error fetching events:', error);
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
}) => {
  try {
    const response = await axios.put('http://localhost:3000/equipe', team);
    return response.data;
  } catch (error) {
    console.error('Error editing team:', error);
    throw error;
  }
};

export const deleteTeam = async (teamId: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/equipe`, {
      params: { _id: teamId },
    });
    return response.data;
  } catch (error) {
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
}) => {
  try {
    const response = await axios.post('http://localhost:3000/equipe', team);
    return response.data;
  } catch (error) {
    console.error('Error adding team:', error);
    throw error;
  }
};
