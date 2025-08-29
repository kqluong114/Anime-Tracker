import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import '../styles/App.css';
import SearchRecommend from "./search-recommend.jsx";



function MenuBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if(search.trim()) {
      navigate(`/home?q=${search}`);  // Navigate to search page with query
    }
  }

  return (
    <nav>
      <div>MySite</div>

      {/* Menu items */}
      <ul className="flex space-x-4 content-center mx-auto max-w-5xl">
        <li><a className="btn" href="/">Home</a></li>
        <li><a className="btn" href="/Anime">Anime</a></li>
        <li><a className="btn" href="/Manga">Manga</a></li>
        <li><a className="btn" href="/Profile">Profile</a></li>
        <li>
            <form onSubmit={handleSearch}>
              <input 
                className="border px-2 py-1 rounded" 
                type="text" 
                value={search} 
                placeholder="Search" 
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
              />
              <button className="btn" type="submit">Search</button>
            </form>
            <SearchRecommend search={search} />
        </li>
        <li><a className="btn" href="/Login">Login</a></li>
        <li><a className="btn" href="/SignUp">Sign Up</a></li>
      </ul>
    </nav>
  );
}

export default MenuBar;
