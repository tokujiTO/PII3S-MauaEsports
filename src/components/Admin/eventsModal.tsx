import { useEffect, useState } from 'react';
import { useEvents } from '../../hooks/useEvents';
import EventCard from './eventCard';

interface CampeonatosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EventsModal({
  isOpen,
  onClose,
}: CampeonatosModalProps) {
  const [visible, setVisible] = useState(false);
  const { events } = useEvents();

  useEffect(() => {
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  return (
    <div
      className={`fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
      onClick={handleClose}
    >
      <div
        className={`bg-darkBlue relative flex h-4/5 w-3/4 flex-col items-start justify-start overflow-y-scroll rounded-3xl border-l-8 border-cyan-300 shadow-lg ${visible ? 'translate-y-0' : 'translate-y-full'} gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-darkBlue sticky top-0 flex w-full flex-col items-start justify-center px-4 pt-6">
          <div className="flex w-full items-center justify-between">
            <h1>Eventos</h1>
            <button className="bg-yellow flex h-10 w-10 justify-center rounded-xl shadow-xl hover:cursor-pointer">
              +
            </button>
          </div>
          <div className="h-1 w-full rounded-full bg-gradient-to-l from-yellow-300 to-orange-600" />
        </div>
        <div className="flex w-full flex-col gap-2 px-4">
          {events.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
        <div className="bg-darkBlue sticky bottom-0 flex w-full justify-end gap-6 px-4 pt-4 pb-6 text-2xl">
          <button
            className="flex w-1/5 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600"
            onClick={handleClose}
          >
            cancelar
          </button>
          <button className="flex w-1/5 items-center justify-center rounded-xl bg-blue-400 p-2 duration-200 hover:cursor-pointer hover:bg-blue-600">
            salvar
          </button>
        </div>
      </div>
    </div>
  );
}
