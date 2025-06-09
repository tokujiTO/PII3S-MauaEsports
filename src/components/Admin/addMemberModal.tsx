import { useEffect, useState } from 'react';
import { addMember } from '../../api/user';
import { Spinner } from '@phosphor-icons/react';
import { toast } from 'react-toastify';

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
  const [area, setArea] = useState('none');
  const [role, setRole] = useState('none');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  const onChangeRa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.-]/g, '');
    setRa(value);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleSave = async () => {
    setLoading(true);
    if (!name || !ra || area === 'none' || role === 'none') {
      toast.error('Por favor, preencha todos os campos corretamente.');
      setLoading(false);
      return;
    }
    await addMember({
      nome: name,
      nickname: nickName,
      ra: ra,
      area: area,
      cargo: role,
    });
    onSave();
    handleClose();
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md max-md:px-2 ${
        visible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-200`}
      onClick={handleClose}
    >
      <div
        className={`bg-darkBlue flex h-4/5 w-full flex-col items-start justify-between overflow-y-scroll rounded-3xl border-l-8 border-cyan-300 px-4 py-6 shadow-lg md:w-3/4 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        } gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <div className="flex w-full flex-col items-start justify-center">
            <h1 className="text-3xl font-bold">Adicionar Membro</h1>
            <div className="to h-1 w-full rounded-full bg-yellow-300 bg-gradient-to-l from-orange-600" />
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
              Id do Discord
            </label>
            <input
              id=""
              type="nickName"
              placeholder="Id do Discord"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xl"
            />
            <div className="flex w-full flex-wrap items-center gap-8">
              <div className="flex w-full items-center gap-2 md:w-1/3">
                <label className="text-3xl font-medium" htmlFor="ra">
                  RA
                </label>
                <input
                  id="ra"
                  type="text"
                  placeholder="00.0000-0"
                  value={ra}
                  onChange={(e) => onChangeRa(e)}
                  className="w-full rounded-lg border border-gray-300 p-2 text-xl"
                />
              </div>
              <div className="flex w-full items-center gap-2 md:w-1/3">
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
                  <option value="event">Eventos</option>
                  <option value="marketing">Marketing</option>
                  <option value="director">Diretoria</option>
                </select>
              </div>
              <div className="flex w-full items-center gap-2 md:w-1/3">
                <label className="text-3xl font-medium" htmlFor="role">
                  Cargo
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  defaultValue={'none'}
                  className="w-full rounded-lg border border-gray-300 p-2 text-xl"
                >
                  <option value="none" disabled>
                    Selecione uma opção
                  </option>
                  <option value="admin">Admin</option>
                  <option value="cap">Capitão</option>
                  <option value="dna">Não se aplica</option>
                  <option value="player">Jogador</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-end gap-6 text-2xl">
          <button
            onClick={handleClose}
            className="flex min-w-1/4 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600 md:w-1/5"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex min-w-1/4 items-center justify-center rounded-xl bg-blue-400 p-2 duration-200 hover:cursor-pointer hover:bg-blue-600 md:w-1/5"
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
