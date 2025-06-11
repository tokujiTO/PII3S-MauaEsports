import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Achievments from '../components/Tournments/Achievments';
import logo from '../assets/logoBW.png';

import CardEvents from '../components/Tournments/CardEvents';

export default function Tournments() {
  return (
    <div className="relative min-h-screen gap-4 pt-20">
      <img
        className="absolute inset-0 top-1/2 -z-10 flex -translate-y-1/2 items-center justify-center opacity-20"
        src={logo}
      />
      <Navbar />
      <Achievments />
      <CardEvents />
      <Footer />
    </div>
  );
}
