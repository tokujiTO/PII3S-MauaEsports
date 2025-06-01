import { useEffect, useState } from 'react';
import { Spinner } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import { addEvent } from '../../api/events';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function AddEventModal({
  isOpen,
  onClose,
  onSave,
}: AddEventModalProps) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
      setTitle('');
      setDate('');
      setLink('');
    }, 100);
  };

  const handleSave = async () => {
    console.log('Saving event:', { title, date, link });
    setLoading(true);
    if (!title || !date) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }
    await addEvent({
      titulo: title,
      data: new Date(date).getTime().toString(),
      link: link || '',
    });
    setLoading(false);
    onSave();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-xl ${
        visible ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-200`}
      onClick={handleClose}
    >
      <div
        className={`bg-darkBlue flex h-3/5 w-2/3 flex-col items-start justify-between rounded-3xl border-l-8 border-cyan-300 px-4 py-6 shadow-lg ${
          visible ? 'translate-y-0' : 'translate-y-full'
        } gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <div className="flex w-full flex-col items-start justify-center">
            <h1 className="text-3xl font-bold">Adicionar Evento</h1>
            <div className="h-1 w-full rounded-full bg-yellow-300 bg-gradient-to-l from-orange-600" />
          </div>
          <div className="flex w-full flex-col gap-4">
            <label className="text-3xl font-medium" htmlFor="title">
              Título
            </label>
            <input
              id="title"
              type="text"
              placeholder="Título do evento"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xl text-white"
            />
            <label className="text-3xl font-medium" htmlFor="date">
              Data e Hora
            </label>
            <div className="relative w-full">
              <input
                id="date"
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-darkBlue w-full appearance-none rounded-lg border border-gray-300 p-2 text-xl text-white"
                min={new Date().toISOString().slice(0, 16)}
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <label className="text-3xl font-medium" htmlFor="link">
              Link (opcional)
            </label>
            <input
              id="link"
              type="text"
              placeholder="Link do evento (Discord, etc)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-xl"
            />
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
