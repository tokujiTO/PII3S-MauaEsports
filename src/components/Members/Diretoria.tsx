import Carousel from "../Carousel"

const data = [
  {
    name: "John Doe",
    image: "/images/john_doe.jpg",
    role: "President",
    linkedin: "https://www.linkedin.com/in/johndoe"
  },
  {
    name: "Jane Smith",
    image: "/images/jane_smith.jpg",
    role: "Vice President",
    linkedin: "https://www.linkedin.com/in/janesmith"
  },
  {
    name: "Alice Johnson",
    image: "/images/alice_johnson.jpg",
    role: "Treasurer"
  },
  {
    name: "Bob Brown",
    image: "/images/bob_brown.jpg"
  }
]

export default function Diretoria() {
  return (
    <div className='from-darkBlue font-body to-deepBlue flex flex-col items-center justify-center bg-gradient-to-t p-8 text-black'>
      <h1 className='mb-4 text-7xl font-bold text-white'>Diretoria</h1>
      <Carousel data={data} />
    </div>
  )
}
