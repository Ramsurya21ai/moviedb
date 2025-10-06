import "./card.css";
import { Link } from "react-router-dom";
import backup from "../assets/backup.jpg";

export const Card = ({ movie }) => {
  const { poster_path, id, overview, title, vote_average, vote_count } = movie;
  const image = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : backup;

  return (
    <div className="card-container">
      <div className="movie-card">
      
        <img src={image} alt={title} className="movie-poster" />

  
        <div className="movie-info">
          <h3 className="movie-title">{title}</h3>
          <p className="movie-overview">{overview}</p>

          <div className="movie-meta">
            <span className="rating">
              ⭐ {vote_average} | {vote_count} reviews
            </span>
            <Link to={`/movie/${id}`} className="read-more">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
