"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "@/components/ui/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // React Router-тэй адил Next.js hook

export default function Movies() {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (category: string, setData: (data: Movie[]) => void) => {
    if (!TMDB_API_TOKEN) {
      setError("API token is missing.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${category}?language=en-US`,
        {
          headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
        }
      );
      if (response.data && response.data.results) {
        setData(response.data.results.slice(0, 5));
      } else {
        setError(`No ${category} movies found.`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("popular", setPopularMovies);
    fetchMovies("upcoming", setUpcomingMovies);
    fetchMovies("top_rated", setTopRatedMovies);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-6 p-6 max-w-screen-lg mx-auto">
      <Section title="Popular" movies={popularMovies} />
      <Section title="Upcoming" movies={upcomingMovies} />
      <Section title="Top-Rated" movies={topRatedMovies} />
    </div>
  );
}

const Section = ({ title, movies }: { title: string; movies: Movie[] }) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <p className="text-white text-2xl font-semibold">{title}</p>
      <Button
        onClick={() => alert(`${title} movies`)}
        className="text-primary text-sm font-medium underline-offset-4 hover:underline"
      >
        See More
      </Button>
    </div>
    <div className="flex overflow-x-auto gap-4 p-2 scrollbar-hide">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </div>
);

const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();

  return (
    <div
      className="relative w-[200px] min-w-[200px] h-[300px] rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => router.push(`/movies/${movie.id}`)} // Кино дэлгэрэнгүй хуудас руу шилжих
    >
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/200x300"}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 bg-black bg-opacity-60 text-white w-full p-2 text-sm font-medium text-center">
        {movie.title}
        <p className="text-yellow-400 text-xs">⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10</p>
      </div>
    </div>
  );
};
