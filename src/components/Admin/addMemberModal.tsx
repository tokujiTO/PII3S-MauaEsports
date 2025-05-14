import { useEffect, useState } from 'react';
import { addMember } from '../../api/user';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function AddMemberModal({
  isOpen,
  onClose,
  onSave,
}: AddMemberModalProps) {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [ra, setRa] = useState('');
  const [area, setArea] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleSave = async () => {
    addMember({
      nome: name,
      nickname: nickName,
      ra,
      area,
      cargo: role,
    });
    onSave();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md ${
        visible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-200`}
      onClick={handleClose}
    >
      <div
        className={`flex h-4/5 w-3/4 flex-col items-start justify-between overflow-y-scroll rounded-3xl bg-white px-4 py-6 shadow-lg ${
          visible ? 'translate-y-0' : 'translate-y-full'
        } gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <div className="flex w-full flex-col items-start justify-center">
            <h1 className="text-3xl font-bold">Adicionar Membro</h1>
            <div className="h-1 w-full rounded-full bg-black" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <label className="text-3xl font-medium" htmlFor="name">
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
            <label className="text-3xl font-medium" htmlFor="nickName">
              NickName
            </label>
            <input
              id=""
              type="nickName"
              placeholder="Nickname do Discord"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xl"
            />
            <div className="flex w-full items-center gap-8">
              <div className="flex w-1/3 items-center gap-2">
                <label className="text-3xl font-medium" htmlFor="ra">
                  RA
                </label>
                <input
                  id="ra"
                  type="text"
                  placeholder="00.0000-0"
                  value={ra}
                  onChange={(e) => setRa(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2 text-xl"
                />
              </div>
              <div className="flex w-1/3 items-center gap-2">
                <label className="text-3xl font-medium" htmlFor="area">
                  Área
                </label>
                <select
                  id="area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  defaultValue={'none'}
                  className="w-full rounded-lg border border-gray-300 p-2 text-xl"
                >
                  <option value="none" disabled>
                    Selecione uma opção
                  </option>
                  <option value="player">Jogador</option>
                  <option value="marketing">Marketing</option>
                  <option value="director">Diretoria</option>
                </select>
              </div>
              <div className="flex w-1/3 items-center gap-2">
                <label className="text-3xl font-medium" htmlFor="role">
                  Cargo
                </label>
                <input
                  id="ra"
                  type="text"
                  placeholder="Capitão, mid, suporte, etc"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2 text-xl"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end gap-6 text-2xl">
          <button
            onClick={handleClose}
            className="flex w-1/5 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600"
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
