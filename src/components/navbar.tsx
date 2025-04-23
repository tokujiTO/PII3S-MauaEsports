import { List } from "@phosphor-icons/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import logo from "../assets/logo_black.svg"

export default function Navbar() {
  const logo = "https://i.imgur.com/0m1v2rD.png"
  
  const navigate = useNavigate()

  const [isHamburguerOpen, setIsHamburguerOpen] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const handleOpenMenu = () => {
    setIsHamburguerOpen(true)
    setTimeout(() => {
      setIsMenuVisible(true)
    }, 0)
  }

  const handleCloseMenu = () => {
    setIsMenuVisible(false)
    setTimeout(() => {
      setIsHamburguerOpen(false)
    }, 50)
  }

  return (
    <>
      <nav className='font-body text-oceanGreen fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between bg-white px-16 pl-4 text-2xl font-light shadow-lg max-lg:hidden'>
        <img src={logo} alt='' />
        <ul className='flex items-center space-x-10'>
          <li
            className='duration-200 hover:cursor-pointer hover:text-gray-200'
            onClick={() => {
              navigate("/")
              scrollTo(0, 0)
            }}
          >
            Home
          </li>
          <li
            className='duration-200 hover:cursor-pointer hover:text-gray-200'
            onClick={() => {
              navigate("/membros")
              scrollTo(0, 0)
            }}
          >
            Membros
          </li>
          <li
            className='duration-200 hover:cursor-pointer hover:text-gray-200'
            onClick={() => {
              navigate("/campeonatos")
              scrollTo(0, 0)
            }}
          >
            Campeonatos
          </li>
        </ul>
      </nav>
      <nav className='text-oceanGreen fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between bg-white px-4 pr-8 text-2xl shadow-md lg:hidden'>
        <img src={logo} alt='' />
        <div className='hover:cursor-pointer' onClick={handleOpenMenu}>
          <List size={32} />
        </div>
        {isHamburguerOpen && (
          <div
            className={`absolute top-0 left-0 flex h-[100vh] w-[100vw] backdrop-blur-md transition-all duration-100 ${isMenuVisible ? "opacity-100" : "opacity-0"} flex-col gap-5 bg-gray-500/50`}
            onClick={handleCloseMenu}
          >
            <div
              className={`absolute top-0 left-full flex h-[100vh] w-[50vw] flex-col items-center justify-between gap-5 bg-white py-10 transition-transform duration-100 ${isMenuVisible ? "-translate-x-full" : "translate-x-0"}`}
            >
              <ul className='text-oceanGreen flex flex-col justify-center gap-10 text-center text-2xl font-thin'>
                <li
                  className={`delay-200 duration-300 hover:cursor-pointer hover:text-gray-200 ${isMenuVisible ? "translate-x-0" : "translate-x-[100vw]"}`}
                  onClick={() => {
                    navigate("/")
                    scrollTo(0, 0)
                  }}
                >
                  Home
                </li>
                <li
                  className={`delay-100 duration-300 hover:cursor-pointer hover:text-gray-200 ${isMenuVisible ? "translate-x-0" : "translate-x-[100vw]"}`}
                  onClick={() => {
                    navigate("/membros")
                    scrollTo(0, 0)
                  }}
                >
                  Membros
                </li>
                <li
                  className={`delay-100 duration-300 hover:cursor-pointer hover:text-gray-200 ${isMenuVisible ? "translate-x-0" : "translate-x-[100vw]"}`}
                  onClick={() => {
                    navigate("/campeonatos")
                    scrollTo(0, 0)
                  }}
                >
                  Campeonatos
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
