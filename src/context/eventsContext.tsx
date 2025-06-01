import React, { useState, useEffect, createContext } from 'react';
import { getEvents } from '../api/events';

interface EventContext {
  events: any[];
  setEvents: (events: any[]) => void;
}

export interface Event {
  _id: string;
  data: string;
  link: string;
  titulo: string;
}

export const eventsContext = createContext<EventContext | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents(setEvents);
  }, []);

  return (
    <eventsContext.Provider value={{ events, setEvents }}>
      {children}
    </eventsContext.Provider>
  );
};
