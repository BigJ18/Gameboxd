import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../api';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      const userData = { email, username, password };
      try {
        const response = await registerUser(userData);
        if (response.status === 200) {
          alert('Usuário registrado com sucesso!');
          navigate('/login');
        }
      } catch (error) {
        console.error('Erro ao registrar usuário', error);
        alert('Erro ao registrar usuário');
      }
    };
  
    return (
      <div className="register">
        <h2>Registrar</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrar</button>
        </form>
      </div>
    );
  };
  
  export default Register;