import React from 'react';
import { useEffect, useState } from 'react';
import '../css/Home.css';
import '../components/VacanteCard'
import VacanteCard from '../components/VacanteCard';

export default function Home() {
  //use state to manage the vacantes
  const [vacantes, setVacantes] = useState([]);
  //useEffect to fetch the vacantes from the API
  useEffect(() => {
    async function fetchVacantes() {
      try {
        //send a request with bearer token
        const token = localStorage.getItem('access');
        if (!token) {
          alert('Su sesión ha expirado, por favor inicie sesión nuevamente.');
          //redirect to login page
          window.location.href = '/login';
          return;
        }
        //add the token to the headers
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        const response = await fetch('https://solicitudpersonal.saboria.me/api/vacantes/', {
          method: 'GET',
          headers: headers
        });
        //check if the response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        //print the response data
        const data = await response.json();
        //set the vacantes state
        setVacantes(data);
      } catch (error) {
        console.error('Error fetching vacantes:', error);
      }
    }
    fetchVacantes();
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenido a Villamil Enterprises</h1>
      <p>Explora nuestras vacantes disponibles</p>
      <div className="vacantes-grid">
        {vacantes.map((vacante) => (
          <VacanteCard key={vacante.id} vacante={vacante} />
        ))}
      </div>
    </div>
  );
}
