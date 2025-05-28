import { useState } from 'react';
import Members from './members';
import Teams from './teams';
import Site from './site';

export default function Admin() {
  const [menu, setMenu] = useState(
    localStorage.getItem('menu') || 'gerenciar-membros'
  );
  return (
    <div className="neon-box-duo bg-deepBlue z-50 flex min-h-screen w-full flex-col rounded-t-4xl p-0 text-white">
      <nav className="flex w-full items-center justify-between">
        <ul className="flex w-full items-center justify-evenly gap-10">
          <li
            className={`cursor-pointer text-2xl font-bold ${
              menu === 'gerenciar-membros' ? 'neon-text-yellow scale-125' : ''
            }`}
            onClick={() => {
              setMenu('gerenciar-membros');
              localStorage.setItem('menu', 'gerenciar-membros');
            }}
          >
            Membros
          </li>
          <li
            className={`cursor-pointer text-2xl font-bold ${
              menu === 'gerenciar-times' ? 'neon-text-yellow scale-125' : ''
            }`}
            onClick={() => {
              setMenu('gerenciar-times');
              localStorage.setItem('menu', 'gerenciar-times');
            }}
          >
            Times
          </li>
          <li
            className={`cursor-pointer text-2xl font-bold ${
              menu === 'gerenciar-site' ? 'neon-text-yellow scale-125' : ''
            }`}
            onClick={() => {
              setMenu('gerenciar-site');
              localStorage.setItem('menu', 'gerenciar-site');
            }}
          >
            Site
          </li>
        </ul>
      </nav>
      {menu === 'gerenciar-membros' && <Members />}
      {menu === 'gerenciar-times' && <Teams />}
      {menu === 'gerenciar-site' && <Site />}
    </div>
  );
}
