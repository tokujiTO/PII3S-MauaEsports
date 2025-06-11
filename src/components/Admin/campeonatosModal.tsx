import { useEffect, useState } from 'react';
import AddAchievementsModal from './addAchievementsModal';
import { useAchievments } from '../../hooks/useAchievments';
import { Achievment, getAchievments } from '../../api/achievments';
import CarouselTournments from '../Tournments/CarouselTournments';
import EditAchievementModal from './editAchievementModal';

interface CampeonatosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CampeonatosModal({
  isOpen,
  onClose,
}: CampeonatosModalProps) {
  const [visible, setVisible] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedAchiev, setSelectedAchiev] = useState<Achievment | null>(null);

  const { achievements, setAchievements } = useAchievments();

  const fetchAchievements = async () => {
    await getAchievments(setAchievements);
  };
  useEffect(() => {
    fetchAchievements();
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

  const handleClickCard = (achiev: Achievment) => {
    setSelectedAchiev(achiev);
    setEditModal(true);
  };

  return (
    <div
      className={`fixed inset-0 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md max-md:px-2 ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
      onClick={handleClose}
    >
      <AddAchievementsModal
        isOpen={addModal}
        onClose={() => {
          setAddModal(false);
        }}
        onSave={() => {
          fetchAchievements();
          setAddModal(false);
        }}
      />
      {selectedAchiev && (
        <EditAchievementModal
          isOpen={editModal}
          onClose={() => {
            setEditModal(false);
            setSelectedAchiev(null);
          }}
          onSave={() => {
            setEditModal(false);
            setSelectedAchiev(null);
            fetchAchievements();
          }}
          achievement={selectedAchiev}
        />
      )}

      <div
        className={`bg-darkBlue relative flex h-4/5 w-full flex-col items-start justify-start rounded-3xl border-l-8 border-cyan-300 shadow-lg md:w-3/4 ${visible ? 'translate-y-0' : 'translate-y-full'} gap-4 transition-transform duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-darkBlue sticky top-0 flex w-full flex-col items-start justify-center gap-2 px-4 pt-6">
          <div className="flex w-full items-center justify-between">
            <h1>Conquistas</h1>
            <div className="flex items-center gap-4">
              <button
                className="bg-yellow flex h-10 w-10 justify-center rounded-xl shadow-xl hover:cursor-pointer"
                onClick={() => {
                  setAddModal(true);
                }}
              >
                +
              </button>
              <button
                className="flex min-w-1/4 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600 md:min-w-1/5"
                onClick={handleClose}
              >
                Fechar
              </button>
            </div>
          </div>
          <div className="h-1 w-full rounded-full bg-gradient-to-l from-yellow-300 to-orange-600" />
        </div>
        <CarouselTournments data={achievements} handleClick={handleClickCard} />
      </div>
    </div>
  );
}
