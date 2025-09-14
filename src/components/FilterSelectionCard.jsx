import { Link, Navigate } from "react-router-dom";
import { useState, useRef } from "react";

const FilterSelectionCard = () => {
  const [,forceUpdate] = useState(0);
  const genreSetRef = useRef(new Set());

  const handleGenreClick = (genreId) => {
    if(genreSetRef.current.has(genreId)) {
      genreSetRef.current.delete(genreId);
    }
    else {
      genreSetRef.current.add(genreId);
    }
    forceUpdate(x => x + 1);
  }

  function GenreButton({genre, id}) {
    return <button
      className={`border rounded-2x1 hover:bg-blue-200 ${genreSetRef.current.has(id) ? "text-green-300" : "text-white"}`}
      onClick={() => handleGenreClick(id)}
      key={id}
    >
      {genre}
    </button>
  }
  
  const genreIds = {
    Action: 1,
    Adventure: 2,
    Comedy: 4,
    Drama: 8,
    Ecchi: 10,
    Fantasy: 12,
    Harem: 13,
    Historical: 14,
    Horror: 15,
    Isekai: 16,
    Mecha: 17,
    Military: 18,
    Music: 19,
    Mystery: 20,
    Psychological: 21,
    Romance: 22,
    School: 23,
    SciFi: 24,
    Seinen: 25,
    Shoujo: 26,
    Shounen: 27,
    SliceOfLife: 28,
    Sports: 29,
    Supernatural: 30,
    Thriller: 31
  };

  return(
    <div className='flex-wrap flex gap-2 mb-4'>
      <div>Genres</div>
      {Object.entries(genreIds).map(([genre, id]) => <GenreButton genre={genre} id={id}></GenreButton>)}
      <div>Filters</div>
      <Link to=""></Link>
    </div>
  )
}

export default FilterSelectionCard;