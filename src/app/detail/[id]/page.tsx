"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "@/components/ui/types";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Image from "next/image";

interface MovieDetails extends Movie {
  credits?: {
    crew: { job: string; name: string }[];
    cast: { name: string }[];
  };
  recommendations?: {
    results: { id: number; title: string; poster_path: string }[];
  };
}

const MovieDetail = () => {
  const params = useParams();
  const { id } = params;

  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
      const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${id}?language=en-US&append_to_response=credits,recommendations`,
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
  }, [id]);

  if (loading) return <div className="text-center text-white">Loading movie details...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!movie) return <div className="text-center text-gray-400">No movie data found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg text-white">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative w-64 h-96 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450"
            }
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          <p className="text-lg text-yellow-400">⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10</p>
          <p className="text-lg font-semibold mt-4">Director: {movie.credits?.crew?.find(person => person.job === "Director")?.name || "N/A"}</p>
          <p className="text-lg font-semibold">Writers: {movie.credits?.crew?.filter(person => person.job === "Writer").map(person => person.name).join(", ") || "N/A"}</p>
          <p className="text-lg font-semibold">Stars: {movie.credits?.cast?.slice(0, 5).map(actor => actor.name).join(" · ") || "N/A"}</p>
          <Button
            onClick={() => window.open(`https://www.youtube.com/results?search_query=${movie.title}+trailer`, "_blank")}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
          >
            Watch Trailer
          </Button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">More like this</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movie.recommendations?.results?.slice(0, 4).map(rec => (
            <div key={rec.id} className="text-center">
              <Image
                src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                alt={rec.title}
                width={150}
                height={225}
                className="rounded-lg mx-auto"
              />
              <p className="text-sm mt-2">{rec.title}</p>
            </div>
          )) || <p className="text-gray-400">No recommendations available</p>}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;