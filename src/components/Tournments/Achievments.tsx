import { useEffect } from 'react';
import { useAchievments } from '../../hooks/useAchievments';
import CarouselTournments from './CarouselTournments';
import { getAchievments } from '../../api/achievments';

export default function Achievments() {
  const { achievements, setAchievements } = useAchievments();
  const fetchAchievements = async () => {
    await getAchievments(setAchievements);
  };
  useEffect(() => {
    fetchAchievements;
  }, []);
  if (achievements.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-bold">Conquistas</h1>
        <p className="text-lg text-gray-600">
          Conquistas aparecerão aqui em breve! Fique ligado!
        </p>
      </div>
    );
  }
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center sm:h-screen">
      <h1 className="neon-shadow-duo mt-20 text-5xl font-bold text-white sm:text-7xl">
        Nossas Conquistas
      </h1>
      <CarouselTournments data={achievements} />
    </div>
  );
}
