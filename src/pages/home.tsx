import Footer from "../components/footer";
import Section1 from "../components/Home/Section1";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="pt-20">
      <Navbar />
      <h1 className='text-3xl text-red-800 font-thin'>Home</h1>
      <p>Bem-vindo à página inicial!</p>
      <Section1 />
      <Footer />
    </div>
  )
}
