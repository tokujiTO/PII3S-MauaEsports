import { useState } from 'react';
import CampeonatosModal from './campeonatosModal';
import HomeModal from './homeModal';
import EventsModal from './eventsModal';

export default function Site() {
  const [selected, setSelected] = useState('');
  return (
    <div className="mt-20 flex h-full w-full justify-evenly text-5xl">
      <button
        className="bg-deepBlue hover:bg-darkBlue h-1/2 w-1/4 rounded-4xl px-4 py-2 text-white transition duration-300 hover:cursor-pointer"
        onClick={() => setSelected('home')}
      >
        Home
      </button>
      <button
        className="bg-deepBlue hover:bg-darkBlue h-1/2 w-1/4 rounded-4xl px-4 py-2 text-white transition duration-300 hover:cursor-pointer"
        onClick={() => setSelected('campeonatos')}
      >
        Campeonatos
      </button>
      <button
        className="bg-deepBlue hover:bg-darkBlue h-1/2 w-1/4 rounded-4xl px-4 py-2 text-white transition duration-300 hover:cursor-pointer"
        onClick={() => setSelected('eventos')}
      >
        Eventos
      </button>
      <CampeonatosModal
        isOpen={selected === 'campeonatos'}
        onClose={() => setSelected('')}
      />
      <HomeModal isOpen={selected === 'home'} onClose={() => setSelected('')} />
      <EventsModal
        isOpen={selected === 'eventos'}
        onClose={() => setSelected('')}
      />
    </div>
  );
}
