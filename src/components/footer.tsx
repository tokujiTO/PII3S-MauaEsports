import { InstagramLogo, LinkedinLogo, TwitchLogo } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logoColored.png"

export default function Footer() {
  const navigate = useNavigate()

  return (
    <div className='font-body bg-darkBlue relative flex h-fit w-full flex-col gap-6 p-4 text-white lg:h-[360px] lg:gap-0'>
      <div className='absolute top-0 z-0 flex h-[360px] w-full justify-center overflow-hidden'>
        <img
          src={logo}
          alt='Logo'
          className='min-h-fit min-w-1/2 p-2 opacity-40'
        />
      </div>
      <div className='z-10 flex h-3/4 flex-col items-start justify-evenly gap-6 lg:flex-row lg:gap-16 lg:px-16 lg:pt-24'>
        <div className='flex w-full flex-col items-start gap-6 text-2xl lg:w-1/3'>
          <ul className='list-inside list-disc'>
            <li>mauaeSports@maua.br</li>
            <li>11 11111-1111</li>
          </ul>
        </div>
        <div className='flex w-full flex-col justify-evenly text-xl md:flex-row lg:w-1/3'>
          <div className='flex items-center justify-center rounded-md bg-white p-1 text-black duration-300 hover:scale-110 hover:cursor-pointer'>
            <TwitchLogo size={42} />
          </div>
          <div className='flex items-center justify-center rounded-md bg-white p-1 text-black duration-300 hover:scale-110 hover:cursor-pointer'>
            <LinkedinLogo size={42} />
          </div>
          <div className='flex items-center justify-center rounded-md bg-white p-1 text-black duration-300 hover:scale-110 hover:cursor-pointer'>
            <InstagramLogo size={42} />
          </div>
        </div>
        <div className='flex w-1/3 flex-col'>
          <div className='flex flex-col items-end gap-2 text-3xl'>
            <p
              className='duration-300 hover:scale-125 hover:cursor-pointer hover:text-[#d1d1d1]'
              onClick={() => {
                navigate("/")
                scrollTo(0, 0)
              }}
            >
              Home
            </p>
            <p
              className='duration-300 hover:scale-125 hover:cursor-pointer hover:text-[#d1d1d1]'
              onClick={() => {
                navigate("/membros")
                scrollTo(0, 0)
              }}
            >
              Membros
            </p>
            <p
              className='duration-300 hover:scale-125 hover:cursor-pointer hover:text-[#d1d1d1]'
              onClick={() => {
                navigate("/campeonatos")
                scrollTo(0, 0)
              }}
            >
              Campeonatos
            </p>
          </div>
        </div>
      </div>
      <div className='z-10 mx-auto flex h-1/4 w-full flex-col gap-2 justify-end text-center text-xl'>
        <p>
          <span className='font-bold'>
            Nosso site está sob constante mudança. Versão: 1.0.0
          </span>
        </p>
        <p>Praça Mauá, 1 - Mauá, São Caetano do Sul - SP, 09580-900</p>
      </div>
    </div>
  )
}
