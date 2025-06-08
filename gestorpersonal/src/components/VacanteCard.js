import React from 'react';
import '../css/VacanteCard.css';

export default function VacanteCard({ vacante }) {
    async function handleApply() {
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

            // Desactivar la vacante
            const patchResponse = await fetch(`http://localhost:8000/api/vacantes/${vacante.id}/`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({
                    activa: false
                })
            });

            if (!patchResponse.ok) {
                const errorData = await patchResponse.json();
                console.error('Error al desactivar la vacante:', errorData);
                throw new Error('No se pudo desactivar la vacante');
            }

            // Crear la solicitud
            const postResponse = await fetch(`http://localhost:8000/api/solicitudes/`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    vacante: vacante.id
                })
            });

            if (!postResponse.ok) {
                const errorData = await postResponse.json();
                console.error('Error al crear la solicitud:', errorData);
                throw new Error('No se pudo crear la solicitud');
            }

            alert('Aplicación exitosa');
            //destruir el componente

        } catch (error) {
            console.error('Error al aplicar:', error);
            alert('Ocurrió un error al aplicar a la vacante');
        }
    }

    if (vacante.activa) {
        return (
            <div className="vacante-card">
                <h2>{vacante.nombre}</h2>
                <p>{vacante.puesto}</p>
                <p>Salario: {vacante.sueldo}</p>
                <p>Fecha de Publicación: {new Date(vacante.fecha_publicacion).toLocaleDateString()}</p>
                <button onClick={handleApply}>Aplicar</button>
            </div>
        );
    }

    return null;
}
