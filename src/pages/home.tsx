import Footer from "../components/footer";
import Section1 from "../components/Home/Section1";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="pt-20">
      <Navbar />
      <Section1 />
      <Footer />
    </div>
  )
}
