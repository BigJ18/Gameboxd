import React, { useEffect, useState } from 'react';
import axios from '../../../api';
import './Profile.css';
import { useAuth } from '../../../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [games, setGames] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isAddingFavorites, setIsAddingFavorites] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      fetchGames();
      fetchFavorites(user.id);
    }
  }, [user]);

  const fetchGames = async () => {
    try {
      const response = await axios.get('/games');
      setGames(response.data);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
    }
  };

  const fetchFavorites = async (userId: number) => {
    try {
      const response = await axios.get(`/api/usuarios/${userId}/favorite-games`);
      setFavorites(response.data);
    } catch (error) {
      console.error('Erro ao buscar jogos favoritos:', error);
    }
  };

  const handleAddToFavorites = async (gameId: number) => {
    if (!user || !user.id) {
      console.error('Usuário não autenticado');
      return;
    }
    try {
      await axios.post(`/api/usuarios/${user.id}/favorite-games/${gameId}`);
      fetchFavorites(user.id);
      setIsAddingFavorites(false);
    } catch (error) {
      console.error('Erro ao adicionar jogo aos favoritos:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Perfil do Usuário</h1>
      <h2> {user?.username}</h2>
      <div className="favorites-section">
        <h3>Jogos Favoritos</h3>
        {favorites.length === 0 ? (
          <p>Você ainda não adicionou nenhum jogo aos favoritos.</p>
        ) : (
          <ul>
            {favorites.map((game) => (
              <li key={game.id}>
                {game.title}
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => setIsAddingFavorites(true)}>Adicionar Jogos Favoritos</button>
      </div>

      {isAddingFavorites && (
        <div className="games-list">
          <h3>Todos os Jogos</h3>
          <ul>
            {games.length > 0 ? (
              games.map((game) => (
                <li key={game.id}>
                  {game.title}
                  <button onClick={() => handleAddToFavorites(game.id)}>Adicionar aos Favoritos</button>
                </li>
              ))
            ) : (
              <p>Carregando jogos...</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
