import shirts from '../../assets/camisetas.png';
import { useEffect, useRef, useState } from 'react';

export default function Shirts() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setShow(true);
            observer.disconnect();
          }, 300);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center justify-center overflow-x-hidden bg-gradient-to-tr from-cyan-300 via-purple-500 to-pink-500 text-white transition-all duration-700 ease-out ${show ? 'h-[80vh]' : 'h-0'}`}
      style={{ minHeight: show ? '80vh' : 0 }}
    >
      <div
        className={`bg-coolBlack neon-box-duo mx-auto flex w-3/4 max-w-3xl transform flex-col items-center justify-center gap-8 rounded-3xl p-10 shadow-xl transition-all duration-700 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
      >
        <h1 className="font-futurist neon-shadow-duo text-coolWhite mb-6 text-center text-6xl font-bold tracking-tight uppercase">
          Camisas
        </h1>
        <img
          src={shirts}
          alt="Camisas Mauá eSports"
          className="mb-6 h-auto w-2/3 max-w-md rounded-xl shadow-lg"
        />
        <button
          onClick={() =>
            window.open(
              'https://docs.google.com/forms/d/e/1FAIpQLSdpKLxmO8ObiRdyWvUsiVktnfudRKs2qJLr2h2hnuFNjXVeLA/viewform',
              '_blank'
            )
          }
          className="font-futurist rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-300 px-10 py-4 text-2xl font-bold text-white uppercase shadow-lg transition duration-300 hover:scale-105 hover:cursor-pointer hover:from-cyan-300 hover:via-pink-500 hover:to-purple-500 hover:shadow-2xl"
        >
          Compre
        </button>
      </div>
    </div>
  );
}
