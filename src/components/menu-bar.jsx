import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/App.css';

function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <nav>
      <div>MySite</div>

      {/* Menu items */}
      <ul className="flex space-x-4 content-center">
        <li><a className="btn" href="/">Home</a></li>
        <li><a className="btn" href="/Anime">Anime</a></li>
        <li><a className="btn" href="/Manga">Manga</a></li>
        <li><a className="btn" href="/Profile">Profile</a></li>
        <li>
            <input 
            className="border px-2 py-1 rounded" 
            type="text" value={search} 
            placeholder="Search" 
            onChange={(e) => {
                setSearch(e.target.value)
            }}/>
        </li>
        <li><a className="btn" href="/Login">Login</a></li>
        <li><a className="btn" href="/SignUp">Sign Up</a></li>
      </ul>
    </nav>
  );
}

export default MenuBar;
