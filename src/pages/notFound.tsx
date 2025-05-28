import logo from '../assets/logoBW.png';

export default function NotFound() {
  return (
    <div className="bg-darkBlue relative flex h-screen w-full flex-col items-center justify-center overflow-hidden text-white">
      <img
        src={logo}
        alt=""
        className="absolute top-1/5 left-1/2 z-0 w-3/5 -translate-x-1/2 opacity-10"
      />
      <h1 className="neon-text-red z-10 text-6xl font-bold">
        Página não encontrada
      </h1>
      <p className="neon-text-red z-10 text-4xl">
        Desculpe, a página que você está procurando não existe.
      </p>
    </div>
  );
}
