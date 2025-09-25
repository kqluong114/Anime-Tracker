import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import SideMenu from "./SideMenu";

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
      <div className="fixed top-0 z-10 flex h-12 w-full items-center justify-between bg-[oklch(.3_.02_274)]/90 px-4 py-2 backdrop-blur-xs backdrop:brightness-0">
        <button
          onClick={() => {
            setSearchIsOpen((prev) => !prev);
          }}
        >
          click me
        </button>
        <button
          onClick={() => {
            setHamburgerIsOpen((prev) => !prev);
          }}
        >
          side menu
        </button>
        <SideMenu
          hamburgerIsOpen={hamburgerIsOpen}
          setHamburgerIsOpen={setHamburgerIsOpen}
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

export default MenuBar2;
