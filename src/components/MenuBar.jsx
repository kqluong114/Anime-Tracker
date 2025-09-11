import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

import '../styles/App.css';
// import SearchRecommend from "./SearchReccomend.jsx";

function MenuBar() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/animeSearch?q=${search}`);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      console.log(search); // ff
    }, 200);
    return () => {
      clearTimeout(handler);
    }
  }, [search]);


  useEffect(() => {
    if (!debouncedSearch) {
      setSearchResults([]);
      return;
    }
    fetch(`https://api.jikan.moe/v4/anime?q=${debouncedSearch}&order_by=popularity&sort=asc&limit=4`)
      .then((res) => res.json())
      .then((data) => { setSearchResults(data.data); })
      .then(() => { console.log(debouncedSearch); })
      .catch((err) => { console.error(err); });
  }, [debouncedSearch]);

  return (
    <>
      {/* Menu items */}
      <div className="flex space-x-7 bg-[oklch(.3_.02_274)]/90 backdrop-blur-xs backdrop:brightness-0 px-4 py-2 sticky top-0 z-10 bg-[oklcd()] justify-between w-full items-center ">
        <div className="flex gap-2">
          <Link className="transition-all duration-250 hover:text-[oklch(1_.08_174)] 
          border-b-2 border-transparent hover:border-[oklch(1_.08_174)]" to="/">Home</Link>
          <Link className="transition-all duration-250 hover:text-[oklch(1_.08_174)] 
          border-b-2 border-transparent hover:border-[oklch(1_.08_174)]" to="/Anime">Anime</Link>
          <Link className="transition-all duration-250 hover:text-[oklch(1_.08_174)] 
          border-b-2 border-transparent hover:border-[oklch(1_.08_174)]" to="/Manga">Manga</Link>
          <Link className="transition-all duration-250 hover:text-[oklch(1_.08_174)] 
          border-b-2 border-transparent hover:border-[oklch(1_.08_174)]" to="/Profile">Profile</Link>
        </div>
        {/* Search Form */}
        <div className="relative flex align-middle">
          <form className="text-black" onSubmit={handleSearch}>
            <input
              className="transition-all duration-250 border-2 border-transparent focus:border-[oklch(.8_.08_174)] pl-2 py-1 pr-6 rounded text-black bg-white outline-0"
              type="text"
              value={search}
              placeholder="Search"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
            <MagnifyingGlassIcon className="inline-block w-6 right-0 text-[oklch(1_.08_174)]" />
          </form>
          {/* Search Reccommendations */}
          {searchFocused && searchResults.length > 0 ? (
            <div className="absolute border mt-1 rounded shadow-lg w-70 bg-[oklch(0.3_0.02_274)]">
              {searchResults.map((show) => (
                <div key={show.mal_id} className="inline-flex items-center p-1 hover:bg-green-200 w-full">
                  <img className="w-10 pr-1" src={show.images.jpg.image_url} alt={show.title} />
                  <Link 
                  to={`/Anime/${show.mal_id}`}
                  onMouseDown={(e) => e.preventDefault()}>
                  {show.title}
                  </Link>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <a className="transition-colors duration-250 p-2 rounded-md text-black font-bold bg-[oklch(.90_.08_174)] hover:bg-[oklch(.85_.08_174)]" href="/Login">Login</a>
        </div>
      </div>
    </>
  );
}

export default MenuBar;
