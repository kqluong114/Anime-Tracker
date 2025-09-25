import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimeCard from "../components/AnimeCard";

function Home() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.jikan.moe/v4/anime?q=&status=airing&type=tv&order_by=popularity&sort=asc`,
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
        <div className="mx-auto flex max-w-[1000px] flex-wrap justify-center gap-4 overflow-hidden p-4">
          {anime.map((item) => (
            <AnimeCard content={item} />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
