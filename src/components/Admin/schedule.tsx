import { useEffect, useState } from 'react';

export default function Schedule({
  scheduledTrainings,
  isOpen,
  onClose,
}: {
  scheduledTrainings: { Start: string; End: string }[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  function parseCronTime(cron: string): string {
    // Exemplo: "0 0 12 * * 2" => "12:00 (Ter)"
    const parts = cron.split(' ');
    if (parts.length < 6) return cron;
    const minute = parts[1].padStart(2, '0');
    const hour = parts[2].padStart(2, '0');
    const weekDayMap: Record<string, string> = {
      '0': 'Dom',
      '1': 'Seg',
      '2': 'Ter',
      '3': 'Qua',
      '4': 'Qui',
      '5': 'Sex',
      '6': 'Sáb',
    };
    const weekDay = parts[5] ? weekDayMap[parts[5]] || '' : '';
    return `${hour}:${minute}${weekDay ? ` (${weekDay})` : ''}`;
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 100);
    }
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  if (!isOpen && !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-darkBlue flex h-[60vh] min-h-[200px] w-[50vw] flex-col items-center justify-between gap-6 overflow-scroll rounded-3xl border-l-8 border-cyan-300 text-4xl shadow-lg transition-transform duration-200 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="bg-darkBlue sticky top-0 mb-2 w-full px-8 pt-8 font-bold text-white">
          Horários de Treino
          <div className="mb-4 h-1 w-full rounded-full bg-gradient-to-l from-orange-600 to-yellow-400" />
        </h1>
        {scheduledTrainings.length > 0 ? (
          <div className="flex w-full flex-col gap-2 text-center text-cyan-100">
            {scheduledTrainings.map((t, i) => (
              <span key={i} className="rounded bg-cyan-900/30 px-4 py-2">
                <span className="font-semibold">Início:</span>{' '}
                {parseCronTime(t.Start)}{' '}
                <span className="ml-4 font-semibold">Fim:</span>{' '}
                {parseCronTime(t.End)}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-300">Nenhum treino cadastrado</span>
        )}
        <div className="bg-darkBlue sticky bottom-0 mt-8 flex w-full justify-end gap-6 text-2xl">
          <button
            onClick={handleClose}
            className="flex w-1/3 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
