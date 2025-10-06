import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./moviedetials.css";
import backup from "../assets/backup.jpg";

export const Moviedetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const key = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;

  const image = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : backup;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        setMovie(jsonData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchMovies();
  }, [url]);

  useEffect(() => {
    if (movie.title) {
      document.title = movie.title;
    }
  }, [movie.title]);

  return (
    <main className="details-container">
      <h2 className="details-title">{movie.title}</h2>
      <div className="details-content">
        <div className="details-poster">
          <img src={image} alt={movie.title} />
        </div>
        <div className="details-info">
          <h3 className="tagline">"{movie.tagline}"</h3>
          <p className="overview">{movie.overview}</p>

          {movie.genres && (
            <p className="genres">
              {movie.genres.map((genre) => (
                <span key={genre.id} className="badge">
                  {genre.name}
                </span>
              ))}
            </p>
          )}

          <p className="meta">
            ⭐ {movie.vote_average} | 👥 {movie.vote_count} reviews
          </p>

          <table className="details-table">
            <tbody>
              <tr>
                <th>Runtime</th>
                <td>{movie.runtime} min</td>
              </tr>
              <tr>
                <th>Budget</th>
                <td>${movie.budget?.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Revenue</th>
                <td>${movie.revenue?.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Release Date</th>
                <td>{movie.release_date}</td>
              </tr>
              <tr>
                <th>Language</th>
                <td>
                  {movie.spoken_languages &&
                    movie.spoken_languages
                      .map((l) => l.english_name)
                      .join(", ")}
                </td>
              </tr>
            </tbody>
          </table>

          {movie.imdb_id && (
            <a
              className="imdb-btn"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
            >
              View on IMDB
            </a>
          )}
        </div>
      </div>
    </main>
  );
};

export default Moviedetails;
