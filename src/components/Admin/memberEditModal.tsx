import { useEffect, useState } from 'react';
import { Member } from '../../hooks/useMembers';

interface MemberEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedMember: Member) => void;
  member?: Member;
}

export default function MemberEditModal({
  isOpen,
  onClose,
  onSave,
  member,
}: MemberEditModalProps) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(member?.name || '');
  const [ra, setRa] = useState(member?.ra || '');
  const [role, setRole] = useState(member?.role || '');
  const [hours, setHours] = useState(member?.hours || 0);

  useEffect(() => {
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setRa(member.ra);
      setRole(member.role);
      setHours(member.hours);
    }
  }, [member]);

  if (!isOpen) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleSave = () => {
    onSave({ name, ra, role, hours });
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
        className={`flex h-4/5 w-3/4 flex-col items-start justify-start overflow-y-scroll rounded-3xl bg-white px-4 py-6 shadow-lg ${
          visible ? 'translate-y-0' : 'translate-y-full'
        } gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-start justify-center">
          <h1 className="text-3xl font-bold">Editar Membro</h1>
          <div className="h-1 w-full rounded-full bg-black" />
        </div>
        <div className="flex w-full flex-col gap-4">
          <label className="text-xl font-medium" htmlFor="name">
            Nome
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-xl"
          />
          <label className="text-xl font-medium" htmlFor="ra">
            RA
          </label>
          <input
            id="ra"
            type="text"
            placeholder="RA"
            value={ra}
            onChange={(e) => setRa(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-xl"
          />
          <label className="text-xl font-medium" htmlFor="role">
            Função
          </label>
          <input
            id="role"
            type="text"
            placeholder="Função"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2 text-xl"
          />
          <label className="text-xl font-medium" htmlFor="hours">
            Horas
          </label>
          <input
            id="hours"
            type="number"
            placeholder="Horas"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full rounded-lg border border-gray-300 p-2 text-xl"
          />
        </div>
        <div className="flex w-full justify-end gap-6 text-2xl">
          <button
            onClick={handleClose}
            className="flex w-1/5 items-center justify-center rounded-xl bg-gray-300 p-2 duration-200 hover:cursor-pointer hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex w-1/5 items-center justify-center rounded-xl bg-blue-400 p-2 duration-200 hover:cursor-pointer hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
