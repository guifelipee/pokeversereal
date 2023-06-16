import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Battle } from './pages/Battle';
import { Captura } from './pages/Captura';
import { Inicial } from './pages/Inicial';
import { Login } from './pages/Login';
import { Mapa } from './pages/Mapa';
import { Primaria } from './pages/Primaria';
import { Lol } from './pages/Lol';

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/batalha" element={<Battle/>} />
        <Route path="/captura" element={<Captura/>} />
        <Route path="/inicial" element={<Inicial/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/mapa" element={<Mapa/>} />
        <Route path="/primaria" element={<Primaria/>} />
        <Route path="/Lol" element={<Lol/>} />
      </Routes>
    </Router>
  );
}