import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      <div>MySite</div>

      {/* Menu items */}
      <ul className="flex space-x-4 content-center mx-auto max-w-5xl">
        <li><Link className="btn" to="/">Home</Link></li>
        <li><Link className="btn" to="/Anime">Anime</Link></li>
        <li><Link className="btn" to="/Manga">Manga</Link></li>
        <li><Link className="btn" to="/Profile">Profile</Link></li>
        <li>
          <form onSubmit={handleSearch}>
            <input
              className="border px-2 py-1 rounded"
              type="text"
              value={search}
              placeholder="Search"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
            <button className="btn" type="submit">Search</button>
          </form>
          {/* Search Reccommendations */}
          {searchFocused && searchResults.length > 0 ? (
            <div
              className="absolute border mt-1 rounded shadow-lg w-70 bg-white"
            >
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
        </li>
        <li><a className="btn" href="/Login">Login</a></li>
        <li><a className="btn" href="/SignUp">Sign Up</a></li>
      </ul>
    </>
  );
}

export default MenuBar;
