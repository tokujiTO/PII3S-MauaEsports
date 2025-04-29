import HourCard from '../../components/Admin/hourCard';
import logo from '../../assets/logoBW.png';
import { SignOut } from '@phosphor-icons/react';
import Captain from '../../components/Admin/captain';
import Admin from '../../components/Admin/admin';

export default function homeInterno() {
  const NickName = localStorage.getItem('email')?.split('@')[0];
  const role = localStorage.getItem('role');
  const isAdmin = role === 'admin';
  const isCap = role === 'cap';
  const isUser = !isAdmin && !isCap;

  if (!NickName) {
    window.location.href = '/';
  }

  const logout = () => {
    localStorage.removeItem('email');
    window.location.href = '/';
  };

  return (
    <div
      className={`bg-yellow font-body relative flex w-full flex-col items-center justify-center ${isUser ? 'h-screen overflow-hidden' : 'h-[188vh] px-0 pb-0'} p-10 font-thin`}
    >
      <img
        src={logo}
        alt=""
        className="absolute top-1/8 left-1/2 z-0 w-4/5 -translate-x-1/2 opacity-10"
      />
      <SignOut
        size={64}
        color="white"
        className="absolute top-2 left-[98%] -translate-x-full duration-300 hover:scale-125 hover:cursor-pointer"
        onClick={logout}
      />
      <div
        className={`flex w-full items-center justify-center gap-10 ${isUser ? 'h-full' : 'h-3/5'}`}
      >
        <div className="z-10 flex w-1/2 flex-col items-center justify-center gap-4 text-7xl text-white">
          <h1 className="font-bold">bem vindo</h1>
          <h2 className="font-semibold">{NickName}!</h2>
        </div>
        <div className="z-10 flex h-full w-1/2 flex-col items-center justify-center gap-4">
          <HourCard hour={'30'} />
        </div>
      </div>
      {isCap && <Captain />}
      {isAdmin && <Admin />}
    </div>
  );
}
