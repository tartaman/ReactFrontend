import React from 'react';
import '../css/Login.css';
import { useEffect, useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (loggedIn) {
      // Redirect to home page
      window.location.href = '/';
    }
  }, [loggedIn]);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Guarda los tokens si quieres usarlos después
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
