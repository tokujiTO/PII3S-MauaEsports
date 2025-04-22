import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Members from './pages/members'
import NotFound from './pages/notFound'
import Tournments from './pages/tournments'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/membros' element={<Members />} />
        <Route path='/campeonatos' element={<Tournments />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
