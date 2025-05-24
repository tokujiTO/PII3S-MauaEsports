import { useEffect, useState } from 'react';
import { Member } from '../../hooks/useMembers';
import { updateMember } from '../../api/user';
import { Spinner } from '@phosphor-icons/react';

interface MemberEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  member?: Member;
}

export default function MemberEditModal({
  isOpen,
  onClose,
  onSave,
  member,
}: MemberEditModalProps) {
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState(member?.nome || '');
  const [ra, setRa] = useState(member?.ra || '');
  const [raAntigo, setRaAntigo] = useState(member?.ra || '');
  const [cargo, setcargo] = useState(member?.cargo || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  useEffect(() => {
    if (member) {
      setNome(member.nome);
      setRaAntigo(member.ra);
      setRa(member.ra);
      setcargo(member.cargo);
    }
  }, [member]);

  if (!isOpen) return null;

  const handleClose = () => {
    setVisible(false);
    setLoading(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleSave = async () => {
    setLoading(true);
    await updateMember({
      nome: nome,
      nickname: member?.nickname || '',
      ra: ra || '',
      area: member?.area || '',
      cargo: cargo || '',
      raAntigo: raAntigo
    });
    setLoading(false);
    onSave();
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
          <label className="text-xl font-medium" htmlFor="nome">
            Nome
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
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
          <label htmlFor="discord" className='text-xl font-medium'>
            Discord
          </label>
          <input 
          className='w-full rounded-lg border border-gray-300 p-2 text-xl'
          id="discord"
          type="text"
          placeholder="Discord"
          value={member?.nickname}
          onChange={(e) => setRa(e.target.value)}
          />
          <label className="text-xl font-medium" htmlFor="cargo">
            Função
          </label>
          <input
            id="cargo"
            type="text"
            placeholder="Função"
            value={cargo}
            onChange={(e) => setcargo(e.target.value)}
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
            {loading ? (
              <Spinner size={32} className="animate-spin" />
            ) : (
              'Salvar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
