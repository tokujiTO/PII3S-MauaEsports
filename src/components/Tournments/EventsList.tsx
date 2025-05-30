interface EventsListProps {
  Event: {
    data: string;
    nome: string;
    link?: string;
  }[];
}

export default function EventsList({ Event }: EventsListProps) {
  if (!Event || Event.length === 0) {
    return <div className="text-center text-red-500">No events available</div>;
  }

  const date = (date: string) => {
    const formated = new Date(Number(date));
    return formated.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-6 sm:gap-10">
      {Event.map((event, index) => (
        <div
          key={index}
          className={`group from-darkBlue to-darkBlue text-coolWhite flex w-[110%] flex-col bg-gradient-to-l sm:flex-row ${index == 0 ? 'neon-box-duo scale-110 hover:scale-125' : 'scale-100'} transition-[color, transform] items-center justify-between gap-6 rounded-2xl border-r-2 border-b-8 border-l-4 border-cyan-300 px-4 py-2 duration-200 hover:scale-105 hover:cursor-pointer hover:bg-gradient-to-r hover:from-blue-500 hover:via-cyan-400 hover:to-blue-700`}
          onClick={() => {
            if (event.link) {
              window.open(event.link, '_blank');
            }
          }}
        >
          <span className="font-body text-md w-full text-center sm:w-1/2 sm:text-2xl lg:text-4xl">
            {event.nome}
          </span>
          <span className="text-darkBlue font-futurist from-darkBlue to-darkBlue via-deepBlue flex w-full justify-center rounded-3xl bg-gray-200 py-2 text-xs group-hover:bg-gradient-to-tr group-hover:text-white sm:w-1/3 sm:py-12 sm:text-sm lg:text-2xl">
            {date(event.data)}
          </span>
        </div>
      ))}
    </div>
  );
}
