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
        console.log(response);
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
                src={`${process.env.TMDB_IMAGE_URL}/w500${movie.poster_path}`}
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
