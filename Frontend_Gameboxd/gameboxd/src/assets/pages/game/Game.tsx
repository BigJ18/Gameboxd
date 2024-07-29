import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Gamedetails.css';
import api from '../../../api';

interface Game {
  id: number;
  title: string;
  description: string;
  coverUrl: string;
}

interface GameReview {
  id: number;
  reviewText: string;
  username: string;
}

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [reviews, setReviews] = useState<GameReview[]>([]);
  const [reviewText, setReviewText] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!id) {
      console.error('ID do jogo não encontrado');
      return;
    }

    const fetchGameDetails = async () => {
      try {
        const response = await api.get(`/jogos/${id}`);
        setGame(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do jogo:', error);
      }
    };

    const fetchGameReviews = async () => {
      try {
        const response = await api.get(`/api/game-reviews/game/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Erro ao buscar reviews do jogo:', error);
      }
    };

    fetchGameDetails();
    fetchGameReviews();
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Você precisa estar logado para adicionar uma review.');
      return;
    }
    try {
      if (!id) {
        console.error('ID do jogo não encontrado');
        return;
      }
      const response = await api.post('/api/game-reviews', {
        reviewText,
        userId: user.id,
        gameId: parseInt(id),
      });
      alert('Review adicionada com sucesso!');
      setReviewText('');
      setReviews([...reviews, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar review:', error);
      alert('Erro ao adicionar review');
    }
  };

  return (
    <div className="game-details-container">
      {game && (
        <>
          <h1>{game.title}</h1>
          <img src={game.coverUrl} alt={game.title} className="game-cover" />
          <p>{game.description}</p>
          <form onSubmit={handleReviewSubmit} className="review-form">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Escreva sua review..."
              className="review-textarea"
            />
            <button type="submit" className="submit-review-button">Adicionar Review</button>
          </form>
          <div className="reviews-section">
            <h2>Reviews</h2>
            {reviews.length === 0 && <p>Não há reviews para este jogo ainda.</p>}
            {reviews.map((review) => (
              <div key={review.id} className="review">
                <p><strong>{review.username}</strong>: {review.reviewText}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GameDetails;
