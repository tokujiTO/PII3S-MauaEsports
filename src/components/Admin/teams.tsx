import { useEffect, useState } from 'react';
import { Team, useTeams } from '../../hooks/useTeams';
import TeamCard from './teamCard';
import { CaretLeft, CaretRight, Plus } from '@phosphor-icons/react';
import AddTeamModal from './addTeamModal';
import EditTeamModal from './editTeamModal';
import { fetchTeams } from '../../api/teams';

export default function Teams() {
  const { teams, setTeams } = useTeams();
  const [currentPage, setCurrentPage] = useState(0);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined);

  let totalPages = 0;
  let currentTeams: Team[] = [];

  if (teams) {
    const memberPageSize = 5;
    totalPages = Math.ceil(teams.length / memberPageSize);
    const startIndex = currentPage * memberPageSize;
    const endIndex = startIndex + memberPageSize;
    currentTeams = teams.slice(startIndex, endIndex);
  }

  useEffect(() => {
    fetchTeams(setTeams);
  }, []);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-deepBlue z-50 flex w-full flex-col gap-8 rounded-t-4xl px-10 pb-10">
      <AddTeamModal
        isOpen={addModal}
        onClose={() => {
          setAddModal(false);
          fetchTeams(setTeams);
        }}
        onSave={() => {
          setAddModal(false);
          fetchTeams(setTeams);
        }}
      />
      <EditTeamModal
        isOpen={editModal}
        team={
          selectedTeam
            ? {
                ...selectedTeam,
                membros: selectedTeam.membros.map((m: any) =>
                  typeof m === 'string' ? m : (m._id ?? m.id ?? '')
                ),
              }
            : undefined
        }
        onClose={() => {
          setEditModal(false);
          setSelectedTeam(undefined);
        }}
        onSave={() => {
          fetchTeams(setTeams);
          setSelectedTeam(undefined);
        }}
      />
      <div className="bg-darkBlue neon-box-duo mt-6 flex h-28 w-full items-end justify-between rounded-2xl p-4 text-6xl font-bold text-white">
        <h1 className="b">Gerenciar Times</h1>
        <button
          className="text-deepBlue flex h-12 w-12 items-center justify-center rounded-lg bg-white duration-300 hover:scale-125 hover:cursor-pointer"
          onClick={() => setAddModal(true)}
        >
          <Plus size={32} />
        </button>
      </div>
      {currentTeams.length === 0 && (
        <div className="flex h-96 w-full items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Nenhum time encontrado
          </h1>
        </div>
      )}
      <div className="flex flex-col gap-4 px-5">
        {currentTeams?.map((team, index) => (
          <TeamCard
            team={team}
            key={index}
            onEdit={() => {
              setSelectedTeam(team);
              setEditModal(true);
            }}
            onDelete={() => {
              fetchTeams(setTeams);
              setSelectedTeam(undefined);
            }}
          />
        ))}
      </div>
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
