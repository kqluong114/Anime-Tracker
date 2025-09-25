import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StarIcon, FilmIcon } from "@heroicons/react/16/solid";
import { FaArrowLeft } from "react-icons/fa";

const SearchBar = ({ searchIsOpen, setSearchIsOpen }) => {
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

  return (
    <div className="flex justify-center gap-1 align-middle">
      <button
        onClick={() => {
          setSearchIsOpen(false);
        }}
      >
        <FaArrowLeft
          className={`${
            searchIsOpen ? "visible" : "invisible"
          } transition-all duration-150`}
        />
      </button>
      <form
        className={`text-black ${
          searchIsOpen ? "max-w-[400px] min-w-[50px]" : "max-w-0"
        } overflow-hidden transition-all duration-150`}
        onSubmit={handleSearch}
      >
        <input
          className="transition-color w-full rounded border-2 border-transparent bg-white py-1 pr-6 pl-2 text-black outline-0 duration-250 focus:rounded-b-none focus:border-[oklch(.8_.08_174)]"
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
      <button onClick={() => setSearchIsOpen((prev) => !prev)}>
        <MagnifyingGlassIcon className="right-0 inline-block w-6 flex-shrink-0 text-[oklch(1_.08_174)]" />
      </button>
    </div>
  );
};

export default SearchBar;
