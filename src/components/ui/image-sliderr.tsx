"use client";

import { Movie } from "@/components/ui/types";
import StarIcon from "@/app/icons/star";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface ImageSliderProps {
  element: Movie[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ element }) => {
  return (
    <div className="grid gap-8">
      {element.map((data, index) => (
        <div key={index} className="relative bg-gray-900 text-white p-5 rounded-lg">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="line-clamp-4">{data.overview}</p>
          <div className="flex items-center gap-2 mt-2">
            <StarIcon />
            <span>{data.vote_average}</span>
          </div>
          <Button className="flex items-center bg-black rounded-md px-4 py-2 mt-4">
            <Play className="mr-2" /> Watch Trailer
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
