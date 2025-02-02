"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ImageSlider from "@/components/ui/image-sliderr";
import { Movie } from "@/components/ui/types";

export default function  NowPlaying  () {
  const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [NPMoviesData, setNPMoviesData] = useState<Movie[]>([]);
  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNPMoviesData(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.status_message);
      }
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);
  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div >
      <ImageSlider element={NPMoviesData.map((element) => element)} />
    </div>
  );
};