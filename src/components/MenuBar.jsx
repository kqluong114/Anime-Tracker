import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SideMenu from "./SideMenu";

import {
  MagnifyingGlassIcon,
  StarIcon,
  FilmIcon,
} from "@heroicons/react/16/solid";

const MenuBar = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [sideMenuIsOpen, setSideMenuIsOpen] = useState(false);

  return (
    <>
      {/* Menu items */}
      <div className="fixed top-0 z-10 flex h-12 w-full items-center justify-between bg-[oklch(.3_.02_274)]/90 px-4 py-2 backdrop-blur-xs backdrop:brightness-0">
        <button
          className={`group top-2 left-[310px] flex h-10 w-10 cursor-pointer flex-col items-center justify-between p-2`}
          onClick={() => setSideMenuIsOpen(true)}
        >
          <div className="bg-mist-600 group-hover:bg-mist-400 h-1 w-8 rounded-2xl transition-colors duration-150"></div>
          <div className="bg-mist-600 group-hover:bg-mist-400 h-1 w-8 rounded-2xl transition-colors duration-150"></div>
          <div className="bg-mist-600 group-hover:bg-mist-400 h-1 w-8 rounded-2xl transition-colors duration-150"></div>
        </button>
        <SideMenu
          sideMenuIsOpen={sideMenuIsOpen}
          setSideMenuIsOpen={setSideMenuIsOpen}
        />
        <SearchBar
          className={`${
            searchIsOpen
              ? "w-full backdrop-opacity-100"
              : "w-0 backdrop-opacity-0"
          }`}
          searchIsOpen={searchIsOpen}
          setSearchIsOpen={setSearchIsOpen}
        />
      </div>
      <div className="h-12"></div>
    </>
  );
};

export default MenuBar;
