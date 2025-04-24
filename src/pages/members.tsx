import Footer from "../components/footer"
import Diretoria from "../components/Members/Diretoria"
import Marketing from "../components/Members/Marketing"
import Navbar from "../components/navbar"

export default function Members() {
  return (
    <div className='overflow-hidden pt-20'>
      <Navbar />
      <Diretoria />
      <Marketing />
      <Footer />
    </div>
  )
}
