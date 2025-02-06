"use client"
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

// You can define a type for your props if needed
const SearchPage = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const params = useParams();
  const router = useRouter();

  // Input handler with proper type
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Extracts search term from params if available
  const searchSpellCheck = (): string => {
    if (params?.id) {
      const search = params.id;
      const result = search.toString().replaceAll("%20", " ");
      return result;
    }
    return '';
  };

  // Sets the input value based on the search term from params
  useEffect(() => {
    setInputValue(searchSpellCheck());
  }, [params]);

  // Handles the search when input is provided
  const searchHandler = (inputValue: string): void => {
    if (inputValue.trim().length > 0) {
      router.push(`/search/${inputValue}`);
    }
  };

  // Handles "Enter" key to trigger the search
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, inputValue: string) => {
    if (event.key === "Enter") {
      searchHandler(inputValue);
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='w-[80%] flex flex-col justify-center mt-40'>
        <div className='w-full h-16 bg-[#090b13] rounded-xl flex justify-between items-center p-4'>
          <input
            onKeyDown={(e) => handleKeyDown(e, inputValue)}
            onChange={inputHandler}
            type='text'
            value={inputValue}
            className='w-full h-full bg-[#090b13] outline-none text-white text-base font-regular pl-4'
          />
          <Search
            onClick={() => searchHandler(inputValue)}
            className='stroke-white w-10 cursor-pointer'
          />
        </div>
        <p className='text-slate-500 mt-4'>
          Results of your search: <span className='text-white font-bold'>{`"${searchSpellCheck()}"`}</span>
        </p>
      </div>
      <div className='w-[80%] h-auto mt-10 mb-20'>
        <CardComp movieData={searchSpellCheck()} slideTitle="" search={true} />
      </div>
    </div>
  );
};

export default SearchPage;
