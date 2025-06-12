import logo from '../../assets/logoColored.png';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/auth-config';
import { useNavigate } from 'react-router-dom';
import microsoft from '../../assets/microsoft.png';
import { UseUser } from '../../hooks/useUser';
import { fetchUser } from '../../api/user';
import { toast } from 'react-toastify';

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

  if (auth) {
    fetchAccessToken();
    navigate('/pi-home');
  }

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
      await fetchAccessToken();
      await fetchUser(setUser);
    } catch (error) {
      console.error('Login error:', error);
      toast('Erro ao fazer login.');
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
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 font-thin text-black">
      {/* <div className="bg-deepBlue hidden h-full items-center justify-center md:flex md:w-2/5" /> */}
      <div className="bg-darkBlue neon-box-duo z-10 flex h-full w-full flex-col items-center justify-center md:w-full">
        <div className="bg-deepBlue neon-box-duo relative flex h-1/2 w-4/5 flex-col items-center gap-10 rounded-xl border-2 border-cyan-300 py-4 text-white md:w-2/5">
          <img
            src={logo}
            alt="Logo"
            className="absolute top-1/2 left-1/2 z-0 mb-4 h-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-5"
          />
          <div className="z-10 flex items-center justify-between px-10 text-4xl">
            <h1>Mauá eSports</h1>
          </div>
          <form className="z-10 flex h-full w-full flex-col items-center justify-center gap-4 max-md:px-2">
            <button
              type="button"
              className="text-darkBlue relative flex h-20 w-full items-center justify-start rounded-lg bg-white px-2 text-4xl shadow-xl duration-300 outline-none hover:cursor-pointer hover:bg-gray-200 hover:shadow-2xl max-md:gap-4 max-md:text-3xl md:w-4/5 md:justify-center md:p-4"
              onClick={handleLogin}
            >
              <img
                src={microsoft}
                alt=""
                className="h-16 w-16 self-center md:absolute md:left-2"
              />
              <p>Login Microsoft</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
