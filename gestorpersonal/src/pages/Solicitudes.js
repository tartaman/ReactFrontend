import React, { useEffect, useState } from 'react';
import '../css/Solicitudes.css';

export default function Solicitudes() {
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
                const response = await fetch('https://solicitudpersonal.saboria.me/api/solicitudes/', {
                    method: 'GET',
                    headers: headers
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Datos de solicitudes:', data);
                setSolicitudes(data);
            } catch (error) {
                console.error('Error fetching solicitudes:', error);
            }
        }
        fetchSolicitudes();
    }, []);

    return (
        <div className="solicitudes-container">
            <h1>Mis Solicitudes</h1>
            <div className="solicitudes-grid">
                {solicitudes.map((solicitud) => (
                    <div key={solicitud.id} className="solicitud-card">
                        <h2>{solicitud.nombre_vacante}</h2>
                        <p>Puesto: {solicitud.puesto_vacante}</p>
                        <p>Fecha de solicitud: {new Date(solicitud.fecha_solicitud).toLocaleDateString()}</p>
                        <div className={`estado ${solicitud.estado.toLowerCase()}`}>
                            {solicitud.estado}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}