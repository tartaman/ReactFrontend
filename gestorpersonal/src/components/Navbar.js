import React from 'react';
import '../css/Navbar.css';
import villamilEnterprises from '../img/villamilEnterprises.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={villamilEnterprises} alt="Villamil Enterprises" />
      </div>
      <div className="navbar-links">
        <a href="/">Inicio</a>
        <a href="/login">Login</a>
        <a href="/solicitudes">Solicitudes</a>
      </div>
    </nav>
  );
}

export default Navbar;