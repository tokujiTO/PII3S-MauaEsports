import { createContext, useEffect, useState } from 'react';
import { getEvents } from '../api/user';

interface Events {
  _id: string;
  StartTimestamp: number;
  ScheduledStart: string;
  EndTimestamp: number;
  AttendedPlayers: Player[];
  modalityId: string;
  Status: string;
}

interface Player {
  PlayerId: string;
  EntranceTimestamp: number;
  ExitTimestamp: number;
}

interface TrainsContextProps {
  events: Events[];
  loading: boolean;
}

export const TrainsContext = createContext<TrainsContextProps | undefined>(
  undefined
);

export const TrainsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <TrainsContext.Provider value={{ events, loading }}>
      {children}
    </TrainsContext.Provider>
  );
};
