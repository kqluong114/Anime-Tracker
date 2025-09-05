// import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/App.css';
// import SearchRecommend from "./SearchReccomend.jsx";



function MenuBar() {
  // const [search, setSearch] = useState("");

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if(search.trim()) {
  //     navigate(`/home?q=${search}`);  // Navigate to search page with query
  //   }
  // }

  return (
    <>
      <div>MySite</div>

      {/* Menu items */}
      <ul className="flex space-x-4 content-center mx-auto max-w-5xl">
        <li><Link className="btn" to="/">Home</Link></li>
        <li><Link className="btn" to="/Anime">Anime</Link></li>
        <li><Link className="btn" to="/Manga">Manga</Link></li>
        <li><Link className="btn" to="/Profile">Profile</Link></li>
        {/* <li>
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
        </li> */}
        <li><a className="btn" href="/Login">Login</a></li>
        <li><a className="btn" href="/SignUp">Sign Up</a></li>
      </ul>
    </>
  );
}

export default MenuBar;
