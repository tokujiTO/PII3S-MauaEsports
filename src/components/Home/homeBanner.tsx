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
    <div className="bg-deepBlue font-futurist relative h-[78vh] mb-[10vh] w-screen overflow-hidden">
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

      <div className="relative z-10 flex h-screen w-full items-center justify-center">
        <h1
          className="mb-10 neon-text-blue text-5xl 2xl:text-7xl font-bold text-white uppercase"
          style={{
            transform: `translateY(${parallaxY}px)`,
            transition: 'opacity 0.3s, transform 0.3s',
            willChange: 'opacity, transform',
          }}
        >
          NA MAUÁ,{' '}
          <span className="text-coolWhite font-futurist neon-shadow-duo">
            O JOGO NUNCA PARA!
          </span>
        </h1>
      </div>
    </div>
  );
}
