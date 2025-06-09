import { useState } from 'react';
import CampeonatosModal from './campeonatosModal';
import HomeModal from './homeModal';
import EventsModal from './eventsModal';

export default function Site() {
  const [selected, setSelected] = useState('');
  return (
    <div className="mt-20 flex max-md:px-4 h-full gap-4 max-md:pb-6 w-full flex-col justify-evenly text-3xl  md:text-5xl md:flex-row">
      <button
        className="bg-darkBlue neon-box-duo hover:bg-darkBlue h-1/3 md:h-1/2 w-full md:w-1/4 rounded-4xl border-cyan-300 px-4 py-2 text-white transition duration-300 hover:cursor-pointer"
        onClick={() => setSelected('home')}
      >
        Home
      </button>
      <button
        className="bg-darkBlue neon-box-duo hover:bg-darkBlue h-1/3 md:h-1/2 w-full md:w-1/4 rounded-4xl border-cyan-300 px-4 py-2 text-white transition duration-300 hover:cursor-pointer"
        onClick={() => setSelected('campeonatos')}
      >
        Conquistas
      </button>
      <button
        className="bg-darkBlue neon-box-duo hover:bg-darkBlue h-1/3 md:h-1/2 w-full md:w-1/4 rounded-4xl border-cyan-300 px-4 py-2 text-white transition duration-300 hover:cursor-pointer"
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
