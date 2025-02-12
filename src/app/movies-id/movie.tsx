// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation"; 
// import { Movie } from "@/components/ui/types";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// const MovieDetails = () => {
//   const router = useRouter();
//   const { id } = router.query; // Get the movie ID from the URL
//   const [movie, setMovie] = useState<Movie | null>(null);
//   const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       if (!id) return; // Ensure the ID is available before making the request

//       setLoading(true);

//       const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
//       const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

//       // Ensure the API token and base URL are set
//       if (!TMDB_API_TOKEN || !TMDB_BASE_URL) {
//         setError("API token or base URL is missing.");
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch movie details
//         const movieResponse = await axios.get(
//           `${TMDB_BASE_URL}/movie/${id}?language=en-US`,
//           {
//             headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
//           }
//         );
//         setMovie(movieResponse.data);

//         // Fetch trailer
//         const trailerResponse = await axios.get(
//           `${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`,
//           {
//             headers: { Authorization: `Bearer ${TMDB_API_TOKEN}` },
//           }
//         );
//         const trailer = trailerResponse.data.results.find((video: any) => video.type === "Trailer");
//         if (trailer) {
//           setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
//         }
//       } catch (error) {
//         setError("Error fetching movie details");
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovieDetails();
//   }, [id]);

//   // Handle loading, error, or missing movie data
//   if (loading) return <div>Loading movie details...</div>;
//   if (error) return <div>{error}</div>;
//   if (!movie) return <div>No movie data found.</div>;

//   return (
//     <div className="movie-details-container p-6 max-w-screen-lg mx-auto">
//       <div className="flex flex-col md:flex-row gap-6">
//         <Image
//           src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450"}
//           alt={movie.title}
//           className="w-full max-w-[300px] rounded-lg shadow-lg"
//         />
//         <div className="flex flex-col justify-between">
//           <h1 className="text-4xl font-semibold text-white">{movie.title}</h1>
//           <p className="text-sm text-gray-300">{movie.overview}</p>
//           <p className="text-xl text-yellow-400">⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10</p>
//           {trailerUrl && (
//             <Button
//               onClick={() => window.open(trailerUrl, "_blank")}
//               className="mt-4 text-primary text-lg font-medium underline-offset-4 hover:underline"
//             >
//               Watch Trailer
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

