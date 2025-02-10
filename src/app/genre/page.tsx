"use client";

import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type GenresType = { id: number; name: string };

type Movie = {
  id: number;
  original_title: string;
};

const Genres = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [genres, setGenres] = useState<GenresType[]>([]);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
  const searchedGenreId = searchParams.get("genreId");
  const [movies, setMovies] = useState<Movie[]>([]);

 
  const getGenresList = async () => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?language=en`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      });

      setGenres(response.data.genres);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };


  const getMoviesByGenres = async () => {
    const genreIds = searchParams.get("genreId");
    if (!genreIds) return;

    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreIds}&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );

      setMovies(response.data.results);
    } catch (error) {
      console.error("Axios error:", error);
    }
  };



  useEffect(() => {
    getGenresList();
  }, []);

  useEffect(() => {
    getMoviesByGenres();
  }, [searchedGenreId]);

  const handleGenreSelection = (genreId: string) => () => {
    const updatedGenres = selectedGenreIds.includes(genreId)
      ? selectedGenreIds.filter((item) => item !== genreId)
      : [...selectedGenreIds, genreId];

    setSelectedGenreIds(updatedGenres);

    const queryParams = new URLSearchParams();
    queryParams.set("genreId", updatedGenres.join(","));
    push(`/genres?${queryParams.toString()}`);
  };

  return (
    <div className="w-full flex gap-2 h-screen p-4">
      <div className="w-1/3 space-x-1">
        {genres.length > 0 &&
          genres.map((item) => {
            const genreId = item.id.toString();
            const isSelected = selectedGenreIds.includes(genreId);
            return (
              <Badge
                onClick={handleGenreSelection(genreId)}
                variant="outline"
                key={item.id}
                className={`cursor-pointer rounded-full ${
                  isSelected ? "bg-black text-white dark:bg-white dark:text-black" : ""
                }`}
              >
                {item.name}
              </Badge>
            );
          })}
      </div>
      <Separator orientation="vertical" />
      <div className="w-2/3">
        {movies.length > 0 ? (
          movies.map((item) => (
            <div key={item.id} className="text-white">
              {item.original_title}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Genres;
