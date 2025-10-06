// Allroutes.jsx
import { Route, Routes } from "react-router-dom";
import { Moviedetails, Movielist, Search } from "../pages";
import Login from "../pages/Login";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Movielist title="Great Movies" apiPath="movie/now_playing" />} />
      <Route path="movies/top" element={<Movielist title="Top Rated Movies" apiPath="movie/top_rated" />} />
      <Route path="movies/popular" element={<Movielist title="Popular Movies" apiPath="movie/popular" />} />
      <Route path="movies/upcoming" element={<Movielist title="Upcoming Movies" apiPath="movie/upcoming" />} />
      <Route path="movie/:id" element={<Moviedetails />} />
      <Route path="search" element={<Search apiPath="search/movie" />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default Allroutes;
