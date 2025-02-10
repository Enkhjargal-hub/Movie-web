"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import CardComp from "@/components/ui/CardComp"; 

const SearchPage = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const params = useParams();
  const router = useRouter();


  const searchTerm = params?.id ? decodeURIComponent(params.id as string) : "";


  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const searchHandler = (inputValue: string) => {
    if (inputValue.trim().length > 0) {
      router.push(`/search/${encodeURIComponent(inputValue)}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchHandler(inputValue);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-[80%] flex flex-col justify-center mt-40">
        <div className="w-full h-16 bg-[#090b13] rounded-xl flex justify-between items-center p-4">
          <input
            onKeyDown={handleKeyDown}
            onChange={inputHandler}
            type="text"
            value={inputValue}
            className="w-full h-full bg-[#090b13] outline-none text-white text-base font-regular pl-4"
          />
          <Search
            onClick={() => searchHandler(inputValue)}
            className="stroke-white w-10 cursor-pointer"
          />
        </div>
        <p className="text-slate-500 mt-4">
          Results of your search: <span className="text-white font-bold">{`"${searchTerm}"`}</span>
        </p>
      </div>
      <div className="w-[80%] h-auto mt-10 mb-20">
        <CardComp movieData={searchTerm} slideTitle="" search={true} />
      </div>
    </div>
  );
};

export default SearchPage;
