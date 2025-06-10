import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Members from './pages/members';
import NotFound from './pages/notFound';
import Tournments from './pages/tournments';
import Login from './pages/admin/login';
import HomeInterno from './pages/admin/homeInterno';
import Cadastrar from './pages/admin/cadastrar';
import { useIsAuthenticated } from '@azure/msal-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/userContext';
import { EventsProvider } from './context/eventsContext';
import { AchievementsProvider } from './context/achievmentsContext';
import { SectionsProvider } from './context/sectionsContext';

export default function App() {
  const auth = useIsAuthenticated();
  if (auth) {
    console.log('User is authenticated');
  }
  return (
    <BrowserRouter>
      <SectionsProvider>
        <UserProvider>
          <EventsProvider>
            <AchievementsProvider>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                limit={3}
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="colored"
                pauseOnHover
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/membros" element={<Members />} />
                <Route path="/campeonatos" element={<Tournments />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pi-home" element={<HomeInterno />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AchievementsProvider>
          </EventsProvider>
        </UserProvider>
      </SectionsProvider>
    </BrowserRouter>
  );
}
