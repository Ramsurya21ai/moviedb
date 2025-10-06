import "./cours.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/avenger.jpg";
import img2 from "../assets/brad.jpg";
import img3 from "../assets/tom.jpg";
import img4 from "../assets/layer.jpg";
import img5 from "../assets/final.jpg";
import img6 from "../assets/miles.jpg";
import img7 from "../assets/jjj.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7];

export const Cours = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const queryTerm = e.target.search.value;
    e.target.reset();
    return navigate(`/search?q=${queryTerm}`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`slide-${idx}`}
          className={`carousel-image ${
            idx === currentIndex ? "active" : ""
          }`}
        />
      ))}

      <div className="carousel-overlay">
        <h1>Experience the true entertainment like never before</h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            placeholder="Search movies..."
            className="search-bar"
          />
        </form>
      </div>
    </div>
  );
};
