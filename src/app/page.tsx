"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "@/components/ui/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

export default function Movies() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (category: string, genre: number | null, setData: (data: Movie[]) => void) => {
    if (!TMDB_API_TOKEN) {
      setError("API token is missing.");
      return;
    }

    try {
      setLoading(true);
      const genreQuery = genre ? `&with_genres=${genre}` : '';
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${category}?language=en-US${genreQuery}`,
        {
          headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
        }
      );
      if (response.data && response.data.results) {
        setData(response.data.results.slice(0, 5)); 
      } else {
        setError(`No ${category} movies found.`);
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error occurred";
      setError("Error fetching movies: " + errorMsg);
      console.error(errorMsg); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      if (!TMDB_API_TOKEN) {
        setError("API token is missing.");
        return;
      }

      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/genre/movie/list?language=en-US`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
          }
        );
        setGenres(response.data.genres || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
    fetchMovies("popular", selectedGenre, setPopularMovies);
    fetchMovies("upcoming", selectedGenre, setUpcomingMovies);
    fetchMovies("top_rated", selectedGenre, setTopRatedMovies);
  }, [selectedGenre]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col gap-6 p-6 max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <p className="text-white text-2xl font-semibold">Filter by Genre</p>
        <select
          value={selectedGenre || ""}
          onChange={(e) => setSelectedGenre(Number(e.target.value))}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          <option value="">All Genres</option>
          {genres.map((genre: any) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

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
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTrailer = async () => {
      const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
      const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

      if (TMDB_API_TOKEN && movie.id) {
        try {
          const response = await axios.get(
            `${TMDB_BASE_URL}/movie/${movie.id}/videos?language=en-US`,
            {
              headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
            }
          );
          if (response.data && response.data.results) {
            const trailer = response.data.results.find((video: any) => video.type === "Trailer");
            if (trailer) {
              setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
            } else {
              setTrailerUrl(null);
            }
          }
        } catch (error) {
          console.error("Error fetching trailer:", error);
          setTrailerUrl(null); 
        }
      }
    };

    fetchTrailer();
  }, [movie.id]);

  return (
    <div
      className="relative w-[200px] min-w-[200px] h-[300px] rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => router.push(`/detail/${movie.id}`)}
    >
      <Image
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/200x300"}
        alt={movie.title || "Untitled"}
        className="w-full h-full object-cover"
        fill
      />
      <div className="absolute bottom-0 bg-black bg-opacity-60 text-white w-full p-2 text-sm font-medium text-center">
        {movie.title || "Untitled"}
        <p className="text-yellow-400 text-xs">
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
        </p>
      </div>
      {trailerUrl && (
        <div className="absolute top-0 right-0 bg-black bg-opacity-60 text-white p-2 rounded-bl-lg">
          <a href={trailerUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-400">
            Watch Trailer
          </a>
        </div>
      )}
    </div>
  );
};

