import { useEffect, useState } from 'react';
import { Spinner } from '@phosphor-icons/react';
import { addTeam, getModalities } from '../../api/teams';

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function AddTeamModal({
  isOpen,
  onClose,
  onSave,
}: AddTeamModalProps) {
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [cap, setCap] = useState('');
  const [image, setImage] = useState('');
  const [members, setMembers] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalities, setModalities] = useState<any[]>([]);
  const [modality, setSelectedModality] = useState('');

  useEffect(() => {
    fetchModalities();
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  const fetchModalities = async () => {
    const modalities = await getModalities();
    const modalityOptions = Object.values(modalities).map((modality: any) => ({
      value: modality.Tag,
      label: modality.Name,
    }));
    setModalities(modalityOptions);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
      setNome('');
      setImage('');
      setCap('');
      setMembers('');
      setLoading(false);
    }, 100);
  };

  const handleSave = async () => {
    setLoading(true);
    await addTeam({
      nome: nome,
      cap: cap,
      image: image,
      membros: members.split(',').map((member) => member.trim()),
      color: color.toLowerCase(),
      modality: modality,
    });
    onSave();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
      onClick={handleClose}
    >
      <div
        className={`bg-darkBlue flex h-4/5 w-3/4 flex-col items-start justify-between overflow-y-scroll rounded-3xl border-l-8 border-cyan-300 px-4 py-6 shadow-lg ${visible ? 'translate-y-0' : 'translate-y-full'} gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <div className="flex w-full flex-col items-start justify-center">
            <h1 className="text-3xl font-bold">Adicionar Time</h1>
            <div className="h-1 w-full rounded-full bg-gradient-to-l from-orange-600 to-yellow-400" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full justify-between gap-4">
              <div className="flex w-1/2 flex-col gap-4">
                <label className="text-3xl font-medium" htmlFor="name">
                  Nome do Time
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nome do time"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2 text-xl"
                />
              </div>
              <div className="flex w-1/2 flex-col gap-4">
                <label className="text-3xl font-medium" htmlFor="cap">
                  Nome do Capitão
                </label>
                <input
                  id="cap"
                  type="text"
                  placeholder="Nome do capitão"
                  value={cap}
                  onChange={(e) => setCap(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2 text-xl"
                />
              </div>
            </div>
            <label className="text-3xl font-medium" htmlFor="name">
              Url do banner
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nome do time"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xl"
            />
            <label className="text-3xl font-medium" htmlFor="members">
              Membros (RA ou nome, separados por vírgula)
            </label>
            <input
              id="members"
              type="text"
              placeholder="Ex: João, Maria, 24-00000-0, 24-00001-0"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xl"
            />
            <label className="text-3xl font-medium" htmlFor="members">
              Cor
            </label>
            <input
              id="members"
              type="text"
              placeholder="Ex: gradient-to-t from-blue-500 to-white"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xl"
            />
            <label htmlFor="modality" className="text-3xl font-medium">
              Modalidade
            </label>
            <select
              value={modality}
              onChange={(e) => setSelectedModality(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xl"
            >
              <option value="">Selecione uma modalidade</option>
              {modalities.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
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
