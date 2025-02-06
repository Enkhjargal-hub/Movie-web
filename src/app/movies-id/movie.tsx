import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Movie {
  title: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  poster_path: string | null;
  genres: { id: number; name: string }[];
  overview: string;
  videos: {
    results: { key: string }[];
  };
}

export default function MovieDetail() {
  const params = useParams();
  const id = params?.id ?? "";  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  useEffect(() => {
    if (!id) return;

    console.log("Fetching movie with ID:", id); 

    const fetchMovieDetails = async () => {
      if (!TMDB_API_TOKEN) {
        setError("API token is missing.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}?language=en-US`, {
          headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
        });
        setMovie(response.data);
      } catch (error) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!movie) return <div className="text-white text-center">Movie not found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <p className="text-gray-400 mt-2">{movie.release_date} • {movie.runtime} min • {movie.vote_average.toFixed(1)}/10</p>

      <div className="flex gap-6 mt-6">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750"}
          alt={movie.title}
          className="w-80 rounded-lg"
        />

        <div className="flex-1">
          {movie.videos?.results.length > 0 && (
            <iframe
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          )}

          <div className="flex gap-2 mt-4">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-4 text-gray-300">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
