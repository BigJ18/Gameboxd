import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Register from './assets/pages/register/Register';
import Login from './assets/pages/login/Login';
import Home from './assets/pages/home/Home';
import { AuthProvider } from './context/AuthContext';
import GameDetails from './assets/pages/gameDetails/GameDetails';
import Profile from './assets/pages/profile/Profile';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  </AuthProvider>
);
