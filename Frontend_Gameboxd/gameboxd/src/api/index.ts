import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const registerUser = (userData: { email: string; username: string; password: string }) => {
  return api.post('/auth/register', userData);
};

export const loginUser = (userData: { email: string; password: string }) => {
  return api.post('/auth/login', userData);
};

export const getReviewsByUserId = (userId: number) => {
  return api.get(`/game-reviews/user/${userId}`);
};

export const addReview = (reviewData: { reviewText: string; gameId: number; userId: number; rating: number }) => {
  return api.post('/game-reviews', reviewData);
};

export default api;
