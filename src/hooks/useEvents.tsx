import { useState } from 'react';

export interface Events {
  name: string;
  date: string;
  description: string;
  link?: string;
}

const mockEvents: Events[] = Array.from({ length: 38 }, (_, index) => ({
  name: `Evento ${index + 1}`,
  date: `${new Date(2025, index % 12, index + 1).getTime()}`,
  description: `Descrição do evento ${index + 1}`,
  link: index % 2 === 0 ? `https://example.com/event${index + 1}` : undefined,
}));

export const useEvents = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [events, setEvents] = useState<Events[]>(mockEvents);

  return { events };
};
