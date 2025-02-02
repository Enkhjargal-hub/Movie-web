"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

// Type for the movie data
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

// API Endpoint
// pages/index.tsx
const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_ACTUAL_API_KEY";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="rounded-lg shadow-md overflow-hidden">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-2">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <p className="text-sm">Rating: {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
