import logo from '../../assets/logoColored.png';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/auth-config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UseUser } from '../../hooks/useUser';

export default function Login() {
  const { instance } = useMsal();
  const auth = useIsAuthenticated();
  const navigate = useNavigate();
  const { setUser } = UseUser();

  const fetchAccessToken = async () => {
    const accounts = instance.getAllAccounts();
    const accessToken = (
      await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
    ).accessToken;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  };

  const checkUser = async (accessToken: string) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/check', {
        accessToken,
      });
      console.log(response.data);
      if (response.data.existe) {
        // Usuário existe, prossiga normalmente
        setUser(response.data.usuario);
        localStorage.setItem('user', JSON.stringify(response.data.usuario));
        navigate('/pi-home');
      }
    } catch (err) {
      alert('Erro ao verificar usuário.');
    }
  };

  if (auth) {
    fetchAccessToken();
    navigate('/pi-home');
  }

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
      const accessToken = await fetchAccessToken();
      await checkUser(accessToken);
    } catch (error) {
      console.error('Login error:', error);
      alert('Erro ao fazer login.');
    }
  };

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const email = formData.get('username') as string;

  //   if (email && email.includes('@maua.br')) {
  //     localStorage.setItem('email', email);
  //     const role = email.split('@')[0];
  //     localStorage.setItem('role', role);
  //     navigate('/pi-home');
  //   } else {
  //     alert('Por favor, insira um e-mail válido.');
  //   }
  // };

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
          <form
            className="z-10 flex w-full flex-col items-center justify-between gap-4"
            // onSubmit={onSubmit}
          >
            <div className="flex w-full flex-col items-start justify-center px-10">
              <label htmlFor="username" className="text-2xl">
                E-mail:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Coloque o Email Mauá"
                className="flex h-12 w-full items-center rounded-lg border-2 border-black bg-white px-4 text-2xl shadow-xl outline-none"
              />
            </div>
            <button
              type="button"
              className="bg-deepBlue hover:bg-darkBlue h-12 w-4/5 rounded-lg text-white shadow-xl duration-300 outline-none hover:cursor-pointer hover:shadow-2xl"
              onClick={handleLogin}
            >
              Login Microsoft
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
