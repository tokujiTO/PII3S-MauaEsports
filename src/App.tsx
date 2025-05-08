import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Members from './pages/members';
import NotFound from './pages/notFound';
import Tournments from './pages/tournments';
import Login from './pages/admin/login';
import HomeInterno from './pages/admin/homeInterno';
import Cadastrar from './pages/admin/cadastrar';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membros" element={<Members />} />
        <Route path="/campeonatos" element={<Tournments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pi-home" element={<HomeInterno />} />
        <Route path='/cadastrar' element={<Cadastrar/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
