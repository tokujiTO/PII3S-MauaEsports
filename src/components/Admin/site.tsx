export default function Site() {
  return (
    <div className="mt-20 flex h-full w-full justify-evenly text-5xl">
      <button className="bg-deepBlue hover:bg-darkBlue h-1/2 w-1/4 rounded-4xl px-4 py-2 text-white transition duration-300 hover:cursor-pointer">
        Home
      </button>
      <button className="bg-deepBlue hover:bg-darkBlue h-1/2 w-1/4 rounded-4xl px-4 py-2 text-white transition duration-300 hover:cursor-pointer">
        Campeonatos
      </button>
    </div>
  );
}
