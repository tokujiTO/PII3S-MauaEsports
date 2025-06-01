import { Event } from '../context/eventsContext';

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
