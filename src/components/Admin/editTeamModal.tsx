import { useEffect, useState } from 'react';
import { Spinner } from '@phosphor-icons/react';
import { editTeam, getModalities } from '../../api/teams';

interface EditTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  team?: {
    _id: string;
    nome: string;
    cap: string;
    image: string;
    membros: string[];
    color?: string;
    modality?: string;
  };
}

export default function EditTeamModal({
  isOpen,
  onClose,
  onSave,
  team,
}: EditTeamModalProps) {
  const [visible, setVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [cap, setCap] = useState('');
  const [image, setImage] = useState('');
  const [members, setMembers] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalities, setModalities] = useState<any[]>([]);
  const [modality, setSelectedModality] = useState('');

  const fetchModalities = async () => {
    const modalities = await getModalities();
    const modalityOptions = Object.values(modalities).map((modality: any) => ({
      value: modality.Tag,
      label: modality.Name,
    }));
    setModalities(modalityOptions);
  };

  useEffect(() => {
    fetchModalities();
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  useEffect(() => {
    if (team && isOpen) {
      setNome(team.nome || '');
      setCap(team.cap || '');
      setImage(team.image || '');
      setMembers(team.membros ? team.membros.join(', ') : '');
      setColor(team.color || '');
      setSelectedModality(team.modality || '');
    }
  }, [team, isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
      setNome('');
      setImage('');
      setCap('');
      setMembers('');
      setColor('');
      setLoading(false);
    }, 100);
  };

  const handleSave = async () => {
    if (!team) return;
    setLoading(true);
    await editTeam({
      _id: team._id,
      nome: nome,
      cap: cap,
      image: image,
      membros: members.split(',').map((member) => member.trim()),
      color: color,
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
        className={`bg-darkBlue relative flex h-4/5 w-3/4 flex-col items-start justify-between overflow-y-scroll rounded-3xl border-l-8 border-cyan-300 shadow-lg ${visible ? 'translate-y-0' : 'translate-y-full'} gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <div className="bg-darkBlue sticky top-0 flex w-full flex-col items-start justify-center px-4 pt-6">
            <h1 className="text-3xl font-bold">Editar Time</h1>
            <div className="h-1 w-full rounded-full bg-gradient-to-l from-orange-600 to-yellow-400" />
          </div>
          <div className="flex w-full flex-col gap-4 px-4">
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
            <label className="text-3xl font-medium" htmlFor="image">
              Url do banner
            </label>
            <input
              id="image"
              type="text"
              placeholder="URL do banner"
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
            <label className="text-3xl font-medium" htmlFor="color">
              Cor
            </label>
            <input
              id="color"
              type="text"
              placeholder="Ex: gradient-to-t from-blue-500 to-white"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xl"
            />
          </div>
          <div className="flex w-2/5 flex-col gap-4 px-4">
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
