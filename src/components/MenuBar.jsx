import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  StarIcon,
  FilmIcon,
} from "@heroicons/react/16/solid";
// import useThrottleFetch from "../hooks/useThrottleFetch";

import "../styles/App.css";
// import SearchRecommend from "./SearchReccomend.jsx";

function MenuBar() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  // const url = `https://api.jikan.moe/v4/anime?q=${debouncedSearch}&order_by=popularity&sort=asc&limit=4`;
  // const {data, error} = useThrottleFetch({url, throttleRate: 0})

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/animeSearch?q=${search}`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch) {
      setSearchResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime?q=${debouncedSearch}&order_by=popularity&sort=asc&limit=4`
        );
        const data = await res.json();
        if (res.ok) {
          setSearchResults(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [debouncedSearch]);

  const menuItems = ["Home", "Anime", "Manga", "Profile", "Playground"];

  return (
    <>
      {/* Menu items */}
      <div className="flex h-12 space-x-7 bg-[oklch(.3_.02_274)]/90 backdrop-blur-xs backdrop:brightness-0 px-4 py-2 fixed top-0 z-10 justify-between w-full items-center ">
        <div className="flex gap-2">
          {menuItems.map((item) => {
            return (
              <Link
                className="transition-all duration-250 hover:text-[oklch(1_.08_174)] border-b-2 border-transparent hover:border-[oklch(1_.08_174)]"
                key={item}
                to={item === "Home" ? "/" : "/" + item.toLowerCase()}
              >
                {item}
              </Link>
            );
          })}
        </div>
        {/* Search Form */}
        <div className="flex align-middle gap-1">
          <form className="relative text-black" onSubmit={handleSearch}>
            <input
              className="transition-color duration-250 border-2 border-transparent focus:rounded-b-none focus:border-[oklch(.8_.08_174)] pl-2 py-1 pr-6 rounded text-black bg-white outline-0"
              type="text"
              value={search}
              placeholder="Search"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            {/* Search Recommendations */}
            {searchFocused && searchResults.length > 0 ? (
              <div className="absolute shadow-2xs w-full top-8 border mt-1 rounded-b-md bg-[oklch(0.35_0.04_274)]">
                {searchResults?.map((show) => (
                  <Link
                    to={`/Anime/${show.mal_id}`}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div
                      key={show.mal_id}
                      className="flex justify-items-start duration-250 rounded text-xs text-bold text-white p-1 pb-2 hover:bg-[oklch(0.4_0.02_274)] hover:text-[oklch(.9_.08_174)] w-full"
                    >
                      <img
                        className="inline-block w-10 pr-1"
                        src={show.images.jpg.image_url}
                        alt={show.title}
                      />
                      <div className="inline-flex min-w-0 flex-col justify-between justify-items-start">
                        <span className="truncate block">{show.title}</span>
                        <div className="flex p-0 gap-0.5 w-auto text-4xs">
                          <div className="bg-[oklch(.9_.08_174)] flex gap-1 justify-center align-middle text-black text-bold rounded-l-sm px-1 py-.5">
                            <StarIcon className="w-2" />{" "}
                            <div>
                              <span className="text-[10px]">
                                {show.score ? show.score + "/10" : "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="bg-[oklch(.9_.2_1)] flex gap-1 justify-center text-black text-bold rounded-r-sm px-1 py-.5">
                            <FilmIcon className="w-2" />{" "}
                            <div>
                              <span className="text-[10px]">
                                {show.episodes ? show.episodes : 0}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </form>
          <MagnifyingGlassIcon className="inline-block w-6 right-0 text-[oklch(1_.08_174)]" />
        </div>
        <div>
          <a
            className="transition-colors duration-250 p-2 rounded-md text-black font-bold bg-[oklch(.90_.08_174)] hover:bg-[oklch(.85_.08_174)]"
            href="/Login"
          >
            Login
          </a>
        </div>
      </div>
      <div className="h-12"></div>
    </>
  );
}

export default MenuBar;
