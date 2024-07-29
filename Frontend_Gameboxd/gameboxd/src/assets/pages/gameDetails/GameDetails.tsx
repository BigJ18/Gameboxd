import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../api';
import Rating from 'react-rating-stars-component';
import './Gamedetails.css';

const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState<any>(null); 
    const [reviews, setReviews] = useState<any[]>([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState<number>(0);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await axios.get(`/games/${id}`);
                setGame(response.data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do jogo:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/game-reviews/game/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Erro ao buscar reviews do jogo:', error);
            }
        };

        fetchGame();
        fetchReviews();
    }, [id]);

    const handleReviewSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('/game-reviews', {
                reviewText,
                rating,
                gameId: id,
                userId: 1, 
            });
            setReviews([...reviews, response.data]);
            setReviewText('');
            setRating(0);
        } catch (error) {
            console.error('Erro ao adicionar review:', error);
        }
    };

    if (!game) return <div>Carregando...</div>;

    return (
        <div className="game-details">
            <div className="content">
                <h1>{game.title}</h1>
                <p>{game.description}</p>
                <img src={game.coverUrl} alt={game.title} className="game-cover" />
                <h2>Avaliações</h2>
                {reviews.map((review) => (
                    <div key={review.id} className="review">
                        <p><strong>{review.userName}</strong>: {review.reviewText}</p>
                        <Rating
                            count={5}
                            value={review.rating}
                            size={24}
                            edit={false}
                        />
                    </div>
                ))}
                <form onSubmit={handleReviewSubmit} className="review-form">
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Escreva sua avaliação..."
                    />
                    <Rating
                        count={5}
                        value={rating}
                        size={24}
                        onChange={(newRating: number) => setRating(newRating)}
                    />
                    <button type="submit">Adicionar Avaliação</button>
                </form>
            </div>
        </div>
    );
};

export default GameDetails;
