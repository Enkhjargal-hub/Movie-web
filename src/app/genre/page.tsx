"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Genre from "@/components/ui/genre";
import { Star } from "lucide-react";
import Image from "next/image";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export default function GenresPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const page = Number(searchParams.get("page")) || 1;
  const genre = searchParams.get("genre") || "";

  console.log("Genre IDs:", genre); 

  useEffect(() => {
    const fetchMovies = async () => {
      if (!TMDB_API_TOKEN) {
        setError("API Token is missing. Please check your .env file.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${TMDB_BASE_URL}/discover/movie?language=en-US&page=${page}&with_genres=${genre}`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
          }
        );

        console.log("API Response:", response.data); 

        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("page", newPage.toString());
    router.replace(`/genres?${queryParams.toString()}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movie Z - Genres</h1>

      <Genre />

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loading ? (
        <p className="text-center col-span-full">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {movies.length === 0 ? (
            <p className="col-span-full text-center">No movies found for this genre.</p>
          ) : (
            movies.map((movie) => {
              console.log("Movie Data:", movie); 

              return (
                <div
                  key={movie.id}
                  className="rounded-lg shadow-sm overflow-hidden cursor-pointer"
                >
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/200x300"
                    }
                    alt={movie.title || "Untitled"}
                    className="w-full h-full object-cover"
                    fill
                  />
                  <div className="p-2 bg-gray-100 dark:bg-[#262626]">
                    <div className="flex items-center text-xs">
                      <Star
                        className="w-3 h-3 text-yellow-400 mr-1"
                        fill="currentColor"
                      />
                      {movie.vote_average.toFixed(1)}/10
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-4 py-2 border rounded-md disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="px-4 py-2 border rounded-md"
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
