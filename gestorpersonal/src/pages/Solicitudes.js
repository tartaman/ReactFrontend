import React from 'react';
import { useEffect, useState } from 'react';
export default function Solicitudes() 
{
    const [solicitudes, setSolicitudes] = useState([]);
    useEffect(() => {
        async function fetchSolicitudes() {
            try {
                const token = localStorage.getItem('access');
                if (!token) {
                    alert('Su sesión ha expirado, por favor inicie sesión nuevamente.');
                    window.location.href = '/login';
                    return;
                }
                const headers = new Headers();
                headers.append('Authorization', `Bearer ${token}`);
                headers.append('Content-Type', 'application/json');
                const response = await fetch('http://localhost:8000/api/solicitudes/', {
                    method: 'GET',
                    headers: headers
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSolicitudes(data);
            } catch (error) {
                console.error('Error fetching solicitudes:', error);
            }
        }
        fetchSolicitudes();
    }, [solicitudes]);
    return (
        <div>
            <h1>Solicitudes</h1>
            {solicitudes.map((solicitud) => (
                <div key={solicitud.id}>
                    <h2>{solicitud.nombre_vacante}</h2>
                    <p>{solicitud.puesto_vacante}</p>
                    <p>Fecha de Solicitud: {new Date(solicitud.fecha_solicitud).toLocaleDateString()}</p>
                    <p>Estado: {solicitud.estado}</p>
                </div>
            ))}
        </div>
    );
    
    
}