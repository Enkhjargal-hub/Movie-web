"use client";
import React from "react";
import { Film, Moon, Sun } from "lucide-react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className=" h-[59px] bg-background flex items-center justify-center ">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
        <div className="flex items-center gap-x-2 text-indigo-700">
          <Film />
          <h4 className="italic font-bold">Movie Z</h4>
        </div>

        <div className="hidden max-lg:flex max-lg:items-center gap-x-3 ">
          <Search className="text-muted-foreground opacity-[0.4]" size={20} />
          <Button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>
        <div className="hidden lg:flex lg:justify-center lg:gap-x-3 lg:items-center ">
          <Button className=""> genre</Button>
          <div className="relative text-muted-foreground w-[379px] flex items-center border-none ">
            <Search className="absolute left-[10px] opacity-[0.4] " size={20} />
            <Input
              className="w-full pl-10  rounded-[8px] border border-[F4F4F4] focus:border-[#9c9898] "
              type="text"
              placeholder="Search for movies"
              
            ></Input>
          </div>
        </div>
        <Button
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
          className="hidden lg:flex"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>
    </div>
  );
};
export default Header;