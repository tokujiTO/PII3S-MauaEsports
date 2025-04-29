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
        className={`flex h-4/5 w-3/4 items-center justify-center rounded-3xl bg-white shadow-lg ${visible ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Campeonatos</h1>
      </div>
    </div>
  );
}
