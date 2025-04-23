import Footer from "../components/footer";
import Navbar from "../components/navbar";


export default function Members() {
  return (
    <div className="pt-20">
      <Navbar />
      <h1 className='text-3xl text-red-800 font-thin'>Membros</h1>
      <p>Bem-vindo à página de membros!</p>
      <Footer />
    </div>
  )
}