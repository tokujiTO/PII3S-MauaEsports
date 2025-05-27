import { Member } from '../../hooks/useMembers';
import CarouselMember from '../CarouselMember';

interface MarketingProps {
  marketing: Member[] | undefined;
}

export default function Marketing({ marketing }: MarketingProps) {
  return (
    <div className="font-body bg-darkBlue flex flex-col items-center justify-center py-8 text-black">
      <h1 className="neon-shadow-duo mb-4 text-7xl font-bold text-white">
        Marketing
      </h1>
      {marketing != undefined ? (
        marketing.length > 0 ? (
          <div className="mb-8 flex w-full items-center justify-center">
            <CarouselMember data={marketing} />
          </div>
        ) : (
          <div className="mb-8 flex w-full items-center justify-center">
            <h2 className="text-3xl font-bold text-white">
              Nenhum membro encontrado
            </h2>
          </div>
        )
      ) : (
        <div className="flex h-96 w-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
          <p className="ml-4 text-white">Carregando...</p>
        </div>
      )}
    </div>
  );
}
