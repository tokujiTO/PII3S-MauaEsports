import { useState, useEffect } from 'react';
import { Section } from '../../api/sections';
import { toast } from 'react-toastify';
import { Spinner } from '@phosphor-icons/react';

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: Section | null;
}

export default function EditSectionModal({
  isOpen,
  onClose,
  section,
}: EditSectionModalProps) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(section?.title || '');
  const [content, setContent] = useState(section?.content || '');
  const [image, setImage] = useState(section?.image || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    if (!title || !content || !image) {
      toast.error('Por favor, preencha todos os campos.');
      setLoading(false);
      return;
    }
    setLoading(false);
    onClose();
  };

  useEffect(() => {
    setTimeout(() => {
      setTitle(section?.title || '');
      setContent(section?.content || '');
      setImage(section?.image || '');
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setVisible(false);
    setLoading(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  return (
    <div
      className={`fixed inset-0 z-20 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md max-md:px-2 ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
      onClick={handleClose}
    >
      <div
        className={`bg-darkBlue relative flex h-4/5 w-full flex-col items-start justify-start overflow-y-scroll rounded-3xl border-l-8 border-cyan-300 shadow-lg md:w-3/4 ${visible ? 'translate-y-0' : 'translate-y-full'} gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-darkBlue sticky top-0 flex w-full flex-col items-start justify-center px-4 pt-6">
          <h1>Editar Sessão {section?.sectionNumber}</h1>
          <div className="h-1 w-full rounded-full bg-yellow-200 bg-gradient-to-r from-orange-600" />
        </div>
        {section && (
          <div className="flex w-full flex-col gap-4 px-4 text-2xl md:text-3xl">
            <div className="flex flex-col gap-2">
              <label className="text-lightBlue">Título:</label>
              <input
                type="text"
                defaultValue={section.title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-darkBlue rounded-lg bg-gray-200 p-2 max-md:text-xl"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lightBlue">Descrição:</label>
              <textarea
                defaultValue={section.content}
                onChange={(e) => setContent(e.target.value)}
                className="text-darkBlue rounded-lg bg-gray-200 p-2 text-lg md:text-xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lightBlue">Imagem:</label>
              <input
                type="text"
                defaultValue={section.image}
                onChange={(e) => setImage(e.target.value)}
                className="text-darkBlue rounded-lg bg-gray-200 p-2 max-md:text-xl"
              />
            </div>
          </div>
        )}
        <div className="bg-darkBlue flex w-full items-center justify-end gap-4 px-4 py-2 text-4xl">
          <button
            className="rounded-lg bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600"
            onClick={handleClose}
          >
            Voltar
          </button>
          <button
            className="rounded-lg bg-blue-400 p-2 duration-200 hover:cursor-pointer hover:bg-blue-600"
            onClick={handleSubmit}
          >
            {loading ? (
              <Spinner className="animate-spin" size={32} />
            ) : (
              'Salvar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
