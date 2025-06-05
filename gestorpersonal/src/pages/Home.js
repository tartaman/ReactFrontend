import React from 'react';
import { useEffect, useState } from 'react';

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
          console.error('No token found in localStorage');
          return;
        }
        //add the token to the headers
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json');
        const response = await fetch('http://localhost:8000/api/vacantes', {
          method: 'GET',
          headers: headers
        });
        //check if the response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        //print the response data
        const data = await response.json();
        console.log(data);
        //set the vacantes state
        setVacantes(data);
      } catch (error) {
        console.error('Error fetching vacantes:', error);
      }
    }
    fetchVacantes();
  }, [vacantes]);
  return (
    <div>
      <h1>Vacantes</h1>
      <ul>
        {vacantes.map((vacante) => (
          <li key={vacante.id}>
            <h2>{vacante.nombre}</h2>
            <p>{vacante.puesto}</p>
            <p>Salario: {vacante.sueldo}</p>
            <p>Fecha de Publicación: {new Date(vacante.fecha_publicacion).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
