import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Compass, BookHeart, Home } from 'lucide-react';
import Inicio from './pages/Inicio';
import Viaje from './pages/Viaje';
import Testimonios from './pages/Testimonios';
import Historial from './pages/Historial';
import './App.css'; 

function BottomNav() {
  const location = useLocation();
  
  return (
    <nav className="bottom-nav">
      <Link to="/" className={location.pathname === '/' ? 'nav-item active' : 'nav-item'}>
        <Compass className="nav-icon" size={24} />
        <span className="nav-text">Misión</span>
      </Link>
      <Link to="/testimonios" className={location.pathname === '/testimonios' ? 'nav-item active' : 'nav-item'}>
        <BookHeart className="nav-icon" size={24} />
        <span className="nav-text">Testimonios</span>
      </Link>
      <Link to="/viaje" className={location.pathname === '/viaje' ? 'nav-item active' : 'nav-item'}>
        <Home className="nav-icon" size={24} />
        <span className="nav-text">Casa</span>
      </Link>
    </nav>
  );
}

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/testimonios" element={<Testimonios />} />
        <Route path="/viaje" element={<Viaje />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
      <BottomNav />
    </div>
  );
}

export default App;