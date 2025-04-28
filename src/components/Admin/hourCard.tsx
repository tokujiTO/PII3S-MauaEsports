export default function HourCard({ hour }: { hour: string }) {
  return (
    <div className="bg-deepBlue flex h-[200px] w-[360px] flex-col items-center justify-between rounded-lg p-4 text-4xl text-white">
      <h1 className="mt-auto mb-auto flex">Você tem:</h1>
      <div className="flex h-2/3 w-full items-center justify-center rounded-lg bg-white text-7xl text-black">
        <div className="flex items-end gap-2 text-black">
          <p>
            {hour} <span className="text-4xl">horas</span>
          </p>
        </div>
      </div>
    </div>
  );
}
