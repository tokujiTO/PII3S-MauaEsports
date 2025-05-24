import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useState } from 'react';
import { Team, useTeams } from '../../hooks/useTeams';
import TeamCard from './teamCard';

export default function Teams() {
  const { teams } = useTeams();
  const [currentPage, setCurrentPage] = useState(0);

  let totalPages = 0;
  let currentTeams: Team[] = [];

  if (teams) {
    const memberPageSize = 5;
    totalPages = Math.ceil(teams.length / memberPageSize);
    const startIndex = currentPage * memberPageSize;
    const endIndex = startIndex + memberPageSize;
    currentTeams = teams.slice(startIndex, endIndex);
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="z-50 flex w-full flex-col gap-8 rounded-t-4xl bg-white px-10 pb-10">
      <div className="bg-deepBlue flex h-28 w-full items-end justify-between rounded-2xl p-4 text-6xl font-bold text-white">
        <h1 className="b">Gerenciar Times</h1>
      </div>
      <div className="flex flex-col gap-4 px-5">
        {currentTeams.map((team) => (
          <TeamCard team={team} />
        ))}
      </div>
      {currentTeams.length === 0 && (
        <div className="flex h-96 w-full items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-500">
            Nenhum membro encontrado
          </h1>
        </div>
      )}
      <div className="flex w-full items-center justify-center">
        <div className={`${currentPage === 0 ? 'invisible' : ''}`}>
          <button
            onClick={handlePrevious}
            className="hover:text-deepBlue duration-300 hover:scale-125 hover:cursor-pointer"
          >
            <CaretLeft size={32} />
          </button>
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`mx-2 rounded-lg px-4 py-2 ${
                currentPage === index ? 'bg-blue-500 text-white' : ''
              } duration-300 hover:cursor-pointer hover:bg-blue-300 hover:text-white`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className={`${currentPage === totalPages - 1 ? 'invisible' : ''}`}>
          <button
            onClick={handleNext}
            className="hover:text-deepBlue duration-300 hover:scale-125 hover:cursor-pointer"
          >
            <CaretRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
