import { useEffect, useState } from 'react';

interface CampeonatosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CampeonatosModal({
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
        className={`bg-darkBlue relative flex h-4/5 w-3/4 flex-col items-start justify-start overflow-y-scroll rounded-3xl border-l-8 border-cyan-300 shadow-lg ${visible ? 'translate-y-0' : 'translate-y-full'} gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex w-full flex-col items-start justify-center px-4 pt-6">
          <h1>Campeonatos</h1>
          <div className="to h-1 w-full rounded-full bg-orange-600 bg-gradient-to-l from-yellow-300" />
        </div>
        <div className="sticky bottom-0 flex w-full justify-end gap-6 px-4 py-6 text-2xl">
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
