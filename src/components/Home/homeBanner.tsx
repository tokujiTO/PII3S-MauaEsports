import { useEffect, useState } from 'react';
import logoSrc from '../../assets/logoBW.png';

export default function HomeBanner() {
  const [opacity, setOpacity] = useState(0.3);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const fadeStart = 20;
      const fadeEnd = window.innerHeight * 0.4;
      const scrollY = window.scrollY;
      let newOpacity = 0.3;

      if (scrollY > fadeStart) {
        newOpacity = 0.3 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        newOpacity = Math.max(0, Math.min(1, newOpacity));
      }

      setOpacity(newOpacity);
      setParallaxY(scrollY * 0.25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-deepBlue font-futurist relative mb-[10vh] h-[60vh] w-screen md:min-h-[78vh]">
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
        <img
          src={logoSrc}
          alt="logo_maua_esports"
          className="h-auto w-[60vw] object-contain"
          style={{
            maxWidth: '85%',
            opacity,
            transition: 'opacity 0.3s',
            willChange: 'opacity',
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[78vh] w-full items-center justify-center">
        <h1
          className="neon-shadow-duo mb-10 text-center text-4xl font-bold text-white uppercase md:text-7xl 2xl:text-7xl"
          style={{
            transform: `translateY(${parallaxY}px)`,
            transition: 'opacity 0.3s, transform 0.3s',
            willChange: 'opacity, transform',
          }}
        >
          NA MAUÁ, <br />
          <span className="font-futurist neon-shadow-duo text-2xl md:text-5xl">
            O JOGO NUNCA PARA!
          </span>
        </h1>
      </div>
    </div>
  );
}
