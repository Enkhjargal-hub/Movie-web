"use client";

import React from "react";
import { Film, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/app/ui/button";
import { useTheme } from "next-themes";

const Header = () => {
  const { setTheme, theme } = useTheme();

  return (
    <header className="mx-5 flex items-center justify-between my-5">
      <div className="flex gap-2 text-indigo-700">
        <Film />
        <p className="font-bold italic">Movie Z</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="w-9 h-9">
          <Search />
        </Button>

        {theme === "dark" ? (
          <Button
            variant="outline"
            className="w-9 h-9 font-bold"
            onClick={() => setTheme("light")}
          >
            <Sun />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-9 h-9 font-bold"
            onClick={() => setTheme("dark")}
          >
            <Moon />
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
