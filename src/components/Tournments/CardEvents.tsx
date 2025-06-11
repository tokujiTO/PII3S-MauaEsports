import { useEffect } from 'react';
import { getEventsPublic } from '../../api/events';
import { useEvents } from '../../hooks/useNextEvents';
import EventsList from './EventsList';

export default function CardEvents() {
  const { events, setEvents } = useEvents();
  const fetchEvents = async () => {
    await getEventsPublic(setEvents);
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  if (events.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-darkBlue text-4xl font-bold">
          Nenhum evento encontrado!
        </h1>
      </div>
    );
  }

  return (
    <section className="relative mt-10 flex flex-col items-center">
      <h3 className="bg-darkBlue/90 neon-box-yellow text-coolWhite font-futurist relative z-20 flex w-7/8 flex-col items-center justify-center rounded-3xl rounded-t-lg px-6 py-5 text-4xl backdrop-blur-xl lg:text-8xl">
        EVENTOS
      </h3>
      <div className="bg-coolWhite neon-box-duo text-darkBlue relative z-10 mb-50 flex w-2/3 flex-col gap-15 rounded-3xl rounded-b-lg px-6 pt-20 pb-12 sm:-mt-21 sm:pt-50">
        <EventsList Events={events} />
      </div>
    </section>
  );
}
