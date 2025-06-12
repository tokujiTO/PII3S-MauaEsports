import { InstagramLogo, LinkedinLogo, TwitchLogo } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoColored.png';

export default function Footer() {
  const navigate = useNavigate();

  const isSelected = (page: string) => {
    return window.location.pathname === page;
  };

  return (
    <div className="font-body bg-darkBlue relative flex h-fit w-full flex-col gap-6 overflow-hidden p-4 text-white lg:h-[360px] lg:gap-0">
      <div className="absolute top-0 z-0 flex h-[360px] w-full justify-center overflow-hidden">
        <img
          src={logo}
          alt="Logo"
          className="min-h-fit min-w-1/2 p-2 opacity-40"
        />
      </div>
      <div className="z-10 flex h-3/4 flex-col items-start justify-evenly gap-6 md:flex-row lg:gap-16 lg:px-16 lg:pt-24">
        <div className="neon-text-blue flex w-full flex-col items-center gap-6 text-sm md:w-1/3 md:items-start md:text-2xl">
          <ul className="flex w-full list-inside list-none justify-evenly md:list-disc md:flex-col">
            <li>mauaeSports@maua.br</li>
            <li>11 11111-1111</li>
          </ul>
        </div>
        <div className="flex w-full flex-row justify-evenly text-xl md:w-1/3">
          <div
            className="neon-box-yellow flex items-center justify-center rounded-md border-2 border-yellow-500 bg-gradient-to-tr from-yellow-300 to-orange-500 p-1 text-white duration-300 hover:scale-110 hover:cursor-pointer hover:shadow-none"
            onClick={() => {
              window.open('https://www.twitch.tv/mauaesports', '_blank');
            }}
          >
            <TwitchLogo size={42} />
          </div>
          <div
            className="neon-box-yellow flex items-center justify-center rounded-md border-2 border-yellow-500 bg-gradient-to-tr from-yellow-300 to-orange-500 p-1 text-white duration-300 hover:scale-110 hover:cursor-pointer hover:shadow-none"
            onClick={() => {
              window.open(
                'https://www.linkedin.com/company/mauaesports/posts/?feedView=all',
                '_blank'
              );
            }}
          >
            <LinkedinLogo size={42} />
          </div>
          <div
            className="neon-box-yellow flex items-center justify-center rounded-md border-2 border-yellow-500 bg-gradient-to-tr from-yellow-300 to-orange-500 p-1 text-white duration-300 hover:scale-110 hover:cursor-pointer hover:shadow-none"
            onClick={() => {
              window.open('https://www.instagram.com/esportsmaua/', '_blank');
            }}
          >
            <InstagramLogo size={42} />
          </div>
        </div>
        <div className="neon-text-blue flex w-full flex-col md:w-1/3">
          <div className="flex flex-col items-center gap-2 text-3xl md:items-end">
            <p
              className={`duration-300 hover:scale-125 hover:cursor-pointer ${isSelected('/') ? 'neon-text-yellow scale-125' : ''}`}
              onClick={() => {
                navigate('/');
                scrollTo(0, 0);
              }}
            >
              Home
            </p>
            <p
              className={`duration-300 hover:scale-125 hover:cursor-pointer ${isSelected('/membros') ? 'neon-text-yellow scale-125' : ''}`}
              onClick={() => {
                navigate('/membros');
                scrollTo(0, 0);
              }}
            >
              Membros
            </p>
            <p
              className={`duration-300 hover:scale-125 hover:cursor-pointer ${isSelected('/campeonatos') ? 'neon-text-yellow scale-125' : ''}`}
              onClick={() => {
                navigate('/campeonatos');
                scrollTo(0, 0);
              }}
            >
              Campeonatos
            </p>
          </div>
        </div>
      </div>
      <div className="z-10 mx-auto flex h-1/4 w-full flex-col justify-end gap-2 text-center text-sm md:text-xl">
        <p>
          <span className="font-bold">
            Nosso site está sob constante mudança. Versão: 1.0.0
          </span>
        </p>
        <p>Praça Mauá, 1 - Mauá, São Caetano do Sul - SP, 09580-900</p>
      </div>
    </div>
  );
}
