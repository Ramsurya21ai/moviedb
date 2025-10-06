import { Card } from "../components/Card";
import { useFetch } from "../hooks/usefetch";
import { useEffect } from "react";
import "./movielist.css";

export const Movielist = ({ title, apiPath }) => {
  const { data: movies = [] } = useFetch(apiPath);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="movie-list">
      <h2>{title}</h2>
      {movies.length > 0 ? (
        <div className="movie-grid">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default Movielist;
