"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Slider from "react-slick";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

export default function MovieCarousel() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${process.env.TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
          {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` },
          }
        );
        setMovies(response.data.results.slice(0, 5)); // Зөвхөн эхний 5 киног авна
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden mb-8">
      {movies.length > 0 ? (
        <Slider {...sliderSettings}>
          {movies.map((movie) => (
            <div key={movie.id} className="relative">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                width={1920}
                height={500}
                className="object-cover w-full h-[500px] opacity-70"
              />
              <motion.div
                className="absolute top-1/3 left-10 text-white max-w-[40%]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl font-bold">{movie.title}</h1>
                <p className="mt-2 text-lg">{movie.overview.slice(0, 150)}...</p>
                <p className="mt-4 text-yellow-400">⭐ {movie.vote_average}/10</p>
              </motion.div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="flex items-center justify-center h-full text-white">
          Loading Movies...
        </div>
      )}
    </div>
  );
}
