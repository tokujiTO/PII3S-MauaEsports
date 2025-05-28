import { useState } from 'react';

export default function Cadastrar() {
  const [form, setForm] = useState({
    nome: '',
    ra: '',
    horas: '',
    cargo: '',
    area: '',
  });

  const [cadastrado, setCadastrado] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({ nome: '', ra: '', horas: '', cargo: '', area: '' });

    // conectar com a api
    // se der certo, retornar true, caso contrario, morrer
    setCadastrado(false);

    // mostrar toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md">
      {showToast && cadastrado && (
        <div className="absolute top-4 right-4 rounded bg-green-500 px-4 py-2 text-white shadow-lg transition-all duration-300">
          Membro cadastrado com sucesso!
        </div>
      )}
      {showToast && !cadastrado && (
        <div className="absolute top-4 right-4 rounded bg-red-500 px-4 py-2 text-white shadow-lg transition-all duration-300">
          Não foi possivél cadastrar membro.
        </div>
      )}

      <h2 className="mb-6 text-center text-2xl font-bold">
        Cadastrar Novo Membro
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nome"
            className="mb-1 block font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="ra" className="mb-1 block font-medium text-gray-700">
            RA
          </label>
          <input
            type="text"
            name="ra"
            value={form.ra}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="horas"
            className="mb-1 block font-medium text-gray-700"
          >
            Horas
          </label>
          <input
            type="number"
            name="horas"
            value={form.horas}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="cargo"
            className="mb-1 block font-medium text-gray-700"
          >
            Cargo
          </label>
          <input
            type="text"
            name="cargo"
            value={form.cargo}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="area"
            className="mb-1 block font-medium text-gray-700"
          >
            Área
          </label>
          <select
            name="area"
            value={form.area}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option value="">Selecione uma área</option>
            <option value="Desenvolvimento">Desenvolvimento</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="RH">RH</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
