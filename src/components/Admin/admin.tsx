import { useState } from 'react';
import Members from './members';
import Teams from './teams';
import Site from './site';

export default function Admin() {
  const [menu, setMenu] = useState('gerenciar-membros');
  return (
    <div className="z-50 flex min-h-screen w-full flex-col rounded-t-4xl bg-white p-0 text-black">
      <nav className="flex w-full items-center justify-between">
        <ul className="flex w-full items-center justify-evenly gap-10">
          <li
            className={`cursor-pointer text-2xl font-bold ${
              menu === 'gerenciar-membros' ? 'text-blue-500' : ''
            }`}
            onClick={() => setMenu('gerenciar-membros')}
          >
            Membros
          </li>
          <li
            className={`cursor-pointer text-2xl font-bold ${
              menu === 'gerenciar-times' ? 'text-blue-500' : ''
            }`}
            onClick={() => setMenu('gerenciar-times')}
          >
            Times
          </li>
          <li
            className={`cursor-pointer text-2xl font-bold ${
              menu === 'gerenciar-site' ? 'text-blue-500' : ''
            }`}
            onClick={() => setMenu('gerenciar-site')}
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
