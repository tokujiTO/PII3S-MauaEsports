import { useEffect, useState } from 'react';
import {
  Achievment,
  deleteAchievment,
  updateAchievment,
} from '../../api/achievments';
import { toast } from 'react-toastify';

interface EditAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  achievement: Achievment;
}

export default function EditAchievementModal({
  isOpen,
  onClose,
  onSave,
  achievement,
}: EditAchievementModalProps) {
  const [visible, setVisible] = useState(false);
  const [year, setYear] = useState('');
  const [achivements, setAchievments] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && achievement) {
      setYear(achievement.year);
      setAchievments(
        achievement.achivements.length ? achievement.achivements : ['']
      );
    }
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen, achievement]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
      setYear('');
      setAchievments(['']);
      setLoading(false);
    }, 100);
  };

  const handleChangeAchievment = (index: number, value: string) => {
    setAchievments((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddAchievment = () => {
    setAchievments((prev) => [...prev, '']);
  };

  const handleRemoveAchievment = (index: number) => {
    setAchievments((prev) =>
      prev.length > 1 ? prev.filter((_, i) => i !== index) : prev
    );
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteAchievment(achievement._id);
    setLoading(false);
    onSave();
    handleClose();
  };

  const handleSave = async () => {
    setLoading(true);
    if (!year || achivements.some((a) => !a.trim())) {
      toast.error('Preencha o ano e todas as conquistas.');
      setLoading(false);
      return;
    }
    await updateAchievment(achievement._id, {
      year: year,
      achivements: achivements,
    });
    setLoading(false);
    onSave();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-xl ${
        visible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-200`}
      onClick={handleClose}
    >
      <div
        className={`bg-darkBlue flex h-3/5 w-2/3 flex-col items-start justify-between rounded-3xl border-l-8 border-cyan-300 shadow-lg ${
          visible ? 'translate-y-0' : 'translate-y-full'
        } gap-4 overflow-y-scroll transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <div
            className="bg-darkBlue flex w-full flex-col items-start justify-center gap-4 px-4 pt-6 pb-2"
            style={{ position: 'sticky', top: 0 }}
          >
            <div className="flex w-full items-center justify-between">
              <h1 className="text-3xl font-bold">Editar Conquista</h1>
              <button
                className="rounded bg-red-400 p-2 text-xl text-white duration-200 hover:cursor-pointer hover:bg-red-600"
                onClick={handleDelete}
              >
                Deletar
              </button>
            </div>
            <div className="h-1 w-full rounded-full bg-yellow-300 bg-gradient-to-l from-orange-600" />
          </div>
          <div className="flex w-full flex-col gap-4 px-4">
            <label className="text-3xl font-medium" htmlFor="year">
              Ano
            </label>
            <input
              id="year"
              type="text"
              placeholder="Ano (ex: 2024)"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xl text-white"
            />
            <label className="text-3xl font-medium">Conquistas</label>
            {achivements.map((ach, idx) => (
              <div key={idx} className="flex w-full items-center gap-2">
                <input
                  type="text"
                  placeholder={`Conquista #${idx + 1}`}
                  value={ach}
                  onChange={(e) => handleChangeAchievment(idx, e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-2 text-xl text-white"
                />
                {achivements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAchievment(idx)}
                    className="rounded bg-red-400 px-2 py-1 text-white hover:bg-red-600"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAchievment}
              className="w-fit rounded bg-green-400 px-4 py-2 text-white hover:bg-green-600"
            >
              + Adicionar conquista
            </button>
          </div>
        </div>
        <div
          className="bg-darkBlue flex w-full justify-end gap-6 px-4 pt-2 pb-6 text-2xl"
          style={{ position: 'sticky', bottom: 0 }}
        >
          <button
            onClick={handleClose}
            className="flex w-1/5 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex w-1/5 items-center justify-center rounded-xl bg-blue-400 p-2 duration-200 hover:cursor-pointer hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? <span className="animate-spin">⏳</span> : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}
