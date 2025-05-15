import { use, useState } from "react";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Dados do membro:', form);

        setForm({ nome: '', ra: '', horas: '', cargo: '', area: '' });

        // conectar com a api
        // se der certo, retornar true, caso contrario, morrer
        setCadastrado(false);

        // mostrar toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">

            {showToast && cadastrado &&(
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-300">
                    Membro cadastrado com sucesso!
                </div>
            )}
            {showToast && !cadastrado &&(
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-300">
                    Não foi possivél cadastrar membro.
                </div>
            )}

            <h2 className="text-2xl font-bold mb-6 text-center">Cadastrar Novo Membro</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nome" className="block mb-1 font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                <label htmlFor="ra" className="block mb-1 font-medium text-gray-700">
                    RA
                </label>
                <input
                    type="text"
                    name="ra"
                    value={form.ra}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                <div>
                <label htmlFor="horas" className="block mb-1 font-medium text-gray-700">
                    Horas
                </label>
                <input
                    type="number"
                    name="horas"
                    value={form.horas}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                <div>
                <label htmlFor="cargo" className="block mb-1 font-medium text-gray-700">
                    Cargo
                </label>
                <input
                    type="text"
                    name="cargo"
                    value={form.cargo}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>

                <div>
                <label htmlFor="area" className="block mb-1 font-medium text-gray-700">
                    Área
                </label>
                <select
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                >
                Cadastrar
                </button>
            </form>
        </div>
    );
}
