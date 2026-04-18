import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleLogout = () => { logout(); navigate("/"); };
  return (
    <nav style={{ background: "#111118", borderBottom: "1px solid #2a2a3a", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
      <span onClick={() => navigate(user ? "/movies" : "/")} style={{ fontWeight: 800, fontSize: 22, color: "#f59e0b", cursor: "pointer" }}>CineBook</span>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {user && (
          <>
            <span onClick={() => navigate("/movies")} style={{ color: "#94a3b8", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>Movies</span>
            <span onClick={() => navigate("/watchlist")} style={{ color: "#94a3b8", fontSize: 14, cursor: "pointer", fontWeight: 500 }}>❤️ Watchlist</span>
            <span style={{ color: "#475569", fontSize: 13 }}>Hi, {user.name || "User"}</span>
            <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid #374151", borderRadius: 8, padding: "6px 14px", color: "#94a3b8", fontSize: 13, cursor: "pointer" }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
