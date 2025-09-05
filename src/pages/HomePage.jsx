import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function Home() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // let params = useParams();
  useEffect(() => {
    setLoading(true);
    setSearch("");
    // params.q ? setSearch(params.q) : setSearch("");
    
    // if(search) {
    //   // console.log("search = ", params);
    //   fetch(`https://api.jikan.moe/v4/anime?q=${search}&status=airing&type=tv&order_by=popularity&sort=asc`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setAnime(data.data);
    //     setLoading(false);
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setLoading(false);
    //   });
    // }
    // else {
      console.log("no search");
      fetch(`https://api.jikan.moe/v4/anime?q=&status=airing&type=tv&order_by=popularity&sort=asc`)
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
    // }
  }, [])

  return (
      <>
        <h1>Home</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mx-auto max-w-5xl content-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {anime.map((item) => (
              <div key={item.mal_id} className="rounded border-1">
                <img className="w-full" src={item.images.jpg.image_url} alt={item.title} />
                <div className="px-6 py-4">
                  <Link to={`/anime/${item.mal_id}`} className="font-bold text-xl mb-2">{item.title}</Link>
                  <p className="text-gray-700 text-base">
                    {item.synopsis ? item.synopsis.substring(0, 100) + '...' : 'No synopsis available.'}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Score: {item.score}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Episodes: {item.episodes}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
  );
}

export default Home
