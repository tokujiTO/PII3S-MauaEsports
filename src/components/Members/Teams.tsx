import TeamCarousel from "./TeamCarousel"

const teams = [
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Valorant_logo_-_pink_color_version.svg",
    members: [
      { name: "Membro 1", role: "Capitão" },
      { name: "Membro 2", role: "Player" },
      { name: "Membro 2", role: "Player" },
      { name: "Membro 2", role: "Player" },
      { name: "Membro 2", role: "Player" },
      { name: "Membro 2", role: "Player" }
    ],
    color: "bg-gradient-to-t from-[#FF4655]/20 to-[#FF4655]/10"
  },
  {
    image:
      "https://logos-world.net/wp-content/uploads/2021/02/Rainbow-Six-Logo.png",
    members: [
      { name: "Membro 1", role: "Capitão" },
      { name: "Membro 2", role: "Player" },
      { name: "Membro 2", role: "Player" },
      { name: "Membro 2", role: "Player" },
      { name: "Membro 2", role: "Player" },
      { name: "Membro 2", role: "Player" }
    ],
    color: "bg-gradient-to-t from-darkBlue/20 to-darkBlue/10"
  }
]

export default function Teams() {
  return (
    <div className='font-body relative flex h-full w-full flex-col items-center justify-center bg-white py-8'>
      <div className='bg-darkBlue absolute top-0 left-0 z-0 h-2/3 w-full rounded-b-3xl' />
      <h1 className='z-10 text-center text-7xl font-bold text-white'>
        Nossas Equipes
      </h1>
      <TeamCarousel data={teams} />
    </div>
  )
}
