export interface Game {
  id: number;
  title: string;
  description: string;
  coverUrl: string;
  genres: string[];
  platforms: string[];
  releaseDate: string;
}

export interface GameReview {
  id: number;
  reviewText: string;
  game: Game;
  userId: number;
  rating: number;
}
