import { useState } from 'react';
import { Member, useMembers } from '../../hooks/useMembers';
import MemberCard from './memberCard';
import { CaretLeft, CaretRight, Funnel, Plus } from '@phosphor-icons/react';
import AddMemberModal from './addMemberModal';
import MemberConfirmDelete from './memberConfirmDelete';
import MemberEditModal from './memberEditModal';
import axios from 'axios';

export default function Members() {
  const { members } = useMembers();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selected, setSelected] = useState<Member | undefined>(undefined);

  const memberPageSize = 5;
  const totalPages = Math.ceil(members.length / memberPageSize);
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * memberPageSize;
  const endIndex = startIndex + memberPageSize;
  const currentMembers = members.slice(startIndex, endIndex);

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

  async function cadastrarMembro(nome: string, nickname: string, ra: string, area: string, cargo: string) {
    const URL = `http://localhost:3000/player`;
    (await axios.post(URL, {nome, nickname, ra, area, cargo})).data;
  }

  return (
    <div className="z-50 flex w-full flex-col gap-8 rounded-t-4xl bg-white px-10 pb-10">
      <MemberConfirmDelete
        isOpen={deleteModal}
        member={selected}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => {
          console.log('confirm delete user:', selected);
        }}
      />
      <MemberEditModal
        isOpen={editModal}
        member={selected}
        onClose={() => setEditModal(false)}
        onSave={() => {
          console.log('save user:', selected);
        }}
      />
      <div className="bg-deepBlue flex h-28 w-full items-end justify-between rounded-2xl p-4 text-6xl font-bold text-white">
        <h1 className="b">Gerenciar Membros</h1>
        <div className="flex items-center gap-4">
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
      <div className="flex flex-col gap-4 px-5">
        {currentMembers.map((member) => (
          <MemberCard
            key={member.ra}
            member={member}
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
        onSave={(membro) => {
          setAddModal(false);
          window.location.reload();
          cadastrarMembro(membro.name, membro.nickName, membro.ra, membro.area, membro.role);
        }}
      />
    </div>
  );
}
