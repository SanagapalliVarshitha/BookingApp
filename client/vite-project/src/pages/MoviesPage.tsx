import { useEffect, useState } from "react";
import { getMovies } from "../api/movie";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../api/watchlist";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";
interface Movie { _id: string; title: string; description: string; duration: number; image: string; }
export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [watchlistIds, setWatchlistIds] = useState<Set<string>>(new Set());
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => { getMovies().then(setMovies); }, []);
  useEffect(() => {
    if (!user) return;
    getWatchlist(user.token).then((items: { movieId: { _id: string } }[]) => {
      setWatchlistIds(new Set(items.map((item) => item.movieId._id)));
    }).catch(() => {});
  }, [user]);
  const handleWatchlistToggle = async (e: React.MouseEvent, movieId: string) => {
    e.stopPropagation();
    if (!user) { navigate("/"); return; }
    if (watchlistIds.has(movieId)) {
      await removeFromWatchlist(movieId, user.token);
      setWatchlistIds((prev) => { const next = new Set(prev); next.delete(movieId); return next; });
    } else {
      await addToWatchlist(movieId, user.token);
      setWatchlistIds((prev) => new Set(prev).add(movieId));
    }
  };
  return (
    <div style={{ padding: "40px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1, color: "#f1f5f9", marginBottom: 8 }}>🎬 CineBook</h1>
        <p style={{ color: "#64748b", fontSize: 16 }}>Pick a movie and book your seats</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
        {movies.length === 0 ? (
          <p style={{ color: "#64748b", marginTop: 60 }}>No movies available right now.</p>
        ) : (
          movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onClick={() => navigate(`/shows/${movie._id}`)} isWatchlisted={watchlistIds.has(movie._id)} onWatchlistToggle={(e) => handleWatchlistToggle(e, movie._id)} />
          ))
        )}
      </div>
    </div>
  );
}
