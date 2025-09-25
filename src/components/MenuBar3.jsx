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

function MenuBar3() {
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
          `https://api.jikan.moe/v4/anime?q=${debouncedSearch}&order_by=popularity&sort=asc&limit=4`,
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
      <div className="fixed top-0 z-10 flex h-12 w-full items-center justify-between space-x-7 bg-[oklch(.3_.02_274)]/90 px-4 py-2 backdrop-blur-xs backdrop:brightness-0">
        <div className="flex gap-2">
          {menuItems.map((item) => {
            return (
              <Link
                className="border-b-2 border-transparent transition-all duration-250 hover:border-[oklch(1_.08_174)] hover:text-[oklch(1_.08_174)]"
                key={item}
                to={item === "Home" ? "/" : "/" + item.toLowerCase()}
              >
                {item}
              </Link>
            );
          })}
        </div>
        {/* Search Form */}
        <div className="flex gap-1 align-middle">
          <form className="relative text-black" onSubmit={handleSearch}>
            <input
              className="transition-color rounded border-2 border-transparent bg-white py-1 pr-6 pl-2 text-black outline-0 duration-250 focus:rounded-b-none focus:border-[oklch(.8_.08_174)]"
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
              <div className="absolute top-8 mt-1 w-full rounded-b-md border bg-[oklch(0.35_0.04_274)] shadow-2xs">
                {searchResults?.map((show) => (
                  <Link
                    to={`/Anime/${show.mal_id}`}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <div
                      key={show.mal_id}
                      className="text-bold flex w-full justify-items-start rounded p-1 pb-2 text-xs text-white duration-250 hover:bg-[oklch(0.4_0.02_274)] hover:text-[oklch(.9_.08_174)]"
                    >
                      <img
                        className="inline-block w-10 pr-1"
                        src={show.images.jpg.image_url}
                        alt={show.title}
                      />
                      <div className="inline-flex min-w-0 flex-col justify-between justify-items-start">
                        <span className="block truncate">{show.title}</span>
                        <div className="text-4xs flex w-auto gap-0.5 p-0">
                          <div className="text-bold py-.5 flex justify-center gap-1 rounded-l-sm bg-[oklch(.9_.08_174)] px-1 align-middle text-black">
                            <StarIcon className="w-2" />{" "}
                            <div>
                              <span className="text-[10px]">
                                {show.score ? show.score + "/10" : "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="text-bold py-.5 flex justify-center gap-1 rounded-r-sm bg-[oklch(.9_.2_1)] px-1 text-black">
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
          <MagnifyingGlassIcon className="right-0 inline-block w-6 text-[oklch(1_.08_174)]" />
        </div>
        <div>
          <a
            className="rounded-md bg-[oklch(.90_.08_174)] p-2 font-bold text-black transition-colors duration-250 hover:bg-[oklch(.85_.08_174)]"
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

export default MenuBar3;
