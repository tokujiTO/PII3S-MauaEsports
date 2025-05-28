import { useEffect, useState } from 'react';
import { editSchedule } from '../../api/teams';

export default function EditSchedule({
  scheduledTrainings,
  id,
  isOpen,
  onClose,
}: {
  id: string;
  scheduledTrainings: { Start: string; End: string }[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [trainings, setTrainings] = useState<
    {
      hour: string;
      minute: string;
      weekDay: string;
      endHour: string;
      endMinute: string;
      endWeekDay: string;
    }[]
  >([]);
  function toCronTime(hour: string, minute: string, weekDay: string): string {
    return `0 ${minute} ${hour} * * ${weekDay}`;
  }

  useEffect(() => {
    if (isOpen) {
      setTrainings(
        scheduledTrainings.map((t) => {
          const startParts = t.Start.split(' ');
          const endParts = t.End.split(' ');
          return {
            hour: startParts[1] || '',
            minute: startParts[0] || '',
            weekDay: startParts[5] || '',
            endHour: endParts[1] || '',
            endMinute: endParts[0] || '',
            endWeekDay: endParts[5] || '',
          };
        })
      );
      setTimeout(() => setVisible(true), 100);
    }
  }, [isOpen, scheduledTrainings]);

  const handleTrainingChange = (idx: number, field: string, value: string) => {
    setTrainings((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, [field]: value } : t))
    );
  };

  const handleAddTraining = () => {
    setTrainings((prev) => [
      ...prev,
      {
        hour: '',
        minute: '',
        weekDay: '',
        endHour: '',
        endMinute: '',
        endWeekDay: '',
      },
    ]);
  };

  const handleRemoveTraining = (idx: number) => {
    setTrainings((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    const ScheduledTrainings = trainings.map((t) => ({
      Start: toCronTime(t.hour, t.minute, t.weekDay),
      End: toCronTime(t.endHour, t.endMinute, t.endWeekDay),
    }));
    console.log('ScheduledTrainings:', ScheduledTrainings);
    const data = {
      _id: id,
      ScheduledTrainings: ScheduledTrainings,
    };
    const response = editSchedule(data);
    handleClose();
  };

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
        className={`bg-darkBlue flex h-[90vh] w-2/3 flex-col items-center justify-between gap-6 overflow-y-scroll rounded-3xl border-l-8 border-cyan-300 px-8 py-8 shadow-lg transition-transform duration-200 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-2 text-3xl font-bold text-white">
          Horários de Treino
        </h1>
        <div className="mb-4 h-1 w-full rounded-full bg-gradient-to-l from-orange-600 to-yellow-400" />
        <div className="flex w-full flex-col gap-4">
          {trainings.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-cyan-200">Início:</span>
              <input
                type="number"
                min="0"
                max="23"
                value={t.hour}
                onChange={(e) =>
                  handleTrainingChange(i, 'hour', e.target.value)
                }
                className="w-14 rounded border border-gray-400 px-2 py-1 text-lg"
                placeholder="HH"
              />
              :
              <input
                type="number"
                min="0"
                max="59"
                value={t.minute}
                onChange={(e) =>
                  handleTrainingChange(i, 'minute', e.target.value)
                }
                className="w-14 rounded border border-gray-400 px-2 py-1 text-lg"
                placeholder="MM"
              />
              <select
                value={t.weekDay}
                onChange={(e) =>
                  handleTrainingChange(i, 'weekDay', e.target.value)
                }
                className="rounded border border-gray-400 px-2 py-1 text-lg"
              >
                <option value="">Dia</option>
                <option value="0">Dom</option>
                <option value="1">Seg</option>
                <option value="2">Ter</option>
                <option value="3">Qua</option>
                <option value="4">Qui</option>
                <option value="5">Sex</option>
                <option value="6">Sáb</option>
              </select>
              <span className="ml-4 text-cyan-200">Fim:</span>
              <input
                type="number"
                min="0"
                max="23"
                value={t.endHour}
                onChange={(e) =>
                  handleTrainingChange(i, 'endHour', e.target.value)
                }
                className="w-14 rounded border border-gray-400 px-2 py-1 text-lg"
                placeholder="HH"
              />
              :
              <input
                type="number"
                min="0"
                max="59"
                value={t.endMinute}
                onChange={(e) =>
                  handleTrainingChange(i, 'endMinute', e.target.value)
                }
                className="w-14 rounded border border-gray-400 px-2 py-1 text-lg"
                placeholder="MM"
              />
              <select
                value={t.endWeekDay}
                onChange={(e) =>
                  handleTrainingChange(i, 'endWeekDay', e.target.value)
                }
                className="rounded border border-gray-400 px-2 py-1 text-lg"
              >
                <option value="">Dia</option>
                <option value="0">Dom</option>
                <option value="1">Seg</option>
                <option value="2">Ter</option>
                <option value="3">Qua</option>
                <option value="4">Qui</option>
                <option value="5">Sex</option>
                <option value="6">Sáb</option>
              </select>
              <button
                onClick={() => handleRemoveTraining(i)}
                className="ml-2 rounded bg-red-500 px-2 py-1 text-white hover:bg-red-700"
              >
                Remover
              </button>
            </div>
          ))}
          <button
            onClick={handleAddTraining}
            className="mt-2 w-fit rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          >
            Adicionar treino
          </button>
        </div>
        <div className="mt-8 flex w-full justify-end gap-6 text-2xl">
          <button
            onClick={handleClose}
            className="flex w-1/3 items-center justify-center rounded-xl bg-red-400 p-2 duration-200 hover:cursor-pointer hover:bg-red-600"
          >
            Fechar
          </button>
          <button
            onClick={handleSave}
            className="flex w-1/3 items-center justify-center rounded-xl bg-green-400 p-2 duration-200 hover:cursor-pointer hover:bg-green-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
