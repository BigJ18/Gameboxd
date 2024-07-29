import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from '../../../api';

interface Game {
  id: number;
  title: string;
  coverUrl: string;
}

const Home: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/games');
        setGames(response.data);
      } catch (err) {
        setError('Erro ao carregar os jogos');
        console.error('Erro ao buscar jogos:', err);
      }
    };

    fetchGames();
  }, []);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Pesquisar jogos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <div className="games-section">
        <h2 className="section-title">Jogos Disponíveis</h2>
        <div className="home-games-grid">
          {filteredGames.map((game) => (
            <div key={game.id} className="home-game-card">
              <Link to={`/game/${game.id}`}>
                <img src={game.coverUrl} alt={game.title} className="home-game-cover" />
                <h2>{game.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
