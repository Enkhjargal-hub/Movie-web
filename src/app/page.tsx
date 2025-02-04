"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export default function Home() {
  const { push } = useRouter();
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
          {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` },
          }
        );
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
      {popularMovies.map((movie) => (
        <Card key={movie.id} className="shadow-xl">
          <div className="relative w-full h-72">
            {movie.poster_path ? (
              <Image
                src={`${process.env.TMDB_IMAGE_URL || "https://image.tmdb.org/t/p"}/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="rounded-md object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-72 bg-gray-200">
                <p>No Image Available</p>
              </div>
            )}
          </div>
          <CardHeader className="text-center font-bold mt-2">{movie.title}</CardHeader>
          <CardContent
            onClick={() => push(`/detail/${movie.id}`)}
            className="cursor-pointer text-center text-yellow-500 mt-2"
          >
            ⭐ {movie.vote_average}/10
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
