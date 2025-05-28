import { useEffect, useState } from 'react';
import { Member, useMembers } from '../../hooks/useMembers';
import MemberCard from './memberCard';
import { CaretLeft, CaretRight, Funnel, Plus } from '@phosphor-icons/react';
import AddMemberModal from './addMemberModal';
import MemberConfirmDelete from './memberConfirmDelete';
import MemberEditModal from './memberEditModal';
import { fetchMembers } from '../../api/user';
import { useTrains } from '../../hooks/useTrains';

export default function Members() {
  const { members, setMembers } = useMembers();
  const [addModal, setAddModal] = useState(false);
  const { fetchEvents } = useTrains();
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<Member | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  let filteredMembers = members;
  if (search && members) {
    filteredMembers = members.filter((member) =>
      member.nome.toLowerCase().includes(search.toLowerCase())
    );
  }

  const memberPageSize = 5;
  const totalPages = filteredMembers
    ? Math.ceil(filteredMembers.length / memberPageSize)
    : 0;
  const startIndex = currentPage * memberPageSize;
  const endIndex = startIndex + memberPageSize;
  const currentMembers = filteredMembers
    ? filteredMembers.slice(startIndex, endIndex)
    : [];

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

  useEffect(() => {
    fetchMembers(setMembers);
    fetchEvents();
  }, []);

  return (
    <div className="z-50 flex w-full flex-col gap-8 rounded-t-4xl bg-white px-10 pb-10">
      <MemberConfirmDelete
        isOpen={deleteModal}
        member={selected}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => {
          fetchMembers(setMembers);
        }}
      />
      <MemberEditModal
        isOpen={editModal}
        member={selected}
        onClose={() => setEditModal(false)}
        onSave={() => fetchMembers(setMembers)}
      />
      <div className="bg-deepBlue flex h-28 w-full items-end justify-between rounded-2xl p-4 text-6xl font-bold text-white">
        <h1 className="b">Gerenciar Membros</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-deepBlue rounded-lg bg-white px-4 py-2 text-lg outline-none focus:ring-2"
          />
          <button className="text-deepBlue flex h-12 w-12 items-center justify-center rounded-lg bg-white duration-300 hover:scale-125 hover:cursor-pointer">
            <Funnel size={32} />
          </button>
          <button
            className="text-deepBlue flex h-12 w-12 items-center justify-center rounded-lg bg-white duration-300 hover:scale-125 hover:cursor-pointer"
            onClick={() => setAddModal(true)}
          >
            <Plus size={32} />
          </button>
        </div>
      </div>
      <div className="bg-deepBlue flex w-full items-center justify-between rounded-2xl p-4 text-4xl font-bold text-white">
        <h1>Nome</h1>
        <h1>RA</h1>
        <h1>Cargo</h1>
        <h1>Horas</h1>
      </div>
      <div className="flex flex-col gap-4 px-5">
        {currentMembers.map((member) => (
          <MemberCard
            key={member.ra}
            member={{
              nome: member.nome,
              cargo: member.cargo,
              nickname: member.nickname,
              ra: member.ra,
              horas: member.horas,
            }}
            onDelete={() => {
              setSelected(member);
              setDeleteModal(true);
            }}
            onEdit={() => {
              setSelected(member);
              setEditModal(true);
            }}
          />
        ))}
      </div>
      {currentMembers.length === 0 && (
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
      <AddMemberModal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        onSave={() => fetchMembers(setMembers)}
      />
    </div>
  );
}
