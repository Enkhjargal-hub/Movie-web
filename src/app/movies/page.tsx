// app/movies/page.tsx
"use client";
import { useSearchParams } from "next/navigation";

const MoviesPage = () => {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">
        {genre ? `${genre} Movies` : "All Movies"}
      </h1>
      {/* Энд API эсвэл датанаас жанраар кино жагсаалт татах код нэмнэ */}
    </div>
  );
};

export default MoviesPage;
