import { useEffect, useState } from 'react';
import { editSchedule } from '../../api/teams';
import { toast } from 'react-toastify';

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
      prev.map((t, i) =>
        i === idx
          ? field === 'weekDay'
            ? { ...t, weekDay: value, endWeekDay: value }
            : { ...t, [field]: value }
          : t
      )
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
    for (const t of trainings) {
      if (
        !t.hour ||
        !t.minute ||
        !t.weekDay ||
        !t.endHour ||
        !t.endMinute ||
        !t.endWeekDay
      ) {
        toast.error('Todos os campos devem ser preenchidos.');
        return;
      }
      if (
        isNaN(Number(t.hour)) ||
        isNaN(Number(t.minute)) ||
        isNaN(Number(t.weekDay)) ||
        isNaN(Number(t.endHour)) ||
        isNaN(Number(t.endMinute)) ||
        isNaN(Number(t.endWeekDay))
      ) {
        toast.error('Todos os campos devem ser números válidos.');
        return;
      }
      if (
        Number(t.hour) < 0 ||
        Number(t.hour) > 23 ||
        Number(t.endHour) < 0 ||
        Number(t.endHour) > 23 ||
        Number(t.minute) < 0 ||
        Number(t.minute) > 59 ||
        Number(t.endMinute) < 0 ||
        Number(t.endMinute) > 59 ||
        Number(t.weekDay) < 0 ||
        Number(t.weekDay) > 6 ||
        Number(t.endWeekDay) < 0 ||
        Number(t.endWeekDay) > 6
      ) {
        toast.error('Horário ou dia da semana fora do intervalo permitido.');
        return;
      }
    }
    // Monta o payload para request
    const ScheduledTrainings = trainings.map((t) => ({
      Start: toCronTime(t.hour, t.minute, t.weekDay),
      End: toCronTime(t.endHour, t.endMinute, t.endWeekDay),
    }));
    const data = {
      _id: id,
      ScheduledTrainings: ScheduledTrainings,
    };
    editSchedule(data);
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
      className={`fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/30 backdrop-blur-md transition-opacity duration-200 max-md:px-2 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-darkBlue flex h-[90vh] w-full flex-col items-center justify-between gap-6 overflow-y-scroll rounded-3xl border-l-8 border-cyan-300 px-8 py-8 shadow-lg transition-transform duration-200 md:w-2/3 md:text-4xl ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-2 w-full text-3xl font-bold text-white md:text-5xl">
          Horários de Treino
          <div className="mb-4 h-1 w-full rounded-full bg-gradient-to-l from-orange-600 to-yellow-400" />
        </h1>
        <div className="flex w-full flex-col gap-4 overflow-x-scroll md:items-center">
          <div className="mb-2 hidden w-full md:flex md:justify-evenly">
            <span className="w-1/3 font-semibold text-cyan-100">
              Dia da Semana
            </span>
            <span className="w-1/3 text-center font-semibold text-cyan-100">
              Início (HH:MM)
            </span>
            <span className="w-1/3 text-start font-semibold text-cyan-100">
              Fim (HH:MM)
            </span>
            <span className="w-24"></span>
          </div>
          {trainings.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <select
                value={t.weekDay}
                onChange={(e) =>
                  handleTrainingChange(i, 'weekDay', e.target.value)
                }
                className="mr-6 rounded border border-gray-400 px-2 py-1 text-lg"
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
              <button
                onClick={() => handleRemoveTraining(i)}
                className="ml-2 rounded bg-red-500 px-2 py-1 text-white duration-200 hover:cursor-pointer hover:bg-red-700"
              >
                Remover
              </button>
            </div>
          ))}
          <button
            onClick={handleAddTraining}
            className="mt-2 w-fit rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:cursor-pointer hover:bg-blue-700"
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
