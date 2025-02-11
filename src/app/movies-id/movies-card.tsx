"use client";

import { Movie } from "@/components/ui/types"; 
import { useRouter } from "next/navigation"; 
import Image from "next/image";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "https://via.placeholder.com/200x300"; 

  return (
    <div
      className="relative w-[200px] min-w-[200px] h-[300px] rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => router.push(`/detail/${movie.id}`)} 
    >
      <Image
        src={posterUrl}
        alt={movie.title || "Untitled"}
        className="w-full h-full object-cover"
        fill
      />
      <div className="absolute bottom-0 bg-black bg-opacity-60 text-white w-full p-2 text-sm font-medium text-center">
        <p>{movie.title || "Untitled"}</p>
        <p className="text-yellow-400 text-xs">
          ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
        </p>
      </div>
    </div>
  );
};

export default MovieCard;




