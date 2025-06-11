import { useContext } from 'react';
import { eventsContext } from '../context/eventsContext';

export const useEvents = () => {
  const context = useContext(eventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};
