import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getWatchlist, removeFromWatchlist } from "../api/watchlist";
import MovieCard from "../components/MovieCard";
interface Movie { _id: string; title: string; description: string; duration: number; image: string; }
interface WatchlistItem { _id: string; movieId: Movie; }
export default function WatchlistPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) { navigate("/"); return; }
    getWatchlist(user.token).then(setItems).finally(() => setLoading(false));
  }, [user, navigate]);
  const handleRemove = async (movieId: string) => {
    if (!user) return;
    await removeFromWatchlist(movieId, user.token);
    setItems((prev) => prev.filter((item) => item.movieId._id !== movieId));
  };
  if (loading) return <p style={{ color: "#64748b", padding: 40 }}>Loading...</p>;
  return (
    <div style={{ padding: "40px 16px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "#f1f5f9", marginBottom: 8 }}>❤️ My Watchlist</h1>
        <p style={{ color: "#64748b", fontSize: 16 }}>Movies you've saved to watch</p>
      </div>
      {items.length === 0 ? (
        <p style={{ color: "#64748b", textAlign: "center", marginTop: 60 }}>Your watchlist is empty. <span onClick={() => navigate("/movies")} style={{ color: "#f59e0b", cursor: "pointer" }}>Browse movies</span></p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
          {items.map((item) => (
            <MovieCard key={item._id} movie={item.movieId} onClick={() => navigate(`/shows/${item.movieId._id}`)} isWatchlisted={true} onWatchlistToggle={(e) => { e.stopPropagation(); handleRemove(item.movieId._id); }} />
          ))}
        </div>
      )}
    </div>
  );
}
