import '../assets/css/Root.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/login', {
          username: username,
          password: password
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        console.log('Zalogowano pomyślnie! Token: ', token);
      } catch (error) {
        console.error('Błąd logowania: ', error.response.data.msg);
      }
    };
  
    return (
      <div style={{width: "25vw", display: 'flex', flexDirection: "column", alignItems: 'center', gap: "3vmin", marginTop: "5vmin"}}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Zaloguj</button>
      </div>
    );
}