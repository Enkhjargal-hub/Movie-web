"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_IMAGE_SERVICE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || "https://image.tmdb.org/t/p";
const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Home() {
  const { push } = useRouter();
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
          params: { language: "en-US", page: 1 },
          headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
        });
        setPopularMovies(response.data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {popularMovies.map((movie) => (
        <Card key={movie.id}>
          <div className="relative w-full h-64">
            {movie.poster_path && (
              <Image
                src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="rounded-md object-cover"
              />
            )}
          </div>
          <CardHeader>{movie.title}</CardHeader>
          <CardContent
            onClick={() => push(`/detail/${movie.id}`)}
            className="cursor-pointer"
          >
            Click me to navigate to detail page
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


