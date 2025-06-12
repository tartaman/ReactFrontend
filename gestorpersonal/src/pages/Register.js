import { useState } from 'react'
export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('https://solicitudpersonal.saboria.me/api/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email, nombre, apellido })
        });
        const data = await response.json();
        if (!response.ok) {
            console.error('Error al registrar el usuario:');
            alert('Error al registrar el usuario: ' + data.detail);
            return;
        }
        alert('Usuario registrado exitosamente');
        window.location.reload(); // Recargar la página para reflejar el nuevo estado
    }
    return (
        <div className="login-container">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Apellidos" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            <button type="submit">Register</button>
        </form>
        </div>
    );  
}