import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

import {
  MagnifyingGlassIcon,
  StarIcon,
  FilmIcon,
} from "@heroicons/react/16/solid";

const MenuBar2 = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  const navigate = useNavigate();

  // const handleEnableSearch = () => {
  //   searchIsOpen
  // }

  return (
    <>
      {/* Menu items */}
      <div className="flex h-12 space-x-7 bg-[oklch(.3_.02_274)]/90 backdrop-blur-xs backdrop:brightness-0 px-4 py-2 fixed top-0 z-10 justify-between w-full items-center ">
        <button
          onClick={() => {
            setSearchIsOpen((prev) => !prev);
            console.log(searchIsOpen);
          }}
        >
          click me
        </button>
        <SearchBar
          className={`${
            searchIsOpen
              ? "w-full backdrop-opacity-100"
              : "w-0 backdrop-opacity-0"
          } transition-all duration-150`}
          searchIsOpen={searchIsOpen}
          setSearchIsOpen={setSearchIsOpen}
        />
      </div>
      <div className="h-12"></div>
    </>
  );
};

export default MenuBar2;
