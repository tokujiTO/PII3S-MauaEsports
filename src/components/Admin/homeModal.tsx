import { useEffect, useState } from 'react';
import { useSections } from '../../hooks/useSections';
import { Section } from '../../api/sections';
import EditSectionModal from './editSectionModal';

interface HomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HomeModal({ isOpen, onClose }: HomeModalProps) {
  const [visible, setVisible] = useState(false);
  const { sections } = useSections();
  const [modal, setModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setVisible(isOpen);
    }, 100);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleSectionClick = (section: Section) => {
    setSelectedSection(section);
    setModal(true);
  };

  return (
    <div
      className={`fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md max-md:px-2 ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
      onClick={handleClose}
    >
      <EditSectionModal
        isOpen={modal}
        onClose={() => {
          setModal(false);
          setSelectedSection(null);
        }}
        section={selectedSection}
      />
      <div
        className={`bg-darkBlue relative flex h-4/5 w-full flex-col items-start justify-start overflow-y-scroll rounded-3xl border-l-8 border-cyan-300 shadow-lg md:w-3/4 ${visible ? 'translate-y-0' : 'translate-y-full'} gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex w-full flex-col items-start justify-center px-4 pt-6">
          <h1>Home</h1>
          <div className="h-1 w-full rounded-full bg-yellow-200 bg-gradient-to-r from-orange-600" />
        </div>
        {/* Conteúdo do modal pode ser adicionado aqui */}
        <div className="flex w-full flex-col gap-4 px-4">
          {sections.map((section) => (
            <div
              key={section._id}
              className="bg-deepBlue flex w-full flex-col items-start justify-start gap-2 rounded-xl p-6 px-4 py-2 hover:cursor-pointer"
              onClick={() => handleSectionClick(section)}
            >
              <p className="text-lightBlue text-3xl md:text-5xl">
                Sessão {section.sectionNumber}
              </p>
              <p className="text-xl text-white md:text-2xl">
                <strong>Título:</strong> {section.title}
              </p>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 flex w-full justify-end gap-6 px-4 py-6 text-2xl">
          <button
            className="flex w-1/5 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600"
            onClick={handleClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
