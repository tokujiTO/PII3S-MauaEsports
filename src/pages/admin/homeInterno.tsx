import HourCard from '../../components/Admin/hourCard';
import logo from '../../assets/logoBW.png';
import { SignOut } from '@phosphor-icons/react';

export default function homeInterno() {
  const NickName = localStorage.getItem('email')?.split('@')[0] || 'Visitante';
  return (
    <div className="bg-yellow font-body relative flex h-screen w-full items-center justify-center overflow-hidden p-10 font-thin">
      <img
        src={logo}
        alt=""
        className="absolute top-1/5 left-1/2 z-0 w-4/5 -translate-x-1/2 opacity-10"
      />
      <SignOut
        size={64}
        color="white"
        className="absolute top-2 left-full -translate-x-full hover:cursor-pointer"
      />
      <div className="z-10 flex w-1/2 flex-col items-center justify-center gap-4 text-7xl text-white">
        <h1 className="font-bold">bem vindo</h1>
        <h2 className="font-semibold">{NickName}!</h2>
      </div>
      <div className="z-10 flex h-full w-1/2 flex-col items-center justify-center gap-4">
        <HourCard hour={'30'} />
      </div>
    </div>
  );
}
