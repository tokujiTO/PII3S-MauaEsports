import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logoColored.png';

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('username') as string;

    if (email) {
      localStorage.setItem('email', email);
      navigate('/admin-home');
    } else {
      alert('Por favor, insira um e-mail válido.');
    }
  };
  
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 font-thin">
      <div className="bg-darkBlue flex h-full w-2/5 items-center justify-center">
        image
      </div>
      <div className="bg-deepBlue flex h-full w-3/5 flex-col items-center justify-center">
        <div className="bg-coolWhite relative flex h-1/2 w-3/5 flex-col items-center gap-10 rounded-xl py-4">
          <img
            src={logo}
            alt="Logo"
            className="absolute top-1/2 left-1/2 z-0 mb-4 h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-5"
          />
          <div className="z-10 flex items-center justify-between px-10 text-4xl">
            <h1>Mauá eSports</h1>
          </div>
          <form className="z-10 flex w-full flex-col items-center justify-between gap-4" onSubmit={onSubmit}>
            <div className="flex w-full flex-col items-start justify-center px-10">
              <label htmlFor="username" className="text-2xl">
                E-mail:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Coloque o Email Mauá"
                className="flex h-12 w-full items-center rounded-lg border-2 border-black bg-white px-4 text-2xl outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-deepBlue hover:bg-darkBlue h-12 w-4/5 rounded-lg text-white duration-300 outline-none hover:cursor-pointer"
            >
              Login Microsoft
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
