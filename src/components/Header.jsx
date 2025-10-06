import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./header.css";
import LoginModal from "../pages/Login";

 export const Header = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("👋 Logged out successfully!");
  };

  return (
    <>
      <header className="header">
        <div className="logo">🎬 MOVIE DB</div>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/movies/top" onClick={() => setMenuOpen(false)}>Top Rated</NavLink>
          <NavLink to="/movies/popular" onClick={() => setMenuOpen(false)}>Popular</NavLink>
          <NavLink to="/movies/upcoming" onClick={() => setMenuOpen(false)}>Upcoming</NavLink>

          {user ? (
            <div className="user-area">
              <span className="welcome-text">👋 {user.name}</span>
              <button className="btn-primary logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn-primary login-btn"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          )}
        </nav>
      </header>

      {showLogin && (
        <LoginModal
          setUser={(u) => {
            setUser(u);
            setShowLogin(false);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}
    </>
  );
};

export default Header;
