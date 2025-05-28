import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import AnimatedElement from '../animatedElement';
import { cn } from '../../utils/cn';

interface TeamDataItem {
  nome: string;
  cap: string;
  membros: string[];
  color: string;
  image: string;
}

interface CarouselProps {
  clickable?: boolean;
  data: TeamDataItem[];
}

export default function TeamCarousel({ data, clickable }: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);

  const datalist = data;

  const centerFirstCard = () => {
    if (scrollContainerRef.current && datalist.length > 0) {
      const container = scrollContainerRef.current;
      const firstCard = container.children[0] as HTMLElement;

      if (firstCard) {
        // Calcula a posição correta para centralizar horizontalmente
        const cardWidth = firstCard.offsetWidth;
        const containerWidth = container.clientWidth;
        const scrollPosition =
          firstCard.offsetLeft - (containerWidth / 2 - cardWidth / 2);

        // Ajusta apenas o scroll horizontal
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const handlePrevious = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;

      // Encontra o próximo card que está à direita do centro
      const cards = Array.from(container.querySelectorAll('.carousel-card'));
      let nextCard = null;

      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const cardCenter =
          rect.left + rect.width / 2 - container.getBoundingClientRect().left;

        if (cardCenter > containerWidth / 2 + 10) {
          // +10 para evitar flutuações
          nextCard = card;
          break;
        }
      }

      if (nextCard) {
        nextCard.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;

      // Encontra o próximo card que está à esquerda do centro
      const cards = Array.from(container.querySelectorAll('.carousel-card'));
      let prevCard = null;

      // Percorre do final para o início
      for (let i = cards.length - 1; i >= 0; i--) {
        const card = cards[i];
        const rect = card.getBoundingClientRect();
        const cardCenter =
          rect.left + rect.width / 2 - container.getBoundingClientRect().left;

        if (cardCenter < containerWidth / 2 - 10) {
          // -10 para evitar flutuações
          prevCard = card;
          break;
        }
      }

      if (prevCard) {
        prevCard.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  const updateCardScales = () => {
    if (!scrollContainerRef.current) return;

    const cards = Array.from(
      scrollContainerRef.current.querySelectorAll('.carousel-card')
    );
    const positions = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      const containerRect = scrollContainerRef.current!.getBoundingClientRect();
      return rect.left + rect.width / 2 - containerRect.left;
    });

    setCardPositions(positions);
  };

  const calculateScale = (index: number) => {
    if (cardPositions.length === 0) return 1;

    const containerWidth = scrollContainerRef.current?.clientWidth || 1000;
    const cardCenter = cardPositions[index];
    const containerCenter = containerWidth / 2;

    const distance =
      Math.abs(cardCenter - containerCenter) / (containerWidth / 2);

    const scale = 1.2 - distance * 0.4;
    return Math.max(0.8, Math.min(1.2, scale));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    updateCardScales();

    const handleResize = () => {
      setContainerWidth(container.clientWidth);
      centerFirstCard();
      updateCardScales();
    };

    handleResize();

    const handleScroll = () => {
      updateCardScales();
    };

    setTimeout(() => {
      centerFirstCard();
    }, 100);

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateCardScales);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateCardScales);
    };
  }, [scrollContainerRef]);

  const isCaptain = (member: { role?: string }) => {
    return member.role?.toLowerCase() === 'capitão';
  };
  console.log('datalist', datalist);

  return (
    <AnimatedElement
      direction="bottom"
      className="relative flex h-[90vh] w-full flex-col"
    >
      <div
        ref={scrollContainerRef}
        className="scroll-container scrollbar-hide flex h-full w-full flex-row items-center justify-start gap-16 overflow-x-scroll"
        style={{
          paddingLeft: `${containerWidth / 2 - 112}px`,
          paddingRight: `${containerWidth / 2 - 112}px`,
        }}
      >
        {datalist.map((item, index) => (
          <div
            key={index}
            className={`carousel-card ${clickable ? 'hover:scale-[1.05] hover:cursor-pointer' : ''} neon-box-duo bg-coolWhite relative flex h-3/5 max-w-56 min-w-56 rounded-xl border-2 border-cyan-300 text-black transition-transform duration-75 ease-in-out lg:max-w-80 lg:min-w-80 lg:rounded-lg`}
            style={{
              transform: `scale(${calculateScale(index)})`,
              zIndex: Math.round(calculateScale(index) * 10),
            }}
          >
            <div
              className={`flex h-full w-full flex-col items-center justify-center rounded-lg bg-cover bg-center bg-no-repeat pt-14`}
              style={{
                background: `linear-gradient(to top, ${item.color}80 10%, ${item.color}33 100%)`,
              }}
            >
              <img
                src={item.image?.toString()}
                alt={'Team Logo'}
                className="absolute top-1/5 z-0 mb-2 h-32 w-32 -translate-y-1/2 object-contain opacity-90"
              />
              <p className="text-lightBlack/60 italic` z-10 text-center text-4xl font-bold">
                {item.cap.split(' ')[0] + ' ' + item.cap.split(' ')[1]}
              </p>
              {item.membros.map((member, memberIndex) => (
                <h2
                  key={memberIndex}
                  className="text-lightBlack/60 italic` z-10 text-center text-2xl"
                  style={{
                    marginTop: memberIndex === 0 ? '0.5rem' : '0.25rem',
                  }}
                >
                  {member.split(' ')[0] + ' ' + member.split(' ')[1]}
                </h2>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-1/2 z-[40] flex w-full -translate-y-1/2 transform justify-between px-4">
        <button
          onClick={handleNext}
          className="neon-box-duo z-10 rounded-full bg-gray-300/30 p-2 shadow-md backdrop-blur-md duration-300 hover:scale-110 hover:cursor-pointer hover:bg-gray-400/30 hover:shadow-none"
        >
          <CaretLeft size={32} />
        </button>
        <button
          onClick={handlePrevious}
          className="neon-box-duo z-10 rounded-full bg-gray-300/30 p-2 shadow-md backdrop-blur-md duration-300 hover:scale-110 hover:cursor-pointer hover:bg-gray-400/30 hover:shadow-none"
        >
          <CaretRight size={32} />
        </button>
      </div>
    </AnimatedElement>
  );
}
