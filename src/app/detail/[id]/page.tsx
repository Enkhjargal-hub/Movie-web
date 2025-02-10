"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Movie } from "@/components/ui/types";
import { Button } from "@/components/ui/button";

const MovieDetail = () => {
  const router = useRouter();
  const { id } = router.query; // This gets the dynamic 'id' from the URL

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Don't fetch data if no id is available

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
      const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}?language=en-US`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
          }
        );
        setMovie(response.data);
      } catch (error) {
        setError("Error fetching movie details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]); // Trigger when id changes

  if (loading) return <div>Loading movie details...</div>;
  if (error) return <div>{error}</div>;

  if (!movie) return <div>No movie data found.</div>;

  return (
    <div className="movie-details-container p-6 max-w-screen-lg mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450"}
          alt={movie.title}
          className="w-full max-w-[300px] rounded-lg shadow-lg"
        />
        <div className="flex flex-col justify-between">
          <h1 className="text-4xl font-semibold text-white">{movie.title}</h1>
          <p className="text-sm text-gray-300">{movie.overview}</p>
          <p className="text-xl text-yellow-400">⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10</p>
          <Button
            onClick={() => window.open(`https://www.youtube.com/results?search_query=${movie.title}+trailer`, "_blank")}
            className="mt-4 text-primary text-lg font-medium underline-offset-4 hover:underline"
          >
            Watch Trailer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

