import { useEffect, useState } from 'react';
import { deleteMember } from '../../api/user';
import { Member } from '../../hooks/useMembers';

interface MemberConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  member?: Member;
}

export default function MemberConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  member,
}: MemberConfirmDeleteProps) {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(member?._id || '');

  useEffect(() => {
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  useEffect(() => {
    if (member?._id) {
      setId(member._id);
    }
  }, [member]);

  if (!isOpen) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleConfirm = async () => {
    await deleteMember(id);
    onConfirm();
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md ${
        visible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-200`}
      onClick={handleClose}
    >
      <div
        className={`flex h-1/3 w-1/3 flex-col items-center justify-between rounded-3xl bg-darkBlue px-6 py-8 shadow-lg border-l-8 border-cyan-300  ${
          visible ? 'translate-y-0' : 'translate-y-full'
        } gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold">Confirmar Exclusão</h1>
        <p className="text-center text-lg text-gray-300">
          Tem certeza de que deseja excluir {member?.nome}? Esta ação não pode
          ser desfeita.
        </p>
        <div className="flex w-full justify-center gap-4">
          <button
            onClick={handleClose}
            className="flex w-1/3 items-center justify-center rounded-xl bg-gray-300 p-2 duration-200 hover:cursor-pointer hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex w-1/3 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
