import Carousel from "../Carousel"

const data = [
  {
    name: "John Doe",
    image: "/images/john_doe.jpg",
    role: "Diretor de marketing",
    linkedin: "https://www.linkedin.com/in/johndoe"
  },
  {
    name: "Jane Smith",
    image: "/images/jane_smith.jpg",
    role: "Gerente de marketing",
    linkedin: "https://www.linkedin.com/in/janesmith"
  },
  {
    name: "Alice Johnson",
    image: "/images/alice_johnson.jpg",
    role: "Analista de marketing",
    linkedin: "https://www.linkedin.com/in/alicejohnson"
  },
  {
    name: "Bob Brown",
    image: "/images/bob_brown.jpg",
    role: "Coordenador de marketing",
    linkedin: "https://www.linkedin.com/in/bobbrown"
  }
]

export default function Marketing() {
  return (
    <div className='font-body bg-darkBlue flex flex-col items-center justify-center py-8 text-black'>
      <h1 className='mb-4 text-7xl font-bold text-white'>Marketing</h1>
      <Carousel data={data} />
    </div>
  )
}
