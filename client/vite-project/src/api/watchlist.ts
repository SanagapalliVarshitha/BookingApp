import {api} from './api';
export const getWatchlist = async (token: string) => {
  const res = await api.get("/watchlist", { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
export const addToWatchlist = async (movieId: string, token: string) => {
  const res = await api.post("/watchlist", { movieId }, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
export const removeFromWatchlist = async (movieId: string, token: string) => {
  const res = await api.delete(`/watchlist/${movieId}`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};
