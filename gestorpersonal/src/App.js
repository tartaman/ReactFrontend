import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from '../../gestorpersonal/src/pages/Home'
import Login from '../../gestorpersonal/src/pages/Login'
import NotFound from '../../gestorpersonal/src/pages/NotFound'
import Navbar from '../../gestorpersonal/src/components/Navbar'
import Solicitudes from './pages/Solicitudes';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Solicitud" element={<Solicitudes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
