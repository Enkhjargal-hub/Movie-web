"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` },
      }
    );
    return response.data.results;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return [];
  }
};

export function MovieCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetchMovies().then((data) => setMovies(data.slice(0, 5)));
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden mb-8">
      {movies.length > 0 ? (
        <Slider {...sliderSettings}>
          {movies.map((movie) => (
            <div key={movie.id} className="relative w-full h-[600px]">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute top-1/2 left-16 transform -translate-y-1/2 text-white max-w-[40%]">
                <p className="text-lg">Now Playing:</p>
                <h1 className="text-5xl font-bold">{movie.title}</h1>
                <p className="mt-2 text-lg">{movie.overview.slice(0, 150)}...</p>
                <p className="mt-4 text-yellow-400 text-xl">⭐ {movie.vote_average}/10</p>
                <Button className="mt-4 bg-gray-800 px-6 py-3 text-white rounded-lg">▶ Watch Trailer</Button>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex items-center justify-center h-full text-white">Loading Movies...</div>
      )}
    </div>
  );
}

export default function Home() {
  const { push } = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMovies().then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <MovieCarousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {movies.map((movie) => (
          <div key={movie.id} className="shadow-xl cursor-pointer" onClick={() => push(`/detail/${movie.id}`)}>
            <div className="relative w-full h-72">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="text-center font-bold mt-2">{movie.title}</div>
            <div className="text-center text-yellow-500 mt-2">⭐ {movie.vote_average}/10</div>
          </div>
        ))}
      </div>
    </div>
  );
}