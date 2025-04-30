import { useState, useEffect } from 'react';
import { Team } from '../../hooks/useTeams';
import MemberCard from './memberCard';
import { X } from '@phosphor-icons/react';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team?: Team;
}

export default function TeamModal({ isOpen, onClose, team }: TeamModalProps) {
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
        <div className="flex w-full flex-col items-start justify-center text-3xl">
          <div className="flex w-full items-center justify-between">
            <h1>{team?.name}</h1>
            <button
              className="text-2xl text-red-500 duration-300 hover:cursor-pointer hover:text-red-700"
              onClick={handleClose}
            >
              <X size={32} />
            </button>
          </div>
          <div className="h-1 w-full rounded-full bg-black" />
        </div>
        {team?.members.map((member) => <MemberCard member={member} />)}
        {/* <div className="flex w-full justify-end gap-6 text-2xl">
          <button className="flex w-1/5 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600">
            cancelar
          </button>
          <button className="flex w-1/5 items-center justify-center rounded-xl bg-blue-400 p-2 duration-200 hover:cursor-pointer hover:bg-blue-600">
            salvar
          </button>
        </div> */}
      </div>
    </div>
  );
}
