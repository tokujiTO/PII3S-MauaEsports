import HourCard from '../../components/Admin/hourCard';
import logo from '../../assets/logoBW.png';
import Captain from '../../components/Admin/captain';
import Admin from '../../components/Admin/admin';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/auth-config';
import { useEffect } from 'react';
import { UseUser } from '../../hooks/useUser';
import { fetchUser } from '../../api/user';

export default function homeInterno() {
  // const role = localStorage.getItem('role');
  // const isAdmin = role === 'admin';
  // const isCap = role === 'cap';
  // const isUser = !isAdmin && !isCap;
  const { user, setUser } = UseUser();
  const { instance } = useMsal();

  const logout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('accessToken');
    instance.logoutRedirect({ postLogoutRedirectUri: '/' }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  const role = user?.cargo;
  const isAdmin = role === 'admin';
  const isCap = role === 'cap';
  const isUser = !isAdmin && !isCap;

  // if (!NickName) {
  //   window.location.href = '/';
  // }
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

  useEffect(() => {
    fetchAccessToken();
    fetchUser(setUser);
  }, []);

  return (
    <div
      className={`bg-darkBlue font-body relative flex w-full flex-col items-center justify-between ${isUser ? 'h-screen overflow-hidden' : 'h-[140vh] px-0 pb-0'} font-thin`}
    >
      <img
        src={logo}
        alt=""
        className={`absolute ${isCap ? 'top-1/38' : isAdmin ? 'top-1/8' : 'top-1/4'} left-1/2 z-0 w-4/5 -translate-x-1/2 opacity-10`}
      />
      <div
        className="neon-box-yellow border-yellow absolute top-4 left-[92%] z-50 flex h-fit w-fit items-center justify-center rounded-lg border-2 bg-white p-4 duration-300 hover:scale-125 hover:cursor-pointer"
        onClick={logout}
      >
        <p className="text-4xl text-red-400">Sair</p>
      </div>
      <div
        className={`flex w-full items-center justify-center gap-10 ${isUser ? 'h-full' : 'h-3/5'}`}
      >
        <div className="z-10 flex w-1/2 flex-col items-center justify-center gap-4 text-7xl text-white">
          <h1 className="font-bold">bem vindo</h1>
          <h2 className="neon-text-yellow font-semibold">
            {user?.nome.split(' ')[0] + ' ' + user?.nome.split(' ')[1]}
          </h2>
        </div>
        {isUser && (
          <div className="z-10 flex h-full w-1/2 flex-col items-center justify-center gap-4">
            <HourCard />
          </div>
        )}
      </div>
      {isCap && <Captain />}
      {isAdmin && <Admin />}
    </div>
  );
}
