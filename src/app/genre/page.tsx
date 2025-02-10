"use client"
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation"
import {useSearchParams} from "next/navigation";
import { error } from "console";
import { EqualApproximatelyIcon } from "lucide-react";

const TMDB_BASE_URL= process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN=process.env.TMDB_API_TOKEN;

type GenresType = {id:number; number:string};

type Movie = {
    original_title: string;
};

const Genres = () => {
    const {push} = useRouter();
    const searchParams = useSearchParams();
    const [genres, setGenres] = useState<GenresType[]>([]);
    const [selectedGenreIds, setSelectedGenreIds] =useState<string[]>([]);
    const searchedGenreId= searchParams.get("genresId")
    const [movie, setMovies] = useState<Movie[]>([]);
    searchParams.get("genresId");


    const getMoviesByGenres = async () => {
    
    const genreIds = searchParams.get("genreIds");
    await axios
    .get(
        `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreIds}&page=1`,
        {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
        }
    )
    .then((response)=>{
        console.log(response);
        
        setMovies(response.data.genres);
    })
    .catch((error)=> {
        console.log("Axios error:", error);
    });
    };


    useEffect(()=> {
        getGenresList();
    },[]);

    useEffect(()=> {
        getMoviesByGenres();
    },[searchedGenreId]);

    const handleGenreSelection=(genreId:string) => () => {
        const updatedGenres=selectedGenreIds.includes(genreId)
        ?setSelectedGenreIds(selectedGenreIds.filter((item)=> item!==genreId))
        :setSelectedGenreIds(...selectedGenreIds, genreId);

        setSelectedGenreIds(updatedGenres);

        const queryParams = new URLSearchParams();
        queryParams.set("genreId", updatedGenres.join(","));
        const newPath = queryParams.toString()
    

        setSelectedGenreIds([...selectedGenreIds,genreId]);
        push(`/genres?${newPath}`);
    };

    return (
        <div className="w-full flex gap-2 h-screen">
            <div className="w-1/3 space-x-1">
                {genres.length > 0 &&
                genres?.map((item)=> {
                    const genreId = item.id.toString();
                    const isSelected = selectedGenreIds.includes(genreId);
                    return (
                        <Badge
                        onClick={handleGenreSelection(genreId)}
                        variant="outline"
                        key={item.name}
                        className={`${
                            isSelected
                            ?"bg-black text-white dark:bg-white dark:text-black"
                            : ""
                        } rounded-full cursor-pointer`}
                        >
                            {item.name}
                        </Badge>
                    );
                })}
            </div>
            <Separator orientation="vertical"/>
            <div className="col-span-2">
                {movie?.length> 0 && 
                movie.map((item)=> {
                    return <div key= {item.original_title}>{item.original_title}</div>
                })}
            </div>
        </div>
    );
};

export default Genres;