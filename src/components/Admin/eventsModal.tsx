import { useEffect, useState } from 'react';

interface CampeonatosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EventsModal({
  isOpen,
  onClose,
}: CampeonatosModalProps) {
  const [visible, setVisible] = useState(false);

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
        className={`flex h-4/5 w-3/4 flex-col items-start justify-start overflow-y-scroll rounded-3xl bg-white px-4 py-6 shadow-lg ${visible ? 'translate-y-0' : 'translate-y-full'} gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-start justify-center">
          <h1>Eventos</h1>
          <div className="h-1 w-full rounded-full bg-black" />
        </div>
        <div className="flex w-full justify-end gap-6 text-2xl">
          <button className="flex w-1/5 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600">
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
