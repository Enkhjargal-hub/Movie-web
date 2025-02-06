import { useRouter } from "next/navigation";


interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number | null;
}

const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();

  return (
    <div
      className="relative w-[200px] min-w-[200px] h-[300px] rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={() => router.push(`/movies/${movie.id}`)} // Зөв зам руу шилжүүлэх
    >
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750"}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 bg-black bg-opacity-60 text-white w-full p-2 text-sm font-medium text-center">
        {movie.title}
        <p className="text-yellow-400 text-xs">⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10</p>
      </div>
    </div>
  );
};

export default MovieCard;

