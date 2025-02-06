"use client"
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useEffect, useState } from "react";
import {Badge} from "@/components/ui/badge";
import {useRouter} from "next/navigation"
import {useSearchParams} from "next/navigation";
import { error } from "console";

const TMDB_BASE_URL= process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN=process.env.TMDB_API_TOKEN;

type GenresType = {id:number; number:string};

const Genres = () => {
    const searchParams = useSearchParams();
    const [genres, Setgenres] = useState<GenresType[]>([]);
    const [selectedGenreIds, setSelectedGenreIds] =useState<string[]>([]);
    const {push} = useRouter();

    const getGenresList = async () => {
        await axios
        .get(`${TMDB_BASE_URL}/genre/movie/list?language=en`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
        })
        .then((response)=> {
            console.log("Axios error:", error);
        });
    };
    useEffect(()=> {
        getGenresList();
    },[]);
    const handleGenreSelection=(genreId:string) => () => {
        const queryParams = new URLSearchParams();

        setSelectedGenreIds([...selectedGenreIds,genreId]);
        push(newPath);
    };

    return (
        <div className="w-full grid grid-cols-3 gap-2"></div>
    )
}