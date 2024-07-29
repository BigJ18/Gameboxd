import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="https://i.imgur.com/eTOWgZe.png" alt="Gameboxd Logo" className="navbar-logo" />
        <span className="navbar-brand-text">Gameboxd</span>
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/profile">Perfil</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Registrar</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
