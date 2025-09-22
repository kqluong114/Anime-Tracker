import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimeCard from "../components/AnimeCard";

function Home() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.jikan.moe/v4/anime?q=&status=airing&type=tv&order_by=popularity&sort=asc`
    )
      .then((res) => res.json())
      .then((data) => {
        setAnime(data.data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mx-auto p-4 max-w-[1000px] flex flex-wrap gap-4 justify-center overflow-hidden">
          {anime.map((item) => (
            <AnimeCard content={item} />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
