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
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [totalMovies, setTotalMovies] = useState<number>(0); 

  const page = Number(searchParams.get("page")) || 1;
  const genreIds = searchParams.get("genreIds") || "";

  console.log("Genres IDs:", genreIds);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!TMDB_API_TOKEN) {
        setError("API Token is missing. Please check your .env file.");
        return;
      }
  
      try {
        setLoading(true);
        const response = await axios.get(
          `${TMDB_BASE_URL}/discover/movie?language=en-US&page=${page}&with_genres=${genreIds}`,
          {
            headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
          }
        );
        console.log("API Response:", response.data);
  
        setMovies(response.data.results);
        setTotalMovies(response.data.total_results); 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error: ", error.message);
        } else {
          console.error("Unexpected error: ", error);
        }
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovies();
  }, [searchParams]);
  

  const handleGenreChange = (genreId: number) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    setSelectedGenres(updatedGenres);

    const queryParams = new URLSearchParams(searchParams);
    if (updatedGenres.length > 0) {
      queryParams.set("genreIds", updatedGenres.join(","));
    } else {
      queryParams.delete("genreIds");
    }

    router.push(`/genres?${queryParams.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("page", newPage.toString());
    router.replace(`/genres?${queryParams.toString()}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Movie Z - Genres</h1>

      <Genre selectedGenres={selectedGenres} onGenreChange={handleGenreChange} />

      {error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : loading ? (
        <p className="text-center text-gray-600">Loading movies...</p>
      ) : (
        <div className="space-y-6">
          <p className="text-center text-lg text-gray-600">Total Movies: {totalMovies}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.length === 0 ? (
              <p className="col-span-full text-center text-gray-600">No movies found for this genre.</p>
            ) : (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450"
                    }
                    alt={movie.title || "Untitled"}
                    className="w-full h-72 object-cover rounded-md"
                    width={200}
                    height={300}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
                    <div className="flex items-center text-sm text-yellow-500 mt-1">
                      <Star className="w-4 h-4 mr-1" />
                      {movie.vote_average.toFixed(1)}/10
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition"
          disabled={page <= 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        <span className="text-lg font-medium">Page {page}</span>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

