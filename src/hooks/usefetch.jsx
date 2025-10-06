import { useEffect, useState } from "react";

export const useFetch = (apiPath, queryTerm = "") => {
  const [data, setData] = useState([]);
  const key = import.meta.env.VITE_API_KEY;

  const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${key}&query=${queryTerm}`;
  console.log(url)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const jsonData = await res.json();
        setData(jsonData.results || []);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setData([]); 
      }
    }
    fetchMovies();
  }, [url]);

  return { data };
};
